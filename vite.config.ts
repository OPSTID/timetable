import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
// PWA support
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa"

// PWA Config
const pwaOptions: Partial<VitePWAOptions> = {
  manifest:{
    name: "OPSTID Timetable",
    short_name:"Timetable",
    description: "Manage your time.",
    icons:[
      {
        src: 'img/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'img/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: 'img/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    start_url:"/pwa",
    background_color: "#fff",
    theme_color:"#fff",
    lang:"ja"
  },
  includeAssets:[
    'img/apple-touch-icon.png',
    'img/icon-192x192.png',
    'img/icon-256x256.png',
    'img/icon-512x512.png',
    'img/icon.png',
    'img/icon.svg',
    'img/icon_one.png',
    'img/icon_one.svg',
    'img/opstid_icon.svg',
    'img/appname.svg',
    'img/qrcode_timetable.opstid.com.png',
    'font/LINESeedJP/WOFF/LINESeedJP_OTF_Bd.woff',
    'font/LINESeedJP/WOFF/LINESeedJP_OTF_Eb.woff',
    'font/LINESeedJP/WOFF/LINESeedJP_OTF_Rg.woff',
    'font/LINESeedJP/WOFF/LINESeedJP_OTF_Th.woff',
    'font/LINESeedJP/WOFF2/LINESeedJP_OTF_Bd.woff2',
    'font/LINESeedJP/WOFF2/LINESeedJP_OTF_Eb.woff2',
    'font/LINESeedJP/WOFF2/LINESeedJP_OTF_Rg.woff2',
    'font/LINESeedJP/WOFF2/LINESeedJP_OTF_Th.woff2',
    "/.well-known/assetlinks.json"
  ]
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    VitePWA(pwaOptions)
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // @ts-ignore
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
