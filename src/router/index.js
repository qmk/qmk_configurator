import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Print from '../views/Print.vue';
import Test from '../views/Test.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/:keyboardP(.+)/:layoutP(.+)', component: Home, name: 'home' },
    { path: '/print', component: Print, name: 'print' },
    { path: '/test', component: Test, name: 'test' },
    { path: '*', component: Home }
  ]
});
