<template>
  <ion-page ref="page">
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" color="light">
      <IonGrid fixed>
        <ion-header collapse="condense">
          <ion-toolbar color="transparent">
            <ion-title size="large">
              <span class="timetable-gradient-text">Settings</span>
            </ion-title>
          </ion-toolbar>
        </ion-header>
        <IonList inset lines="full">
          <IonItem button id="open-account-modal-settingpage">
            <IonAvatar slot="start">
              <img src="https://api.dicebear.com/7.x/thumbs/svg?seed=Tinkerbell">
            </IonAvatar>
            <IonLabel>
              <h2><strong>あいうえお</strong></h2>
              <p>アカウント設定を開く</p>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonModal ref="modal" trigger="open-account-modal-settingpage" :presenting-element="state.accountModal.presentingElement">
          <Account :dismiss="state.accountModal.dismiss"></Account>
        </IonModal>
        <IonListHeader>
          <IonLabel>
            このアプリについて
          </IonLabel>
        </IonListHeader>
        <IonList inset>
          <IonItem>
            <IonThumbnail slot="start">
              <img src="/img/icon.svg" />
            </IonThumbnail>
            <IonLabel>
              <h2>
                <span class="timetable-gradient-text">
                  <strong style="font-weight:900">OPSTID Timetable</strong>
                </span>
              </h2>
              <p class="ion-text-wrap">大学生が作った、学校に通う全ての人へ贈る時間割アプリ。</p>
              <p>v.0.1 (beta)</p>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList inset lines="none">
          <IonItem button>
            <IonLabel>
              <IonText color="primary">メンテナンス情報</IonText>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList inset>
          <IonItem>
            <IonLabel>
              <p class="ion-text-wrap">本アプリケーションでは、LINEヤフー株式会社及び、Fontworks、Fontrix、LINE CREATIVE CENTERが制作した、<strong>LINE Seed JP</strong>
                フォントを使用しています。</p>
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
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonList, IonLabel, IonItem, IonAvatar, IonButton, IonListHeader, IonIcon, IonText, IonToggle, IonThumbnail, IonModal } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { onMounted, reactive, ref } from 'vue';
import { useHead } from "@unhead/vue"
import Account from '@/components/modal/account.vue';

const page = ref()
const modal = ref()
const state = reactive({
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
