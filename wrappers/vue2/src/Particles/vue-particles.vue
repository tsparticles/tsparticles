<template>
  <div :id="id" />
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { type Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import Vue from "vue";
import { waitForParticlesInitialization } from "./event-bus";

export type IParticlesProps = ISourceOptions;

async function particlesInit(component: Particles): Promise<void> {
  if (!component.id) {
    throw new Error("Prop 'id' is required!");
  }

  await waitForParticlesInitialization();

  const cb = (container?: Container) => {
    component.container = container;

    if (component.container && component.particlesLoaded) {
      component.particlesLoaded(component.container);
    }
  };

  const container = await tsParticles.load({
    id: component.id,
    options: component.options ?? {},
    url: component.url,
  });

  cb(container);
}

@Component
export default class Particles extends Vue {
  @Prop({ required: true }) readonly id!: string;
  @Prop() readonly options?: IParticlesProps;
  @Prop() readonly url?: string;
  @Prop() readonly particlesLoaded?: (container: Container) => void;

  container?: Container;

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
