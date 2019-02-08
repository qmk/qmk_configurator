<template>
  <div class="backend-status">
    <div class="bes-title">Server Status:</div>
    <div :class="{ 'bes-status': true, 'bes-error': hasError }">
      {{ status }}
    </div>
    <div class="bes-version">
      API Version:<span class="version-num">{{ version }}</span>
    </div>
    <div class="bes-jobs">{{ jobs }}</div>
  </div>
</template>
<script>
import axios from 'axios';
import escape from 'lodash/escape';
import template from 'lodash/template';
import { backend_status_url } from '@/store/modules/constants';
/**
 * checkStatus - check status component to poll API for errors and status
 * @return {object} Vue app component
 */
export default {
  name: 'status-bar',
  methods: {
    getPollInterval() {
      return 25000 + 5000 * Math.random();
    },
    fetchData() {
      axios
        .get(backend_status_url)
        .then(({ data }) => {
          var localTime = new Date(data.last_ping).toTimeString();
          var stat = data.status;
          stat = stat === 'running' ? 'UP' : stat;
          this.status = escape(`${stat} @ ${localTime}`);
          this.version = data.version;
          this.jobs = template('<%= queue_length %> job(s) running')(data);
          this.hasError = false;
        })
        .catch(json => {
          var localTime = new Date().toTimeString();
          this.status = `DOWN @ ${localTime}`;
          this.hasError = true;
          console.error('API status error', json);
        });
      setTimeout(this.fetchData, this.getPollInterval());
    }
  },
  data: () => {
    return {
      status: 'Checking',
      version: '0.1',
      jobs: '...',
      hasError: false
    };
  },
  mounted() {
    setTimeout(this.fetchData, 1000);
  }
};
</script>
