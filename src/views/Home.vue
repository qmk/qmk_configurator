<template>
  <div>
    <div class="main">
      <Main />
    </div>
    <div>
      <keycodes />
    </div>
    <v-tour name="qmkTour" :steps="steps" :options="tourOptions"></v-tour>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/Main';
import Keycodes from '@/components/Keycodes';

export default {
  name: 'configurator',
  components: {
    Main,
    Keycodes
  },
  data() {
    return {
      tourOptions: {
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: 'Skip tour',
          buttonPrevious: 'Previous',
          buttonNext: 'Next',
          buttonStop: 'Finish'
        }
      },
      steps: [
        {
          target: '.v-step-0',
          content: `Choose your keyboard`,
          params: {
            placement: 'top',
            enableScrolling: false
          }
        },
        {
          target: '.v-step-1',
          content: 'Choose the layout',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.v-step-2',
          content: 'Make the layout'
        },
        {
          target: '.v-step-3',
          content: '(Optional) Export the keymap',
          params: {
            placement: 'top',
            enableScrolling: false
          }
        },
        {
          target: '.v-step-4',
          content: 'Compile the firmware',
          params: {
            placement: 'top',
            enableScrolling: false
          }
        },
        {
          target: '.v-step-5',
          content: 'Download the Firmware',
          enableScrolling: false
        }
      ]
    };
  },
  mounted() {
    this.$tours['qmkTour'].start();
  },
  methods: {
    track() {
      this.$ga.page('/');
    }
  }
};
</script>
<style>
.keycodes-section {
  margin-top: 30px;
  text-align: left;
}
.keycodes-section label {
  padding-left: 20px;
}
</style>
