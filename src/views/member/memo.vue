<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Memo</IonTitle>
            </IonToolbar>
            <IonToolbar>
                <IonSegment v-model="state.mode">
                    <IonSegmentButton value="show">表示</IonSegmentButton>
                    <IonSegmentButton value="edit">編集</IonSegmentButton>
                </IonSegment>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light" class="to-do">
            <IonGrid fixed>
                <!--読み込み-->
                <div v-if="state.isLoading" class="ion-text-center ion-padding">
                    <IonSpinner></IonSpinner>
                </div>
                <!--表示-->
                <div v-else-if="state.mode === 'show'">
                    <IonList inset v-for="markdownHTML in state.markdownHTMLs"
                        v-if="!(state.markdownHTMLs.length === 1 && state.markdownHTMLs[0] === '')">
                        <IonItem>
                            <!--コンテンツ表示エリア-->
                            <IonLabel v-html="markdownHTML" class="ion-text-wrap"></IonLabel>
                        </IonItem>
                    </IonList>
                    <IonList v-else inset>
                        <IonItem class="ion-text-center">
                            <IonLabel>
                                <h3>[編集] タブからメモを入力してみましょう</h3>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </div>
                <div v-else-if="state.mode === 'edit'">
                    <IonList inset lines="full">
                        <IonItem>
                            <IonTextarea auto-grow v-model="state.rawMarkdown" :disabled="!state.isEditable"
                                placeholder="ここにメモを入力... (Markdown を使用できます)"></IonTextarea>
                        </IonItem>
                    </IonList>
                    <IonList inset>
                        <IonItem href="/info/memo-markdown-format?closebutton=1" target="_blank">
                            <IonText color="primary">Memo 機能で使用できるフォーマットについて</IonText>
                        </IonItem>
                    </IonList>
                </div>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import { IonBackButton, IonButton, IonButtons, IonCard, IonChip, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSpinner, IonText, IonTextarea, IonTitle, IonToolbar, alertController } from '@ionic/vue';
import { add, addCircle, alertCircle, checkmarkCircle, filter, filterCircle, remove, trash } from 'ionicons/icons';
import { onUnmounted, reactive, watch, watchEffect } from 'vue';

import DOMPurify from 'dompurify'
import { marked } from 'marked';
import { db } from '@/db';

const state = reactive({
    mode: <"show" | "edit">"show",
    rawMarkdown: "",
    markdownHTMLs: <string[]>[],
    isLoading: true,
    isEditable: false
})

// marked.js の設定
// ヘッダーに<strong>を付与
const renderer = {
    heading(text: string, level: number) {
        return `<h${level}><strong>${text}</strong></h${level}>`
    },
    link(href: string, title: any, text: string) {
        return `<a href=${href} target="_blank">${text}</a>`
    }
}
marked.use({ renderer })

const updateMarkdownHTML = async () => {
    let markdownHTML = DOMPurify.sanitize(await marked.parse(state.rawMarkdown, { breaks: true }), { ADD_ATTR: ['target'] })
    // <hr> で区切る
    state.markdownHTMLs = markdownHTML.split("<hr>")
}

// データベースから読み込み
const loadMarkdown = async () => {
    const result = await db.kvs.get("memoUserText")
    if (!!result) {
        state.rawMarkdown = <string>result.value
    } else {
        state.rawMarkdown = ""
    }
    state.isLoading = false
}

const loadParseInterval = setInterval(async ()=>{
    await loadMarkdown()
    await updateMarkdownHTML()
}, 200)

onUnmounted(() => {
    clearInterval(loadParseInterval)
})

// 編集されたら保存する（watchEffectの仕様上、少し待ってから開始する。でないと、空のテキストが保存されてしまう）
setTimeout(() => {
    // 編集可能にする
    state.isEditable = true
    // 編集の検知を開始
    watchEffect(async () => {
        // kvsに保存
        await db.kvs.put({
            key: "memoUserText",
            value: state.rawMarkdown
        })
    })
},500)

</script>