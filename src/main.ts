import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import APlayer from '@moefe/vue-aplayer';

import App from './App.vue';
import router from './router';
import store from './store'
// plugin
import requestPlugin from '@/plugin/request';
import museuiPlugin from '@/plugin/museUIPlugin'
// icon
import '@/icons'

import '@/style/index.less'

Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: false,
});
Vue.use(VueCompositionApi);
Vue.use(requestPlugin);
Vue.use(museuiPlugin)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
