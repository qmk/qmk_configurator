<template>
  <!-- prettier-ignore -->
  <div
    :id="myid"
    class="key"
    :class="myclasses"
    :style="mystyles">{{  displayName  }}</div>
</template>
<script>
import BaseKey from '@/components/BaseKey';
export default {
  name: 'normal-key',
  extends: BaseKey
};
</script>
