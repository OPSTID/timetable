<template>
    <IonPage ref="page">
        <IonHeader>
            <IonToolbar>
                <!--<IonButtons slot="start">
                    <IonBackButton default-href="/" text="戻る"></IonBackButton>
                </IonButtons>-->
                <IonTitle>ようこそ</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light" fullscreen>
            <IonGrid fixed>
                <ion-header collapse="condense" class="ion-margin-top">
                    <ion-toolbar color="transparent">
                        <ion-title size="large">
                            <IonLabel>
                                <span class="timetable-gradient-text">ようこそ</span>
                            </IonLabel>
                        </ion-title>
                    </ion-toolbar>
                </ion-header>
                <div class="ion-padding-start ion-padding-end ion-padding-bottom">
                    <IonLabel>
                        <h3>初期設定をはじめましょう！<br>この画面ですべて完了します</h3>
                        <p>
                            <IonIcon :icon="alertCircle" color="danger" style="font-size:1.4em;"></IonIcon>
                            マークの項目を入力・確認してください。
                        </p>
                    </IonLabel>
                </div>
                <IonListHeader>1. 初期設定</IonListHeader>
                <IonList inset lines="full">
                    <IonItem>
                        <IonInput v-model="state.nickname" label="ニックネーム" placeholder="必須" :maxlength="50"></IonInput>
                        <IonIcon :icon="checkmarkCircle" color="success" slot="end"
                            v-if="!!state.nickname && state.nickname.length <= 50"></IonIcon>
                        <IonIcon :icon="alertCircle" color="danger" slot="end" v-else></IonIcon>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <p class="ion-text-wrap">50文字以内でニックネームを入力してください。<br>外部に公開されることはありません。アプリ内の一部表示で使用されることがあります。
                            </p>
                        </IonLabel>
                    </IonItem>
                </IonList>
                <IonList inset lines="full">
                    <IonItem>
                        <IonSelect v-model="state.timetable" label="学年・学期" cancel-text="キャンセル" ok-text="選択"
                            :interface-options="{ 'header': '最初に使う時間割', 'subHeader': '現在のあなたの学年・学期を選択', 'message': 'スクロールできます' }">
                            <IonSelectOption v-for="timetable in defaultTimetables" :value="timetable.id">
                                {{ timetable.name }}
                            </IonSelectOption>
                        </IonSelect>
                        <IonIcon :icon="checkmarkCircle" color="success" slot="end"
                            v-if="state.timetable !== 0"></IonIcon>
                        <IonIcon :icon="alertCircle" color="danger" slot="end" v-else></IonIcon>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <p class="ion-text-wrap">現在の学年・学期を選んでください。この選択に基づき時間割が設定されます。</p>
                        </IonLabel>
                    </IonItem>
                </IonList>
                <IonListHeader>2. 規約等への同意</IonListHeader>
                <IonList inset lines="none">
                    <IonItem>
                        <IonLabel>
                            <h3 class="ion-text-wrap">
                                以下のリンクから、利用規約・プライバシーポリシーをご確認の上、同意をお願いいたします。<br>リンクをクリックしてご確認いただくことで、下記「同意する」がタップできるようになります。
                            </h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem button @click="state.isTermsLinkClicked = true" id="terms-modal-trigger">
                        <IonText color="primary"><strong>利用規約・プライバシーポリシーを確認する</strong></IonText>
                    </IonItem>
                    <IonModal ref="termsModal" trigger="terms-modal-trigger" :presenting-element="state.presentingElement">
                        <IonHeader>
                            <IonToolbar>
                                <IonTitle>利用規約・プライバシーポリシー</IonTitle>
                                <IonButtons slot="end">
                                    <IonButton @click="termsModal.$el.dismiss()"><strong>閉じる</strong></IonButton>
                                </IonButtons>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent color="light">
                            <MarkdownView :markdown="state.termsMarkdown"></MarkdownView>
                        </IonContent>
                    </IonModal>
                </IonList>
                <IonList inset>
                    <IonItem :disabled="!state.isTermsLinkClicked">
                        <IonCheckbox v-model="state.isAgreeTerms" label-placement="end" justify="start">
                            <IonLabel class="ion-text-wrap">
                                <h2>同意する</h2>
                                <p v-if="!state.isTermsLinkClicked">上記リンクをタップして、利用規約・プライバシーポリシーをご確認ください</p>
                            </IonLabel>
                        </IonCheckbox>
                        <IonIcon :icon="checkmarkCircle" color="success" slot="end" v-if="!!state.isAgreeTerms">
                        </IonIcon>
                        <IonIcon :icon="alertCircle" color="danger" slot="end" v-else></IonIcon>
                    </IonItem>
                </IonList>
                <IonListHeader>3. 重要事項の確認</IonListHeader>
                <IonList inset>
                    <IonItem>
                        <IonLabel>
                            <h3 class="ion-text-wrap">
                                <ul>
                                    <li>利用規約にも記載しておりますが、本サービスはあなたの責任の下にご利用ください。</li>
                                    <li>PCとスマホの組み合わせでご利用頂く場合、PCで授業情報を入力するとQRコードでスマホに授業情報を転送できますが、逆（スマホ→PC）はできません。</li>
                                    <li>本アプリでは、全てのデータを現在使用中のブラウザにある保存領域に保存します。<IonText
                                            color="danger">
                                            ブラウザの設定などから閲覧履歴の削除等を行うと、<strong>本アプリが初期化</strong>されることがあります</IonText>
                                        のでご注意ください。</li>
                                    <li>
                                        （大学生・大学院生の方への注意事項）<br>本アプリに授業を登録しても、学校側の履修登録が完了したことにはなりません。必ず学校のLMS（学習管理システム）等での履修登録を忘れないようにしてください。
                                    </li>
                                </ul>
                            </h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonCheckbox v-model="state.isAgreeStatement" label-placement="end" justify="start">確認しました
                        </IonCheckbox>
                        <IonIcon :icon="checkmarkCircle" color="success" slot="end" v-if="!!state.isAgreeStatement">
                        </IonIcon>
                        <IonIcon :icon="alertCircle" color="danger" slot="end" v-else></IonIcon>
                    </IonItem>
                </IonList>

                <p class="ion-padding ion-text-center">
                    <IonLabel>
                        <p><strong>以上の内容に同意して、</strong></p>
                    </IonLabel>
                    <IonButton @click="start" color="dark" expand="block"
                        :disabled="!state.nickname || !state.isAgreeStatement || !state.isAgreeTerms || state.timetable === 0">
                        <strong>はじめる</strong>
                    </IonButton>
                </p>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>

