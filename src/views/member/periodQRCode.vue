<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton :default-href="`/member/period/${$route.params['day']}/${$route.params['period']}`"
                        text="戻る"></IonBackButton>
                </IonButtons>
                <IonTitle>授業のQRコード</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light">
            <IonGrid fixed>
                <IonRow>
                    <IonCol class="ion-text-right">
                        <IonButton fill="clear" :disabled="state.day === 0 && state.period === 0"
                            @click="moveToPreviousPeriod">
                            <IonIcon :icon="chevronBack" slot="start"></IonIcon>
                            前の授業
                        </IonButton>
                    </IonCol>
                    <IonCol>

                    </IonCol>
                    <IonCol>
                        <IonButton fill="clear" :disabled="state.day === 6 && state.period === 10"
                            @click="moveToNextPeriod">
                            <IonIcon :icon="chevronForward" slot="end"></IonIcon>
                            次の授業
                        </IonButton>
                    </IonCol>
                </IonRow>
                <div class="ion-text-center ion-padding-top">
                    <img :src="state.qrcodeUrl" class="qrcode">
                </div>
                <div class="ion-text-center">
                    <IonLabel>
                        <strong>{{ ['日', '月', '火', '水', '木', '金', '土'][state.day] }}曜日 {{ state.period }} 時限</strong>
                        <p>{{ state.className }}</p>
                    </IonLabel>
                </div>
                <IonList inset>
                    <IonItem>
                        <IonLabel class="ion-text-wrap">
                            <strong>他の端末に授業を転送する方法</strong>
                            <h3>
                                <ol>
                                    <li>転送先の端末でTimetableアプリを開き、授業が登録されていない時限をタップ</li>
                                    <li>表示された画面の「その他のオプション」から「QRコードを読み取る」を選択</li>
                                    <li>上のQRコードを読み取ると、転送元の時間割で設定されている、曜日・時限に授業が登録されます。</li>
                                    <li>連続して授業を転送する場合は、この画面の「前の授業」「次の授業」ボタンで目的の授業のQRコードを表示した上で転送先の端末で読み取ってください。</li>
                                </ol>
                            </h3>
                            <p>※ このQRコードは一般的なQRコードリーダーでは使用できません。</p>
                            <p>※ QRコードにすべての情報（科目名、授業時間など）が圧縮された状態で格納されています。</p>
                            <p>※「リンクとミーティング」の登録数が多い場合、省略されることがあります。</p>
                            <p>※ 機密情報が含まれる可能性がありますので、第三者に見られない場所での作業を推奨します。</p>
                            <p>※ QRコードは(株)デンソーウェーブの登録商標です</p>
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonTitle, IonToolbar, alertController } from "@ionic/vue"
import { alertCircle, chevronBack, chevronForward } from "ionicons/icons";

import { reactive, watchEffect } from "vue"
import { useRoute } from "vue-router";

// @ts-ignore
import QRCode from "qrcode"
import { compressToEncodedURIComponent } from "lz-string";
import { api } from "@/db";

const route = useRoute()
const state = reactive({
    day: 0,
    period: 0,
    className: "", // 授業名
    qrcodeUrl: "",
    isNotFound: false // 授業が見つからないときtrue
})

