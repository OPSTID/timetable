import { db } from "@/db"
import { alertController } from "@ionic/vue"
import { useRouter } from "vue-router"

// 初期登録が完了しているか確認する
export const checkInited = async () => {
    const router = useRouter()

    const result = await db.kvs.get("isInited")
    // 初期登録済みの場合
    if (!!result && result.value === true) {
        return true
    } else {
        // 初期登録済みでない場合は、初期登録画面に移動しエラーを表示

        // 初期登録ページに移動
        router.replace("/start")

        const alert = await alertController.create({
            header: "初期登録が完了していません",
            message: "初期登録が必要です。今すぐ初期登録して時間割アプリ Timetable を活用しよう。",
            buttons: [
                "初期登録する"
            ],

        })
        alert.present()
    }
}