<script setup lang="ts">
import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, alertController, loadingController } from '@ionic/vue';
import { alertCircle, checkmarkCircle, checkmarkOutline } from 'ionicons/icons';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { db } from '@/db';
import { useExtractedObservable } from '@vueuse/rxjs';
import MarkdownView from '@/components/markdownView.vue';

const router = useRouter()
const state = reactive({
    nickname: "",
    timetable: 0, // 学年・学期＝使用する時間割の選択
    isTermsLinkClicked: false, // 利用規約へのリンクをクリックしたかどうか
    isAgreeTerms: false, // 利用規約への同意
    termsMarkdown: "", // 利用規約・プライバシーポリシーのマークダウン
    isAgreeStatement: false, // 重要事項への同意
    presentingElement: <null | HTMLElement> null
})
const page = ref()
const termsModal = ref()

// 利用規約をダウンロード
const loadTerms = async () => {
    const res = await fetch("/md-docs/terms.md")
    state.termsMarkdown = await res.text()
}

loadTerms()

// 初期設定済みなら、ホーム画面に移動
db.kvs.get("isInited").then(result => {
    if (!!result && result.value === true) {
        router.replace("/member/home")
    }
})

// 標準設定の時間割
const defaultTimetables = [
    { "id": 1, "name": "1年 1学期（前期）" },
    { "id": 2, "name": "1年 2学期（後期）" },
    { "id": 3, "name": "1年 3学期" },
    { "id": 4, "name": "2年 1学期（前期）" },
    { "id": 5, "name": "2年 2学期（後期）" },
    { "id": 6, "name": "2年 3学期" },
    { "id": 7, "name": "3年 1学期（前期）" },
    { "id": 8, "name": "3年 2学期（後期）" },
    { "id": 9, "name": "3年 3学期" },
    { "id": 10, "name": "4年 1学期（前期）" },
    { "id": 11, "name": "4年 2学期（後期）" },
    { "id": 12, "name": "4年 3学期" },
    { "id": 13, "name": "5年 1学期（前期）" },
    { "id": 14, "name": "5年 2学期（後期）" },
    { "id": 15, "name": "5年 3学期" },
    { "id": 16, "name": "6年 1学期（前期）" },
    { "id": 17, "name": "6年 2学期（後期）" },
    { "id": 18, "name": "6年 3学期" },
]

// 「はじめる」ボタン
const start = async () => {
    // 「準備しています」を表示
    const loading = await loadingController.create({
        message: "準備しています...",
        spinner: "dots"
    })

    await loading.present()

    // ニックネームを保存
    await db.kvs.put({
        key: "nickname",
        value: state.nickname
    })
    // 選択された時間割を保存
    await db.kvs.put({
        key: "currentTimetableId",
        value: state.timetable
    })
    // 初期登録したことを保存
    await db.kvs.put({
        key: "isInited",
        value: true
    })
    // 初期登録が完了した日時を保存
    await db.kvs.put({
        key: "inited.date",
        value: (new Date()).toISOString()
    })

    // 標準設定の時間割を作成
    await db.timetables.bulkPut(defaultTimetables)

    // 完了モーダルを表示
    setTimeout(async () => {
        await loading.dismiss()

        const alert = await alertController.create({
            header: "初期設定完了",
            message: "初期設定が完了しました。さっそくはじめましょう👍",
            backdropDismiss: false,
            buttons: [
                {
                    text: "はじめる",
                    handler() {
                        router.replace("/member/home?guide=1")
                    }
                }
            ]
        })
        alert.present()
    }, 3000)
}

onMounted(() => {
    state.presentingElement = page.value.$el
})
</script>