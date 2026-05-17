<script setup lang="ts">
import { useData } from "vitepress";
import { VPHomeFeatures, VPHomeContent } from "vitepress/theme";
import RandomDemoHero from "./RandomDemoHero.vue";

const { frontmatter: fm } = useData();
</script>

<template>
  <div v-if="fm.hero" class="VPHome">
    <RandomDemoHero />
    <VPHomeFeatures />
    <VPHomeContent>
      <Content />
    </VPHomeContent>
  </div>
</template>

<style scoped>
.VPHome {
  margin-bottom: 96px;
}

@media (min-width: 768px) {
  .VPHome {
    margin-bottom: 128px;
  }
}
</style>
