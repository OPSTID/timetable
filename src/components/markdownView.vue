<template>
    <IonList inset v-for="markdownHTML in state.markdownHTMLs">
        <IonItem>
            <!--コンテンツ表示エリア-->
            <IonLabel v-html="markdownHTML" class="ion-text-wrap"></IonLabel>
        </IonItem>
    </IonList>
</template>
<script setup lang="ts">
import { IonItem, IonLabel, IonList } from '@ionic/vue';
import { marked } from 'marked';
import DOMPurify from "dompurify"
import { reactive, watchEffect } from 'vue';

const props = defineProps<{
    markdown: string
}>()

const state = reactive({
    markdownHTMLs:<string[]>[]
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

watchEffect(async () => {
    // marked.js で変換後、dompurifyでHTMLを安全な形にする
    let markdownHTML = DOMPurify.sanitize(await marked.parse(props.markdown, { breaks: true }), { ADD_ATTR: ['target'] })

    // <hr> で区切る
    state.markdownHTMLs = markdownHTML.split("<hr>")
})
</script>