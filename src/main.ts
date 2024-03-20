import { createApp } from 'vue'
import { createHead } from '@unhead/vue';

import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import { VueRecaptchaPlugin } from 'vue-recaptcha';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './theme/style.css';

/* make toolbar responsive */
import ionToolbarResponsive from './lib/ion-toolbar-responsive';

const app = createApp(App)
  .use(IonicVue, {
    mode: 'ios',
    swipeBackEnabled:false
  })
  .use(router)
  // recaptcha settings
  /*.use(VueRecaptchaPlugin, {
    v2SiteKey:"6LdHlmEpAAAAAIHE0L6W3JQMr7rOBUBLOvI8oJf4"
  })*/

// use @unhead/vue for vue-recaptcha
const head = createHead()
app.use(head)
  
router.isReady().then(() => {
  setTimeout(() => app.mount('#app'), 700)
});

const ionToolbarResponsiveInterval = ionToolbarResponsive()