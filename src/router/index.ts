import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/index.vue')
  },
  {
    path: '/fond/:id',
    name: 'fond',
    component: () => import('@/pages/fond/index.vue')
  }
];

const router = new VueRouter({
  // mode: 'history',
  // base: '/',
  routes,
});

export default router;
