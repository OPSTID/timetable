<template>
    <IonPage>
        <IonTabs>
            <IonRouterOutlet />
            <IonTabBar slot="bottom">
                <IonTabButton tab="/member/home" href="/member/home" @click="onTabButtonClick('home')">
                    <IonIcon :icon="home"></IonIcon>
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="/member/to-do" href="/member/to-do" @click="onTabButtonClick('to-do')">
                    <IonIcon :icon="documentsOutline"></IonIcon>
                    <IonLabel>To-do</IonLabel>
                    <IonBadge color="danger">1</IonBadge>
                </IonTabButton>
                <IonTabButton tab="/member/menu" href="/member/menu" @click="onTabButtonClick('menu')">
                    <IonIcon :icon="menu"></IonIcon>
                    <IonLabel>Menu</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    </IonPage>    
</template>
<script setup lang="ts">
import { IonBadge, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/vue';
import { documentsOutline, grid, home, menu } from 'ionicons/icons';

// タブの各ボタンをクリックしたとき
// name: 各ページの<ion-content>に設定したclassと同じにする
const onTabButtonClick = (name: string) => {
    // タブのリンク先と同じページが表示されているときにタップされた場合は、ion-contentを一番上までスクロール
    // <ion-content> を取得
    const content = <HTMLIonContentElement>document.querySelector(`ion-content.${name}`)
    if(!!content){
        content.scrollToTop(500)
    }
}
</script>