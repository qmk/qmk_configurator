import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import config from './ga-development';

export default {
  init() {
    if (process.env.NODE_ENV === 'production') {
      Vue.use(VueAnalytics, {
        id: config.id
      });
    }
  }
};
