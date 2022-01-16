import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import('../views/Home.vue');
const Print = () => import('../views/Print.vue');
const Test = () => import('../views/Test.vue');

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/:keyboardP(.+)/:layoutP(.+)', component: Home, name: 'home' },
    { path: '/print', component: Print, name: 'print' },
    { path: '/test', component: Test, name: 'test' },
    { path: '*', component: Home }
  ]
});
