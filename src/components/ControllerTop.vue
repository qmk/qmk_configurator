<template>
  <div id="controller-top">
    <div class="topctrl">
      <div class="topctrl-1-1">
        <label class="drop-label">Keyboard:</label>
        <select id="keyboard" v-bind:style="width" v-model="keyboard">
          <option v-for="keeb in keyboards" :key="keeb" v-bind:value="keeb">
            {{ keeb }}
          </option>
        </select>
      </div>
      <div class="topctrl-1-2">
        <label class="drop-label">Keymap Name:</label>
        <input
          id="keymap-name"
          type="text"
          v-model="keymapName"
          placeholder="custom keymap name"
          spellcheck="false"
          @focus="focus"
          @blur="blur"
        />
      </div>
      <div class="topctrl-1-3">
        <button
          id="load-default"
          title="Load default keymap from QMK Firmware"
          @click="loadDefault"
        >
          Load Default
        </button>
        <button
          id="compile"
          title="Compile keymap"
          v-bind:disabled="compileDisabled"
          @click="compile"
        >
          Compile
        </button>
      </div>
      <div class="topctrl-2-1">
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
  props: {},
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
          this.updateKeyboard(to.params.keyboardP);
          return;
        }
      }
    }
  },
  methods: {
    ...mapMutations('keymap', ['resizeConfig']),
    ...mapMutations('app', ['setLayout', 'stopListening', 'startListening']),
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
              this.updateKeymapName(data.keymap);
              const stats = load_converted_keymap(data.layers);
              const msg = `\nLoaded ${stats.layers} layers and ${
                stats.count
              } keycodes. Defined ${stats.any} Any key keycodes\n`;
              store.commit('status/append', msg);
              store.commit('keymap/setDirty');
            });
          }
        })
        .catch(error => {
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
          _keyboard = keyboardP;
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
    }
  },
  data: () => {
    return {
      keymapName: '',
      width: 0
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
  grid-template: auto / 400px 360px auto;
  grid-row-gap: 0px;
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
  overflow: hidden;
  line-height: 100%;
}
.topctrl-1-1 {
  grid-row: 1;
  grid-column: 1;
  justify-self: start;
}
.topctrl-1-2 {
  grid-row: 1;
  grid-column: 2;
  justify-self: start;
}
.topctrl-1-3 {
  grid-row: 1;
  grid-column: 3;
  justify-self: end;
}
.topctrl-2-1 {
  grid-row: 2;
  grid-column-start: 1;
  grid-column-end: 3;
  justify-self: start;
}
.drop-label {
  display: inline-block;
  text-align: right;
  padding-right: 5px;
  min-width: 90px;
}
</style>
