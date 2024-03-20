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
    <IonGrid class="ion-text-center">
      <IonRow>
        <IonCol></IonCol>
        <IonCol v-for="day in ['日','月','火','水','木','金','土']">{{ day }}</IonCol>
      </IonRow>
      <IonRow v-for="period in [1,2,3,4,5,6,7,8,9,10]">
        <IonCol>{{ period }}</IonCol>
        <IonCol v-for="day in [0,1,2,3,4,5,6]" v-if="state.timetable !== undefined">
          <span v-if="state.timetable[day] && !!state.timetable[day]![period]">{{ state.timetable[day]![period].name }}</span>
          <span v-else>-</span>
        </IonCol>
      </IonRow>
    </IonGrid>
  </ion-content>
</template>
  
<script setup lang="ts">
import { api } from '@/db';
import type { classData } from '@/db'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonButtons, IonButton, IonList, IonItem, IonLabel, IonText, IonRow, IonCol } from '@ionic/vue';
import { reactive } from 'vue';

const props = defineProps<{
  dismiss: Function,
}>()

const state = reactive({
  timetable:<[(classData[] | undefined)?] | undefined> []
})

// 時間割を更新
const updateTimetable = async () => {
  state.timetable = await api.timetable.getClassesTable()
}

setInterval(updateTimetable, 500)
</script>
<style scoped>

</style>