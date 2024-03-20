<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton default-href="/member/home" text="戻る"></IonBackButton>
                </IonButtons>
                <IonTitle>授業詳細</IonTitle>
                <IonButtons slot="end">
                    <IonButton>編集</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light">
            <IonGrid fixed>
                <!--授業情報があるとき-->
                <div v-if="false">
                    <!--<ClassData></ClassData>-->
                </div>
                <!--授業情報がないとき-->
                <div class="ion-padding ion-margin-top ion-text-center" v-else>
                    <IonIcon :icon="informationCircle" size="large"></IonIcon>
                    <IonLabel>
                        <h2><strong>この時限には授業が登録されていません</strong></h2>
                        <h3>授業がある場合は登録しましょう</h3>
                    </IonLabel>
                    <p>
                        <IonButton>今すぐ授業を登録する</IonButton>
                    </p>
                </div>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import ClassData from '@/components/classData.vue';
import { IonBackButton, IonBadge, IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/vue';
import { albumsOutline, attachOutline, informationCircle, link, linkOutline, locateOutline, person, pin, school, timeOutline, videocam, watchOutline } from 'ionicons/icons';
</script>