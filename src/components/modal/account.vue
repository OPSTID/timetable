<template>
    <IonHeader translucent>
        <IonToolbar>
            <IonTitle>アカウントの管理</IonTitle>
            <IonButtons slot="end">
                <IonButton @click="props.dismiss"><strong>完了</strong></IonButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader>
    <IonContent color="light">
        <IonList inset lines="full">
            <IonItem>
                <IonAvatar slot="start">
                    <img src="https://api.dicebear.com/7.x/thumbs/svg?seed=Tinkerbell">
                </IonAvatar>
                <IonLabel>
                    <h1><strong>あいうえお</strong></h1>
                    <p>@super-flower#03512</p>
                </IonLabel>
            </IonItem>
        </IonList>
        <IonListHeader>
            <IonLabel>
                登録情報
            </IonLabel>
            <IonButton style="margin-bottom:0.6em">編集</IonButton>
        </IonListHeader>
        <IonList inset lines="none">
            <IonItem>
                <IonLabel>
                    <p>学校</p>
                    東京大学
                </IonLabel>
            </IonItem>
            <IonItem lines="full">
                <IonLabel>
                    <p>学年（年度毎に自動的に変更されます）</p>
                    大学2年
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel>
                    <p>登録いただいたデータは運営者が利用者の属性を統計的に分析する際にのみ利用し、それ以外の目的で利用することはありません。詳しくは、<router-link
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
    </IonContent>
</template>
<script setup lang="ts">
import { IonAlert, IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonText, IonTitle, IonToolbar, alertController, loadingController, toastController } from '@ionic/vue';
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