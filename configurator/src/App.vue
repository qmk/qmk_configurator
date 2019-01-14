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
  </div>
</template>
<script>
const potatoFacts = [
  'A potato is about 80% water and 20% solid.',
  'Henry Spalding first planted potatoes in Idaho in 1837',
  '“French Fries” were introduced to America when Thomas Jefferson served them at a Whitehouse dinner.',
  'United States potato lovers consumed more than 4 million tons of French Fries in various shapes and sizes.',
  'Potatoes are a powerful aphrodisiac, says a physician in Ireland.',
  'The average American eats 140 pounds of potatoes per year. Germans eat more than 200 pounds per year.',
  'The largest potato grown was 18 pounds and 4 ounces according to the Guinness Book of World Records. It was grown in England in 1795.',
  'Potatoes are the world’s fourth food staple – after wheat, corn and rice.',
  'Potatoes are grown in more than 125 countries.',
  'Every year enough potatoes are grown worldwide to cover a four-lane motorway circling the world six times.',
  'China is the world’s largest potato producer.',
  'Potatoes were the first vegetable grown in space.',
  'Potatoes are totally gluten-free.',
  'One of the most basic Incan measurements of time was the time it took to cook a potato.',
  'If a potato is exposed to light while growing, it will turn green and become poisonous.',
  'It takes 10,000 pounds of potatoes to make 2,500 pounds of potato chips.',
  'Today there are more than 4000 different kinds of potatoes.',
  'Potatoes belong to a small family, the Nightshade or Solanaceous family.',
  'During the Alaskan Klondike gold rush, (1897-1898) potatoes were practically worth their weight in gold.',
  'Sir Walter Raleigh introduced potatoes to Ireland in 1589 on the 40,000 acres of land near Cork.',
  'Potatoes are available year-round as they are harvested somewhere every month of the year.',
  'Native to Africa and Asia, yams vary in size from the size of a small potato up to the record size of 130 pounds.'
];
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
      interval: undefined
    };
  },
  mounted() {
    this.randomPotatoFact();
    this.interval = setInterval(() => {
      this.randomPotatoFact();
    }, 120000);
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
      this.potatoFact =
        potatoFacts[Math.floor(Math.random(Date.now()) * potatoFacts.length)];
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
