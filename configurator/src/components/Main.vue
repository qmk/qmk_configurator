<template>
  <div>
    <controllerTop />
    <!-- statusPanel />
    <controllerBottom /-->
  </div>
</template>

<script>
import ControllerTop from '@/components/ControllerTop';
/*
import statusPanel from 'statusPanel';
import controllerBottom from 'controllerBottom';
*/
export default {
  name: 'configurator',
  props: {},
  components: { ControllerTop }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
