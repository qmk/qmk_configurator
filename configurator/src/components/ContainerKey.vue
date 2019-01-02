<template>
  <!-- prettier-ignore -->
  <div
    draggable
    :id="myid"
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
    >{{ displayName }}<div
      class="key-contents"
      :class="contentClasses"
      @dragenter.prevent="dragenterContents"
      @dragleave.prevent="dragleaveContents"
      >{{ contents }}</div>
  </div>
</template>
<script>
import isUndefined from 'lodash/isUndefined';
import { mapMutations } from 'vuex';
import BaseKey from './BaseKey';
export default {
  name: 'container-key',
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
  background: #cceecc;
  border-radius: 4px;
}
</style>
