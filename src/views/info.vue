<!--/public/md-docs にあるmarkdownを表示するページ-->
<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton v-if="state.isActiveCloseButton" @click="closeWindow">閉じる</IonButton>
                    <IonBackButton v-else default-href="/" text="戻る"></IonBackButton>
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton @click="loadMarkdown" :disabled="state.isLoading">
                        <IonIcon :icon="reload" slot="icon-only"></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light">
            <IonGrid fixed>
                <IonList inset v-if="state.isError">
                    <!--エラー-->
                    <IonItem>
                        <IonLabel class="ion-text-wrap">
                            <p>エラーが発生しました。URLに問題がないか確認してください。</p>
                        </IonLabel>
                    </IonItem>
                </IonList>
                <!--読み込み-->
                <div v-else-if="state.isLoading" class="ion-text-center ion-padding-top ion-margin-top">
                    <IonSpinner style="width:2em;height:2em;" />
                </div>
                <IonList inset v-else v-for="markdownHTML in state.markdownHTMLs">
                    <IonItem>
                        <!--コンテンツ表示エリア-->
                        <IonLabel v-html="markdownHTML" class="ion-text-wrap"></IonLabel>
                    </IonItem>
                </IonList>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import { IonBackButton, IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonSkeletonText, IonSpinner, IonTitle, IonToolbar, alertController } from '@ionic/vue';
import { reload } from 'ionicons/icons';

import { marked } from 'marked';
import DOMPurify from "dompurify"

import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const state = reactive({
    isLoading: true, // 読込中かどうか
    isError: false, // エラーが発生したか
    markdownHTMLs: <string[]>[], // 表示するマークダウンの変換後のHTMLs
    isActiveCloseButton: false // 閉じるボタンを表示するか（表示しない場合は、戻るボタンを表示）
})

// URLパラメータで、closebutton=1 が指定されているときは、閉じるボタンを表示
if (route.query['closebutton'] === "1") {
    state.isActiveCloseButton = true
}

const closeWindow = () => {
    window.close()
}

// marked.js の設定
// ヘッダーに<strong>を付与
const renderer = {
    heading(text:string, level:number){
        return `<h${level}><strong>${text}</strong></h${level}>`
    },
    link(href:string, title: any, text: string){
        return `<a href=${href} target="_blank">${text}</a>`   
    }
}
marked.use({renderer})

// マークダウンをサーバーから取得して表示
const loadMarkdown = async () => {
    state.isLoading = true
    state.isError = false

    // 読み込むマークダウンファイルのパス
    const path = `/md-docs/${route.params['markdownName']}.md`

    // インターネット接続を確認
    if (!navigator.onLine) {
        // インターネット接続がない場合は、エラーを表示
        (await alertController.create({
            header: "インターネット接続なし",
            message: "このページを表示するにはインターネット接続が必要です。接続状況を確認してください。",
            buttons: ["OK"]
        })).present()
        state.isLoading = false
        return
    }

    // サーバーから取得
    const res = await fetch(path)
    // テキストとして取得
    const mdText = await res.text()

    // mime-typeを確認
    const mime = res.headers.get("content-type")
    console.log(mime)
    // mime-type が text/markdown なら変換して表示
    if (mime === "text/markdown" || mime === null) {
        // marked.js で変換後、dompurifyでHTMLを安全な形にする
        let markdownHTML = DOMPurify.sanitize(await marked.parse(mdText, { breaks: true }), { ADD_ATTR: ['target'] })
        
        // <hr> で区切る
        state.markdownHTMLs = markdownHTML.split("<hr>")

        setTimeout(() => state.isLoading = false, 500)
    } else {
        state.isError = true
    }
}


loadMarkdown()
</script>