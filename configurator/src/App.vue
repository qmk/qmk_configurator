<template>
  <div id="app" @click="dismiss">
    <div>
      <!--
        div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div
      -->
      <header>
        <h1>
          <a href="/"
            ><img
              src="./../assets/qmk_icon_512.png"
              alt="QMK Logo"
              width="48"
              style="vertical-align: middle"
            />QMK Configurator</a
          >
        </h1>
        <p class="random-potato">{{ potatoFact }}</p>
      </header>
      <router-view />
      <spinner :isVisible="showSpinner" :status="spinnerMsg" />
    </div>
    <footer>
      <p>
        This project is maintained by QMK collaborators and contributors like
        you!
      </p>
      <p>Hosted on GitHub Pages</p>
    </footer>
  </div>
</template>
<script>
import potatoFacts from '@/potato-facts';
import random from 'lodash/random';
import Spinner from '@/components/spinner';
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'app',
  components: {
    Spinner
  },
  data() {
    return {
      potatoFact: 'QMK for potatoes',
      interval: 120000
    };
  },
  mounted() {
    this.randomPotatoFact();
    this.interval = setInterval(() => {
      this.randomPotatoFact();
    }, this.interval);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  computed: {
    ...mapGetters('app', ['showSpinner', 'spinnerMsg'])
  },
  methods: {
    ...mapMutations('app', ['setShowSpinner']),
    randomPotatoFact() {
      this.potatoFact = potatoFacts[random(0, potatoFacts.length - 1)];
    },
    dismiss() {
      this.setShowSpinner(false);
    }
  }
};
</script>
<style lang="scss">
#app {
  display: grid;
  grid-template: 1fr / minmax(1000px, 1300px);
  justify-content: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
