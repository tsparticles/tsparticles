<template>
  <div :id="id"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { tsParticles } from "tsparticles";
import { Container } from "tsparticles/dist/Core/Container";
import { RecursivePartial } from "tsparticles/dist/Types/RecursivePartial";
import { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";

@Options({
  props: {
    id: {
      type: String,
      required: true
    },
    options: {
      type: Object as () => RecursivePartial<IOptions>
    },
    particlesContainer: {
      type: Object as () => RecursivePartial<Container>
    }
  }
})
export default class Particles extends Vue {
  private id!: string;
  private options?: RecursivePartial<IOptions>;
  private particlesContainer?: Container;

  public mounted(): void {
    this.$nextTick(() => {
      if (!this.id) {
        throw new Error("Prop 'id' is required!");
      }

      tsParticles
          .load(this.id, this.options ?? {})
          .then(container => this.particlesContainer = container);
    });
  }

  public beforeDestroy(): void {
    if (this.particlesContainer) {
      this.particlesContainer.destroy();
    }
  }
}
</script>
