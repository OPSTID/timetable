<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton default-href="/member/home" text="戻る"></IonBackButton>
                </IonButtons>
                <IonTitle>QRコードを読み取る</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light">
            <QrcodeStream @detect="onDetectQrcode" @camera-on="state.isLoading = false" :paused="state.isPaused" v-show="!state.isPaused">
                <div v-if="state.isLoading" class="ion-text-center ion-padding">
                    <IonSpinner></IonSpinner>
                    <IonLabel class="ion-text-wrap">
                        <h3>しばらく経ってもカメラが起動しない場合は、<br>ページを再読込してください</h3>
                        <h3>
                            <IonButton @click="reload" fill="clear">再読み込みする</IonButton>
                        </h3>
                    </IonLabel>
                </div>
            </QrcodeStream>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonLabel, IonPage, IonSpinner, IonTitle, IonToolbar, IonButton, alertController, loadingController, toastController } from "@ionic/vue"
import { QrcodeStream } from "vue-qrcode-reader";
import { reactive } from "vue";
import { decompressFromEncodedURIComponent } from "lz-string";
import { api, classData, db } from "@/db";
import { useRouter } from "vue-router";

declare type partialDetectedBarcode = {
    rawValue: string
}

const router = useRouter()

const state = reactive({
    isLoading: true,
    isPaused: false
})

const reload = () => location.reload()

const onDetectQrcode = async (detectedCodes: partialDetectedBarcode[]) => {
    try {
        state.isPaused = true
        const decodedData = decompressFromEncodedURIComponent(detectedCodes[0].rawValue)
        const decodedClassData: classData = JSON.parse(decodedData)

        // DBに保存
        // 現在の時間割のIDを取得
        const timetableIdResult = await db.kvs.get("currentTimetableId")
        if (!!timetableIdResult) {
            const timetableId = <number>timetableIdResult.value

            // 読み込んだ授業を保存するメソッド
            const save = async () => {
                const loading = await loadingController.create({
                    message: "保存しています..."
                })
                await loading.present()
                await db.classes.put({
                    timetableId: timetableId,
                    name: decodedClassData.name,
                    startTime: decodedClassData.startTime,
                    endTime: decodedClassData.endTime,
                    room: decodedClassData.room,
                    teacher: decodedClassData.teacher,
                    day: decodedClassData.day,
                    period: decodedClassData.period,
                    links: decodedClassData.links,
                    lastUpdated: new Date().toISOString()
                })
                await loading.dismiss()

                const toast = await toastController.create({
                    message: `「${decodedClassData.name}」を${['日', '月', '火', '水', '木', '金', '土'][decodedClassData.day]} ${decodedClassData.period} 時限に登録しました。`,
                    duration: 2000
                })

                toast.present()
            }

            // 時間割表を取得
            const currentClassesTable = await api.timetable.getClassesTable()
            if (currentClassesTable) {
                // QRコードから読み込んだ授業と同じ曜日・時限に授業がある場合は削除を依頼
                if (currentClassesTable[decodedClassData.day]![decodedClassData.period]) {
                    // カメラを一時停止
                    state.isPaused = true
                    // 確認する
                    const alert = await alertController.create({
                        header: "エラー",
                        message: "読み込んだ授業と同じ曜日・時限に授業が登録されています。QRコードの授業を登録するには、授業ページに移動して現在登録されている授業を手動で削除するか、別の時間割を選択してください。",
                        backdropDismiss: false,
                        buttons: [  
                            {
                                text: '授業ページに移動',
                                handler(){
                                    router.replace(`/member/period/${decodedClassData.day}/${decodedClassData.period}`)
                                }
                            },
                            {
                                text: '時間割を選択',
                                handler(){
                                    router.replace('/member/change-timetable')
                                }
                            },
                                                 
                            {
                                text: 'キャンセル',
                                handler() {
                                    // カメラを再開
                                    state.isPaused = false
                                }
                            },
                        ]
                    })
                    alert.present()
                }
                // 同じ曜日・時限に授業がない場合は保存する
                else {
                    state.isPaused = true
                    await save()
                    state.isPaused = false
                }

            }
        }




    } catch (e) {
        state.isPaused = true
        const toast = await toastController.create({
            message: "解析中にエラーが発生しました。QRコードが正しいか確認してください。",
            color: "danger",
            duration: 2000
        })
        toast.present()
        state.isPaused = false
    }
}
</script>