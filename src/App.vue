<template>
  <ion-app>
    <ion-router-outlet :animated="!state.isIOS"/>

    <!--開発者ツールが有効のとき、ボタンを表示-->
    <IonFab vertical="top" horizontal="end" v-if="state.isDevtoolsEnabled" style="opacity:0.8;pointer-events: none;">
      <IonButton size="small" color="tertiary" style="backdrop-filter: blur(10px);">
        <strong>DEV</strong>
      </IonButton>
    </IonFab>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonButton, IonChip, IonFab, IonRouterOutlet } from '@ionic/vue';
import { reactive } from 'vue';
import { db } from './db';
/*import { useRecaptchaProvider } from 'vue-recaptcha'

// enable recaptcha
useRecaptchaProvider()*/

const state = reactive({
  // iOS のブラウザではスワイプで戻る操作をすると表示がおかしくなるので、ionic側のアニメーションを無効化する
  isIOS:/[ \(]iP/.test(navigator.userAgent),
  isDevtoolsEnabled: false
})

// 開発者ツールがう有効かどうか定期的に取得
setInterval(() => {
  db.kvs.get("isDevtoolsEnabled").then(result => {
    if(!!result){
      state.isDevtoolsEnabled = <boolean>result.value
    }
  })
}, 500)
</script>
