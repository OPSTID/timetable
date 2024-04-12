<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>時間割表</ion-title>
      <IonButtons slot="end">
        <IonButton @click="historyBack"><strong>完了</strong></IonButton>
      </IonButtons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div v-if="!state.isLoaded" class="ion-text-center ion-padding-top ion-margin-top">
      <IonSpinner name="dots" style="width:2em;height:2em;"></IonSpinner>
    </div>
    <IonGrid class="ion-text-center fade-in" v-else>
      <IonRow class="header-row">
        <IonCol></IonCol>
        <IonCol v-for="day in ['日','月','火','水','木','金','土']">{{ day }}</IonCol>
      </IonRow>
      <IonRow v-for="period in [1,2,3,4,5,6,7,8,9,10]">
        <IonCol>{{ period }}</IonCol>
        <IonCol v-for="day in [0,1,2,3,4,5,6]" v-if="state.timetable !== undefined" @click="openClassDetailPage(day, period)">
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonButtons, IonButton, IonList, IonItem, IonLabel, IonText, IonRow, IonCol, IonSpinner } from '@ionic/vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  dismiss: Function,
}>()

const router = useRouter()

const state = reactive({
  timetable:<[(classData[] | undefined)?] | undefined> [],
  isLoaded: false
})

// 時間割を更新
const updateTimetable = async () => {
  state.timetable = await api.timetable.getClassesTable()
  state.isLoaded = true
}

// 授業詳細ページを開く
const openClassDetailPage = (day:number, period:number) => {
  props.dismiss()
  setTimeout(() => router.push(`/member/period/${day}/${period}`), 300)
}

const historyBack = () => history.back()

setInterval(updateTimetable, 500)
</script>
<style scoped>
.header-row {
  background: var(--ion-color-dark-tint);
  color: var(--ion-color-dark-contrast);
  font-weight:bold;
  font-size: 0.8em;
}

ion-col {
  border: 1px solid var(--ion-color-light-shade);
}

ion-row:not(.header-row) ion-col {
  background: var(--ion-color-light);
  font-size:0.7em;
  cursor: pointer;
}

ion-row:not(.header-row) ion-col:hover {
  background: var(--ion-color-light-shade);
}

ion-row:not(.header-row) ion-col:first-child {
  font-weight:bold
}

@keyframes fadeIn {
  from {
    opacity: 0
  }

  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s;
}
</style>