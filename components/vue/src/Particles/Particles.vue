<template>
  <div :id="id"></div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Main, tsParticles } from "tsparticles";
import type { Container, ISourceOptions } from "tsparticles";
import Vue from "vue";

export type IParticlesProps = ISourceOptions;
export type IParticlesParams = IParticlesProps;

@Component
export default class Particles extends Vue {
  @Prop({ required: true }) private id!: string;
  @Prop() private options?: IParticlesProps;
  @Prop() private particlesLoaded?: (container: Container) => void;
  @Prop() private particlesInit?: (tsParticles: Main) => void;
  private container?: Container;

  private mounted(): void {
    this.$nextTick(() => {
      if (!this.id) {
        throw new Error("Prop 'id' is required!")
      }

      tsParticles.init();

      if (this.particlesInit) {
        this.particlesInit(tsParticles);
      }

      tsParticles.load(this.id, this.options ?? {}).then(container => {
        this.container = container;

        if (this.container && this.particlesLoaded) {
          this.particlesLoaded(this.container);
        }
      });
    });
  }

  private beforeDestroy(): void {
    this.container?.destroy();
  }
}
</script>
