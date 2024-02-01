<template>
  <ion-page ref="page">
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
            <IonButtons slot="end">
              
              <IonButton id="open-account-modal">
                <IonIcon :icon="personCircleOutline" slot="icon-only"></IonIcon>
              </IonButton>
              <!--アカウント情報モーダル-->
              <IonModal ref="accountModal" trigger="open-account-modal" :presenting-element="presentingElement">
                <Account :dismiss="state.accountModal.dismiss"></Account>
              </IonModal>

              <IonButton>
                <IonIcon :icon="cogOutline" slot="icon-only"></IonIcon>
              </IonButton>
            </IonButtons>
          </ion-toolbar>
        </ion-header>
        <div class="ion-padding-start ion-padding-end">
          <IonLabel>
            <p><strong>あいうえお</strong> さん、こんにちは。</p>
          </IonLabel>
        </div>
        <!--課題-->
        <IonList inset>
          <IonItem button color="dark" id="open-assignments-modal">
            <IonIcon :icon="documentsOutline" slot="start"></IonIcon>
            <IonLabel>
              <strong>課題</strong>
              <p>
                <IonText color="medium">未了の課題があります</IonText>
              </p>
            </IonLabel>
            <IonBadge color="danger" slot="end">1</IonBadge>
          </IonItem>
        </IonList>
        <!--課題モーダル-->
        <IonModal ref="assignmentsModal" trigger="open-assignments-modal" :presenting-element="presentingElement">
          <Assignments :dismiss="state.assignmentsModal.dismiss"></Assignments>
        </IonModal>
        <!--現在（今後）の授業-->
        <IonList inset v-if="true">
          <IonItem button lines="full">
            <IonLabel>
              <p>
                <IonText color="primary"><strong>15分後に開始</strong></IonText><br>1時限・08:50-10:30
              </p>
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

        <!--曜日別の時間割-->
        <IonListHeader class="ion-padding-bottom">
          <IonLabel>曜日別の時間割</IonLabel>
          <IonButton size="small" class="ion-margin-bottom" id="open-timetable-modal">
            <IonIcon :icon="calendar" slot="start"></IonIcon>
            時間割表を見る
          </IonButton>
          <!--時間割表モーダル-->
          <IonModal ref="timetableModal" trigger="open-timetable-modal" :presenting-element="presentingElement">
            <TimetableModal :dismiss="state.timetableModal.dismiss"></TimetableModal>
          </IonModal>
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
              <p>
                <IonText color="danger">1 件の未了の課題があります</IonText>
              </p>
            </IonLabel>
            <IonBadge color="primary">Now</IonBadge>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>2時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p>
                <IonText color="primary">タップして授業を登録</IonText>
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>3時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p>
                <IonText color="primary">タップして授業を登録</IonText>
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>4時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p>
                <IonText color="primary">タップして授業を登録</IonText>
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>5時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p>
                <IonText color="primary">タップして授業を登録</IonText>
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>6時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p>
                <IonText color="primary">タップして授業を登録</IonText>
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>7時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p>
                <IonText color="primary">タップして授業を登録</IonText>
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>8時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p>
                <IonText color="primary">タップして授業を登録</IonText>
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>9時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p>
                <IonText color="primary">タップして授業を登録</IonText>
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <p>10時限目</p>
              <p>この時限に授業は登録されていません</p>
              <p>
                <IonText color="primary">タップして授業を登録</IonText>
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonGrid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Account from '@/components/modal/account.vue';
import Assignments from '@/components/modal/assignments.vue';
import TimetableModal from '@/components/modal/timetable-modal.vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonLabel, IonSegment, IonSegmentButton, IonList, IonItem, IonText, IonListHeader, IonButton, IonIcon, IonBadge, IonModal, IonButtons, IonCol, IonRow } from '@ionic/vue';
import { useHead } from "@unhead/vue"
import { calendar, calendarOutline, checkmarkCircle, cogOutline, documents, documentsOutline, linkOutline, personCircleOutline, personOutline, tabletLandscape, videocam } from 'ionicons/icons';
import { onMounted, reactive, ref } from 'vue';


const page = ref()
const assignmentsModal = ref()
const accountModal = ref()
const timetableModal = ref()

const presentingElement = ref()

const state = reactive({
  // 課題モーダル
  assignmentsModal: {
    dismiss() {
      assignmentsModal.value.$el.dismiss()
    }
  },
  // アカウント情報モーダル
  accountModal: {
    dismiss() {
      accountModal.value.$el.dismiss()
    }
  },
  // 時間割表モーダル
  timetableModal: {
    dismiss() {
      timetableModal.value.$el.dismiss()
    }
  },
})

onMounted(() => {
  presentingElement.value = page.value.$el
})
</script>
