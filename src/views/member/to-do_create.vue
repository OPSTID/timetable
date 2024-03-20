<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton default-href="/member/to-do" text="戻る"></IonBackButton>
                </IonButtons>
                <IonTitle>To-do を作成</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light">
            <IonGrid fixed>
                <IonListHeader>基本情報</IonListHeader>
                <IonList inset>
                    <IonItem>
                        <IonSelect label="タグ" interface="action-sheet" v-model="state.tag"
                            :interface-options="{ header: 'タグの選択', subHeader: 'タグを使ってTo-doをわかりやすく管理できます' }">
                            <IonSelectOption value="assignment">#課題</IonSelectOption>
                            <IonSelectOption value="circle">#部活・サークル</IonSelectOption>
                            <IonSelectOption value="other">#その他</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>
                <IonList inset lines="full">
                    <IonItem>
                        <IonLabel>
                            <h3>目を引くタイトルを設定しましょう👓</h3>
                            <p>例: 教養基礎 期末テスト</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonInput v-model="state.title" label="タイトル" placeholder="必須"></IonInput>
                    </IonItem>
                </IonList>
                <IonList inset>
                    <IonItem>
                        <IonTextarea label="メモをここに書いておこう..." placeholder="例: 教科書 P.134 は出る！（URLを貼り付けることもできます）"
                            label-placement="floating" auto-grow></IonTextarea>
                    </IonItem>
                </IonList>
                <IonListHeader>時間設定</IonListHeader>
                <div class="ion-padding-start ion-padding end">
                    <IonSegment v-model="state.timeType">
                        <IonSegmentButton value="deadline">期限</IonSegmentButton>
                        <IonSegmentButton value="schedule">予定</IonSegmentButton>
                        <IonSegmentButton value="none">設定しない</IonSegmentButton>
                    </IonSegment>
                </div>

                <!--期限-->
                <div v-if="state.timeType === 'deadline'">
                    <IonAccordionGroup expand="inset">
                        <IonAccordion value="deadline">
                            <IonItem slot="header">
                                <IonLabel>期限</IonLabel>
                                <IonLabel slot="end">
                                    <IonChip>{{ dateToText(state.deadline.deadlineDateTime) }}</IonChip>
                                </IonLabel>
                            </IonItem>
                            <IonCard slot="content">
                                <IonDatetime presentation="date-time"
                                    v-model="state.deadline.deadlineDateTime" size="cover">
                                </IonDatetime>
                            </IonCard>
                        </IonAccordion>
                    </IonAccordionGroup>
                </div>

                <!--予定-->
                <div v-if="state.timeType === 'schedule'">
                    <IonAccordionGroup expand="inset">
                        <IonAccordion value="start">
                            <IonItem slot="header">
                                <IonLabel>開始時間</IonLabel>
                                <IonLabel slot="end">
                                    <IonChip>{{ dateToText(state.schedule.startDateTime) }}</IonChip>
                                </IonLabel>
                            </IonItem>
                            <IonCard slot="content">
                                <IonDatetime presentation="date-time"
                                    v-model="state.schedule.startDateTime" size="cover">
                                </IonDatetime>
                            </IonCard>
                        </IonAccordion>
                        <IonAccordion value="end">
                            <IonItem slot="header">
                                <IonLabel>終了時間</IonLabel>
                                <IonLabel slot="end">
                                    <IonChip>{{ dateToText(state.schedule.endDateTime) }}</IonChip>
                                </IonLabel>
                            </IonItem>
                            <IonCard slot="content">
                                <IonDatetime presentation="date-time"
                                    v-model="state.schedule.endDateTime" size="cover">
                                </IonDatetime>
                            </IonCard>
                        </IonAccordion>
                    </IonAccordionGroup>
                </div>

                <!--設定しない-->
                <div v-if="state.timeType === 'none'" class="ion-padding">
                    <IonLabel>
                        <h3>時間設定を [設定しない] にしたTo-doは常に一覧に表示されます。</h3>
                        <p>※ただし、タブバーのカウントの対象外となります。</p>
                    </IonLabel>
                </div>

                <div class="ion-padding ion-text-center">
                    <IonLabel>
                        <p><strong>上記の内容でOKなので</strong></p>
                    </IonLabel>
                    <IonButton color="dark" expand="block">
                        <strong>To-do を作成</strong>
                    </IonButton>
                </div>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import { IonAccordion, IonAccordionGroup, IonBackButton, IonButton, IonButtons, IonCard, IonChip, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonPage, IonPopover, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/vue';

import { reactive } from 'vue';

const state = reactive({
    tag: "assignment",
    title: "",
    timeType: <"deadline" | "routine" | "schedule" | "none">"deadline",

    deadline: {
        deadlineDateTime: new Date().toISOString()
    },
    schedule: {
        startDateTime: new Date().toISOString(),
        endDateTime: new Date().toISOString()
    }

})

const dateToText = (isoDateString:string) => {
    const date = new Date(isoDateString)
    // 時分の先頭0処理
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${hour}:${minute}`
}
</script>