<template>
  <div :id="id"></div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { tsParticles } from "tsparticles";
import type { Container, RecursivePartial, IOptions } from "tsparticles";
import Vue from "vue";

export type IParticlesProps = RecursivePartial<IOptions>;
export type IParticlesParams = IParticlesProps;

@Component
export default class Particles extends Vue {
  @Prop({ required: true }) private id!: string;
  @Prop() private options?: IParticlesProps;
  private particlesContainer?: Container;

  private mounted(): void {
    this.$nextTick(() => {
      if (!this.id) {
        throw new Error("Prop 'id' is required!")
      }

      tsParticles.load(this.id, this.options ?? {}).then(container => this.particlesContainer = container);
    });
  }

  private beforeDestroy(): void {
    this.particlesContainer?.destroy();
  }
}
</script>
