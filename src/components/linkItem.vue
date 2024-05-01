<template>
    <IonItem :button="props.clickable" @click="openUrl()">
        <IonIcon :icon="state.isMeetingUrl ? videocam : linkOutline" slot="start"></IonIcon>
        <IonLabel class="ion-text-nowrap">
            <strong>{{ props.title }}</strong>
            <p>{{ props.url }}</p>
        </IonLabel>
    </IonItem>
</template>
<script setup lang="ts">
import { IonIcon, IonItem, IonLabel, alertController } from '@ionic/vue';
import { linkOutline, videocam } from 'ionicons/icons';
import { reactive, watchEffect } from 'vue';

const props = defineProps<{
    title: string // リンクの名前（例：授業のホームページ）
    url: string // リンクのURL
    clickable: boolean // クリックしてリンクを開くかどうか
}>()

const state = reactive({
    isMeetingUrl: false // Zoom などのオンラインミーティングへのURLであるかどうか
})

// ミーティングURLの正規表現
const meetingsRegExp = {
    zoom: /https:\/\/(.*)\.?zoom\.us\/j\/.*/, // Zoom ミーティング URLの正規表現
    cisco: /https:\/\/(.*).webex.com/ // Webex の正規表現
    
}
// ミーティングのURLかどうかを判別する
watchEffect(() => {
    let isMatch = false // ミーティングURLにマッチするものがあったか
    Object.values(meetingsRegExp).forEach((regExp) => {
        if(props.url.match(regExp)){
            isMatch = true
        }
    })

    state.isMeetingUrl = isMatch
})
// リンクを開く
const openUrl = async () => {
    // クリック可能でないときは無視
    if(!props.clickable) return;
    // Zoom
    /*if(props.url.match(meetingsRegExp.zoom)){
        // PMIをURLから取り出す
        const pmiMatch = new URL(props.url).pathname.match(/\/j\/(.*)/)
        if(!!pmiMatch){
            const pmi = pmiMatch[1]
            // 起動するかどうかを確認
            const confirmAlert = await alertController.create({
                header: "Zoom ミーティングを起動",
                message: "ミーティングを起動します。よろしいですか？",
                buttons: [
                    'キャンセル',
                    {
                        text: "起動",
                        handler(){
                            window.open("zoommtg://zoom.us/join?confno=" + pmi, "_blank")
                        }
                    }
                ]
            })
            confirmAlert.present()
        } else {
            // エラーを表示
            const alert = await alertController.create({
                header: "Zoom ミーティング",
                message: "問題が発生したため、Zoom アプリを起動できませんでした。代わりにURLを開きますか？",
                buttons: [
                    'キャンセル',
                    {
                        text: "URLを開く",
                        handler(){
                            window.open(props.url, "_blank")
                        }
                    }
                ]
            })
            alert.present()
        }
    }*/
    // 他のミーティングアプリの場合は、特に動作を定義しない
    // URLを開く
    else {
        window.open(props.url, "_blank")
    }
}
</script>