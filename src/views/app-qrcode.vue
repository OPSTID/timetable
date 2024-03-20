<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton default-href="/member/menu" text="戻る"></IonBackButton>
                </IonButtons>
                <IonTitle>他の人に教える</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light">
            <div class="ion-padding ion-text-center">
                <IonLabel>
                    <p>下のQRコードを他の人に見せてください</p>
                </IonLabel>
            </div>
            <div class="ion-text-center">
                <img src="/img/qrcode_timetable.opstid.com.png" class="qrcode">
            </div>
            <div class="ion-padding ion-text-center">
                <IonLabel>
                    <p>または、以下のURLを共有してください</p>
                    <p>https://timetable.opstid.com</p>
                    <p>
                        <IonButton fill="clear" size="small" @click="copyUrl">
                            <IonIcon :icon="copyOutline" slot="start"></IonIcon>
                            <strong>コピー</strong>
                        </IonButton>
                        <IonButton fill="clear" size="small" @click="share">
                            <IonIcon :icon="shareOutline" slot="start"></IonIcon>
                            <strong>共有</strong>
                        </IonButton>
                    </p>
                    <p class="ion-padding-top"><strong>App Store や Google Play などから<br>アプリをダウンロードする必要はありません</strong></p>
                </IonLabel>
            </div>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTitle, IonToolbar, alertController, toastController } from '@ionic/vue';
import { copyOutline, shareOutline } from 'ionicons/icons';
import { stringifyQuery } from 'vue-router';

// TimetableのURLをコピー
const copyUrl = async () => {
    try {
        navigator.clipboard.writeText("https://timetable.opstid.com")
        const toast = await toastController.create({
            message: "コピーしました",
            color: "dark",
            duration: 1500
        })
        toast.present()
    } catch(e) {
        const toast = await toastController.create({
            message: "エラー: " + String(e),
            color: "danger",
            duration: 5000
        })
        toast.present()
    }
}

const share = async () => {
    if(!!navigator.share){
        navigator.share({
            title: "OPSTID Timetable - 大学生が本気で作った、時間割アプリ。",
            url: "https://timetable.opstid.com"
        })
    } else {
        (await alertController.create({
            header: "エラー",
            message: "このブラウザでは、この機能を利用できません",
            buttons:["OK"]
        })).present()
    }
}
</script>
<style scoped>
.qrcode {
    width: 100%;
    max-width: 180px;
    border-radius: 20px;
}
</style>