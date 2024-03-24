<template>
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Timetable</ion-title>
      </ion-toolbar>
    </ion-header>
    <!--更新中は背景色をデフォルトにする-->
    <ion-content :fullscreen="true" color="light" class="home">
      <ion-refresher slot="fixed" @ionRefresh="refreshPage($event)" style="z-index:1000;" mode="md">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <IonGrid fixed>
        <ion-header collapse="condense">
          <ion-toolbar color="transparent">
            <ion-title size="large">
              <IonLabel>
                <span class="timetable-gradient-text">Timetable</span>
              </IonLabel>
            </ion-title>
            <!--時間割選択ボタン-->
            <IonButtons slot="end">
              <IonButton color="dark" fill="solid" size="small" router-link="/member/change-timetable">
                <IonLabel>
                  時間割を選択
                </IonLabel>
                <IonIcon :icon="chevronForward" slot="end" size="small"></IonIcon>
              </IonButton>
            </IonButtons>
          </ion-toolbar>
        </ion-header>
        <!--現在（今後）の授業などを表示するNow機能-->
        <div v-if="state.isActiveNow">
          <IonListHeader>
            <IonLabel style="margin-top:0px;">
              Now
              <!--点滅するドット（次の授業までの時間で色分け）-->
              <span v-if="state.currentClass.isLoaded">
                <!--次の授業まで、10分以上のとき-->
                <div class="now-dot" v-if="!state.currentClass.isNow || state.currentClass.startIn > 10"
                  style="background-color:var(--ion-color-primary)"></div>
                <!--次の授業まで10分以下のとき-->
                <div class="now-dot" v-else-if="state.currentClass.startIn > 0"
                  style="background-color:var(--ion-color-warning)"></div>
                <!--授業中など-->
                <div class="now-dot" v-else></div>
              </span>

              <p>授業情報・課題などを確認しよう</p>
            </IonLabel>
            <IonButton size="small" class="ion-margin-bottom" v-if="state.isActiveNow"
              @click="state.isActiveNow = false">
              非表示にする</IonButton>
          </IonListHeader>
          <!--読み込み中-->
          <div v-if="!state.currentClass.isLoaded">
            <IonList inset>
              <IonItem>
                <IonLabel>
                  <p>
                    <IonSkeletonText style="width:8em;" animated />
                  </p>
                  <h1>
                    <IonSkeletonText style="width:10em;height:1em;" animated />
                  </h1>
                  <p>
                    <IonSkeletonText style="width:6em;" animated />
                  </p>
                </IonLabel>
              </IonItem>
            </IonList>
          </div>
          <!--授業が一つも登録されていないとき-->
          <div v-else-if="state.timetable.flat().length === 0">
            <IonList inset>
              <IonItem>
                <IonLabel class="ion-text-wrap">
                  <h2><strong>授業を登録して使ってみよう</strong></h2>
                  <p>{{ state.nickname }}さん、Timetable アプリをご利用いただきありがとうございます！<br>下の「曜日別の時間割」で、<IonText color="primary"><strong>授業のある曜日</strong></IonText>を選んで、<IonText color="primary"><strong>時限をタップ</strong></IonText>すると授業を登録できます↓</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </div>
          <!-- 授業があるとき -->
          <IonList inset v-else-if="!!state.currentClass.classData">
            <IonItem button lines="full"
              :router-link="`/member/period/${state.currentClass.classData.day}/${state.currentClass.classData.period}`">
              <IonLabel>
                <h3>
                  <strong>
                    <IonText color="danger" v-if="state.currentClass.isNow">授業中</IonText>
                    <IonText color="primary" v-else>{{ state.currentClass.startIn }} 分後に開始</IonText>
                  </strong>
                </h3>
                <p>
                  <span>{{
      state.currentClass.classData?.period }}時限・{{ state.currentClass.classData?.startTime
                    }}-{{ state.currentClass.classData?.endTime }}</span>
                </p>
                <h1><strong>{{ state.currentClass.classData?.name }}</strong></h1>
                <p>{{ state.currentClass.classData?.room }}
                  <!--教室・講師がどちらも指定されているときだけ、区切りとして中点を表示-->
                  <span v-if="!!state.currentClass.classData?.room && !!state.currentClass.classData?.teacher">・</span>
                  {{ state.currentClass.classData?.teacher }}
                </p>
              </IonLabel>
            </IonItem>
            <!--リンク-->
            <linkItem button v-for="link in state.currentClass.classData?.links" :title="link.name" :url="link.url"
              clickable />
          </IonList>

          <!--授業がないとき-->
          <IonList inset v-else>
            <IonItem>
              <IonIcon :icon="checkmarkCircle" slot="start" color="primary"></IonIcon>
              <IonLabel>
                <h2 class="ion-text-wrap"><strong>お疲れ様です🍵</strong></h2>
                <p class="ion-text-wrap">{{ state.nickname }}さん、今日の授業はすべて終了しました👍️</p>
              </IonLabel>
            </IonItem>
            <!--Memo へのリンク-->
            <IonItem button router-link="/member/memo">
              <IonIcon :icon="documentTextOutline" slot="start"></IonIcon>
              <IonLabel>
                <strong>Memo</strong>
                <p>
                  <IonText color="medium" class="ion-text-wrap">Memo を使って、課題などを管理しよう</IonText>
                </p>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>
        <!--非表示のとき-->
        <div v-else>
          <IonList inset>
            <IonItem>
              <IonIcon :icon="eyeOff" slot="start" size="small" color="medium"></IonIcon>
              <IonLabel class="ion-text-wrap">
                <p><strong>Now</strong> は非表示になっています</p>
              </IonLabel>

              <IonButton size="small" fill="clear" v-if="!state.isActiveNow" @click="state.isActiveNow = true">
                表示する</IonButton>
            </IonItem>
          </IonList>
        </div>

        <!--曜日別の時間割-->
        <div class="timetable-header">
          <IonListHeader class="ion-padding-bottom">
            <IonLabel style="margin-top:10px;">
              曜日別の時間割
              <p>{{ state.timetableName }} <router-link to="/member/change-timetable">変更</router-link>
              </p>
            </IonLabel>
            <IonButton size="small" :fill="state.todayDay === state.selectedDay ? 'solid' : 'outline'"
              @click="state.selectedDay = state.todayDay" class="ion-margin-bottom">
              今日
            </IonButton>
            <IonButton size="small" class="ion-margin-bottom" id="open-timetable-modal">
              <IonIcon :icon="calendar" slot="start"></IonIcon>
              時間割表
            </IonButton>
            <!--時間割表モーダル-->
            <IonModal ref="timetableModal" trigger="open-timetable-modal" :presenting-element="presentingElement">
              <TimetableModal :dismiss="modalState.timetableModal.dismiss"></TimetableModal>
            </IonModal>
          </IonListHeader>

          <!--曜日の選択-->
          <IonSegment scrollable v-model="state.selectedDay">
            <IonSegmentButton :value="0">日</IonSegmentButton>
            <IonSegmentButton :value="1">月</IonSegmentButton>
            <IonSegmentButton :value="2">火</IonSegmentButton>
            <IonSegmentButton :value="3">水</IonSegmentButton>
            <IonSegmentButton :value="4">木</IonSegmentButton>
            <IonSegmentButton :value="5">金</IonSegmentButton>
            <IonSegmentButton :value="6">土</IonSegmentButton>
          </IonSegment>
          <div class="ion-padding-top"></div>
        </div>
        <!--曜日ごとの時間割リスト-->
        <!--読み込み中-->
        <div v-if="state.timetable.length === 0">
          <IonList inset lines="full" class="fade-in" style="pointer-events:none">
            <IonItem v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" button>
              <IonLabel>
                <p>
                  <IonSkeletonText style="width:5em" animated />
                </p>
                <h2>
                  <IonSkeletonText style="width:10em;height:1em" animated />
                </h2>
                <p>
                  <IonSkeletonText style="width:7em" animated />
                </p>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>
        <div v-for="day in [0, 1, 2, 3, 4, 5, 6]">
          <!--曜日別のリスト-->
          <IonList inset v-show="state.selectedDay === day" class="fade-in">
            <!--科目-->
            <IonItem button v-for="period in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              :router-link="`/member/period/${day}/${period}`">
              <IonLabel v-if="state.timetable[day] && !!state.timetable[day]![period]">
                <!--時限、授業時間-->
                <p>{{ period }}時限目・{{ state.timetable[day]![period].startTime }}-{{
      state.timetable[day]![period].endTime }}</p>
                <!--科目名-->
                <h2><strong>{{ state.timetable[day]![period].name }}</strong></h2>

                <p>
                  <!--教室-->
                  <span>{{ state.timetable[day]![period].room }}</span>
                  <!--教室と講師名がどちらも設定されている場合は中点を表示-->
                  <span v-if="!!state.timetable[day]![period].room && !!state.timetable[day]![period].teacher">・</span>
                  <!--講師名-->
                  <span>{{ state.timetable[day]![period].teacher }}</span>
                </p>
              </IonLabel>
              <IonLabel v-else>
                <p>{{ period }} 時限目</p>
                <p>この時限に授業は登録されていません</p>
                <p>
                  <IonText color="primary">タップして授業を登録</IonText>
                </p>
              </IonLabel>
              <!--現在の授業のときは、Nowを表示-->
              <IonBadge color="danger"
                v-if="!!state.currentClass.classData && day === state.currentClass.classData.day && period === state.currentClass.classData.period">
                Now</IonBadge>
            </IonItem>
          </IonList>
        </div>

      </IonGrid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Assignments from '@/components/modal/assignments.vue';
