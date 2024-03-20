// Database Init
import { alertController } from "@ionic/vue"
import Dexie, { Table } from "dexie"
import router from "@/router"
import { star } from "ionicons/icons"

// リンク
interface link {
    name: string // タイトル
    url: string // リンクのURL
}

// 授業情報
export interface classData {
    id?: number // ID (AI)
    timetableId: number // 時間割のID
    day: number // {曜日}-{時限}
    period: number
    name: string // 授業名
    teacher: string // 講師名
    room: string // 教室
    startTime: string // 開始時間(HH:MM)
    endTime: string // 終了時間(HH:MM)
    links: link[] // Webサイトへのリンク 
    lastUpdated: string // 最終更新日(YYYY-MM-DDTHH:mm:ssz)
}
// 時間割
export interface timetable {
    id?: number // ID (AI)
    name: string // 時間割の名前（例: 2年 前期）
}
// To-Do
export interface toDo {
    id?: number // ID (AI)
    classId?: number | null // To-Doに関連付ける授業のID
    title: string // To-Do のタイトル
    details: string // 説明
    links: link[]
    lastUpdated: string // 最終更新日(YYYY-MM-DDTHH:mm:ssz)
}
// 設定情報(kvs)
export interface kvs {
    key: string
    value: string | number | boolean
}

export class TimetableDexie extends Dexie {
    classes!: Table<classData>
    timetables!: Table<timetable>
    toDo!: Table<toDo>
    kvs!: Table<kvs>

    constructor() {
        // データベース名
        super("opstid.timetable.main")
        // バージョン
        this.version(1)
            .stores({
                classes: "++id, timetableId, day, period, name, teacher, room, startTime, endTime, links, lastUpdated",
                timetables: "++id, name",
                toDo: "++id, classId, title, details, links, lastUpdated",
                kvs: "key, value"
            })
    }
}

export const db = new TimetableDexie()


// データを処理するAPI群
export interface currentClassData {
    classData: classData; // 授業データ
    isNow: boolean; // 現在授業中かどうか
    startIn: number; // 何分後に授業が始まるか
}

