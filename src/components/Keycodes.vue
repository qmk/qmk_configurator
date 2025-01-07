<!--
  use component is syntax to avoid inline block space issues
  @see https://css-tricks.com/fighting-the-space-between-inline-block-elements/
-->
<template>
  <div id="keycodes-section">
    <div style="text-align: left; margin-left: 10px">
      <p>
        <label>{{ $t('keycodes.label') }}:</label>
        <span class="hint">
          <a
            href="https://docs.qmk.fm/keycodes"
            :title="$t('keycodesRef.label')"
            target="_blank"
            rel="noopener"
            >{{ $t('keycodesRef.label') }}</a
          >
        </span>
      </p>
    </div>
    <div id="keycodes">
      <div class="tabs">
        <span
          class="tab"
          :class="classes(index)"
          v-for="(key, index) in keycodesByGroup"
          :key="index"
          @click="changeActive(index)"
          :title="$t('keycodesTab.' + index + '.label')"
          >{{ $t('keycodesTab.' + index + '.label')
          }}<span v-if="searchFilter !== ''"
            >({{ searchCounters[index] }})</span
          ></span
        >
        <span class="end-tab"
          ><font-awesome-icon class="keycode-search-icon" icon="search" /><input
            @focus="stopListening"
            @blur="startListening"
            type="text"
            :placeholder="$t('searchKeycodes')"
            v-model="searchFilter_"
            autocomplete="off"
            spellcheck="false"
        /></span>
      </div>
      <div class="tab-area">
        <template v-for="(key, index) in activeTab">
          <component
            v-bind:is="getComponent(key.code)"
            v-bind="key"
            :key="index"
            :class="filterClass(key)"
            @mouseenter="message(key)"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import * as pinia from 'pinia';
import isUndefined from 'lodash/isUndefined';
import debounce from 'lodash/debounce';
import Keycode from '@/components/Keycode.vue';
import Space from '@/components/Space.vue';
import store from '@/store';

import { useKeycodesStore } from '../store/keycodes.js';

export default {
  name: 'keycodes-component',
  components: { Keycode, Space },
  props: {},
  data() {
    return {
      clearTimeout: undefined
    };
  },
  mounted() {
    this.debouncedSetSearchFilter = debounce(this.setSearchFilter, 500);
  },
  computed: {
    ...pinia.mapState(useKeycodesStore, [
      'keycodes',
      'searchFilter',
      'searchCounters',
      'active'
    ]),
    ...mapState('app', ['configuratorSettings']),
    activeTab() {
      return this.keycodesByGroup[this.active];
    },
    keycodesByGroup() {
      let section = this.keycodes.reduce((acc, value) => {
        if (value.group) {
          acc[value.label] = [];
          acc.current = value.label;
        } else {
          acc[acc.current].push(value);
        }
        return acc;
      }, {});
      delete section['current'];
      return section;
    },
    searchFilter_: {
      get() {
        return this.searchFilter;
      },
      set(newVal) {
        this.debouncedSetSearchFilter(newVal);
      }
    }
  },
  methods: {
    ...mapMutations('app', ['setMessage', 'stopListening', 'startListening']),
    ...pinia.mapActions(useKeycodesStore, ['setSearchFilter', 'changeActive']),
    getComponent(code) {
      return isUndefined(code) ? Space : Keycode;
    },
    classes(current) {
      let classes = [];
      if (current === this.active) {
        classes.push('active');
      }
      return classes.join(' ');
    },
    message(key) {
      let msg = '';
      if (isUndefined(key.code)) {
        msg = key.title ? key.title : '';
      } else {
        msg = key.title ? `${key.code} - ${key.title}` : key.code;
      }
      this.setMessage(msg);
      this.messageClear();
    },
    messageClear() {
      if (this.clearTimeout) {
        window.clearTimeout(this.clearTimeout);
      }
      this.clearTimeout = window.setTimeout(() => {
        store.commit('app/setMessage', '');
      }, 3000);
    },
    filterClass(key) {
      if (this.searchFilter === '' || isUndefined(key.code)) {
        return '';
      }
      const filter = this.searchFilter_.toUpperCase();
      if (
        !key.code.includes(filter) &&
        !(key.name && key.name.toUpperCase().includes(filter)) &&
        !(key.title && key.title.toUpperCase().includes(filter))
      ) {
        return 'desaturated';
      }
    }
  }
};
</script>
<style>
#keycodes {
  border: none;
  margin-bottom: 20px;
}
.tabs {
  display: grid;
  grid-template: auto / repeat(6, minmax(120px, 200px));
}
.tab {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border-top: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
  padding: 2px;
  margin-right: 2px;
  border-radius: 4px 4px 0 0;
  display: inline-block;
  opacity: 0.55;
  z-index: 100;
  cursor: pointer;
  margin-bottom: -1px;
}
.end-tab {
  grid-column: -1;
  justify-self: end;
}
.end-tab input {
  padding: 3px 7px;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
  width: 90%;
  float: right;
}
.tab-area {
  height: 412px;
  padding: 10px 5px;
  border: 1px solid;
  border-radius: 0 4px 4px 4px;
}
.tab.active {
  opacity: 1;
}
.keycode.isoenter {
  position: absolute;
  left: 520px;
  top: 117px;
  height: 69px;
}
.desaturated {
  opacity: 0.3;
}
.keycode-search-icon {
  position: absolute;
  right: 5px;
  top: 11px;
  color: #999;
}
.tab span {
  margin-left: 4px;
}
</style>
