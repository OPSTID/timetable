const autoUpdate = async (forceUpdate: boolean = false) => {
    // 最終アップデート日を記録するlocalStorageのキー
    const lastUpdateDateLocalStorageKey = "timetable.opstid.com:lastUpdateDate"
    // 今日の年月日を取得
    const date = new Date()
    const YYYY = String(date.getFullYear())
    const MM = String(date.getMonth() + 1).length === 1 ? "0" + String(date.getMonth() + 1) : String(date.getMonth() + 1)
    const DD = String(date.getDate()).length === 1 ? "0" + String(date.getDate()) : String(date.getDate())
    const YYYYMMDD = YYYY + MM + DD

    // キャッシュストレージ及びservice worker を削除
    // 削除すると自動で最新版がサーバーから取得される
    const clearCache = () => {
        console.log("[OPSTID Timetable] Cache Cleared")
        // https://qiita.com/igara/items/9564008194c74e12551e
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            // 登録されているworkerを全て削除する
            for (let registration of registrations) {
                registration.unregister();
            }
        });
        caches.keys().then(function (keys) {
            var promises = [];
            // キャッシュストレージを全て削除する
            keys.forEach(function (cacheName) {
                if (cacheName) {
                    promises.push(caches.delete(cacheName));
                }
            });
        })

        // 最終アップデート日を記録
        localStorage.setItem(lastUpdateDateLocalStorageKey, YYYYMMDD)
        // ページをリロード
        location.reload()
    }

    // ローカルストレージから最終アップデート日を取得
    const lastUpdateDate = localStorage.getItem(lastUpdateDateLocalStorageKey)

    // forceUpdate = true なら強制アップデートする
    if (forceUpdate) {
        clearCache()
    }
    // 最終更新日の記録があるとき
    else if (!!lastUpdateDate) {
        // 最終更新日!=今日 かつ オンラインならキャッシュ削除を実行
        if (lastUpdateDate !== YYYYMMDD && navigator.onLine) {
            clearCache()
        }
    }
    else {
        // 記録がないとき
        // オンラインなら更新を実行
        if (navigator.onLine) {
            clearCache()
        }
    }

}


export default autoUpdate