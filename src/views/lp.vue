<template>
    <IonPage>
        <div v-if="!state.isLoaded">
            <IonSpinner name="dots"
                style="position:fixed;top:0;left:0;right:0;bottom:0;margin:auto;width:3em;height:3em;"></IonSpinner>
        </div>
        <IonContent v-show="state.isLoaded" class="fade-in">
            <div class="timetable-gradient ion-padding">
                <IonGrid fixed>
                    <IonListHeader class="ion-text-center">
                        <IonLabel>
                            <h1><strong style="font-weight:900;font-size:1.4em;color:#f3f8ff">Timetable</strong></h1>
                        </IonLabel>
                    </IonListHeader>
                    <IonList inset>
                        <IonItem>
                            <IonIcon :icon="alertCircle" slot="start" color="warning"></IonIcon>
                            <IonLabel class="ion-text-wrap">
                                <strong>現在ベータ版を提供しています</strong>
                                <p>一部、実装されていない機能があり、反応しないボタン等があります。また、このページで紹介している機能が廃止されたり、新しい機能が実装されるなどの変更を行う可能性がありますので、あらかじめご了承ください。新学期開始後、約1ヶ月後までを目処にに正式リリースを行う予定です。
                                </p>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                    <!--パソコン・タブレット用-->
                    <div class="ion-padding ion-hide-md-down" style="display:flex;align-items:center">
                        <IonLabel style="color:white;opacity:0.9;flex:2" class="ion-padding">
                            <h1 style="font-weight:bold;font-size:1.8em">大学生が本気で作った、<br>時間割アプリ</h1>
                            <h3>よくある "量産型" 時間割アプリとは違います。</h3>
                            <h2 class="ion-padding-top">
                                <!--初期設定ボタン-->
                                <IonItem button color="dark"
                                    style="border-radius:10px;box-shadow:0 5px 10px rgba(0,0,0,0.4);max-width:300px"
                                    v-if="!state.isInited" router-link="/start">
                                    <IonIcon :icon="rocketOutline" slot="start"></IonIcon>
                                    <IonLabel>
                                        <h3>
                                            <IonText color="primary"><strong>すぐにできます！</strong></IonText>
                                        </h3>
                                        <h2 class="ion-text-wrap"><strong>初期設定をする</strong></h2>
                                        <p>パソコンでも今すぐ使えます</p>
                                    </IonLabel>
                                </IonItem>
                                <!--ホーム画面に移動ボタン-->
                                <IonItem v-else lines="none" button style="border-radius:10px;max-width: 300px;"
                                    class="ion-margin-top" router-link="/member/home">
                                    <IonIcon :icon="logInOutline" slot="start"></IonIcon>
                                    <IonLabel>
                                        <p>あなたは初期設定済み</p>
                                        <h2><strong>ホーム画面に移動</strong></h2>
                                    </IonLabel>
                                </IonItem>
                            </h2>
                        </IonLabel>
                        <div class="ion-text-center" style="flex:1">
                            <img src="/img/screenshots/phone_20240404.png" class="fade-in"
                                style="border-radius:30px;max-height:500px;filter:drop-shadow(0 0px 10px rgba(255,255,255,0.3))">
                        </div>
                    </div>
                    <!--スマートフォン用-->
                    <div class="ion-padding ion-text-center ion-hide-md-up">
                        <IonLabel style="color:white;opacity:0.9;font-size:1.2em;">
                            <h1 style="font-weight:bold;font-size:">大学生が本気で作った、<br>時間割アプリ</h1>
                            <img src="/img/screenshots/phone_20240404.png"
                                style="max-height:35vh;filter:drop-shadow(0 0 10px rgba(255,255,255,0.8))"
                                class="ion-padding fade-in">
                            <h2 class="ion-padding-top">
                                <IonItem lines="none" button color="dark"
                                    style="border-radius:10px;box-shadow:0 6px 10px rgba(0,0,0,0.3)"
                                    v-if="!state.isInited" router-link="/start">
                                    <IonIcon :icon="rocketOutline" slot="start"></IonIcon>
                                    <IonLabel>
                                        <h3>
                                            <IonText color="primary"><strong>すぐにできます！</strong></IonText>
                                        </h3>
                                        <h2 class="ion-text-wrap"><strong>初期設定する</strong></h2>
                                        <p>今すぐ使えます</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItem v-else lines="none" button style="border-radius:10px;" class="ion-margin-top"
                                    router-link="/member/home">
                                    <IonIcon :icon="logInOutline" slot="start"></IonIcon>
                                    <IonLabel>
                                        <p>あなたは初期設定済み</p>
                                        <h2><strong>ホーム画面に移動</strong></h2>
                                    </IonLabel>
                                </IonItem>
                            </h2>
                            <h3 class="ion-text-center ion-padding-top">
                                <IonIcon :icon="chevronDown" size="large"></IonIcon>
                            </h3>
                        </IonLabel>
                    </div>
                </IonGrid>
            </div>
            <IonGrid fixed id="detail">
                <IonListHeader>
                    <IonLabel>
                        <strong style="font-weight:900;">Features</strong>
                        <p>本アプリの主な特徴</p>
                    </IonLabel>
                </IonListHeader>
                <IonList lines="none">
                    <IonItem class="ion-padding-top">
                        <IonIcon :icon="school" slot="start"></IonIcon>
                        <IonLabel>
                            <h1 class="ion-text-wrap"><strong>大学生が運営</strong></h1>
                            <h3 class="ion-text-wrap">
                                大学生目線での使いやすさを考えて開発を行っています。
                            </h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem class="ion-padding-top">
                        <IonIcon :icon="star" color="warning" slot="start"></IonIcon>
                        <IonLabel>
                            <h1 class="ion-text-wrap"><strong>すぐに開始。広告課金なし</strong></h1>
                            <h3 class="ion-text-wrap">
                                面倒くさいアカウント作成などはなく、すぐに始められます。(※ 1、※ 2)<br>また本サービスは、広告・課金無しで快適にご利用いただけます。(※ 3、※ 4)
                            </h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem class="ion-padding-top">
                        <IonIcon :icon="syncCircle" color="primary" slot="start"></IonIcon>
                        <IonLabel>
                            <h1><strong>パソコンでも使える</strong></h1>
                            <h3 class="ion-text-wrap">
                                ブラウザで使えるから、授業中に開いているパソコンで。電車や家で使っているスマホで。スマートに時間割を確認できます。QRコードで他の端末に授業をコピーできます。
                            </h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem class="ion-padding-top">
                        <IonIcon :icon="checkmarkCircle" color="success" slot="start"></IonIcon>
                        <IonLabel>
                            <h1><strong>本当に必要な機能のみ</strong></h1>
                            <h3 class="ion-text-wrap">
                                時間割管理機能にプラスし、他のアプリには（おそらく）ない、けど本当に必要な以下の機能を搭載。</h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem class="ion-padding-start">
                        <IonLabel>
                            <h3 class="ion-text-wrap">
                                <ul class="ion-text-wrap">
                                    <li>次の授業の情報をホーム画面ですぐ確認できる「Now」機能</li>
                                    <li>オンライン授業もホーム画面から 1 タップですぐ参加。</li>
                                    <li>パソコンでもスマホでも使える。QRコードで瞬時に授業転送。</li>
                                    <li>授業で使うWebサイトへのリンクを登録できる！</li>
                                    <li>2時限連続の授業など、複数の時限にある授業は、一回作成すればコピーできる（今後実装予定）</li>
                                    <li>オフライン対応、PWA対応（今後実装予定）</li>
                                </ul>
                                余計な機能ばかりの時間割アプリはやめて、Timetable を使ってみませんか？
                            </h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem class="ion-padding-top">
                        <IonIcon :icon="documents" color="danger" slot="start"></IonIcon>
                        <IonLabel>
                            <h1><strong>メモ</strong></h1>
                            <h3 class="ion-text-wrap">課題などをメモで管理できます。</h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem class="ion-padding-top">
                        <IonLabel>
                            <h3><strong>注意事項</strong></h3>
                            <p class="ion-text-wrap">(※ 1) 初期設定の際に、「利用規約」及び「プライバシーポリシー」をご確認、ご同意いただきます。</p>
                            <p class="ion-text-wrap">(※ 2) すべてのデータがブラウザ内のデータ保存領域 (IndexedDB) に保存されます。</p>
                            <p class="ion-text-wrap">(※ 3)
                                データをユーザー様がお使いのブラウザ内に保持することで、会員情報管理、データベース管理などをなくし、セキュリティ管理を最小限で実現できるようになり、クラウドサービスを使用しないことで費用をカットしています。
                            </p>
                            <p class="ion-text-wrap">(※ 4) 本サービス使用時に発生する通信費は、ユーザー様の負担となります。</p>
                            <p class="ion-text-wrap ion-padding-top">※
                                実際に大学生が大学生活を送りながらワンオペで運営しています。そのため不具合の修正などに時間を要することがあります。</p>
                            <p class="ion-text-wrap">※
                                <a href="/info/terms?closebutton=1" target="_blank">利用規約</a>
                                にも記載しておりますが、本サービスは全てあなたの責任のもとにご利用いただきます。本サービスの不具合、ユーザー様の操作ミスなどにより、ユーザー様が落単などの不利益を被ったとしても運営者は一切の責任を負いません。
                            </p>
                        </IonLabel>
                    </IonItem>
                </IonList>
                <div class="ion-padding">
                    <div class="ion-text-center" v-if="!state.isInited">
                        <p><strong>＼ まずは使ってみよう ／</strong></p>
                        <IonItem lines="none" button color="dark"
                            style="border-radius:10px;box-shadow:0 0 10px rgba(255,255,255,0.7)" router-link="/start">
                            <IonIcon :icon="rocketOutline" slot="start"></IonIcon>
                            <IonLabel>
                                <h3>
                                    <IonText color="primary"><strong>すぐにできます！</strong></IonText>
                                </h3>
                                <h2 class="ion-text-wrap"><strong>初期設定する</strong></h2>
                            </IonLabel>
                        </IonItem>
                    </div>
                    <IonItem v-else lines="none" button color="light" style="border-radius:10px;" class="ion-margin-top"
                        router-link="/member/home">
                        <IonIcon :icon="logInOutline" slot="start"></IonIcon>
                        <IonLabel>
                            <p>あなたは初期設定済み</p>
                            <h2><strong>ホーム画面に移動</strong></h2>
                        </IonLabel>
                    </IonItem>
                </div>
                <div class="ion-text-center ion-padding">
                    <IonLabel class="ion-text-wrap">
                        <p>&copy; 2024-present <a href="https://x.com/OPSTIDTimetable" target="_blank">OPSTID</a></p>
                    </IonLabel>
                    <IonLabel class="ion-text-wrap ion-margin-top">
                        <p>LINEヤフー株式会社及び、Fontworks、Fontrix、LINE CREATIVE CENTERが制作した、<a
                                href="https://seed.line.me/index_jp.html" target="_blank"><strong>LINE Seed
                                    JP</strong></a>
                            フォントをOFLライセンスのもとに使用しています。</p>
                    </IonLabel>
                </div>
            </IonGrid>

        </IonContent>
    </IonPage>
