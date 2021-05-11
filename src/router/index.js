import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Print from '../views/Print.vue';
import Test from '../views/Test.vue';

const router = createRouter({
  hash: createWebHashHistory(),
  routes: [
    { path: '/:keyboardP(.+)/:layoutP(.+)', component: Home, name: 'home' },
    { path: '/print', component: Print, name: 'print' },
    { path: '/test', component: Test, name: 'test' },
    { path: '/:pathMatch(.*)*', component: Home }
  ]
});
export default router;
