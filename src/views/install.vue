<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton default-href="/" text="戻る"></IonBackButton>
                </IonButtons>
                <IonTitle>
                    インストール
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonGrid fixed>
                <IonListHeader>
                    <IonLabel class="ion-text-wrap">
                        <h1 class="timetable-gradient-text" style="font-weight:900"><strong>インストールをはじめよう</strong></h1>
                        <h3>インストールは1分で終わります！使っている端末の種類を選んでください↓</h3>
                    </IonLabel>
                </IonListHeader>

                <IonAccordionGroup>
                    <IonAccordion value="ios">
                        <IonItem slot="header" color="light">iOS の場合</IonItem>
                        <p slot="content">
                        <ol>
                            <li>Safari でこのページを開いているかを確認します。</li>
                            <li>画面下中央にある、<IonIcon :icon="shareOutline" size="large" color="primary"></IonIcon> をタップします<br>
                                <img src="/img/install/ios-step2.png" style="width:100%;max-width:300px;">
                            </li>
                            <li>表示された画面を下にスクロールし、<strong>ホーム画面に追加</strong> をタップします。<br>
                                <img src="/img/install/ios-step3.png" style="width:100%;max-width:250px;"></li>
                            <li>表示された画面の右上にある、<strong>追加</strong> をタップするとインストール完了です<br>
                                <img src="/img/install/ios-step4.png" style="width:100%;max-width:250px;"></li>
                            <li>スマートフォンのホーム画面にあるTimetableのアイコンをタップして初期設定をはじめましょう！<br>
                                <img src="/img/install/ios-step5.png" style="width:100%;max-width:250px;"></li>
                        </ol>
                        </p>
                    </IonAccordion>
                    <IonAccordion value="android">
                        <IonItem slot="header" color="light">Android の場合</IonItem>
                        <p slot="content">
                        <ol>
                            <li>Google Chrome でこのページを開いているかを確認します。</li>
                            <li>画面右上にある、<strong>︙</strong> をタップします。<br>
                                <img src="/img/install/android-step2.png" style="width:100%;max-width:300px;">
                            </li>
                            <li>表示されたメニューの <strong>アプリをインストール</strong> をタップします。<br>
                                <img src="/img/install/android-step3.png" style="width:100%;max-width:300px;"></li>
                            <li>表示された画面の右下にある、<strong>インストール</strong> をタップするとインストール完了ですbr>
                                <img src="/img/install/android-step4.png" style="width:100%;max-width:300px;"></li>
                            <li>スマートフォンのホーム画面にあるTimetableのアイコンをタップして初期設定をはじめましょう！<br>
                                <img src="/img/install/android-step5.png" style="width:100%;max-width:300px;"></li>
                        </ol>
                        </p>
                    </IonAccordion>
                    <IonAccordion value="pc">
                        <IonItem slot="header" color="light">パソコンの場合</IonItem>
                        <p slot="content">
                        <ol>
                            <li>Google Chrome でこのページを開いているかを確認します。</li>
                            <li>画面右上にある、<strong>︙</strong> をタップします。
                            </li>
                            <li>表示されたメニューの <strong>保存して共有→OPSTID Timetable をインストール</strong> の順にクリックします。</li>
                            <li>表示された画面の、<strong>インストール</strong> をタップするとインストール完了です</li>
                            <li><router-link to="/start">ここをクリックして、</router-link>初期設定をはじめましょう！</li>
                        </ol>
                        </p>
                    </IonAccordion>
                </IonAccordionGroup>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import { IonAccordion, IonAccordionGroup, IonBackButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonListHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { shareOutline, addCircle } from 'ionicons/icons';

</script>