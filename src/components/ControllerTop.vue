<template>
  <div id="controller-top">
    <div class="topctrl">
      <div class="topctrl-keyboards">
        <label class="drop-label">{{ $t('message.keyboard.label') }}:</label>
        <v-select
          @search:focus="focus"
          @search:blur="blur"
          maxHeight="600px"
          v-model="keyboard"
          :clearable="false"
          :options="keyboards"
        ></v-select>
      </div>
      <div class="topctrl-keymap-name">
        <label class="drop-label">{{ $t('message.keymapName.label') }}:</label>
        <input
          id="keymap-name"
          type="text"
          v-model="keymapName"
          :placeholder="$t('message.keymapName.placeholder')"
          spellcheck="false"
          @focus="focus"
          @blur="blur"
        />
      </div>
      <div class="topctrl-controls">
        <button
          id="load-default"
          :title="$t('message.loadDefault.title')"
          @click="loadDefault"
        >
          {{ $t('message.loadDefault.label') }}
        </button>
        <button
          id="compile"
          :title="$t('message.compile.title')"
          v-bind:disabled="compileDisabled"
          @click="compile"
        >
          {{ $t('message.compile.label') }}
        </button>
      </div>
      <div class="topctrl-layouts">
        <label class="drop-label">Layout:</label>
        <select id="layout" v-model="layout">
          <option
            v-for="(aLayout, layoutName) in layouts"
            :key="layoutName"
            v-bind:value="layoutName"
          >
            {{ layoutName }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';

import first from 'lodash/first';
import isUndefined from 'lodash/isUndefined';
import isString from 'lodash/isString';

import axios from 'axios';

import {
  backend_keyboards_url,
  PREVIEW_LABEL
} from '@/store/modules/constants';

import {
  statusError,
  load_converted_keymap,
  // render_layout,
  getExclusionList,
  compileLayout,
  disableOtherButtons
} from '@/jquery';

import { clearKeymapTemplate } from '@/common';

export default {
  name: 'ControllerTop',
  computed: {
    ...mapGetters('keymap', ['isDirty']),
    ...mapGetters('app', ['keyboards', 'layouts', 'compileDisabled']),
    realKeymapName() {
      return this.$store.getters['app/keymapName'];
    },
    keyboard: {
      get() {
        return this.$store.getters['app/keyboard'];
      },
      set(value) {
        if (this.isDirty) {
          if (
            !confirm(clearKeymapTemplate({ action: 'change your keyboard' }))
          ) {
            var old = this.$store.getters['app/keyboard'];
            this.$store.commit('app/setKeyboard', ''); // force a refresh
            Vue.nextTick(this.$store.commit('app/setKeyboard', old));
            return false;
          }
        }
        this.updateKeyboard(value);
      }
    },
    layout: {
      get() {
        return this.$store.getters['app/layout'];
      },
      set(value) {
        if (this.isDirty) {
          if (!confirm(clearKeymapTemplate({ action: 'change your layout' }))) {
            var old = this.$store.getters['app/layout'];
            const setLayout = this.setLayout;
            setLayout(''); // force a refresh
            Vue.nextTick(() => setLayout(old));
            return false;
          }
        }
        this.updateLayout({ target: { value } });
      }
    }
  },
  watch: {
    /*
     * keymapname is local state so it can use v-model to be reactive.
     * The v-model attempts to mutate the getter 'app/keymapName'.
     * This would cause a mutation warning.
     *
     * The actual app state is in the store. To keep them in sync we
     * have an alias for the store version called realKeymapName.
     * When changes happen locally we update the store.
     * When changes happen to the store we update the local version.
     */
    keymapName: function(newKeymapName, oldKeymapName) {
      if (newKeymapName !== oldKeymapName) {
        this.updateKeymapName(newKeymapName);
      }
    },
    realKeymapName: function(newName, oldName) {
      if (newName !== oldName) {
        this.keymapName = newName;
      }
    },
    $route: function(to /*, from*/) {
      if (to.query) {
        let filter = to.query.filter;
        if (!isUndefined(filter)) {
          this.updateFilter(filter);
          this.updateKeyboard(first(this.keyboards));
          return;
        }
        if (to.params) {
          this.setLayout(to.params.layoutP);
          if (!this.previewRequested) {
            // don't update the keyboard if we are in preview mode
            // otherwise we can't select the different layouts
            this.updateKeyboard(to.params.keyboardP);
          }
          return;
        }
      }
    }
  },
  methods: {
    ...mapMutations('keymap', ['resizeConfig']),
    ...mapMutations('app', [
      'setLayout',
      'stopListening',
      'startListening',
      'previewRequested'
    ]),
    /**
     * loadDefault keymap. Attempts to load the keymap data from
     * a predefined known file path.
     * @return {object} promise when it has completed
     */
    loadDefault() {
      if (this.isDirty) {
        if (!confirm(clearKeymapTemplate({ action: 'load default keymap' }))) {
          return false;
        }
      }
      let keyboardName = this.keyboard.replace(/\//g, '_');
      let store = this.$store;
      // TODO move this to store
      axios
        .get(`keymaps/${keyboardName}_default.json`)
        .then(({ data, status }) => {
          if (status === 200) {
            console.log(data);
            this.updateLayout(data.layout);
            let promise = new Promise(resolve =>
              store.commit('keymap/setLoadingKeymapPromise', resolve)
            );
            promise.then(() => {
              this.logLoadDefaultSuccess(keyboardName);

              this.updateKeymapName(data.keymap);
              const stats = load_converted_keymap(data.layers);
              const msg = this.$t('message.statsTemplate', stats);
              store.commit('status/append', msg);
              store.commit('keymap/setDirty');
            });
          }
        })
        .catch(error => {
          this.logLoadDefaultFail(keyboardName);
          statusError(
            `\n* Sorry there is no default for the ${
              this.keyboard
            } keyboard... yet!`
          );
          console.log('error loadDefault', error);
        });
    },
    fetchKeyboards() {
      console.log(backend_keyboards_url);
      axios.get(backend_keyboards_url).then(this.initializeKeyboards);
    },
    /**
     * initializeKeyboards - parse the keyboard list from the API response
     * @param {object} the API Response
     * @returns {undefined}
     */
    initializeKeyboards({ data, status }) {
      let _keyboard = '';
      if (status === 200) {
        let exclude = getExclusionList();
        this.$store.commit(
          'app/setKeyboards',
          data.filter(keeb => {
            return isUndefined(exclude[keeb]);
          })
        );
        if (this.$route.query) {
          let filter = this.$route.query.filter;
          if (!isUndefined(filter)) {
            this.updateFilter(filter);
          }
        }
        _keyboard = first(this.keyboards);
        let { keyboardP, layoutP } = this.$route.params;
        if (
          isString(keyboardP) &&
          keyboardP !== '' &&
          keyboardP !== PREVIEW_LABEL
        ) {
          // if someone loads a specific keyboard log it
          _keyboard = keyboardP;
          this.firstRun = false;
        }
        this.setLayout(layoutP);
        this.updateKeyboard(_keyboard);
      }
    },
    /**
     * updateKeyboard - triggers a keyboard update action on the store
     * @param {string} newKeyboard to switch to
     * @return {object} promise when it has been done or error
     */
    updateKeyboard(newKeyboard) {
      if (this.firstRun) {
        // ignore initial load keyboard selection event if it's default
        this.firstRun = false;
      } else {
        this.logChangeKeyboard(newKeyboard);
      }
      return this.$store
        .dispatch('app/changeKeyboard', newKeyboard)
        .then(this.postUpdateKeyboard);
    },
    postUpdateKeyboard() {
      this.$store.commit('status/clear');
      this.$router.replace({
        path: `/${this.keyboard}/${this.layout}`
      });
      this.$store.dispatch('status/viewReadme', this.keyboard);
      disableOtherButtons();
    },
    /**
     * updateLayout - switch the layout for this keyboard
     * @param {object\string} e event object or layout name
     * @return {undefined}
     */
    updateLayout(e) {
      let newLayout = e.target ? e.target.value : e;
      this.setLayout(newLayout);
      this.$router.replace({ path: `/${this.keyboard}/${this.layout}` });
    },
    updateKeymapName(newKeymapName) {
      this.keymapName = newKeymapName;
      this.$store.commit('app/setKeymapName', newKeymapName);
    },
    compile() {
      this.logCompile(this.keyboard);
      let keymapName = this.realKeymapName;
      let _keymapName = this.$store.getters['app/exportKeymapName'];
      // TODO extract this name function to the store
      keymapName =
        keymapName === ''
          ? _keymapName.slice(this.keyboard.length + 1, _keymapName.length)
          : keymapName;
      compileLayout(this.keyboard, keymapName, this.layout);
    },
    updateFilter(filter) {
      this.$store.commit('app/setFilter', filter);
    },
    focus() {
      this.stopListening();
    },
    blur() {
      this.startListening();
    },
    logCompile(keyboard) {
      this.$ga.event({
        eventCategory: 'apicall',
        eventAction: 'compilation',
        eventLabel: keyboard
      });
    },
    logLoadDefaultSuccess(keyboardName) {
      this.$ga.event({
        eventCategory: 'apicall',
        eventAction: 'loadDefaultSuccess',
        eventLabel: keyboardName
      });
    },
    logLoadDefaultFail(keyboardName) {
      this.$ga.event({
        eventCategory: 'apicall',
        eventAction: 'loadDefaultFail',
        eventLabel: keyboardName
      });
    },
    logChangeKeyboard(newKeyboard) {
      this.$ga.event({
        eventCategory: 'apicall',
        eventAction: 'changeKeyboard',
        eventLabel: newKeyboard
      });
    }
  },
  data: () => {
    return {
      keymapName: '',
      firstRun: true
    };
  },
  mounted() {
    this.fetchKeyboards();
  }
};
</script>
<style>
.topctrl {
  display: grid;
  grid-template: [top] 1fr [bottom] 1fr / [left] 400px [middle] 360px [right] auto;
  grid-row-gap: 5px;
}
#controller-top {
  padding: 5px;
  border-radius: 5px 5px 0px 0px;
  background: #eee;
  border-color: #ccc;
  border-style: solid;
  border-width: 1px 1px 0px 1px;
  margin: 0px auto;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  /*  overflow: hidden;*/
  line-height: 100%;
}
.topctrl-keyboards {
  grid-row: top;
  grid-column: left;
  justify-self: start;
}
.topctrl-keymap-name {
  grid-row: top;
  grid-column: middle;
  justify-self: start;
}
#keymap-name {
  width: 220px;
  padding: 7px;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
}
.topctrl-controls {
  grid-row: top;
  grid-column: right;
  justify-self: end;
}
.topctrl-layouts {
  grid-row: bottom;
  grid-column-start: left;
  grid-column-end: right;
  justify-self: start;
}
#layout {
  padding: 5px 4px;
  border-radius: 4px;
  border: 1px solid #cdcdcd;
  width: 288px;
}
.drop-label {
  display: inline-block;
  text-align: right;
  padding-right: 5px;
  min-width: 90px;
}
#keyboard {
  max-width: 18rem;
}
.v-select {
  display: inline-block;
  width: 18rem;
}
.topctrl-keyboards .v-select {
  background: white;
  font-family: 'Roboto Mono', Monaco, Bitstream Vera Sans Mono, Lucida Console,
    Terminal, Consolas, Liberation Mono, DejaVu Sans Mono, Courier New,
    monospace;
}
</style>
