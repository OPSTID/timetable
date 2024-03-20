<template>
    <IonPage ref="page">
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton default-href="/member/home" text="戻る"></IonBackButton>
                </IonButtons>
                <IonTitle>{{ ["日","月","火","水","木","金","土"][state.day] }}曜日 {{ state.period }} 時限の詳細</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light">
            <IonGrid fixed>
                <ClassData :day="state.day" :period="state.period" :presenting-element="state.presentingElement"></ClassData>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import ClassData from '@/components/classData.vue';
import { IonBackButton, IonButtons, IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const page = ref()

const route = useRoute()
const state = reactive({
    day: Number(route.params["day"]),
    period: Number(route.params["period"]),
    presentingElement: <null | HTMLElement>null
})

onMounted(() => {
    state.presentingElement = <HTMLElement>page.value.$el
})
</script>