<template>
  <div :id="id" :key="id" />
</template>

<script lang="ts">
import { type Container, type ISourceOptions, getLogger, tsParticles } from "@tsparticles/engine";
import Vue from "vue";
import { isParticlesInitialized, waitForParticlesInitialization } from "./event-bus";

type ThemeableContainer = Container & {
  loadTheme?: (name?: string) => Promise<void>;
};

interface ParticlesInstance extends Vue {
  id: string;
  options?: ISourceOptions;
  url?: string;
  theme?: string;
  particlesLoaded?: (container?: Container) => Promise<void> | void;
  container?: Container;
  loadGeneration: number;
  onPropChange: () => void;
  onThemeChange: (newTheme?: string) => void;
}

async function particlesInit(component: ParticlesInstance, generation: number): Promise<void> {
  let container: Container | undefined;

  try {
    await waitForParticlesInitialization();

    if (generation !== component.loadGeneration) {
      return;
    }

    if (!component.id) {
      throw new Error("Prop 'id' is required!");
    }

    if (!isParticlesInitialized()) {
      throw new Error(
        "@tsparticles/vue2 plugin initialization must be completed before rendering <VueParticles /> components.",
      );
    }

    container = await tsParticles.load({
      id: component.id,
      options: component.options ?? {},
      url: component.url,
    });
  } catch (error: unknown) {
    if (generation === component.loadGeneration) {
      getLogger().error("VueParticles: error loading particles", error);
    }

    return;
  }

  if (generation !== component.loadGeneration) {
    container?.destroy();
    return;
  }

  component.container = container;

  if (!container) {
    return;
  }

  if (component.theme) {
    component.onThemeChange(component.theme);
  }

  try {
    await component.particlesLoaded?.(container);
  } catch (error: unknown) {
    getLogger().error("VueParticles: error in particlesLoaded callback", error);
  }
}

export default Vue.extend({
  props: {
    id: {
      required: true,
      type: String,
    },
    options: {
      default: undefined,
      type: Object,
    },
    url: {
      default: undefined,
      type: String,
    },
    theme: {
      default: undefined,
      type: String,
    },
    particlesLoaded: {
      default: undefined,
      type: Function,
    },
  },
  data() {
    return {
      container: undefined as Container | undefined,
      loadGeneration: 0,
    };
  },
  watch: {
    options(this: ParticlesInstance) {
      this.onPropChange();
    },
    url(this: ParticlesInstance) {
      this.onPropChange();
    },
    id(this: ParticlesInstance) {
      this.onPropChange();
    },
    theme(this: ParticlesInstance, newTheme?: string) {
      this.onThemeChange(newTheme);
    },
  },
  mounted(this: ParticlesInstance): void {
    const generation = ++this.loadGeneration;

    this.$nextTick(() => {
      void particlesInit(this, generation);
    });
  },
  beforeDestroy(this: ParticlesInstance): void {
    this.loadGeneration++;
    this.container?.destroy();
    this.container = undefined;
  },
  methods: {
    onPropChange(this: ParticlesInstance): void {
      this.container?.destroy();
      this.container = undefined;
      void particlesInit(this, ++this.loadGeneration);
    },
    onThemeChange(this: ParticlesInstance, newTheme?: string): void {
      const container = this.container;

      if (!container) {
        return;
      }

      void (async () => {
        try {
          await (container as ThemeableContainer).loadTheme?.(newTheme);
        } catch (error: unknown) {
          if (this.container === container) {
            getLogger().error("VueParticles: error loading theme", error);
          }
        }
      })();
    },
  },
});
</script>
