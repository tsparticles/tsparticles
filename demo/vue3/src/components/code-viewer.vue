<template>
  <div class="code-viewer">
    <div class="code-viewer__row">
      <h3 class="code-viewer__title">Options examples:</h3>
    </div>
  
    <div class="code-viewer__row">
      <select
        :value="optionSelected"
        class="code-viewer__select"
        @input="$emit('change-option', $event.target.value)"
      >
        <option
          v-for="(option, index) in optionsList"
          :value="option"
          :key="index"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <highlightjs
      language="javascript"
      :code="code"
      class="code-viewer__wrapper"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    code: String,
    optionSelected: String,
    optionsList: Array,
  },
})
export default class CodeViewer extends Vue {
  code!: string;
  optionsList!: string[];
}
</script>

<style>

.code-viewer {
  background-color: white;
  width: fit-content;
  position: relative;
  border: 1px solid black;
  border-radius: 20px;
}

.code-viewer__title {
  margin: 0;
}

.code-viewer__row {
  padding: 16px;
}

.code-viewer__select {
  width: 100%;
}

.code-viewer__wrapper {
  height: 50vh;
  width: fit-content;
  overflow: auto;
  margin: 0;
}

.code-viewer__wrapper code {
  white-space: pre;
  overflow: overlay;
  text-align: left;
  min-width: 20vw;
}
</style>
