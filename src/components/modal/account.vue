<template>
    <IonHeader translucent class="ion-no-border">
        <IonToolbar class="timetable-gradient">
            <IonTitle>アカウントの管理</IonTitle>
            <IonButtons slot="end">
                <IonButton @click="props.dismiss"><strong>完了</strong></IonButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader>
    <IonContent color="light">
        <!--ログイン済みの場合-->
        <div v-if="true">
            <IonList inset lines="full">
                <IonItem>
                    <IonAvatar slot="start">
                        <img src="https://api.dicebear.com/7.x/thumbs/svg?seed=Tinkerbell">
                    </IonAvatar>
                    <IonLabel>
                        <p><strong>Timetable Account</strong></p>
                        <h1><strong class="timetable-gradient-text" style="font-weight:900">あいうえお</strong></h1>
                        <p>@super-flower#03512</p>
                    </IonLabel>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel>
                        <p>学校</p>
                        東京大学
                    </IonLabel>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel>
                        <p>学年（年度毎に自動的に変更されます）</p>
                        大学2年
                    </IonLabel>
                </IonItem>
                <IonItem button>
                    <IonLabel slot="end">
                        <strong>登録内容を変更する</strong>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        <p class="ion-text-wrap">登録いただいたデータは運営者が本アプリの利用動向を分析する際にのみ利用し、それ以外の目的で利用することはありません。詳しくは、<router-link
                                to="/">利用規約</router-link> をご確認ください。</p>
                    </IonLabel>
                </IonItem>
            </IonList>
            <IonList inset lines="none">
                <IonItem button @click="logout">
                    <IonLabel>
                        <IonText color="danger">ログアウト</IonText>
                    </IonLabel>
                </IonItem>
                <IonItem href="https://api.timetable.opstid.com/auth/delete.php">
                    <IonLabel>
                        <IonText color="danger">アカウントを削除する</IonText>
                    </IonLabel>
                </IonItem>
            </IonList>
        </div>
        <!--ログインしていない場合-->
        <div v-else>
            <IonList inset>
                <IonItem>
                    <IonLabel class="ion-text-wrap">
                        <h3><strong>ログインしていません</strong><br>すべてのデータがブラウザ内に保存されています。</h3>
                    </IonLabel>
                </IonItem>
            </IonList>
            <IonList inset>
                <IonItem button color="primary">
                    <IonIcon :icon="addCircle" slot="start"></IonIcon>
                    <IonLabel>
                        <strong>アカウントを作成</strong>
                        <p class="ion-text-wrap">新しくTimetable アカウントを作成して、時間割・課題をアカウントに保存できます。</p>
                    </IonLabel>
                </IonItem>
                <IonItem button>
                    <IonIcon :icon="reloadCircle" slot="start"></IonIcon>
                    <IonLabel>
                        <h3 class="ion-text-wrap">既存のアカウントにログイン</h3>
                        <p class="ion-text-wrap">既存のアカウントにログインすると、このブラウザで作成した時間割・課題が <IonText color="danger"><strong>すべて削除されます</strong></IonText></p>
                    </IonLabel>
                </IonItem>
            </IonList>
        </div>
    </IonContent>
</template>
<script setup lang="ts">
import { IonAlert, IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonText, IonTitle, IonToolbar, alertController, loadingController, toastController } from '@ionic/vue';
import { addCircle, addCircleOutline, chevronForward, reloadCircle } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps<{
    dismiss: Function
}>()

const logout = async () => {
    const alert = await alertController.create({
        "header": "ログアウト",
        "subHeader": "再度ログインが必要です",
        "message": "ログアウトしてもよろしいですか？",
        "buttons": [
            {
                text: "ログアウト",
                async handler() {
                    const loading = await loadingController.create({
                        message: "ログアウト..."
                    })
                    await loading.present()
                    setTimeout(async () => {
                        loading.dismiss()
                        const toast = await toastController.create({
                            message: "ログアウトしました",
                            duration: 1500,
                            position: "bottom",
                            color: "dark"
                        })
                        await toast.present()
                        // モーダルを閉じる
                        props.dismiss()
                        router.push("/login")
                    }, 500)
                }
            },
            "キャンセル"
        ]
    })

    alert.present()
}
</script>