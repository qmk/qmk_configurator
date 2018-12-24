<template>
  <div>
    <div class="main"><Main /></div>

    <div class="keycodes-section">
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
      <keycodes />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/Main';
import Keycodes from '@/components/Keycodes';

export default {
  name: 'home',
  components: {
    Main,
    Keycodes
  }
};
</script>
<style>
.keycodes-section {
  margin-top: 30px;
  text-align: left;
}
.keycodes-section label {
  padding-left: 20px;
}
</style>
