<template>
  <!-- prettier-ignore -->
  <div
    :id="myid"
    draggable
    class="key key-container"
    :class="myclasses"
    :style="mystyles"
    @click="clicked"
    @dragstart="dragstart"
    @dragend="dragend"
    @drop.stop="droppedContents"
    @dragover.prevent="dragover"
    @dragenter="dragenter"
    @dragleave="dragleave"
    ><div>{{ displayName }}<div
    v-if="isShowingKeymapLegends"
    class="key-contents"
    :class="contentClasses"
    @dragenter.prevent="dragenterContents"
    @dragleave.prevent="dragleaveContents"
    @click.prevent.stop="clickContents"
    >{{ contents }}</div></div><div
        v-if="visible"
        class="remove"
        @click.stop="remove"
      ><font-awesome-icon icon="times" size="xs" /></div></div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';
import { mapMutations } from 'vuex';
import BaseKey from './BaseKey.vue';
export default {
  name: 'ContainerKey',
  extends: BaseKey,
  data() {
    return {
      value: this.meta.text,
      contentsInHover: false
    };
  },
  computed: {
    contents() {
      if (this.meta.contents) {
        return this.formatName(this.meta.contents.name);
      }
      return '';
    },
    contentClasses() {
      let classes = [];
      if (this.contentsInHover) {
        classes.push('overme');
      }
      if (this.isContentSelected) {
        classes.push('keycode-select');
      }
      console.log('contentClasses ', classes);
      return classes.join(' ');
    }
  },
  methods: {
    ...mapMutations('keymap', ['setContents']),
    dragenterContents(e) {
      if (e.target.classList.contains('key-contents')) {
        this.contentsInHover = true;
      }
    },
    dragleaveContents() {
      this.contentsInHover = false;
    },
    droppedContents(e) {
      if (e.target.classList.contains('key-contents')) {
        console.log('drop on contents ', e);
        let json = JSON.parse(e.dataTransfer.getData('application/json'));
        if (isUndefined(json.type)) {
          this.setContents({
            index: this.id,
            key: {
              name: json.name,
              code: json.code,
              type: json.type
            }
          });
        } else {
          // TBD animate error on element
        }
        this.dragleave(e);
        this.dragleaveContents(e);
        return true;
      }
      return this.dropped(e);
    }
  }
};
</script>
<style>
.key-contents.overme {
  border-radius: 4px;
}
</style>
