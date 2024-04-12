import { db } from '@/db';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    // LP
    path: '/',
    component: () => import("@/views/index.vue")
  },
  // インストール
  {
    path: '/install',
    component: () => import("@/views/install.vue")
  },
  {
    // PWAで起動
    path: '/pwa',
    component: () => import("@/views/pwa.vue")
  },
  {
    path: '/member',
    redirect: '/member/home'
  },
  // メインページ
  {
    path: '/member',
    component: () => import("@/MainTab.vue"),
    children: [
      // ホーム画面
      {
        path: '/member/home',
        component: () => import("@/views/member/home.vue")
      },
      // To-do
      {
        path: '/member/memo',
        component: () => import("@/views/member/memo.vue")
      },
      // メニュー
      {
        path: '/member/menu',
        component: () => import("@/views/member/menu.vue")
      }
    ]
  },

  // サブページ
  /* 初期登録済み専用ページ*/

  // 時間割を選択
  {
    path: '/member/change-timetable',
    component: () => import("@/views/member/change-timetable.vue")
  },
  // 時限詳細
  {
    path: '/member/period/:day/:period',
    component: () => import("@/views/member/periodDetail.vue")
  },
  // 時限のQRコード
  {
    path: '/member/period/:day/:period/qrcode',
    component: () => import("@/views/member/periodQRCode.vue")
  },
  // QRリーダー
  {
    path: "/member/qr-reader",
    component: () => import("@/views/member/qr-reader.vue")
  },
  // 設定
  {
    path: '/member/settings',
    component: () => import("@/views/member/settings.vue")
  },

  /* 初期登録済み専用ページ終了 */
  // 初期登録ページ
  {
    path: '/start',
    component: () => import("@/views/start.vue")
  },
  // アプリのQRコード
  {
    path: '/app-qrcode',
    component: () => import("@/views/app-qrcode.vue")
  },
  // マークダウンの表示
  {
    path: '/info/:markdownName',
    component: () => import("@/views/info.vue")
  },
  // 開発者ツール
  {
    path: '/dev-tools',
    component: () => import("@/views/developer-tools.vue")
  },

  // Not found
  {
    path:"/:pathMatch(.*)*",
    component: () => import("@/views/notfound.vue")
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  // "/member" 配下のパス（初期設定済み専用ページ）へアクセスするときは、初期登録が完了しているかを確認
  if(to.path.match(/^\/member\/.*/)){
    const result = await db.kvs.get("isInited")
    // 初期登録済みの場合
    if (!!result && result.value === true) {
        // 通常通りナビゲート
        next()
    } else {
        // 初期登録済みでない場合は、初期登録画面に移動
        next("/start")
    }
  } else {
    // 初期設定済み専用ページ以外は通常通りナビゲート
    next()
  }
})

export default router
