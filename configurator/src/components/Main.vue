<template>
  <div>
    <controllerTop />
    <statusPanel />
    <controllerBottom />
  </div>
</template>

<script>
import controllerTop from 'controllerTop';
import statusPanel from 'statusPanel';
import controllerBottom from 'controllerBottom';
export default {
  name: 'configurator',
  props: {},
  components: { controllerTop, statusPanel, controllerBottom }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
