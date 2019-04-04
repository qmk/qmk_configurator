import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/:keyboardP(.+)/:layoutP(.+)', component: Home, name: 'home' },
    { path: '/', component: Home, name: 'home' }
  ]
});
