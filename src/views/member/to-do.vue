<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="openFilterModal">
                        <IonIcon :icon="filter" slot="start"></IonIcon>
                        <IonLabel>
                            <strong style="font-size:0.9em;">表示切替</strong>
                            <p>未完了など</p>
                        </IonLabel>
                    </IonButton>
                </IonButtons>
                <IonTitle>To-do</IonTitle>
                <IonButtons slot="end">
                    <IonButton router-link="/member/to-do/create">
                        <strong>作成</strong>
                        <IonIcon :icon="addCircle" slot="end"></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonToolbar>
                <IonSegment value="all">
                    <IonSegmentButton value="all">すべて</IonSegmentButton>
                    <IonSegmentButton value="assignment">#課題</IonSegmentButton>
                    <IonSegmentButton value="circle">#部活</IonSegmentButton>
                    <IonSegmentButton value="other">#その他</IonSegmentButton>
                </IonSegment>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light" class="to-do">
            <IonGrid fixed>
                <IonSearchbar placeholder="検索..."></IonSearchbar>
                <IonList inset lines="none">
                    <IonItemSliding>
                        <IonItem button>
                            <IonLabel>
                                <h2><strong>期末レポート</strong></h2>
                                <h3>あと 7 日</h3>
                                <p>2024/2/25 23:59 まで</p>
                                <p>教養基礎Ⅰ</p>
                            </IonLabel>
                        </IonItem>
                        <IonItemOptions>
                            <IonItemOption color="danger">
                                <IonIcon :icon="trash" slot="icon-only"></IonIcon>
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                </IonList>
            </IonGrid>
        </IonContent>
        <IonFab slot="fixed" vertical="bottom" horizontal="end" class="ion-hide-sm-up">
            <IonFabButton router-link="/member/to-do/create">
                <IonIcon :icon="add"></IonIcon>
            </IonFabButton>
        </IonFab>
    </IonPage>
</template>
<script setup lang="ts">
import { IonBackButton, IonButton, IonButtons, IonChip, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar, alertController } from '@ionic/vue';
import { add, addCircle, alertCircle, checkmarkCircle, filter, filterCircle, remove, trash } from 'ionicons/icons';

const openFilterModal = async () => {
    const alert = await alertController.create({
        header: "表示を切り替える",
        subHeader: "表示するTo-doを切り替えできます",
        inputs:[
            {
                label:"未完了・時間設定なし",
                type:"radio",
                value: "incompleted",
                checked: true
            },
            {
                label:"完了",
                type: "radio",
                value: "completed"
            },
            {
                label:"時間設定なし",
                type: "radio",
                value: "no-deadline"  
            },
            {
                label:"全て表示",
                type: "radio",
                value: "all"
            }
        ],
        buttons:["切り替え", "キャンセル"]
    })
    alert.present()
}
</script>