export const api = {
    timetable: {
        // i曜日、j時限となるような配列を取得
        getClassesTable: async () => {
            // i曜日、j時限となる配列
            let classesTable: [classData[]?] = []
            // 現在の時間割のID
            const currentTimetableIdResult = await db.kvs.get("currentTimetableId")
            if (!!currentTimetableIdResult) {
                // 現在の時間割に登録されている授業情報をdayPeriodで並べ替えて全て取得
                const classes = await db.classes.where("timetableId")
                    .equals(
                        // 現在の時間割のID
                        <string>currentTimetableIdResult.value)
                    .sortBy("dayPeriod")

                classes.forEach(classData => {
                    // dayPeriodを "-" で区切って曜日と時限に分け、数値に変換
                    let day = classData.day
                    let period = classData.period
                    // classesTable[day] が undefined のときは、配列を作成
                    if (classesTable[day] === undefined) {
                        classesTable[day] = []
                    }
                    // 取得した授業をclassesTable[day][period]に格納
                    classesTable[day]![period] = classData
                })
                // 1つも授業がない曜日にからの配列を追加
                for (let i = 0; i <= 6; i++) {
                    if (!classesTable[i]) {
                        classesTable[i] = []
                    }
                }

                return classesTable
            } else {
                // エラーを表示
                const alert = await alertController.create({
                    header: "エラー",
                    message: "使用する時間割が選択されていません。[選択する] ボタンから使用する時間割を選択してください",
                    buttons: [
                        {
                            text: "選択する",
                            handler() {
                                router.push("/member/change-timetable")
                            }
                        }
                    ]
                })
                alert.present()
            }
        },

        // 現在進行中、もしくは次の授業を取得
        // 返り値が null のときは本日、現在時刻以降の授業なし
        getCurrentClass: async () => {
            // 現在進行中かどうか
            let isNow = false
            // 何分後に授業が始まるか
            let startIn = 0
            // classTable を取得
            const classesTable = await api.timetable.getClassesTable()
            // 今日の曜日を取得
            const date = new Date()
            const day = date.getDay()
            // 今日の授業を取得
            let todayClasses = <classData[] | undefined>undefined
            if (!!classesTable) {
                todayClasses = classesTable[day]
            }
            // 今日の授業がある場合
            if (!!todayClasses) {
                // 現在、もしくは次の授業
                let currentClass: classData | null = null
                // 現在時刻(HH:MM 形式)
                const hour = date.getHours() < 10 ? "0" + date.getHours() : String(date.getHours())
                const min = date.getMinutes() < 10 ? "0" + date.getMinutes() : String(date.getMinutes())
                const HHMM = hour + ":" + min
                // console.log(HHMM, todayClasses)
                // 現在行われている授業があるか検索する
                todayClasses.forEach(classData => {
                    // 開始時間 <= 現在時刻 <= 終了時間のとき、その授業は現在実施中
                    if (classData.startTime <= HHMM && HHMM <= classData.endTime) {
                        currentClass = classData
                        isNow = true
                        startIn = 0
                    }
                })
                // 現在行われている授業がなかった場合(この時点で currentClass === null のとき)
                if (currentClass === null) {
                    // 次の授業があるか検索する
                    //（classesTableは曜日・時限順に並べ替えてあるので、一番最初に検索に引っかかったものが次の時限）
                    todayClasses.forEach(classData => {
                        // 現在時刻 <= 開始時間なら、現在時刻以降に始まる授業
                        if (HHMM <= classData.startTime) {
                            // すでにcurrentClassに追加されている授業がなければ、次にはじまる授業
                            if (currentClass === null) {
                                currentClass = classData

                                // 何分後に始まるかを計算する
                                // splitで分割後、map(Number) で数値に変換
                                const [classStartTimeHH, classStartTimeMM] = classData.startTime.split(":").map(Number)

                                // 開始時間の、0時0分からの経過時間（分）
                                const classStartTimeMinute = classStartTimeHH * 60 + classStartTimeMM
                                
                                // 現在時刻の、0時0分からの経過時間（分）
                                const currentTimeMinute = Number(hour) * 60 + Number(min)

                                // 開始時間 - 現在時刻が、開始までの時間
                                startIn = classStartTimeMinute - currentTimeMinute
                            }
                        }
                    })
                }
                if (!!currentClass) {
                    return <currentClassData | null>{
                        classData: currentClass,
                        isNow: isNow,
                        startIn: startIn
                    }
                }
                // 授業データがなければ null を返す
                else {
                    return <currentClassData | null>null
                }
            }
            // ない場合は null を返す
            else {
                return <currentClassData | null>null
            }
        },
        // 授業を保存・変更
        setClass: async (classData: classData) => {
            // データベースに保存（クローンエラーが起きるので一旦JSONに変換してから再度JavaScriptオブジェクトに戻す）
            return await db.classes.put(JSON.parse(JSON.stringify(classData)))
        },

        // 授業を削除
        deleteClass: async (dayPeriod: string) => {
            return await db.classes.delete(dayPeriod)
        },


        // 初期状態の OPSTIDTimetableClassData
        getDefaultClassData: () => {
            return <classData>{
                timetableId: 1,// 時間割のID
                day: 0, // 曜日
                period: 0, // 時限
                name: "", // 授業名
                teacher: "", // 講師名
                room: "", // 教室
                startTime: "00:00", // 開始時間(HH:MM)
                endTime: "00:00", // 終了時間(HH:MM)
                meetings: [], // オンライン授業情報
                links: [], // Webサイトへのリンク 
                lastUpdated: "", // 最終更新日(YYYY-MM-DDTHH:mm:ssz)
            }
        }

    }
}