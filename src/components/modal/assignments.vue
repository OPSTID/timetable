<template>
  <ion-header>
    <ion-toolbar>
      <IonButtons slot="start">
        <IonButton><strong>課題を追加</strong></IonButton>
      </IonButtons>
      <ion-title>課題一覧</ion-title>
      <IonButtons slot="end">
        <IonButton @click="props.dismiss"><strong>完了</strong></IonButton>
      </IonButtons>
    </ion-toolbar>
  </ion-header>
  <ion-content color="light">
    <div class="ion-padding">
      <IonSegment>
        <IonSegmentButton>
          <IonText color="danger"><strong>1 件の未完了</strong></IonText>
        </IonSegmentButton>
        <IonSegmentButton>0 件の完了済み</IonSegmentButton>
      </IonSegment>
    </div>
    <IonList inset>
      <IonItem button>
        <IonLabel>
          <h2><strong>教養基礎Ⅰ</strong></h2>
          <h3>期末レポート</h3>
          <p>
            <IonText color="danger"><strong>明日まで</strong></IonText>
            ・2024年2月10日期限
          </p>
        </IonLabel>
      </IonItem>
    </IonList>
  </ion-content>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonButtons, IonButton, IonList, IonItem, IonLabel, IonText, IonSegment, IonSegmentButton, IonBadge } from '@ionic/vue';
import { useHead } from "@unhead/vue"

const props = defineProps<{
  dismiss: Function
}>()
</script>
