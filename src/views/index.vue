<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Timetable</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" color="light">
      <IonGrid fixed>
        <ion-header collapse="condense">
          <ion-toolbar color="transparent">
            <ion-title size="large">
              <IonLabel>
                <span class="timetable-gradient-text">Timetable</span>
              </IonLabel>
            </ion-title>
          </ion-toolbar>
        </ion-header>
        <IonListHeader class="ion-padding-bottom">
          <IonLabel>曜日別の時間割</IonLabel>
          <IonButton size="small">
            <IonIcon :icon="calendar" slot="start"></IonIcon>
            時間割表を見る
          </IonButton>
        </IonListHeader>
        <IonSegment scrollable>
          <IonSegmentButton>日</IonSegmentButton>
          <IonSegmentButton>月</IonSegmentButton>
          <IonSegmentButton>火</IonSegmentButton>
          <IonSegmentButton>水</IonSegmentButton>
          <IonSegmentButton>木</IonSegmentButton>
          <IonSegmentButton>金</IonSegmentButton>
          <IonSegmentButton>土</IonSegmentButton>
        </IonSegment>
        <IonList inset>
          <IonItem button>
            <IonLabel>
              <p>1時限目・08:50-10:30</p>
              <h2><strong>教養基礎Ⅰ</strong></h2>
              <p>本123・佐藤</p>
              <p><IonText color="danger">1 件の未了の課題があります</IonText></p>
            </IonLabel>
            <IonBadge color="primary">Now</IonBadge>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>2時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p><IonText color="primary">タップして授業を登録</IonText></p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>3時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p><IonText color="primary">タップして授業を登録</IonText></p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>4時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p><IonText color="primary">タップして授業を登録</IonText></p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>5時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p><IonText color="primary">タップして授業を登録</IonText></p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>6時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p><IonText color="primary">タップして授業を登録</IonText></p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>7時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p><IonText color="primary">タップして授業を登録</IonText></p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>8時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p><IonText color="primary">タップして授業を登録</IonText></p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>9時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p><IonText color="primary">タップして授業を登録</IonText></p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>10時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p><IonText color="primary">タップして授業を登録</IonText></p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonGrid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonLabel, IonSegment, IonSegmentButton, IonList, IonItem, IonText, IonListHeader, IonButton, IonIcon, IonBadge } from '@ionic/vue';
import { useHead } from "@unhead/vue"
import { calendar, calendarOutline, tabletLandscape } from 'ionicons/icons';

</script>
