<template>
  <div :id="id"></div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { tsParticles } from "tsparticles-engine";
import type { Container, ISourceOptions, Main } from "tsparticles-engine";
import Vue from "vue";

export type IParticlesProps = ISourceOptions;
export type IParticlesParams = IParticlesProps;

@Component
export default class Particles extends Vue {
  @Prop({ required: true }) private id!: string;
  @Prop() private options?: IParticlesProps;
  @Prop() private url?: string;
  @Prop() private particlesLoaded?: (container: Container) => void;
  @Prop() private particlesInit?: (tsParticles: Main) => Promise<void>;
  private container?: Container;

  private mounted(): void {
    this.$nextTick(async () => {
      if (!this.id) {
        throw new Error("Prop 'id' is required!")
      }

      if (this.particlesInit) {
        await this.particlesInit(tsParticles);
      }

      const cb = (container?: Container) => {
        this.container = container;

        if (this.container && this.particlesLoaded) {
          this.particlesLoaded(this.container);
        }
      };

      const container = await (this.url ? tsParticles.loadJSON(this.id, this.url) : tsParticles.load(this.id, this.options ?? {}));

      cb(container);
    });
  }

  private beforeDestroy(): void {
    this.container?.destroy();
  }
}
</script>
