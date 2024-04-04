<template>
    <!--読み込み中-->
    <div class="ion-text-center" style="margin-top:4em;" v-if="state.isLoading">
        <IonSpinner name="dots" style="width:3em;height:3em"></IonSpinner>
    </div>

    <!--エラー-->
    <div v-else-if="(props.day === undefined || props.period === undefined) && props.id === undefined">
        <IonList inset>
            <IonItem>
                <IonLabel>
                    <strong>アプリで問題が発生しました</strong>
                    <p>パラメータの設定要件が満たされていません（曜日・時限または授業IDが指定されていません）。</p>
                </IonLabel>
            </IonItem>
        </IonList>
    </div>
    <div v-else-if="state.isError">
        <IonList inset>
            <IonItem>
                <IonLabel>
                    <strong>アプリで問題が発生しました</strong>
                    <h3 class="ion-text-wrap">URLに問題がある場合があります。意図せずにこの画面が表示された場合はホーム画面からやり直してください。</h3>
                </IonLabel>
            </IonItem>
            <IonItem button router-link="/member/home">
                <IonText color="primary">ホーム画面に移動</IonText>
            </IonItem>
        </IonList>
    </div>
    <div v-else-if="!state.isFound && props.day !== undefined && props.period !== undefined">
        <IonList inset>
            <IonItem>
                <IonLabel>
                    <strong>授業が登録されていません</strong>
                    <h3 class="ion-text-wrap">{{ ["日", "月", "火", "水", "木", "金", "土"][props.day] }}曜日 {{ props.period }}
                        時限に授業はありますか？<br>ある場合は授業を登録しましょう</h3>
                </IonLabel>
            </IonItem>
        </IonList>
        <IonList inset>
            <IonItem button @click="editModal.$el.present()">
                <IonIcon :icon="addCircle" slot="start" color="primary"></IonIcon>
                <IonText color="primary">この時限に授業を作成</IonText>
            </IonItem>
        </IonList>
        <IonList inset>
            <IonItem lines="full">
                <IonLabel>
                    <p>その他のオプション</p>
                </IonLabel>
            </IonItem>
            <IonItem button>
                <IonIcon :icon="copyOutline" slot="start" color="primary"></IonIcon>
                <IonLabel class="ion-text-wrap">
                    <IonText color="primary">すでに作成済みの授業をコピー</IonText>
                    <p>次回アップデートで実装予定</p>
                </IonLabel>
                <IonBadge slot="end" color="danger">現在利用不可</IonBadge>
            </IonItem>
            <IonItem button @click="launchQrReader">
                <IonIcon :icon="qrCodeOutline" slot="start" color="primary"></IonIcon>
                <IonLabel class="ion-text-wrap">
                    <IonText color="primary">QRコードを読み込む</IonText>
                    <p>他の端末で作成した授業情報をQRコードを読み取ることでコピーできます</p>
                </IonLabel>
            </IonItem>
            
        </IonList>
        <IonList inset>
            <IonItem @click="loadClassData" button>
                <IonLabel class="ion-text-wrap">
                    <IonText color="primary">再読み込み</IonText>
                    <p>QRコードで授業を登録したのに表示されない場合はここをタップ</p>
                </IonLabel>
            </IonItem>
        </IonList>
    </div>
    <div v-else-if="!state.isFound && !!props.id">
        <IonList inset>
            <IonItem>
                <IonLabel>
                    <strong>授業が見つかりません</strong>
                    <p>指定された授業（授業ID: {{ props.id }}）は存在しません。</p>
                </IonLabel>
            </IonItem>
        </IonList>
    </div>
    <!--エラー終了-->

    <!--授業情報表示-->
    <div v-else>
        <!--授業名、授業時間など-->
        <IonList lines="none" class="ion-margin-top">
            <IonItem color="transparent">
                <IonIcon :icon="school" slot="start"></IonIcon>
                <IonLabel>
                    <h1><strong>{{ state.classData.name }}</strong></h1>
                    <p>{{ state.classData.startTime }} ～ {{ state.classData.endTime }}</p>
                </IonLabel>
                <IonButtons slot="end">
                    <IonButton fill="solid" shape="round" color="dark" @click="editModal.$el.present()">
                        <span class="ion-margin-start ion-margin-end">編集・削除</span>
                    </IonButton>
                </IonButtons>
            </IonItem>
        </IonList>
        <!--講師名、教室など-->
        <IonList inset>
            <IonItem v-if="state.classData.teacher !== ''">
                <IonIcon :icon="person" slot="start"></IonIcon>
                <IonLabel>講師名</IonLabel>
                <IonLabel slot="end">{{ state.classData.teacher }}</IonLabel>
            </IonItem>
            <IonItem v-if="state.classData.room !== ''">
                <IonIcon :icon="locateOutline" slot="start"></IonIcon>
                <IonLabel>教室</IonLabel>
                <IonLabel slot="end">{{ state.classData.room }}</IonLabel>
            </IonItem>
        </IonList>
        <IonList inset lines="full">
            <IonItem>
                <IonIcon :icon="attachOutline" slot="start"></IonIcon>
                <IonLabel><strong>リンクとミーティング</strong></IonLabel>
                <IonBadge slot="end">{{ state.classData.links.length }}</IonBadge>
            </IonItem>
            <linkItem v-for="link in state.classData.links" :title="link.name" :url="link.url" clickable></linkItem>
            <IonItem v-if="state.classData.links.length === 0">
                <IonLabel class="ion-text-wrap">
                    <p>登録されているリンクやミーティングはありません</p>
                </IonLabel>
            </IonItem>
        </IonList>
        <!--QRコードへのリンク-->
        <IonList inset v-if="props.day !== undefined && props.period !== undefined">
            <IonItem button :router-link="`/member/period/${day}/${period}/qrcode`">
                <IonIcon :icon="qrCodeOutline" slot="start"></IonIcon>
                <IonLabel class="ion-text-wrap">
                    <strong>QRコードを表示</strong>
                    <p>QRコードで他の端末にこの授業を転送しよう。</p>
                </IonLabel>
            </IonItem>
        </IonList>
    </div>

    <!--編集モーダル-->
    <IonModal ref="editModal" :presenting-element="props.presentingElement" :backdrop-dismiss="false"
        :can-dismiss="(data: any, role: string) => role !== 'gesture'" @did-present="editModalState.onDidPresent"
        @did-dismiss="editModalState.onDidDismiss">
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="editModalState.cancel()">キャンセル</IonButton>
                </IonButtons>
                <IonTitle>編集</IonTitle>
                <IonButtons slot="end">
                    <IonButton @click="editModalState.save"><strong>保存</strong></IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light">
            <!--パソコン入力推奨メッセージ-->
            <IonList inset v-if="state.userOSName === 'Android' || state.userOSName === 'iOS'">
                <IonItem color="dark" @click="state.userOSName = ''">
                    <IonLabel class="ion-text-wrap">
                        <strong>⚠️パソコンでもご利用ですか？</strong>
                        <h3>パソコンでもTimetable アプリをご利用いただいている場合は、パソコンで授業情報を入力するとQRコードでスマホに授業を転送できて便利です！（逆はできません）</h3>
                    </IonLabel>
                </IonItem>
            </IonList>
            <IonList inset>
                <IonItem>
                    <IonLabel>
                        <p class="ion-text-wrap">* は必須項目です</p>
                    </IonLabel>
                </IonItem>
            </IonList>
            <!--科目名-->
            <IonList inset>
                <IonItem>
                    <IonInput label="科目名*" placeholder="必須" v-model="editModalState.classData.name"></IonInput>
                </IonItem>
            </IonList>
            <IonList inset v-if="editModalState.classData.name === ''" class="fade-in">
                <IonItem>
                    <IonIcon :icon="informationCircle" slot="start"></IonIcon>
                    <IonLabel>
                        <h3 class="ion-text-wrap">'科目名' は必須項目です。必ず入力してください。<br>入力すると、次の入力項目が表示されます</h3>
                    </IonLabel>
                </IonItem>
            </IonList>

            <!--開始時間と終了時間-->
            <IonList inset v-else class="fade-in">
                <IonItem>
                    <IonLabel><strong>開始時間*</strong></IonLabel>
                    <IonLabel slot="end">
                        <input type="time" value="00:00" v-model="editModalState.classData.startTime"
                            @change="editModalState.classData.startTime === '' ? editModalState.classData.startTime = '00:00' : null">
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel><strong>終了時間*</strong></IonLabel>
                    <IonLabel slot="end">
                        <input type="time" value="01:00" v-model="editModalState.classData.endTime"
                            @change="editModalState.classData.endTime === '' ? editModalState.classData.endTime = '00:00' : null">
                    </IonLabel>
                </IonItem>
            </IonList>
            <IonList inset
                v-if="editModalState.classData.name !== '' && editModalState.classData.startTime >= editModalState.classData.endTime"
                class="fade-in">
                <IonItem>
                    <IonIcon :icon="informationCircle" slot="start"></IonIcon>
                    <IonLabel>
                        <h3 class="ion-text-wrap">開始時間が終了時間よりも早い時刻になるようにしてください<br>完了すると、次の入力項目が表示されます</h3>
                    </IonLabel>
                </IonItem>
            </IonList>

            <!--その他の設定-->
            <div v-else-if="editModalState.classData.name !== '' && editModalState.classData.startTime < editModalState.classData.endTime"
                class="fade-in">
                <!--講師名、教室-->
                <IonList inset>
                    <IonItem>
                        <IonInput label="講師名" placeholder="講師の名前を入力" v-model="editModalState.classData.teacher">
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput label="教室" placeholder="教室を入力" v-model="editModalState.classData.room"></IonInput>
                    </IonItem>
                </IonList>
                <!--リンクとミーティング-->
                <IonList inset>
                    <IonItem lines="full">
                        <IonIcon :icon="attachOutline" slot="start"></IonIcon>
                        <IonLabel>
                            <strong>リンクとミーティング</strong>
                            <p class="ion-text-wrap" v-if="editModalState.classData.links.length > 0">左にスワイプして削除</p>
                        </IonLabel>
                        <IonButton fill="clear" @click="editModalState.openCreateLinkAlert">
                            <IonIcon :icon="addCircle" slot="start"></IonIcon>
                            追加
                        </IonButton>
                    </IonItem>
                    <!--リンクとミーティング一覧-->
                    <IonItemSliding v-for="(link, index) in editModalState.classData.links">
                        <linkItem :title="link.name" :url="link.url" :clickable="false" />
                        <IonItemOptions>
                            <IonItemOption color="danger" @click="editModalState.removeLink(index)">
                                <IonIcon :icon="trash" slot="icon-only"></IonIcon>
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                    <IonItem v-if="editModalState.classData.links.length === 0">
                        <IonLabel>
                            <strong>リンクやミーティングを追加しよう</strong>
                            <p class="ion-text-wrap">URLを登録するだけ。Zoom などのオンラインミーティングのURLも登録できます。</p>
                        </IonLabel>
                    </IonItem>
                </IonList>
            </div>

            <!--削除（保存済みでIDが存在する場合のみ表示）-->
            <IonList inset v-if="!!state.classData.id">
                <IonItem button @click="editModalState.delete()">
                    <IonIcon :icon="trash" slot="start" color="danger"></IonIcon>
                    <IonLabel>
                        <strong>
                            <IonText color="danger">この授業を削除</IonText>
                        </strong>
                        <p>削除すると、もとに戻せません</p>
                    </IonLabel>
                </IonItem>
            </IonList>
        </IonContent>
    </IonModal>
