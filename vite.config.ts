import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
// PWA support
/*import { VitePWA, VitePWAOptions } from "vite-plugin-pwa"

// PWA Config
const pwaOptions: Partial<VitePWAOptions> = {
  manifest:{
    name: "OPSTID",
    short_name:"OPSTID",
    description: "Manage your time.",
    icons:[
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'icon-256x256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    start_url:"/",
    background_color: "#fff",
    theme_color:"#fff",
    lang:"ja"
  },
  includeAssets:['/opstid_icon.svg']
}*/

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    // VitePWA(pwaOptions)
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