// 前の授業
const moveToPreviousPeriod = async () => {
    // 時間割表を取得
    const classesTable = await api.timetable.getClassesTable()
    if (classesTable === undefined) return;

    // 確認する曜日、時限
    let targetDay = state.day // 表示中の曜日
    let targetPeriod = state.period // 表示中の時限

    // 前の授業が見つかったらtrue
    let isFound = false

    while (!isFound) {
        // 前の授業を探す
        // 時限を1つ戻る
        targetPeriod--
        // もし、日曜日でなく、時限が0以下になったら前の曜日の10時限目に戻る
        if (targetDay !== 0 && targetPeriod <= 0) {
            targetDay--
            targetPeriod = 10
        }
        // 日曜日0時限のとき
        else if (targetDay === 0 && targetPeriod === 0) {
            // 授業が見つからないのでエラーを表示
            const alert = await alertController.create({
                header: "前の授業が見つかりません",
                message: "現在表示されている授業より前の授業はありません",
                buttons: ['OK']
            })
            alert.present()
            // 見つけたことにしてループを終了
            isFound = true
            // 表示中の日時、時限を適用
            targetDay = state.day
            targetPeriod = state.period
        }
        // console.log(targetDay, targetPeriod, classesTable[targetDay]![targetPeriod])
        // targetDay, targetPeriod に授業が有るかを確認する
        if (classesTable[targetDay]![targetPeriod] !== undefined) {
            // 授業が見つかったのでisFoundをtrueとする
            isFound = true
        }
    }

    state.day = targetDay
    state.period = targetPeriod
}

// 次の授業
const moveToNextPeriod = async () => {
    // 時間割表を取得
    const classesTable = await api.timetable.getClassesTable()
    if (classesTable === undefined) return;

    // 確認する曜日、時限
    let targetDay = state.day // 表示中の曜日
    let targetPeriod = state.period // 表示中の時限

    // 前の授業が見つかったらtrue
    let isFound = false

    while (!isFound) {
        // 前の授業を探す
        // 時限を1つ進む
        targetPeriod++
        // もし、土曜日でなく、時限が11以上になったら次の曜日の1時限目に戻る
        if (targetDay !== 6 && targetPeriod >= 11) {
            targetDay++
            targetPeriod = 1
        }
        // 土曜日11時限のとき
        else if (targetDay === 6 && targetPeriod === 11) {
            // 授業が見つからないのでエラーを表示
            const alert = await alertController.create({
                header: "次の授業が見つかりません",
                message: "現在表示されている授業の次の授業はありません",
                buttons: ['OK']
            })
            alert.present()
            // 見つけたことにしてループを終了
            isFound = true
            // 表示中の日時、時限を適用
            targetDay = state.day
            targetPeriod = state.period
        }
        // console.log(targetDay, targetPeriod, classesTable[targetDay]![targetPeriod])
        // targetDay, targetPeriod に授業が有るかを確認する
        if (classesTable[targetDay]![targetPeriod] !== undefined) {
            // 授業が見つかったのでisFoundをtrueとする
            isFound = true
        }
    }

    state.day = targetDay
    state.period = targetPeriod
}

// QRコードを生成
const generateQRCode = async () => {
    // console.log("generate")
    // DBから時間割を取得
    const classesTable = await api.timetable.getClassesTable()
    if (!!classesTable) {
        // 授業情報を取得
        const targetClassData = classesTable[state.day]![state.period]
        if (!!targetClassData) {
            // QRコードを生成
            QRCode.toDataURL(
                // LZ-Stringで圧縮
                compressToEncodedURIComponent(JSON.stringify({
                    name: targetClassData.name,
                    startTime: targetClassData.startTime,
                    endTime: targetClassData.endTime,
                    room: targetClassData.room,
                    teacher: targetClassData.teacher,
                    links: targetClassData.links,

                    day: state.day,
                    period: state.period
                })),
                {
                    width: 512
                }
            ).then((qrcodeDataUrl: string) => {
                // console.log(qrcodeDataUrl)
                // QRコードを反映
                state.qrcodeUrl = qrcodeDataUrl
                // 授業名
                state.className = targetClassData.name
            })
        }
    }

}

// URLから、day, period を取得
if (route.params['day'] !== undefined && route.params['period'] !== undefined) {
    state.day = Number(route.params['day'])
    state.period = Number(route.params['period'])
}

// day, period が変更されたら、QRコードも更新
watchEffect(() => {
    if (state.day !== undefined && state.period !== undefined) {
        generateQRCode()
    }
})

generateQRCode()
</script>
<style scoped>
.qrcode {
    width: 100%;
    max-width: 360px;
    border-radius: 20px;
}
</style>