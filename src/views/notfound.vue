<template>
    <IonPage>
        <IonSpinner></IonSpinner>
    </IonPage>
</template>
<script setup lang="ts">
import { IonPage, IonSpinner, toastController } from '@ionic/vue'
import { db } from '@/db'
import { useRouter } from 'vue-router';

const router = useRouter()

const result = await db.kvs.get("isInited")

// 初期登録済みの場合
if (!!result && result.value === true) {
    // Home に移動
    router.replace("/member/home")
} else {
    // 初期登録済みでない場合は、LPに移動
    router.replace("/lp")
}

const toast = await toastController.create({
    message: "存在しないページが開かれたため、リダイレクトされました",
    duration: 2000,
    color: "dark"
})

toast.present()
</script>