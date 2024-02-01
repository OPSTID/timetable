<template>
    <IonPage ref="page">
        <IonHeader translucent>
            <IonToolbar>
                <IonTitle>Home</IonTitle>
                <IonButtons slot="end">
                    <IonButton id="open-maintainance-alert">
                        <IonIcon slot="end" :icon="alertCircle" color="danger"></IonIcon>
                        <IonText color="danger" class="ion-hide-sm-down">メンテ情報</IonText>
                    </IonButton>
                    <IonButton id="open-account-modal-homepage">
                        <IonIcon slot="icon-only" :icon="personCircleOutline"></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonAlert trigger="open-maintainance-alert" header="メンテナンスのお知らせ"
                    message="2月25日 午後11時から午後12時にかけて、定期メンテナンスを行います。メンテナンス中はアクセスできませんのでご注意ください。"
                    :buttons="['OK']"></IonAlert>
                <IonModal ref="modal" trigger="open-account-modal-homepage" :presenting-element="state.accountModal.presentingElement">
                    <Account :dismiss="state.accountModal.dismiss"></Account>
                </IonModal>
            </IonToolbar>
        </IonHeader>
        <IonContent :fullscreen="true" color="light">
            <IonGrid fixed>
                <IonHeader collapse="condense">
                    <IonToolbar color="transparent">
                        <IonTitle size="large">
                            <IonLabel>
                                <span class="timetable-gradient-text">Home</span>
                            </IonLabel>
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonListHeader>
                    <IonLabel>
                        現在の授業
                    </IonLabel>
                    <IonButton size="small" class="ion-margin-bottom">
                        非表示にする
                    </IonButton>
                </IonListHeader>
                <IonList inset>
                    <IonItem button lines="full">
                        <IonLabel>
                            <p>08:50-10:30</p>
                            <h1><strong>教養基礎Ⅰ</strong></h1>
                            <p>オンライン・佐藤</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem button>
                        <IonIcon :icon="videocam" slot="start" color="primary"></IonIcon>
                        <IonLabel>
                            <IonText color="primary"><strong>オンライン授業に参加</strong></IonText>
                        </IonLabel>
                    </IonItem>
                    <IonItem button>
                        <IonIcon :icon="linkOutline" slot="start"></IonIcon>
                        <IonLabel class="ion-text-nowrap">
                            講義のホームページ
                            <p>https://example.com/hello-world/hello-world/</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem button>
                        <IonIcon :icon="linkOutline" slot="start"></IonIcon>
                        <IonLabel>
                            講義資料
                        </IonLabel>
                    </IonItem>
                </IonList>
                <IonList inset v-if="false">
                    <IonItem>
                        <IonIcon :icon="checkmarkCircle" slot="start" color="primary"></IonIcon>
                        <IonLabel>
                            <p>今日の授業はすべて終了しました。<br>お疲れ様でした。</p>
                        </IonLabel>
                    </IonItem>
                </IonList>
                <IonListHeader>
                    <IonLabel>
                        課題 <IonBadge color="danger">1</IonBadge>
                        <p>期限が最も近い課題を最大3件を表示します</p>
                    </IonLabel>
                </IonListHeader>
                <IonList inset>
                    <IonItem button>
                        <IonIcon :icon="documentsOutline" slot="start"></IonIcon>
                        <IonLabel>
                            <h2><strong>期末レポート</strong></h2>
                            <p>教養基礎Ⅰ<br>2024/01/25 15:00 まで</p>
                            <p>
                                <IonText color="danger">あと <strong>1</strong> 日で期限</IonText>
                            </p>
                        </IonLabel>
                    </IonItem>
                </IonList>
                <IonList inset>
                    <IonItem button>
                        <strong>すべての課題を確認する</strong>
                        <IonIcon :icon="alertCircle" color="danger" slot="end"></IonIcon>
                    </IonItem>
                </IonList>
                <div class="ion-padding ion-text-center" style="position:relative">
                    <div
                        style="background:rgb(211, 144, 0);color:#fff;padding:2px 5px;font-size:0.8em;border-radius:5px;position:absolute;right:30px">
                        Ad</div>
                    <img src="https://placehold.jp/400x100.png">
                </div>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>
  
<script setup lang="ts">
import Account from '@/components/modal/account.vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonListHeader, IonLabel, IonList, IonItem, IonButton, IonIcon, IonButtons, IonText, IonBadge, IonAlert, IonModal } from '@ionic/vue';
import { alertCircle, checkmarkCircle, chevronForward, documentsOutline, linkOutline, personCircleOutline, school, videocam } from 'ionicons/icons';
import { onMounted, reactive, ref } from 'vue';
import { useHead } from "@unhead/vue"

const page = ref()
const modal = ref()

const state = reactive({
    // アカウント情報モーダル
    accountModal:{
        presentingElement:  null,
        // モーダルを閉じる
        dismiss(){
            const modalEl = modal.value.$el
            modalEl.dismiss!()
        }
    }
})

onMounted(() => {
    state.accountModal.presentingElement = page.value.$el
})
</script>
  