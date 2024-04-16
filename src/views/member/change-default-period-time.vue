<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>時限の時間設定</IonTitle>
                <IonButtons slot="start">
                    <IonBackButton default-href="/member/menu" text="戻る"></IonBackButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light">
            <IonGrid fixed>
                <IonList inset>
                    <IonItem v-for="period in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
                        <IonLabel>
                            {{ period }} 時限
                        </IonLabel>
                        <IonLabel slot="end" v-if="!!state.startEndTimes[period]">
                            <h3><input type="time" v-model="state.startEndTimes[period].startTime"> から <input type="time" v-model="state.startEndTimes[period].endTime"></h3>
                        </IonLabel>
                    </IonItem>
                </IonList>

                <IonList inset>
                    <IonItem>
                        <IonLabel class="ion-text-wrap">
                            <h1>
                                <IonIcon :icon="informationCircleOutline"></IonIcon>
                            </h1>
                            <h3><strong>新しい授業を登録する際、この画面で設定された開始時間、終了時間が自動的に入力されます。</strong></h3>
                            <p>※ 新しい授業を時間設定がされていない時限に登録する際に、開始時間、終了時間を入力すると、入力した時間がこちらの設定に自動的に反映されます。</p>
                            <p>※ この画面で各時限の時間を変更しても、すでに登録されている授業の授業時間は変更されません。必要な場合は手動で変更してください。</p>
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import { db } from '@/db';
import { IonBackButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { informationCircleOutline } from 'ionicons/icons';
import { reactive, watch, watchEffect } from 'vue';

declare type startEndTime = {
    startTime: string
    endTime: string
}

const state = reactive({
    startEndTimes: <startEndTime[]>[]
})

const loadStartEndTimes = async () => {
    /**
 * 開始時間、終了時間は、それぞれdb.kvsに、以下のkey, value で保存する。
 * 開始時間key: startEndTimes.startTime.[period]
 * 終了時間key: startEndTimes.endTime.[period]
 * value: HH:MM <string>
 */

    // 各時限の開始時間、終了時間を読み込み
    for (let period = 1; period <= 10; period++) {
        // dbから読み込み
        const startTimeResult = await db.kvs.get(`startEndTimes.startTime.${period}`)
        const endTimeResult = await db.kvs.get(`startEndTimes.endTime.${period}`)

        let startTime = ""
        let endTime = ""

        // console.log(startTimeResult, endTimeResult)
        
        // 開始時間、終了時間それぞれdbに記録がある場合
        if (!!startTimeResult) {
            startTime = <string>startTimeResult.value
        }
        if (!!endTimeResult) {
            endTime = <string>endTimeResult.value
        }

        // 反映
        state.startEndTimes[period] = { startTime, endTime }
    }
}

loadStartEndTimes()

// 変更を検知
setTimeout(() => {
    watchEffect(() => {
        // 保存
        for (let period = 1; period <= 10; period++) {
            // 開始時間
            db.kvs.put({
                key: `startEndTimes.startTime.${period}`,
                value: state.startEndTimes[period].startTime
            })
            // 終了時間
            db.kvs.put({
                key: `startEndTimes.endTime.${period}`,
                value: state.startEndTimes[period].endTime
            })
        }
    })
}, 500)

</script>