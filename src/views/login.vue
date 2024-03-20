<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>{{ state.tab === "login" ? "ログイン" : "ようこそ" }}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent color="light" fullscreen>
            <IonGrid fixed>
                <IonHeader collapse="condense" class="ion-margin-bottom">
                    <IonToolbar color="transparent">
                        <IonTitle size="large">
                            <IonLabel>
                                <span class="timetable-gradient-text">Hello.</span>
                            </IonLabel>
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div class="ion-text-center">
                    <strong>
                        <IonLabel>
                            <p>Timetable のある生活をはじめよう。</p>
                        </IonLabel>
                    </strong>
                </div>
                <IonSegment v-model="state.tab" class="ion-top">
                    <IonSegmentButton value="login">ログイン</IonSegmentButton>
                    <IonSegmentButton value="signup">新規登録</IonSegmentButton>
                </IonSegment>
                <div v-if="state.tab === 'login'">
                    <IonList inset>
                        <IonItem>
                            <IonLabel>
                                <h2><strong>Welcome🎉</strong></h2>
                                <p class="ion-text-wrap">登録済みのメールアドレスとパスワードを入力して「ログイン」をタップしてください</p>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                    <IonList inset lines="full">
                        <IonItem>
                            <IonInput v-model="state.loginTab.input.email" label="メールアドレス" label-placement="fixed"
                                type="email" placeholder="example@opstid.com"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput v-model="state.loginTab.input.password" label="パスワード" label-placement="fixed"
                                type="password" placeholder="必須"></IonInput>
                        </IonItem>
                    </IonList>
                    <p class="ion-padding">
                        <IonButton @click="login" expand="block" color="dark"
                            :disabled="!state.loginTab.input.email || !state.loginTab.input.password"><strong>ログイン</strong>
                        </IonButton>
                    </p>

                    <IonList inset>
                        <IonItem>
                            <IonLabel>
                                <strong>自分の端末以外で使用する方へ</strong>
                                <p class="ion-text-wrap">
                                    ログインすると、最大60日間ログインしたままになります。あなたのアカウントへの不正アクセスを防ぐため、<strong><u>他人の端末やネットカフェなどでログインする場合は、操作終了後に必ずログアウトしてください。</u></strong>
                                </p>
                            </IonLabel>
                        </IonItem>
                    </IonList>

                    <IonList item inset lines="none">
                        <IonItem href="https://api.timetable.opstid.com/screen/password-recovery" target="_blank">
                            <IonIcon color="primary" :icon="key" slot="start"></IonIcon>
                            <IonText color="primary">パスワードをお忘れの方</IonText>
                        </IonItem>
                        <IonItem href="https://about.timetable.opstid.com/support/login-trouble" target="_blank">
                            <IonIcon color="primary" :icon="informationCircle" slot="start"></IonIcon>
                            <IonText color="primary">ログインでお困りの方</IonText>
                        </IonItem>
                    </IonList>
                </div>
                <div v-else-if="state.tab === 'signup'">
                    <div class="timetable-gradient ion-padding ion-margin" style="border-radius:10px;">
                        <IonLabel>
                            <h1 style="color:white"><strong>学生生活をもっと便利に。</strong></h1>
                            <p class="ion-text-wrap" style="color:white;opacity:0.7">Timetable アカウントで使用したいメールアドレスとご希望のパスワードを入力してください</p>
                        </IonLabel>
                    </div>
                    <IonList inset>
                        <IonItem>
                            <IonInput v-model="state.signupTab.input.email" type="email" placeholder="example@opstid.com"
                                label="メールアドレス" label-placement="fixed"></IonInput>
                            <!--入力内容が正しいかどうか表示-->
                            <IonIcon v-if="state.signupTab.isValidEmail()" :icon="checkmarkCircle" color="success">
                            </IonIcon>
                            <IonIcon v-else :icon="alertCircle" color="danger"></IonIcon>
                        </IonItem>
                        <IonItem>
                            <IonInput v-model="state.signupTab.input.password" type="password" label-placement="fixed"
                                label="パスワード" placeholder="必須" :maxlength="50"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <p class="ion-text-wrap">パスワードは、8文字以上50文字以下の英数字を使用できます</p>
                            </IonLabel>
                            <!--入力内容が正しいかどうか表示-->
                            <IonIcon v-if="!!state.signupTab.input.password.match(/^[a-zA-Z0-9.?/-]{8,50}$/)"
                                :icon="checkmarkCircle" color="success"></IonIcon>
                            <IonIcon v-else :icon="alertCircle" color="danger"></IonIcon>
                        </IonItem>
                    </IonList>
                    <IonList inset>
                        <IonItem>
                            <IonLabel>
                                <p class="ion-text-wrap">確認のため、もう一度パスワードを入力してください</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonInput v-model="state.signupTab.input.passwordConfirm" type="password"
                                label-placement="fixed" label="パスワード" placeholder="必須"></IonInput>

                            <!--入力内容が正しいかどうか表示-->
                            <IonIcon
                                v-if="state.signupTab.input.password === state.signupTab.input.passwordConfirm && !!state.signupTab.input.passwordConfirm"
                                :icon="checkmarkCircle" color="success"></IonIcon>
                            <IonIcon v-else :icon="alertCircle" color="danger"></IonIcon>
                        </IonItem>
                    </IonList>
                    <IonList inset>
                        <IonItem lines="none">
                            <IonLabel>
                                <p class="ion-text-wrap">下のチェックボックスをクリックしてロボットでないことを証明してください🤖</p>
                            </IonLabel>
                            <!--入力内容が正しいかどうか表示-->
                            <IonIcon v-if="state.signupTab.isCompletedRecaptcha()" :icon="checkmarkCircle" color="success">
                            </IonIcon>
                            <IonIcon v-else :icon="alertCircle" color="danger"></IonIcon>
                        </IonItem>
                        <IonItem class="ion-padding-bottom">
                            <!--recaptcha-->
                            <Checkbox v-model="state.signupTab.input.recaptchaResponse"></Checkbox>
                        </IonItem>
                    </IonList>
                    <IonListHeader>必ずご確認ください</IonListHeader>
                    <IonList inset>
                        <IonItem button>
                            <IonText color="danger"><strong>利用規約</strong></IonText>
                        </IonItem>
                        <IonItem button>
                            <IonText color="danger"><strong>プライバシーポリシー</strong></IonText>
                        </IonItem>
                    </IonList>
                    <div class="ion-padding ion-text-center">
                        <IonLabel>
                            <p><strong>利用規約・プライバシーポリシーに同意し</strong></p>
                        </IonLabel>
                        <IonButton expand="block" color="dark" :disabled="!state.signupTab.isActiveSignupButton()"
                            @click="signup"><strong>アカウントを作成</strong>
                        </IonButton>
                    </div>
                    <IonList inset>
                        <IonItem>
                            <IonLabel class="ion-text-wrap">
                                <p>入力いただいたメールアドレス、パスワードは次回以降のログインで必要になりますのでお忘れにならないようにお願い致します🙇‍♀</p>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </div>
                <div v-else>
                    <div class="ion-padding ion-margin-top ion-text-center">
                        <IonLabel>
                            <p><strong>まずはアカウントなしで試してみよう🎉</strong></p>
                        </IonLabel>
                        <IonButton expand="block" color="dark">
                            <strong>アカウントなしではじめる</strong>
                        </IonButton>
                    </div>
                    <IonList inset>
                        <IonItem>
                            <IonLabel>
                                <strong class="ion-text-wrap">ご確認ください</strong>
                                <p class="ion-text-wrap">ログイン・アカウント作成をせずにTimetableを使用できます。ただし、以下の制限事項がございますのでご確認ください。</p>
                                <p class="ion-text-wrap">
                                <ul>
                                    <li>
                                        <IonText color="danger"><strong>複数端末・複数ブラウザ間での同期</strong></IonText>ができません。
                                    </li>
                                    <li>すべてのデータが現在ご利用のブラウザ内に保存されるため、ブラウザのデータが削除されると、<IonText color="danger">
                                            <strong>時間割や課題の情報が消滅します。</strong></IonText>
                                    </li>
                                    <li>その他、今後実装を計画している機能（通知機能など）を利用できない可能性があります。</li>
                                    <li>
                                        <IonText color="primary">お試し目的のみでの利用を推奨しています。</IonText>
                                    </li>
                                </ul>
                                </p>
                                <p class="ion-text-wrap">
                                    なお、アカウントなしで利用開始後、設定画面でTimetableアカウントを新規作成し、そのアカウントに、すでに作成済みの時間割・課題を引き継ぐことができます。既存のアカウントへの引き継ぎはできません。
                                </p>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </div>
                <IonLabel class="ion-margin">
                    <p class="ion-text-center" style="display:flex;align-items:center;justify-content: center;">
                        <img src="/img/icon-one.svg" style="width:30px;margin-right:0.3em"> by
                        <img src="/img/opstid_icon.svg" style="width:30px;margin-left:0.5em;">
                    </p>
                    <p class="ion-text-center">&copy; 2024-present <a href="https://x.com/opstid_dev"
                            target="_blank">OPSTID</a>.</p>
                </IonLabel>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import { IonAvatar, IonButton, IonCheckbox, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar, loadingController, toastController } from '@ionic/vue';
