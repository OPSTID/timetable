<template>
    <IonPage ref="page">
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton default-href="/member/home" text="戻る"></IonBackButton>
                </IonButtons>
                <IonTitle>{{ ["日", "月", "火", "水", "木", "金", "土"][state.day] }}曜日 {{ state.period }} 時限の詳細</IonTitle>
                <IonButtons slot="end">
                    <IonButton id="controlPopoverTrigger">
                        <IonIcon :icon="moveOutline" slot="icon-only"></IonIcon>
                    </IonButton>
                    <IonPopover ref="controlPopover" trigger="controlPopoverTrigger">
                        <IonList lines="none">
                            <IonItem lines="full">
                                <IonLabel>
                                    <p><strong>移動</strong></p>
                                </IonLabel>
                            </IonItem>
                            <IonItem button @click="previousDay" :disabled="state.day === 0">
                                <IonIcon :icon="arrowBackOutline" slot="start"></IonIcon>
                                前の曜日
                            </IonItem>
                            <IonItem button @click="nextDay" :disabled="state.day === 6" lines="full">
                                <IonIcon :icon="arrowForwardOutline" slot="start"></IonIcon>
                                次の曜日
                            </IonItem>
                            <IonItem button @click="previousPeriod" :disabled="state.day === 0 && state.period === 1">
                                <IonIcon :icon="arrowUpOutline" slot="start"></IonIcon>
                                前の時限
                            </IonItem>
                            <IonItem button @click="nextPeriod" :disabled="state.day === 6 && state.period === 10" lines="full">
                                <IonIcon :icon="arrowDownOutline" slot="start"></IonIcon>
                                次の時限
                            </IonItem>
                            <IonItem button @click="controlPopover.$el.dismiss()">
                                <IonIcon :icon="closeOutline" slot="start"></IonIcon>
                                閉じる
                            </IonItem>
                        </IonList>
                    </IonPopover>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light">
            <IonGrid fixed>
                <ClassData :day="state.day" :period="state.period" :presenting-element="state.presentingElement">
                </ClassData>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import ClassData from '@/components/classData.vue';
import { IonBackButton, IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonPopover, IonTitle, IonToolbar } from '@ionic/vue';
import { moveOutline, arrowBackOutline, arrowForwardOutline, arrowUpOutline, arrowDownOutline, closeOutline } from 'ionicons/icons';
import { onMounted, reactive, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const page = ref()
const controlPopover = ref()

const route = useRoute()
const state = reactive({
    day: Number(route.params["day"]),
    period: Number(route.params["period"]),
    presentingElement: <null | HTMLElement>null
})

// controlPopoverで授業を移動したとき、URLを変更
setTimeout(() => {
    watchEffect(() => {
        history.replaceState("periodMove", "", `/member/period/${state.day}/${state.period}`)
    })
}, 500)

const nextPeriod = () => {
    // 土曜日 10時限なら実行しない
    if (state.day === 6 && state.period === 10) return;

    // 各曜日 10時限なら次の曜日の1時限
    else if (state.period === 10) {
        state.day++
        state.period = 1
    }
    // それ以外は次の時限
    else {
        state.period++
    }
}

const previousPeriod = () => {
    // 日曜日 1時限なら実行しない
    if (state.day === 0 && state.period === 1) return;

    // 各曜日 1時限なら前の曜日の10時限
    else if (state.period === 1) {
        state.day--
        state.period = 10
    }
    // それ以外は前の時限
    else {
        state.period--
    }
}

const nextDay = () => {
    // 土曜日なら実行しない
    if (state.day === 6) return;
    // それ以外は次の曜日
    else state.day++
}

const previousDay = () => {
    // 日曜日なら実行しない
    if (state.day === 0) return;
    // それ以外は前の曜日
    else state.day--
}

onMounted(() => {
    state.presentingElement = <HTMLElement>page.value.$el
})
</script>