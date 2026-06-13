<template>
  <div :id="id" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { type Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import Vue from "vue";
import { isParticlesInitialized, waitForParticlesInitialization } from "./event-bus";

async function particlesInit(component: Particles): Promise<void> {
  if (!component.id) {
    throw new Error("Prop 'id' is required!");
  }

  await waitForParticlesInitialization();

  if (!isParticlesInitialized()) {
    throw new Error(
      "@tsparticles/vue2 plugin initialization must be completed before rendering <VueParticles /> components.",
    );
  }

  const cb = (container?: Container) => {
    component.container = container;

    if (container && component.particlesLoaded) {
      component.particlesLoaded(container);
    }
  };

  const container = await tsParticles.load({
    id: component.id,
    options: component.options ?? {},
    url: component.url,
  });

  if (container && component.theme) {
    (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(component.theme);
  }

  cb(container);
}

@Component
export default class Particles extends Vue {
  @Prop({ required: true }) readonly id!: string;
  @Prop() readonly options?: ISourceOptions;
  @Prop() readonly url?: string;
  @Prop() readonly theme?: string;
  @Prop() readonly particlesLoaded?: (container?: Container) => void;

  container?: Container;

  @Watch("options")
  @Watch("url")
  @Watch("id")
  onPropChange(): void {
    if (this.container) {
      void particlesInit(this);
    }
  }

  @Watch("theme")
  onThemeChange(newTheme?: string): void {
    if (!this.container) return;
    (this.container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(newTheme);
  }

  mounted(): void {
    this.$nextTick(() => {
      void particlesInit(this);
    });
  }

  beforeDestroy(): void {
    this.container?.destroy();
  }
}
</script>