import { alertCircle, checkmarkCircle, chevronForward, informationCircle, key, logoApple, logoGoogle } from 'ionicons/icons';
import { Checkbox } from 'vue-recaptcha'

import { reactive } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

// URLパラメータ `tab` でタブが指定されている場合はそのタブを使用する
const tab = route.query["tab"] === "signup" ? "signup" : "login"

const state = reactive({
    // ログイン or 新規登録 タブ
    tab: <"login" | "signup">tab,
    loginTab: {
        input: {
            email: "",
            password: ""
        }
    },
    signupTab: {
        input: {
            email: "",
            password: "",
            passwordConfirm: "",
            recaptchaResponse: ""
        },
        isValidEmail() {
            // メールアドレスが有効化確認
            return !!state.signupTab.input.email.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)
        },
        isValidPassword() {
            // パスワードが入力されているか確認
            const isFilledPassword = !!state.signupTab.input.password
            // パスワードとパスワード確認が一致している確認
            const passwordConfirm = state.signupTab.input.password == state.signupTab.input.passwordConfirm
            // パスワードの条件を確認（8文字以上50文字以下の英数字）
            const isValidPasswordPattern = !!state.signupTab.input.password.match(/^[a-zA-Z0-9.?/-]{8,50}$/)

            return isFilledPassword && passwordConfirm && isValidPasswordPattern
        },
        isCompletedRecaptcha() {
            // recaptcha認証済みか確認
            return !!state.signupTab.input.recaptchaResponse
        },
        isActiveSignupButton: () => {
            // 新規登録を有効化する条件を指定


            return state.signupTab.isValidEmail() && state.signupTab.isValidPassword() && state.signupTab.isCompletedRecaptcha()
        }
    }
})

const login = async () => {
    const loading = await loadingController.create({
        message: "ログイン中",
    })
    await loading.present()
    setTimeout(async () => {
        loading.dismiss()
        const toast = await toastController.create({
            message: "ログインしました",
            color: "dark",
            duration: 2000
        })
        toast.present()
        router.replace("/member")
    }, 1000)
}

const signup = async () => {
    const loading = await loadingController.create({
        message: "アカウントを作成しています...",
    })
    await loading.present()
    setTimeout(() => {
        loading.dismiss()
        router.replace("/home")
    }, 1000)
}
</script>