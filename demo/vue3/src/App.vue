<template>
  <div>
    <h1
      class="app__title" 
      align="center"
    >
      Welcome to tsParticles Vue3 Demo
    </h1>

    <CodeViewer
      :code="codeStringified"
      :optionSelected="optionSelected"
      :optionsList="optionsList"
      @change-option="changeOption"
    />
    
    <Particles
      id="tsparticles"
      :options="options"
      :key="optionSelected"
    />
  </div>
</template>

<script lang="ts">
import CodeViewer from './components/code-viewer.vue';
import stringifyObject from 'stringify-object';
import { Options, Vue } from "vue-class-component";
import { optionsMap } from './map-options';

@Options({
  components: {
    CodeViewer,
  },
})
export default class App extends Vue {
  optionSelected = 'crazyParticles'

  changeOption(newValue: string) {
    this.optionSelected = newValue;
  }

  get codeStringified() {
    return stringifyObject(optionsMap[this.optionSelected], {
      indent: '  ',
    	singleQuotes: false,
    });
  }

  get options() {
    return optionsMap[this.optionSelected];
  }

  get optionsList() {
    return Object.keys(optionsMap);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.app__title {
  color: #2c3e50;
}
</style>
