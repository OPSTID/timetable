<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar>
        <IonTitle>メニュー</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent color="light" class="menu" fullscreen>
      <IonGrid fixed>
        <IonList inset>
          <IonItem>
            <IonLabel class="ion-text-center">
              <h2>
                <IonIcon :icon="personCircle" size="large"></IonIcon>
              </h2>
              <h1>
                <strong
                  class="timetable-gradient-text"
                  style="font-weight: 900"
                  >{{ state.nickname }}</strong
                >
              </h1>
              <p>
                <a
                  href="javascript:void(0)"
                  @click="changeNickname"
                  style="font-size: 0.9em"
                  >ニックネームを変更</a
                >
              </p>
              <p>
                <IonIcon :icon="calendarOutline"></IonIcon>
                {{ state.initedDate.year }}年{{ state.initedDate.month }}月{{
                  state.initedDate.date
                }}日 から利用中
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList inset>
          <IonItem button router-link="/member/change-timetable">
            <IonIcon :icon="albumsOutline" slot="start"></IonIcon>
            <IonLabel>
              時間割の選択
              <p v-if="state.currentTimetableName">
                {{ state.currentTimetableName }}
              </p>
              <p v-else>
                <IonSpinner
                  name="dots"
                  style="width: 1em; height: 1em"
                ></IonSpinner>
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button router-link="/member/change-default-period-time">
            <IonIcon :icon="timeOutline" slot="start"></IonIcon>
            <IonLabel>
              時限の時間設定
              <p class="ion-text-wrap">
                各時限の標準開始時間・終了時間を設定できます
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button router-link="/app-qrcode">
            <IonIcon :icon="shareOutline" slot="start"></IonIcon>
            <IonLabel>
              このアプリを他の人に教える
              <p>友だちと一緒にTimetableを使おう。</p>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonListHeader>
          <IonLabel> このアプリについて </IonLabel>
        </IonListHeader>
        <IonList inset lines="full">
          <!--開発者ツールを有効にするには、この項目を10回タップ-->
          <IonItem @click="state.developerToolsUnlocker.countUp">
            <IonThumbnail slot="start">
              <img src="/img/icon.svg" />
            </IonThumbnail>
            <IonLabel>
              <h2>
                <span class="timetable-gradient-text">
                  <strong style="font-weight: 900">OPSTID Timetable</strong>
                </span>
              </h2>
              <p class="ion-text-wrap">大学生が本気で作った、時間割アプリ。</p>
              <p>&copy; 2024-present OPSTID</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>バージョン</IonLabel>
            <IonLabel slot="end">20240516.0</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>最終チェック日時</IonLabel>
            <IonLabel slot="end">{{ state.lastUpdateCheckDate }}</IonLabel>
          </IonItem>
          <IonItem button @click="forceUpdate">
            <IonLabel color="ion-text-wrap">
              <IonText color="primary">強制アップデート</IonText>
              <p>
                ブラウザに保存された、本アプリのキャッシュを削除して新しいバージョンをダウンロードします
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList inset lines="full">
          <IonItem button router-link="/info/release-notes">
            <IonLabel>
              <IonText color="primary">リリースノート</IonText>
              <p>アップデートで変更した内容を確認できます</p>
            </IonLabel>
          </IonItem>
          <IonItem href="https://x.com/OPSTIDTimetable" target="_blank">
            <IonLabel>
              <IonText color="primary">X (旧 Twitter) アカウント</IonText>
              <p>お問い合わせもこちら</p>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList inset lines="full">
          <IonItem button router-link="/info/terms">
            <IonText color="primary">利用規約・プライバシーポリシー</IonText>
          </IonItem>
        </IonList>
        <IonList inset lines="full">
          <IonItem button router-link="/info/maintainance-info">
            <IonLabel>
              <IonText color="primary">メンテナンス情報</IonText>
            </IonLabel>
          </IonItem>
          <IonItem button router-link="/info/osl">
            <IonLabel>
              <IonText color="primary">オープンソースライセンス</IonText>
            </IonLabel>
          </IonItem>
          <IonItem button href="/lp">
            <IonLabel>
              <IonText color="primary">ホームページを開く</IonText>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList inset>
          <IonItem>
            <IonLabel>
              <p class="ion-text-wrap">
                本アプリケーションでは、LINEヤフー株式会社及び、Fontworks、Fontrix、LINE
                CREATIVE CENTERが制作した、<a
                  href="https://seed.line.me/index_jp.html"
                  target="_blank"
                  ><strong>LINE Seed JP</strong></a
                >
                フォントをOFLライセンスのもとに使用しています。
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList inset v-if="state.isDevToolsEnabled">
          <IonItem button router-link="/dev-tools" color="dark">
            <IonIcon :icon="codeOutline" slot="start"></IonIcon>
            <IonLabel> 開発者ツール </IonLabel>
          </IonItem>
        </IonList>
      </IonGrid>
    </IonContent>
  </IonPage>
