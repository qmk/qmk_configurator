import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import config from './ga-development';

export default {
  init(router) {
    Vue.use(VueAnalytics, {
      id: config.id,
      router
    });
  }
};
