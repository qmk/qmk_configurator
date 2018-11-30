<template>
  <div id="controller-top">
    <div class="topctrl">
      <span class="topctrl-1">
        <label style="display: inline-block; width: 75px;">Keyboard:</label>
        <select id="keyboard" v-bind:style="width" v-model="keyboard">
          <option v-for="keeb in keyboards" :key="keeb" v-bind:value="keeb">
            {{ keeb }}
          </option>
        </select>
      </span>
      <span class="topctrl-2">
        <label id="keymap-name-label">Keymap Name:</label>
        <input
          id="keymap-name"
          type="text"
          v-model="keymapName"
          placeholder="custom keymap name"
        />
      </span>
      <span class="topctrl-3">
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
      </span>
    </div>
    <label style="display: inline-block; width: 75px;">Layout:</label>
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
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

import first from 'lodash/first';
import isUndefined from 'lodash/isUndefined';
import template from 'lodash/template';
import isString from 'lodash/isString';

import axios from 'axios';

import {
  backend_keyboards_url,
  PREVIEW_LABEL
} from '@/store/modules/constants';

import {
  statusError,
  reset_keymap,
  load_converted_keymap,
  render_layout,
  getExclusionList,
  compileLayout,
  disableOtherButtons
} from '@/jquery';

const clearKeymapTemplate = template(
  'This will clear your keymap - are you sure you want to <%= action %>?'
);

export default {
  name: 'ControllerTop',
  props: {},
  computed: {
    ...mapGetters('keymap', ['isDirty']),
    ...mapGetters('app', [
      'keyboards',
      'layouts',
      'compileDisabled',
    ]),
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
            this.$store.commit('app/setLayout', ''); // force a refresh
            Vue.nextTick(this.$store.commit('app/setLayout', old));
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
        }
      }
    }
  },
  methods: {
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
      // hard-coding planck as the only default right now
      let keyboardName = this.keyboard.replace('/', '_');
      let store = this.$store;
      axios
        .get(`keymaps/${keyboardName}_default.json`)
        .then(({ data, status }) => {
          if (status === 200) {
            console.log(data);
            reset_keymap();

            this.updateLayout(data.layout);
            this.updateKeymapName(data.keymap);
            load_converted_keymap(data.layers);
            render_layout(
              this.layouts[this.layout].map(v => Object.assign({}, v))
            );
            store.commit('keymap/setDirty');
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
        let { keyboardP } = this.$route.params;
        if (
          isString(keyboardP) &&
          keyboardP !== '' &&
          keyboardP !== PREVIEW_LABEL
        ) {
          _keyboard = keyboardP;
        }
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
      reset_keymap();
      this.$router.replace({
        path: `/${this.keyboard}/${this.layout}`
      });
      render_layout(this.layouts[this.layout].map(v => Object.assign({}, v)));
      this.$store.commit('status/clear');
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
      let render = e.target;
      this.$store.commit('app/setLayout', newLayout);
      reset_keymap();
      this.$router.replace({ path: `/${this.keyboard}/${this.layout}` });
      render &&
        render_layout(this.layouts[this.layout].map(v => Object.assign({}, v)));
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