import TimetableModal from '@/components/modal/timetable-modal.vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonLabel, IonSegment, IonSegmentButton, IonList, IonItem, IonText, IonListHeader, IonButton, IonIcon, IonBadge, IonModal, IonButtons, IonCol, IonRow, loadingController, toastController, IonRefresher, IonRefresherContent, IonPopover, IonActionSheet, IonSpinner, IonSkeletonText, IonChip } from '@ionic/vue';
import { useHead } from "@unhead/vue"
import { addCircle, albumsOutline, alertCircle, arrowDown, calendar, calendarOutline, caretDown, checkmarkCircle, chevronDown, chevronForward, cogOutline, documentTextOutline, documents, documentsOutline, eyeOff, hourglass, hourglassOutline, linkOutline, menu, personCircleOutline, personOutline, reload, reloadCircle, rocket, shareOutline, tabletLandscape, time, videocam } from 'ionicons/icons';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { routerKey, useRouter } from 'vue-router';

import { api, classData, db } from '@/db';
import linkItem from '@/components/linkItem.vue';

const router = useRouter()

const page = ref()
const timetableModal = ref()
const menuPopover = ref()

const presentingElement = ref()

const state = reactive({
  // 引っ張って更新の実行中かどうか
  isRefreshing: false,
  // Now を表示するかどうか
  isActiveNow: true,
  // ニックネーム
  nickname: "",

  // 選択されている曜日
  selectedDay: new Date().getDay(),
  // 今日の曜日
  todayDay: new Date().getDay(),
  // 現在または今後の授業 (null のときは授業なし)
  currentClass: {
    classData: <classData | null>{},
    isNow: false, // 現在進行中かどうか
    startIn: 0, // 何分後に授業が開始されるか
    isLoaded: false // 読み込み済みかどうか
  },
  // 時間割データ
  timetable: <(classData[] | undefined)[]>[],
  // 時間割の名前
  timetableName: ""
})

