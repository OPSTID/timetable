
<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton default-href="/member/home" text="戻る"></IonBackButton>
                </IonButtons>
                <IonTitle>時間割の選択</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light">
            <IonGrid fixed>
                <IonList inset>
                    <IonItem>
                        <IonLabel>
                            <p>現在選択中の時間割</p>
                            <h2><strong>{{ state.selectedTimetableName }}</strong></h2>
                        </IonLabel>
                    </IonItem>
                </IonList>
                <IonList inset @click="createNewTimetable">
                    <IonItem button>
                        <IonIcon :icon="add" slot="start" color="primary"></IonIcon>
                        <IonLabel>
                            <IonText color="primary">
                                <strong>新しい時間割を作成</strong>
                            </IonText>
                        </IonLabel>
                    </IonItem>
                </IonList>
                <IonList inset lines="full">
                    <IonItem>
                        <IonLabel>
                            <p>既存の時間割から選択</p>
                        </IonLabel>
                    </IonItem>
                    <IonRadioGroup v-model="state.selectedTimetableId">
                        <IonItem v-for="timetable in state.timetables" class="fade-in">
                            <IonIcon :icon="list" slot="start" size="small"
                                :color="(state.selectedTimetableId === timetable.id ? 'primary' : '')"></IonIcon>
                            <IonRadio :value="timetable.id">
                                <IonLabel>
                                    <span
                                        :style="{ fontWeight: (state.selectedTimetableId === timetable.id ? 'bold' : 'normal'), 'color': (state.selectedTimetableId === timetable.id ? 'var(--ion-color-primary)' : '') }">{{
                                            timetable.name }}</span>
                                </IonLabel>
                            </IonRadio>
                        </IonItem>
                    </IonRadioGroup>
                </IonList>
                <p class="ion-text-center">
                    <IonSpinner v-if="state.timetables.length === 0" name="dots"></IonSpinner>
                </p>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRadio, IonRadioGroup, IonSpinner, IonText, IonTitle, IonToolbar, alertController } from '@ionic/vue';
import { reactive, watchEffect } from "vue"

import { db } from '@/db';
import { add, gridOutline, happySharp, list, school } from 'ionicons/icons';

interface timetable {
    id?: number // ID (AI)
    name: string // 時間割の名前（例: 2年 前期）
}

const state = reactive({
    selectedTimetableId: 0,
    selectedTimetableName: "",
    timetables: <timetable[]>[]
})

// 時間割一覧を取得
const getTimetableList = () => {
    state.timetables = []
    setTimeout(() => {
        db.timetables.toArray().then(timetables => {
            timetables.forEach(timetable => {
                state.timetables.push(timetable)
            })
        })
    }, 500)
}

getTimetableList()

// 現在選択されている時間割のIDと名前を取得
db.kvs.get("currentTimetableId").then(result => {
    if (!!result) {
        state.selectedTimetableId = <number>result.value
        // 時間割の名前を取得
        db.timetables.get(state.selectedTimetableId).then(result => {
            if (!!result) {
                state.selectedTimetableName = <string>result.name
            }
        })
    }
})

// 時間割を選んだとき
watchEffect(() => {
    db.kvs.put({
        key: "currentTimetableId",
        value: state.selectedTimetableId
    })
    // 時間割の名前を取得
    db.timetables.get(state.selectedTimetableId).then(result => {
        if (!!result) {
            state.selectedTimetableName = <string>result.name
        }
    })

})

// 新しい時間割を作成
const createNewTimetable = async () => {
    const alert = await alertController.create({
        header: "新しい時間割を作成",
        subHeader: "一度作成した時間割は削除できません",
        message: "作成する時間割の名前を入力",

        inputs: [
            {
                placeholder: "例: 7年 前期"
            }
        ],

        buttons: [
            {
                text: "作成",
                async handler(input) {
                    if (!!input[0]) {
                        db.timetables.put({
                            name: input[0]
                        })
                    }
                    // 表示を更新
                    getTimetableList()
                }
            },
            "キャンセル"
        ]
    })

    alert.present()
}
</script>
<style scoped>
@keyframes fadeIn {
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
.fade-in{
    animation: fadeIn 0.5s;
}
</style>