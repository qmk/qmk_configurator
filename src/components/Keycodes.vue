<!--
  use component is syntax to avoid inline block space issues
  @see https://css-tricks.com/fighting-the-space-between-inline-block-elements/
-->
<template>
  <div id="keycodes-section">
    <div style="text-align: left; margin-left: 10px;">
      <p>
        <label>{{ $t('message.keycodes.label') }}:</label>
        <span class="hint-right hint">
          <a
            href="https://docs.qmk.fm/#/keycodes"
            title="Keycodes reference"
            target="_blank"
            >{{ $t('message.keycodesRef.label') }}</a
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
          :title="index"
          >{{ $t('message.keycodesTab.' + index + '.label') }}</span
        >
        <span class="end-tab"
          ><input
            @focus="stopListening"
            @blur="startListening"
            type="text"
            placeholder="search keycodes"
            v-model="searchFilter"
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
import { mapGetters, mapMutations } from 'vuex';
import isUndefined from 'lodash/isUndefined';
import Keycode from '@/components/Keycode';
import Space from '@/components/Space';
import store from '@/store';

export default {
  name: 'keycodes',
  components: { Keycode, Space },
  props: {},
  data() {
    const userLang = navigator.language || navigator.userLanguage;
    let active = 'ANSI';
    if (userLang.toLowerCase().indexOf('en') < 0) {
      active = 'ISO/JIS';
    }
    return {
      active: active,
      clearTimeout: undefined,
      searchFilter: ''
    };
  },
  computed: {
    ...mapGetters('keycodes', ['keycodes']),
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
    }
  },
  methods: {
    ...mapMutations('app', ['setMessage', 'stopListening', 'startListening']),
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
    changeActive(index) {
      this.active = index;
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
      const filter = this.searchFilter.toUpperCase();
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
  grid-template: auto / repeat(7, minmax(120px, 200px));
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
}
.tab-area {
  height: 350px;
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
  top: 115px;
  height: 68px;
}
.desaturated {
  opacity: 0.3;
}
</style>
