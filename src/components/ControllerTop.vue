<template>
  <div id="controller-top">
    <div class="topctrl">
      <div class="topctrl-keyboards">
        <a
          id="favorite-keyboard"
          v-tooltip="$t('favoriteKeyboard')"
          :class="{
            active: isFavoriteKeyboard
          }"
          @click="favKeyboard"
        >
          <font-awesome-icon icon="star" size="lg" fixed-width />
        </a>
        <label
          id="drop-label-keyboard"
          v-tooltip="`${keyboards.length} keyboards`"
          class="drop-label"
          >{{ $t('keyboard.label') }}:</label
        >
        <v-select
          ref="select"
          v-model="keyboard"
          max-height="600px"
          :clearable="false"
          :options="keyboards"
          @search:focus="opened"
          @search:blur="blur"
        ></v-select>
        <a
          id="open-on-github"
          rel="noopener"
          target="_blank"
          :href="githubKeyboardFolderURL"
          v-tooltip.bottom="$t('githubKeyboardFolder.title')"
        >
          <font-awesome-icon icon="fa-brands fa-github" size="lg" fixed-width />
        </a>
      </div>
      <div class="topctrl-layouts">
        <label
          id="drop-label-version"
          v-tooltip.top-end="`${Object.keys(layouts).length} layouts`"
          class="drop-label"
          >{{ $t('layout.label') }}:</label
        >
        <select id="layout" v-model="layout" @focus="focus" @blur="blur">
          <option
            v-for="(aLayout, layoutName) in layouts"
            :key="layoutName"
            :value="layoutName"
          >
            {{ layoutName }}
          </option>
        </select>
      </div>
      <div class="topctrl-keymap-name">
        <label class="drop-label" :class="fontAdjustClasses"
          >{{ $t('keymapName.label') }}:</label
        >
        <input
          id="keymap-name"
          v-model="keymapName"
          type="text"
          :placeholder="$t('keymapName.placeholder')"
          spellcheck="false"
          @focus="focus"
          @blur="blur"
        />
      </div>
      <div class="topctrl-controls">
        <button
          id="load-default"
          v-tooltip="$t('loadDefault.title')"
          @click="loadDefault"
        >
          {{ $t('loadDefault.label') }}
        </button>
        <button
          id="compile"
          v-tooltip="$t('compile.title')"
          :disabled="compileDisabled"
          @click="compile"
        >
          {{ $t('compile.label') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import * as pinia from 'pinia';

import first from 'lodash/first';
import random from 'lodash/random';
import isUndefined from 'lodash/isUndefined';
import isString from 'lodash/isString';

import { PREVIEW_LABEL } from '@/store/modules/constants';

import { statusError, compileLayout, disableOtherButtons } from '@/api';

import { clearKeymapTemplate } from '@/common';

import VueRouter from 'vue-router';
const { isNavigationFailure, NavigationFailureType } = VueRouter;

import { useStatusStore } from '../store/status';

export default {
  name: 'ControllerTop',
  data: () => {
    return {
      firstRun: true
    };
  },
  computed: {
    ...mapGetters('keymap', ['isDirty']),
    ...mapGetters('app', ['exportKeymapName']),
    ...mapState('app', [
      'keyboard',
      'keyboards',
      'layouts',
      'layout',
      'configuratorSettings',
      'compileDisabled'
    ]),
    isFavoriteKeyboard() {
      return this.keyboard === this.configuratorSettings.favoriteKeyboard;
    },
    keymapName: {
      get() {
        return this.$store.state.app.keymapName;
      },
      set(value) {
        this.updateKeymapName(value);
      }
    },
    githubKeyboardFolderURL() {
      return `https://github.com/qmk/qmk_firmware/tree/master/keyboards/${this.keyboard}`;
    },
    keyboard: {
      get() {
        return this.$store.state.app.keyboard;
      },
      set(value) {
        if (this.isDirty) {
          if (
            !confirm(clearKeymapTemplate({ action: 'change your keyboard' }))
          ) {
            var old = this.keyboard;
            this.setKeyboard(''); // force a refresh
            Vue.nextTick(() => {
              this.setKeyboard(old);
            });
            return false;
          }
        }
        this.updateKeyboard(value).then(() => {
          this.loadDefault(true);
        });
      }
    },
    layout: {
      get() {
        return this.$store.state.app.layout;
      },
      set(value) {
        if (this.isDirty) {
          if (!confirm(clearKeymapTemplate({ action: 'change your layout' }))) {
            const old = this.layout;
            this.setLayout(''); // force a refresh
            Vue.nextTick(() => this.setLayout(old));
            return false;
          }
        }
        this.clear();
        this.updateLayout({ target: { value } });
      }
    },
    fontAdjustClasses() {
      let classes = [];
      if (this.$t('keymapName.label').length > 12) {
        classes.push('half-size');
      }
      return classes.join(' ');
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
    $route: function (to /*, from*/) {
      if (to.query) {
        const filter = to.query.filter;
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
  async mounted() {
    await this.initializeKeyboards();
    if (!this.isDirty) {
      await this.loadDefault(true);
    }
    await this.initTemplates();
  },
  methods: {
    ...mapMutations('keymap', ['resizeConfig', 'clear']),
    ...mapMutations('app', [
      'setLayout',
      'stopListening',
      'startListening',
      'previewRequested',
      'setKeyboard'
    ]),
    ...mapActions('app', [
      'changeKeyboard',
      'fetchKeyboards',
      'loadDefaultKeymap',
      'updateKeymapName',
      'setFavoriteKeyboard'
    ]),
    ...mapActions('keymap', ['initTemplates', 'load_converted_keymap']),
    ...pinia.mapActions(useStatusStore, [
      'append',
      'setDeferredMessage',
      'clearStatus',
      'viewReadme'
    ]),
    /**
     * loadDefault keymap. Attempts to load the keymap data from
     * a predefined known file path.
     * @param {boolean} isAutoInit If the method is called by the code
     * @return {object} promise when it has completed
     */
    async loadDefault(isAutoInit = false) {
      if (this.isDirty) {
        if (!confirm(clearKeymapTemplate({ action: 'load default keymap' }))) {
          return false;
        }
      }
      const store = this.$store;
      try {
        const data = await this.loadDefaultKeymap();
        if (data) {
          console.log(data);
          this.updateLayout(data.layout);
          const promise = new Promise((resolve) =>
            // OK this is a hack that let's the VisualKeymap signal to this ControllerTop that's
            // it's finished calculating the new visual keymap layout.
            // we set a promise in the store and wait for it to finish before updating the stats
            // for the keyboard so we don't get overwritten by the keyboard loading the README in the console
            // code. Hacky.
            store.commit('keymap/setLoadingKeymapPromise', resolve)
          ).then(async () => {
            // clear the keymap name for the default keymap
            // otherwise it overrides the default getter
            this.updateKeymapName('');
            const stats = await this.load_converted_keymap(data.layers);
            let msg = this.$t('statsTemplate', stats);
            if (stats.warnings.length > 0 || stats.errors.length > 0) {
              msg = `${msg}\n${stats.warnings.join('\n')}`;
              msg = `${msg}\n${stats.errors.join('\n')}`;
            }
            if (!isAutoInit) {
              store.commit('keymap/setDirty');
            } else {
              // This is a dirty hack so that the status message appears both after pressing load default
              // and switching keyboards. This entire flow needs redesigning as it was written
              // when I had a poor understanding of vue observability.
              this.append(msg);
              this.setDeferredMessage(msg);
            }
          });
          return promise;
        }
        return data;
      } catch (error) {
        statusError(
          `\n* Sorry there is no default for the ${this.keyboard} keyboard... yet!`
        );
        console.log('error loadDefault', error);
      }
    },
    // TODO: This needs to be moved in an action
    // selectInitialKeyboard
    /**
     * initializeKeyboards - parse the keyboard list from the API response
     * @param {object} the API Response
     * @returns {undefined}
     */
    async initializeKeyboards() {
      console.info(`initializeKeyboards: ${this.keyboard}`);
      let _keyboard = '';
      if (this.$route.query) {
        let filter = this.$route.query.filter;
        if (!isUndefined(filter)) {
          this.updateFilter(filter);
        }
      }

      // if the store is initialized with a keyboard
      // we set it.
      // But if there is parameters in the URL we prioritize it
      if (this.keyboard) {
        _keyboard = this.keyboard;
        console.info(`Loading keyboard from store:${_keyboard}`);
      } else {
        _keyboard = this.keyboards[(0, random(this.keyboards.length - 1))];
      }
      console.log(`_keyboard:${_keyboard}`);

      // WIP:
      // if there is a url in the string we
      // load the keyboard by fetching the url
      // if (this.$route.query.url) {
      // }

      let { keyboardP, layoutP } = this.$route.params;
      if (
        isString(keyboardP) &&
        keyboardP !== '' &&
        keyboardP !== PREVIEW_LABEL
      ) {
        // if someone loads a specific keyboard load it
        _keyboard = keyboardP;
        this.firstRun = false;
      }

      this.setLayout(layoutP);
      await this.updateKeyboard(_keyboard);
    },
    /**
     * updateKeyboard - triggers a keyboard update action on the store
     * @param {string} newKeyboard to switch to
     * @return {object} promise when it has been done or error
     */
    async updateKeyboard(newKeyboard) {
      if (this.firstRun) {
        // ignore initial load keyboard selection event if it's default
        this.firstRun = false;
      }

      if (newKeyboard !== this.keyboard) {
        disableOtherButtons();
      }

      await this.changeKeyboard(newKeyboard).then(this.postUpdateKeyboard);
    },
    favKeyboard() {
      if (this.keyboard === this.configuratorSettings.favoriteKeyboard) {
        this.setFavoriteKeyboard('');
      } else {
        this.setFavoriteKeyboard(this.keyboard);
      }
    },
    postUpdateKeyboard() {
      this.clearStatus();
      this.$router
        .replace({
          path: `/${this.keyboard}/${this.layout}`
        })
        .catch((failure) => {
          if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
            return;
          }
          if (isNavigationFailure(failure, NavigationFailureType.cancelled)) {
            return;
          }
          throw failure;
        });
      this.viewReadme(this.keyboard);
    },
    /**
     * updateLayout - switch the layout for this keyboard
     * @param {object\string} e event object or layout name
     * @return {undefined}
     */
    updateLayout(e) {
      const newLayout = e.target ? e.target.value : e;
      this.setLayout(newLayout);
      this.$router
        .replace({ path: `/${this.keyboard}/${this.layout}` })
        .catch((failure) => {
          if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
            return;
          }
          if (isNavigationFailure(failure, NavigationFailureType.cancelled)) {
            return;
          }
          throw failure;
        });
    },
    compile() {
      let keymapName = this.keymapName;
      let _keymapName = this.exportKeymapName;
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
    opened() {
      this.stopListening();
      const select = this.$refs.select;
      Vue.nextTick(() => {
        const active = select.$el.querySelector(
          '.vs__dropdown-menu .vs__dropdown-option--selected'
        );
        if (active) {
          // subtract height so we can see the previous value as well
          var offsetTop = active.offsetTop - active.offsetHeight;
          select.typeAheadPointer = this.keyboards.indexOf(this.keyboard);
          select.$el.scrollTo(offsetTop > 0 ? offsetTop : 0, 0);
        }
      });
    },
    focus() {
      this.stopListening();
    },
    blur() {
      this.startListening();
    }
  }
};
</script>
<style lang="scss">
#drop-label-keyboard {
  min-width: 137px;
}
.topctrl {
  text-align: left;
  display: grid;
  grid-template: [top] 1fr [middle] 1fr [bottom] 1fr / [left] minmax(700px, 3fr) [right] 2fr;
  grid-row-gap: 2px;
}
#controller-top {
  padding: 5px;
  border-radius: 5px 5px 0px 0px;
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
  height: 2.5rem;
}
.topctrl-keymap-name {
  grid-row: bottom;
  grid-column: left;
  justify-self: start;
}
#keymap-name {
  width: 220px;
  width: calc(30rem - 16px);
  padding: 7px;
  border: 1px solid;
  border-radius: 4px;
}
.topctrl-controls {
  grid-row: top / span 2;
  grid-column: right;
  justify-self: end;
}
.topctrl-layouts {
  grid-row: middle;
  grid-column-start: left;
  grid-column-end: right;
  justify-self: start;
}
#layout {
  padding: 5px 4px;
  border-radius: 4px;
  border: 1px solid;
  width: 288px;
  width: 30rem;
  &:focus {
    outline: 2px solid black;
  }
}
.drop-label {
  display: inline-block;
  text-align: right;
  padding-right: 5px;
  min-width: 160px;
  max-width: 190px;
}

.half-size {
  font-size: 11px;
  text-overflow: '';
  vertical-align: middle;
}
#keyboard {
  max-width: 18rem;
}
.v-select {
  display: inline-block;
  width: 30rem;
}
.topctrl-keyboards .v-select {
  font-family: 'Roboto Mono', Monaco, Bitstream Vera Sans Mono, Lucida Console,
    Terminal, Consolas, Liberation Mono, DejaVu Sans Mono, Courier New,
    monospace;
  border-radius: 4px;
}

.topctrl-keyboards .v-select:focus-within {
  outline: 2px solid black;
}
#open-on-github {
  cursor: pointer;
  margin-left: 8px;
  color: white;
}
</style>
