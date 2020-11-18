<template>
  <div :id="id"></div>
</template>

<script lang="ts">
import { nextTick, PropType } from "vue";
import { Options, Vue } from "vue-class-component";
import { Main, tsParticles } from "tsparticles";
import type { Container, ISourceOptions } from "tsparticles";

export type IParticlesProps = ISourceOptions;
export type IParticlesParams = IParticlesProps;

@Options({
  props: {
    id: {
      type: String,
      required: true
    },
    options: {
      type: Object as PropType<IParticlesProps>
    },
    particlesLoaded: {
      type: Object as PropType<(container: Container) => void>
    },
    particlesInit: {
      type: Function as PropType<(tsParticles: Main) => void>
    }
  }
})
export default class Particles extends Vue {
  private id!: string;
  private options?: IParticlesProps;
  private particlesLoaded?: (container: Container) => void;
  private particlesInit?: (tsParticles: Main) => void;
  private container?: Container;

  public mounted(): void {
    nextTick(() => {
      if (!this.id) {
        throw new Error("Prop 'id' is required!");
      }

      tsParticles.init();

      if (this.particlesInit) {
        this.particlesInit(tsParticles);
      }

      tsParticles
          .load(this.id, this.options ?? {})
          .then(container => {
            this.container = container;

            if (this.particlesLoaded) {
              this.particlesLoaded(container);
            }
          });
    });
  }

  public beforeDestroy(): void {
    if (this.container) {
      this.container.destroy();
    }
  }
}
</script>