</template>

<script setup lang="ts">
import { IonBadge, IonButton, IonButtons, IonChip, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonModal, IonSkeletonText, IonSpinner, IonText, IonTitle, IonToolbar, alertController, toastController } from '@ionic/vue';
import { addCircle, reloadCircle, qrCodeOutline, attachOutline, informationCircle, linkOutline, locateOutline, person, school, timeOutline, trash, videocam, qrCode, copyOutline } from 'ionicons/icons';

import { UAParser } from "ua-parser-js"

import { api, db } from '@/db'
import { reactive, ref } from 'vue';
import { useRouter } from "vue-router";
import linkItem from './linkItem.vue';

const router = useRouter()
const editModal = ref()

const props = defineProps<{
    id?: number // 授業ID
    day?: number // 授業の曜日
    period?: number // 授業の時限
    timetableId?: number // 検索する時間割のID
    presentingElement: null | HTMLElement // モーダル用の要素(ion-modal準拠)
}>()

// 型定義
interface link {
    name: string
    url: string
}

const state = reactive({
    // 読み込み中かどうか
    isLoading: true,
    // 授業が登録されているか
    isFound: false,
    // 授業に読み込み時にエラーが発生したかどうか
    isError: false,
    // 端末OSの名称
    userOSName: (new UAParser()).getOS().name,
    // 授業情報
    classData: {
        id: <null | number>null,
        timetableId: <null | number>null,
        name: "",
        teacher: "",
        room: "",
        startTime: "",
        endTime: "",
        links: <link[]>[]
    }
})

