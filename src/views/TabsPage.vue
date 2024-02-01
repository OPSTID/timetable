<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet :animated="false"></ion-router-outlet>
      <ion-tab-bar slot="bottom" translucent>

        <ion-tab-button tab="home" href="/home">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
          <ion-label>ホーム</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="timetable" href="/timetable">
          <ion-icon aria-hidden="true" :icon="listOutline" />
          <ion-label>時間割</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="assignments" href="/assignments">
          <ion-icon aria-hidden="true" :icon="documentsOutline" />
          <ion-label>課題</ion-label>
          <IonBadge color="danger">1</IonBadge>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/settings">
          <ion-icon aria-hidden="true" :icon="cogOutline" />
          <ion-label>設定</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonBadge } from '@ionic/vue';
import { listOutline, documentsOutline, cogOutline, homeOutline   } from 'ionicons/icons';
</script>
