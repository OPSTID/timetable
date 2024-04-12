<template>
    <IonPage>
        <IonSpinner name="dots" style="position:fixed;top:0;left:0;right:0;bottom:0;margin:auto;width:3em;height:3em;"></IonSpinner>
    </IonPage>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { db } from "../db";
import { IonPage, IonSpinner } from "@ionic/vue";

const router = useRouter()

const checkInited = async () => {
    // 取得
    const result = await db.kvs.get("isInited")
    if (!!result) {
        // 記録がある場合
        // 初期登録済みなら、ホーム画面に移動
        const isInited = <boolean>result.value
        if(isInited){
            router.replace("/member/home")
        } else {
            router.replace("/start")
        }
    } else {
        // それ以外はようこそページに移動
        router.replace("/start")
    }
}

checkInited()
</script>