// 編集モーダルの状況
const editModalState = reactive({
    // 授業情報
    classData: {
        name: "",
        teacher: "",
        room: "",
        startTime: "00:00",
        endTime: "00:00",
        links: <link[]>[]
    },
    // 編集モーダル表示中にWebページが閉じられそうになったら抑止する
    onBeforeUnload(e: Event) {
        e.preventDefault()
        return "授業情報を編集中です。このページから移動すると編集内容が破棄されます"
    },
    // 表示されたとき
    onDidPresent() {
        window.addEventListener("beforeunload", editModalState.onBeforeUnload)
        //console.log("present")
    },
    // 閉じられたとき
    onDidDismiss() {
        window.removeEventListener("beforeunload", editModalState.onBeforeUnload)
        //console.log("dismiss")
    },
    // キャンセル
    async cancel() {
        const alert = await alertController.create({
            header: "キャンセルしますか？",
            message: "キャンセルすると、入力内容が破棄されます",
            buttons: [
                '入力を続ける',
                {
                    text: "キャンセルする",
                    role: "destructive",
                    handler() {
                        editModal.value.$el.dismiss()

                        // データベースから再取得して、編集内容をもとに戻す
                        loadClassData()
                    }
                }
            ]
        })

        alert.present()
    },
    // 授業を削除
    async delete() {
        if (state.classData.id !== null) {
            const alert = await alertController.create({
                header: "この授業を削除しますか？",
                message: "削除するともとに戻せません",

                buttons: [
                    'キャンセル',
                    {
                        text: "削除",
                        role: "destructive",
                        async handler() {
                            editModal.value.$el.dismiss()

                            // 削除
                            await db.classes.delete(state.classData.id!)

                            // 通知を表示
                            const toast = await toastController.create({
                                message: "授業を削除しました",
                                color: "dark",
                                duration: 1500
                            })
                            toast.present()

                            // 表示を更新
                            loadClassData()
                        }
                    }
                ]
            })

            alert.present()
        }

    },
    // 保存
    async save() {
        // 必須条件を確認
        // 科目名が入力されていなければキャンセル
        if (editModalState.classData.name === "") {
            (await alertController.create({ header: "入力内容の確認", message: "科目名が入力されていません", buttons: ["OK"] })).present()
            return;
        }
        // 開始時間 < 終了時間になっていなければキャンセル
        if (!(editModalState.classData.startTime < editModalState.classData.endTime)) {
            (await alertController.create({ header: "入力内容の確認", message: "開始時間が終了時間より遅い時刻になっています", buttons: ["OK"] })).present()
            return;
        }

        // DBに保存
        // 新規保存（IDがない）の場合
        if (state.classData.id === null && state.classData.timetableId === null) {
            // 現在の時間割のIDを取得
            const timetableIdResult = await db.kvs.get("currentTimetableId")
            if (!!timetableIdResult) {
                const timetableId = <number>timetableIdResult.value
                // 保存
                await api.timetable.setClass({
                    timetableId: timetableId,

                    day: Number(props.day),
                    period: Number(props.period),
                    lastUpdated: new Date().toISOString(),

                    name: editModalState.classData.name,
                    startTime: editModalState.classData.startTime,
                    endTime: editModalState.classData.endTime,
                    teacher: editModalState.classData.teacher,
                    room: editModalState.classData.room,
                    links: editModalState.classData.links
                })
            }
        } else if (state.classData.id !== null && state.classData.timetableId !== null) {
            // 上書き保存の場合
            // 保存
            await api.timetable.setClass({
                id: state.classData.id,
                timetableId: state.classData.timetableId,

                day: Number(props.day),
                period: Number(props.period),
                lastUpdated: new Date().toISOString(),

                name: editModalState.classData.name,
                startTime: editModalState.classData.startTime,
                endTime: editModalState.classData.endTime,
                teacher: editModalState.classData.teacher,
                room: editModalState.classData.room,
                links: editModalState.classData.links
            })
        }

        // 通知を表示
        const toast = await toastController.create({
            message: "保存しました",
            color: "dark",
            duration: 1500
        })
        toast.present()
        // 更新
        await loadClassData()

        // 授業を登録したので、登録済みとする
        state.isFound = true
        // 編集モーダルを閉じる
        editModal.value.$el.dismiss()
    },
    // リンク作成
    async openCreateLinkAlert() {
        const alert = await alertController.create({
            backdropDismiss: false,
            header: "リンクの追加",
            message: "リンクのタイトルとURLを入力してください。Zoom などのオンラインミーティングのURLを登録すると、ワンストップで参加できて便利です。",
            inputs: [
                {
                    placeholder: "タイトル(例:講義資料)"
                },
                {
                    placeholder: "リンクのURL",
                    type: "url"
                }
            ],
            buttons: [
                "キャンセル",
                {
                    text: "リンクを追加",
                    async handler(value) {
                        const name = value[0]
                        const url = value[1]

                        // タイトルが入力されていなければキャンセル
                        if (name === "") {
                            const toast = await toastController.create({
                                message: "タイトルが入力されていません",
                                color: "dark",
                                duration: 1500,
                            })
                            toast.present()
                            return
                        }
                        // URLが正しい形式かどうか検証
                        const urlPatternRegExp = /^https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+$/
                        // 正しくなければキャンセル
                        if (!urlPatternRegExp.test(url)) {
                            const toast = await toastController.create({
                                message: "URLが正しい形式ではありません",
                                color: "dark",
                                duration: 1500,
                            })
                            toast.present()
                            return
                        }

                        // 適用
                        editModalState.classData.links.push({
                            name: name,
                            url: url
                        })
                    }
                }
            ]
        })

        alert.present()
    },
    removeLink: async (index: number) => {
        const alert = await alertController.create({
            header: "確認",
            message: "リンクを削除します。よろしいですか？",
            buttons: [
                'キャンセル',
                {
                    text: "削除",
                    role: "destructive",
                    handler() {
                        editModalState.classData.links.splice(index, 1)
                    }
                }
            ]
        })
        alert.present()
    }

})

