<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>時間割表</ion-title>
      <IonButtons slot="end">
        <IonButton @click="props.dismiss"><strong>完了</strong></IonButton>
      </IonButtons>
    </ion-toolbar>
  </ion-header>
  <ion-content color="light">


  </ion-content>
</template>
  
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonButtons, IonButton, IonList, IonItem, IonLabel, IonText } from '@ionic/vue';
import { useHead } from "@unhead/vue"

const props = defineProps<{
  dismiss: Function
}>()
</script>
  