</template>
<script setup lang="ts">
import {
  IonAvatar,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSpinner,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  alertController,
  toastController,
} from "@ionic/vue";
import {
  albumsOutline,
  timeOutline,
  calendarOutline,
  codeOutline,
  cogOutline,
  person,
  personCircle,
  shareOutline,
} from "ionicons/icons";
import { onMounted, reactive } from "vue";

import { db } from "@/db";
import autoUpdate from "@/lib/autoUpdate";

const state = reactive({
  // ニックネーム
  nickname: "",
  // 初期設定日時
  initedDate: {
    year: 0,
    month: 0,
    date: 0,
  },

  // 最終更新チェック日時
  lastUpdateCheckDate:
    localStorage.getItem("timetable.opstid.com:lastUpdateDate") || "不明",

  // 現在の時間割の名前
  currentTimetableName: "",

  // 開発者ツールが有効かどうか
  isDevToolsEnabled: false,

  // 開発者ツールを有効にする
  developerToolsUnlocker: {
    count: 0,
    async countUp() {
      state.developerToolsUnlocker.count++;
      // すでに有効になっているとき
      const result = await db.kvs.get("isDevtoolsEnabled");
      if (!!result && result.value === true) {
        const toast = await toastController.create({
          message: "開発者ツールはすでに有効になっています",
          color: "dark",
          duration: 1500,
        });
        toast.present();
      }

      // 4回目のタップのとき
      else if (state.developerToolsUnlocker.count % 10 === 4) {
        const toast = await toastController.create({
          message: "開発者ツールを有効にするには、あと数回タップします",
          color: "dark",
          duration: 1500,
        });
        toast.present();
      }
      // 10回目のタップのとき
      else if (state.developerToolsUnlocker.count % 10 === 0) {
        // アンロックしたことを保存
        db.kvs.put({
          key: "isDevtoolsEnabled",
          value: true,
        });

        const toast = await toastController.create({
          message: "開発者ツールが有効になりました",
          color: "dark",
          duration: 2000,
        });
        toast.present();
      }
    },
  },
});

// 開発者ツールが有効かどうか確認
setInterval(() => {
  db.kvs.get("isDevtoolsEnabled").then((result) => {
    if (!!result) {
      state.isDevToolsEnabled = <boolean>result.value;
    }
  });
}, 1000);

const updateUserInfo = async () => {
  // ニックネームを取得
  const nicknameResult = await db.kvs.get("nickname");
  if (!!nicknameResult) {
    state.nickname = <string>nicknameResult.value;
  } else {
    state.nickname = "（未設定）";
  }

  // 初期設定日時を取得
  const initedDateResult = await db.kvs.get("inited.date");
  if (!!initedDateResult) {
    const initedDate = new Date(<string>initedDateResult.value);
    state.initedDate.year = initedDate.getFullYear();
    state.initedDate.month = initedDate.getMonth() + 1;
    state.initedDate.date = initedDate.getDate();
  }
};

updateUserInfo();

// 現在の時間割の名前の取得
const getCurrentTimetableName = async () => {
  // 現在の時間割のIDを取得
  const result = await db.kvs.get("currentTimetableId");
  if (!!result) {
    // 取得したIDで時間割を検索
    const timetableResult = await db.timetables.get(<number>result.value);
    if (!!timetableResult) {
      // 名前を反映
      state.currentTimetableName = timetableResult.name;
    }
  }
};

setInterval(getCurrentTimetableName, 500);

// ニックネームの変更ダイアログ
const changeNickname = async () => {
  const alert = await alertController.create({
    header: "ニックネームの変更",
    message: "新しいニックネームを50文字以内で入力してください",
    inputs: [
      {
        placeholder: "新しいニックネームを入力...",
      },
    ],
    buttons: [
      "キャンセル",
      {
        text: "変更",
        async handler(value) {
          // 新しいニックネーム
          const newNickname = value[0];

          if (!!newNickname && newNickname.length < 50) {
            // 保存
            state.nickname = newNickname;
            await db.kvs.put({
              key: "nickname",
              value: newNickname,
            });

            // 通知を表示
            const toast = await toastController.create({
              message: "ニックネームを変更しました",
              color: "dark",
              duration: 2000,
            });
            toast.present();
          } else {
            // 通知を表示
            const toast = await toastController.create({
              message:
                "入力内容に問題があるため、ニックネームを変更できませんでした",
              color: "danger",
              duration: 2000,
            });
            toast.present();
          }
        },
      },
    ],
  });
  alert.present();
};

// 強制アップデート
const forceUpdate = async () => {
  const alert = await alertController.create({
    header: "強制アップデート",
    message:
      "強制アップデートを実行しますか？Wi-Fi環境で行うことを推奨します。この操作で授業情報などのユーザーデータが削除されることはありません。",
    buttons: [
      {
        text: "アップデートを実行",
        handler() {
          autoUpdate(true);
        },
      },
      "キャンセル",
    ],
  });
  alert.present();
};
</script>