// 授業情報を読み込み
const loadClassData = async () => {
    // 読み込み開始
    state.isLoading = true
    // 結果
    let result;

    // 授業を取得
    // 授業IDが指定されているとき
    if (!!props.id) {
        // データベースからIDを指定して取得
        result = await db.classes.get(props.id)
    }
    // 曜日, 時限が指定されているとき
    else if (props.day !== undefined && props.period !== undefined) {
        // day, period の範囲が正しいか確認
        if (
            (0 <= props.day && props.day <= 6) &&
            (1 <= props.period && props.period <= 10)) {
            // 現在の時間割のIDを取得
            const currentTimetableIdResult = await db.kvs.get("currentTimetableId")
            if (!!currentTimetableIdResult) {
                const currentTimetableId = <number>currentTimetableIdResult.value
                // 現在の時間割の授業を取得
                await db.classes.where("timetableId")
                    .equals(currentTimetableId)
                    .toArray(_result => {
                        if (!!_result) {
                            // 曜日、時限が一致しているものを抽出
                            result = (_result.filter(classData => {
                                return classData.day === props.day && classData.period === props.period
                            }))[0]
                        }
                    })
            } else {
                state.isError = true
            }
        } else {
            state.isError = true
        }
    }

    // 反映
    if (!!result) {
        state.classData.name = result.name
        state.classData.teacher = result.teacher
        state.classData.room = result.room
        state.classData.startTime = result.startTime
        state.classData.endTime = result.endTime
        state.classData.links = result.links
        state.classData.id = result.id! // オートインクリメントにより、必ず存在する
        state.classData.timetableId = result.timetableId

        // 編集モーダルに反映
        editModalState.classData.name = result.name
        editModalState.classData.startTime = result.startTime
        editModalState.classData.endTime = result.endTime
        editModalState.classData.teacher = result.teacher
        editModalState.classData.room = result.room
        editModalState.classData.links = result.links

        state.isFound = true
    } else {
        state.isFound = false
    }

    setTimeout(() => state.isLoading = false, 500)
}

// 読み込みを実行
loadClassData()

// QRコードリーダを起動
const launchQrReader = async () => {
    const alert = await alertController.create({
        header: "お知らせ",
        message: "次の画面でカメラへのアクセス許可を求められた場合は、「許可」をお願いします。",
        buttons:[
            'キャンセル',
            {
                text: '次に進む',
                handler(){
                    router.push("/member/qr-reader")
                }
            }
        ]
    })

    alert.present()
}
</script>
<style scoped>
input[type="time"] {
    outline: none;
}

@keyframes fadeIn {
    from {
        opacity: 0.3;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.5s
}
</style>