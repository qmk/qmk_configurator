<template>
  <div class="backend-status">
    <div class="bes-title">{{ $t('message.serverStatus') }}:</div>
    <div :class="{ 'bes-status': true, 'bes-error': hasError }">
      {{ status }}
    </div>
    <div class="bes-version">
      {{ $t('message.apiVersion') }}:
      <span class="version-num">{{ version }}</span>
    </div>
    <div class="bes-jobs" :class="jobCountClass">{{ jobs }}</div>
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

const highWaterMark = 20;
const warningWaterMark = 10;
export default {
  name: 'status-bar',
  computed: {
    jobCountClass() {
      if (this.jobCount < warningWaterMark) {
        return '';
      }
      if (this.jobCount < highWaterMark) {
        return 'bes-odd-job-count';
      }
      return 'bes-high-job-count';
    }
  },
  methods: {
    getPollInterval() {
      return 25000 + 5000 * Math.random();
    },
    fetchData() {
      axios
        .get(backend_status_url)
        .then(({ data }) => {
          this.version = data.version;
          this.jobCount = parseInt(data.queue_length, 10);
          this.jobs = template(
            `<%= jobCount %> ${this.$t('message.jobsWaiting')}`
          )(this);
          if (this.jobCount < highWaterMark) {
            var localTime = new Date(data.last_ping).toTimeString();
            var stat = data.status;
            stat = stat === 'running' ? 'UP' : stat;
            this.status = escape(`${stat} @ ${localTime}`);
            this.hasError = false;
          } else {
            this.status =
              'Redis is probably down. Please contact devs on QMK discord';
            this.hasError = true;
          }
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
      jobCount: 0,
      hasError: false
    };
  },
  mounted() {
    setTimeout(this.fetchData, 1000);
  }
};
</script>
<style>
.bes-high-job-count {
  color: red;
}
.bes-odd-job-count {
  color: yellow;
}
</style>
