import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import config from './ga-development';

export default {
  init() {
    Vue.use(VueAnalytics, {
      id: config.id,
      autoTracking: {
        screenview: true
      },
      debug: {
        sendHitTask: process.env.NODE_ENV === 'production'
      }
    });
  }
};
