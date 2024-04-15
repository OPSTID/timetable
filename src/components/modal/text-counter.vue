<template>
    <IonHeader>
        <IonToolbar>
            <IonTitle>文字数カウンター</IonTitle>
            <IonButtons slot="end">
                <IonButton @click="historyBack"><strong>完了</strong></IonButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader>
    <IonContent color="light">
        <IonList inset class="text-counter-header">
            <IonItem color="dark">
                <IonLabel>
                    <h3>現在の文字数</h3>
                    <strong>{{ state.userText.split("\n").join("").length }} 文字（改行を含めない）</strong>
                    <h3>{{ state.userText.length }} 文字（改行を含める）</h3>
                </IonLabel>
            </IonItem>
        </IonList>
        <IonList inset lines="full">
            <IonItem>
                <IonTextarea ref="textCounterTextarea" placeholder="ここにテキストを入力..." v-model="state.userText" auto-grow></IonTextarea>
            </IonItem>
            <IonItem>
                <IonLabel>
                    <p>入力した内容は自動的に保存されます</p>
                </IonLabel>
            </IonItem>
        </IonList>
    </IonContent>
</template>
<script setup lang="ts">
import { db } from '@/db';
import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonTextarea, IonTitle, IonToolbar } from '@ionic/vue';
import { onMounted, reactive, ref, watchEffect } from 'vue';

const textCounterTextarea = ref()

const state = reactive({
    userText: ""
})

const historyBack = () => {
    history.back()
}
// 読み込む
const loadText = async () => {
    const result = await db.kvs.get("textCounterUserText")
    if(!!result){
        state.userText = <string>result.value
    }
}
// 編集されたら保存する（watchEffectの仕様上、少し待ってから開始する。でないと、空のテキストが保存されてしまう）
setTimeout(() => {
    // 編集の検知を開始
    watchEffect(async () => {
        // kvsに保存
        await db.kvs.put({
            key: "textCounterUserText",
            value: state.userText
        })
    })
}, 500)

loadText()
</script>
<style scoped>
.text-counter-header {
    position: sticky;
    top: 18px;
    z-index: 1000;
}
</style>