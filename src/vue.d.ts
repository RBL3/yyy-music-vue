import { AxiosInstance } from 'axios';
import Toast from 'muse-ui-toast';
import { Store } from 'vuex'
import { StoreInfo } from '@/store'
import { tools } from '@/plugin/tools'
import VueRouter, { Route } from 'vue-router'

declare module '@vue/composition-api' {
  interface ComponentInstance {
    [x: string]: any;
    $request: AxiosInstance;
    $toast: Omit<Toast, 'install'>;
    $store: Store<StoreInfo>;
    $tools: typeof tools;
    $router: VueRouter;
    $route: Route
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $request: AxiosInstance;
  }
}