</template>
<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0
    }

    to {
        opacity: 1;
    }
}

.fade-in {
    animation: fadeIn 2s;
}
</style>
<script setup lang="ts">
import { IonButton, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonSpinner, IonText, IonThumbnail } from '@ionic/vue';
import { checkmarkCircle, chevronDown, alertCircle, chevronForward, documents, documentsOutline, happyOutline, laptopOutline, logInOutline, logoTwitter, rocketOutline, school, star, syncCircle } from 'ionicons/icons';
import { onMounted, onUnmounted, reactive } from 'vue';

import { db } from '../db';

const state = reactive({
    // 初期設定済みかどうか
    isInited: false,
    // 初期設定済み情報が読み込み済みかどうか
    isLoaded: false
})

const checkInited = async () => {
    // 取得
    const result = await db.kvs.get("isInited")
    if (!!result) {
        // 記録がある場合は、それに応じて設定
        state.isInited = <boolean>result.value
    } else {
        state.isInited = false
    }
    setTimeout(() => state.isLoaded = true, 500)
}
// 初期設定済みかどうかを定期的に取得する
const isInitedInterval = setInterval(checkInited, 2000)
// 初回チェック
checkInited()

// ページを閉じるとき、インターバルを終了
onUnmounted(() => clearInterval(isInitedInterval))
</script>