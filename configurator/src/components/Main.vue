<template>
  <div><controllerTop /><statusPanel /><controllerBottom /></div>
</template>

<script>
import ControllerTop from '@/components/ControllerTop';
import StatusPanel from '@/components/StatusPanel';
import ControllerBottom from '@/components/ControllerBottom';
export default {
  name: 'Main',
  props: {},
  components: { ControllerTop, StatusPanel, ControllerBottom }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Main {
}
</style>
