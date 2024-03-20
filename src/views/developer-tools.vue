<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons>
                    <IonBackButton default-href="/member/settings" text="戻る"></IonBackButton>
                </IonButtons>
                <IonTitle>開発者向け機能</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light">
            <IonGrid fixed>
                <IonList inset>
                    <IonItem>
                        <IonLabel>
                            <p class="ion-text-wrap">このページは開発時に利用する特別な機能が利用できます。<br><strong>通常利用時に使用すると最悪の場合初期化される可能性がありますので、各機能を理解した上でご利用ください。</strong></p>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonToggle v-model="state.isEnabled">開発者ツールを有効にする</IonToggle>
                    </IonItem>
                </IonList>
                <IonList inset v-if="state.isEnabled">
                    <IonItem button @click="prepare(resetInit)">
                        <IonIcon :icon="trash" slot="start"></IonIcon>
                        <IonLabel>
                            初期登録をリセットする
                            <p class="ion-text-wrap">初期登録をなかったことにします。「ようこそ」ページのデバッグに使用します。</p>
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import { IonBackButton, IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar, alertController, toastController } from '@ionic/vue';
import { trash } from 'ionicons/icons';

import { db } from '@/db';
import { reactive, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

// 開発者ツールが無効のとき、ホームページ画面にリダイレクト
db.kvs.get("isDevtoolsEnabled").then(result => {
    if(!result){
        router.replace("/")
    } else if(result.value !== true) {
        router.replace("/")
    }
})

const state = reactive({
    // 開発者ツールが有効かどうか
    isEnabled: true
})
// 開発者ツールの有効・無効切り替えを保存
watchEffect(async () => {
    db.kvs.put({
        key: "isDevtoolsEnabled",
        value: state.isEnabled
    })
})
// 機能の実行確認
const prepare = async (func:Function) => {
    const alert = await alertController.create({
        header:"確認",
        message: "選択した機能を実行しますか？破壊的な変更が実行される可能性があります。",
        buttons:[
            {
                text: "実行",
                handler(){
                    func()
                },
                role:"destructive"
            },
            {
                text: "キャンセル",
            }
        ]
    })
    alert.present()
}
// 初期登録リセット
const resetInit = async () => {
    // 初期登録をしたことを示すキーをfalseにする
    await db.kvs.put({
        key: "isInited",
        value: false
    })
    const toast = await toastController.create({
          message: "初期登録をリセットしました",
          color: "dark",
          duration: 1500
        })
        toast.present()
}
</script>