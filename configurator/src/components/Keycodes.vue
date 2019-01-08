<!--
  use component is syntax to avoid inline block space issues
  @see https://css-tricks.com/fighting-the-space-between-inline-block-elements/
-->
<template>
  <div id="keycodes-section">
    <div style="text-align: left; margin-left: 10px;">
      <p>
        <label>Keycodes:</label>
        <span class="hint-right hint">
          <a
            href="https://docs.qmk.fm/#/keycodes"
            title="Keycodes reference"
            target="_blank"
          >
            Keycodes reference
          </a>
        </span>
      </p>
    </div>

    <div id="keycodes">
      <div class="tabs">
        <span
          class="tab"
          :class="classes(index)"
          v-for="(key, index) in keycodesByLabel"
          :key="index"
          @click="changeActive(index)"
        >
          {{ index }}
        </span>
      </div>
      <div class="tab-area">
        <template v-for="(key, index) in activeTab">
          <component
            v-bind:is="getComponent(key.code)"
            v-bind="key"
            :key="index"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import isUndefined from 'lodash/isUndefined';
import Keycode from '@/components/Keycode';
import Space from '@/components/Space';

export default {
  name: 'keycodes',
  components: { Keycode, Space },
  props: {},
  data() {
    return {
      active: 'Standard'
    };
  },
  computed: {
    ...mapGetters('keycodes', ['keycodes']),
    activeTab() {
      return this.keycodesByLabel[this.active];
    },
    keycodesByLabel() {
      let section = this.keycodes.reduce((acc, value) => {
        if (value.label) {
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
    }
  }
};
</script>
<style>
#keycodes {
  background: #fff;
  border: none;
  margin-bottom: 20px;
}
.tabs {
  display: grid;
  background: #fff;
  grid-template: auto / repeat(5, minmax(100px, 200px));
}
.tab {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 2px;
  margin-right: 2px;
  border-radius: 8px 4px 0 0;
  background: #eee;
  display: inline-block;
  opacity: 0.55;
  z-index: 100;
  cursor: pointer;
}
.tab-area {
  height: 300px;
  padding: 5px;
  border: 1px solid #ccc;
  border-top: 0;
  background: #eee;
}
.tab.active {
  opacity: 1;
  background: #eee;
}
</style>
