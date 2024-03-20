<template>
  <IonPage>
    <ion-header>
      <ion-toolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="/member/home" text="戻る"></IonBackButton>
        </IonButtons>
        <ion-title>設定</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light" ref="page" fullscreen>
      <IonGrid fixed>
        <ion-header collapse="condense" class="ion-padding-top ion-margin-top">
          <ion-toolbar color="transparent">
            <ion-title size="large">
              <IonLabel>
                設定
              </IonLabel>
            </ion-title>
          </ion-toolbar>
        </ion-header>
        <IonListHeader>データ管理</IonListHeader>
        <IonList inset>
          <IonItem button>
            <IonIcon :icon="list" slot="start"></IonIcon>
            <IonLabel>
              <strong>科目一覧</strong>
              <p class="ion-text-wrap">登録した科目を確認できます</p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon :icon="shareOutline" slot="start"></IonIcon>
            <IonLabel>
              <strong>他の端末と共有</strong>
              <p class="ion-text-wrap">現在の時間割・Todoを他の端末と共有できます</p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon :icon="cloudDownloadOutline" slot="start"></IonIcon>
            <IonLabel>
              <strong>バックアップ</strong>
              <p class="ion-text-wrap">現在の時間割のバックアップをダウンロードできます</p>
            </IonLabel>
          </IonItem>
        </IonList>

        <IonList inset>
          <IonItem button>
            <IonIcon :icon="trash" slot="start" color="danger"></IonIcon>
            <IonLabel>
              <strong>
                <IonText color="danger">データを削除（退会）</IonText>
              </strong>
              <p class="ion-text-wrap">このブラウザに保存されたTimetableのすべてのデータを削除して利用を終了します</p>
            </IonLabel>
          </IonItem>
        </IonList>
        <div class="ion-padding">
          <IonLabel class="ion-text-center">
            <p>&copy; 2024-present OPSTID All rights reserved.</p>
          </IonLabel>
        </div>
      </IonGrid>
    </ion-content>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonList, IonLabel, IonItem, IonAvatar, IonButton, IonListHeader, IonIcon, IonText, IonToggle, IonThumbnail, IonModal, IonButtons, IonBackButton, alertController, toastController } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { onMounted, reactive, ref } from 'vue';
import { useHead } from "@unhead/vue"
import { calendar, calendarOutline, cloudDownloadOutline, fileTray, list, pencilOutline, remove, share, shareOutline, trash } from 'ionicons/icons';

import { db } from '@/db';
</script>
