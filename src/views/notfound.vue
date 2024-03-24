<template>
    <IonSpinner></IonSpinner>
</template>
<script setup lang="ts">
import { IonSpinner } from '@ionic/vue'
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
    router.replace("/")
}
</script>