// 定期的な更新
const defaultInterval = setInterval(() => {
  // ニックネーム
  // データベースから取得
  db.kvs.get("nickname").then(result => {
    if (!!result) {
      state.nickname = <string>result.value
    } else {
      state.nickname = "（未設定）"
    }
  })

  // 現在の授業
  api.timetable.getCurrentClass().then(currentClassData => {
    if (!!currentClassData && currentClassData.classData) {
      // 現在の授業があるときは反映
      state.currentClass.classData = currentClassData.classData
      state.currentClass.isNow = currentClassData.isNow
      state.currentClass.startIn = currentClassData.startIn

    } else {
      // ないときは null
      state.currentClass.classData = null
    }
    state.currentClass.isLoaded = true
  })

  // 時間割
  api.timetable.getClassesTable().then(classesTable => {
    if (!!classesTable) {
      state.timetable = classesTable
    }
  })

  // 時間割の名前を取得
  db.kvs.get("currentTimetableId").then(result => {
    if (!!result) {
      const timetableId = <number>result.value
      // 時間割の名前を取得
      db.timetables.get(timetableId).then(result => {
        if (!!result) {
          state.timetableName = <string>result.name
        }
      })
    }
  })

  // 今日の曜日
  state.todayDay = new Date().getDay()
}, 600)


const modalState = reactive({
  // 時間割表モーダル
  timetableModal: {
    dismiss() {
      timetableModal.value.$el.dismiss()
    }
  },
  settingsPopOver: {
    dismiss() {
      menuPopover.value.$el.dismiss()
    }
  }
})

// 時間割の読み込み
const updateTimetable = () => {
  state.timetable = []
  setTimeout(async () => {
    const classesTable = await api.timetable.getClassesTable()
    classesTable?.forEach(dayList => {
      if (!!dayList) {
        state.timetable.push(dayList)
      } else {
        state.timetable.push([])
      }
    })
  }, 500)
}

updateTimetable()

onMounted(async () => {
  presentingElement.value = page.value.$el
})

onUnmounted(() => {
  clearInterval(defaultInterval)
})

// 引っ張って更新
const refreshPage = async (event: CustomEvent) => {
  state.isRefreshing = true

  // 時間割を更新
  await updateTimetable()

  setTimeout(() => {
    // @ts-ignore
    event.target.complete!()
    state.isRefreshing = false
  }, 800)
}
</script>
<style scoped>
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

@keyframes blink {
  0% {
    opacity: 0
  }

  50% {
    opacity: 1
  }

  100% {
    opacity: 0
  }
}

.now-dot {
  display: inline-block;
  width: 0.5em;
  height: 0.5em;
  background-color: var(--ion-color-danger);
  border-radius: 1em;
  animation: blink 3s infinite
}

.timetable-header {
  position: sticky;
  top: 0;
  z-index: 500;
  background-color: var(--ion-color-light);
}
</style>
