<template>
  <div :id="id" />
</template>

<script lang="ts">
import { type Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
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
  particlesLoaded?: (container?: Container) => void;
  container?: Container;
  loadGeneration: number;
  onPropChange: () => void;
  onThemeChange: (newTheme?: string) => void;
}

async function particlesInit(component: ParticlesInstance): Promise<void> {
  if (!component.id) {
    throw new Error("Prop 'id' is required!");
  }

  const generation = component.loadGeneration;

  await waitForParticlesInitialization();

  if (!isParticlesInitialized()) {
    throw new Error(
      "@tsparticles/vue2 plugin initialization must be completed before rendering <VueParticles /> components.",
    );
  }

  const cb = (container?: Container) => {
    if (generation !== component.loadGeneration) {
      container?.destroy();
      return;
    }

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

  if (generation !== component.loadGeneration) {
    container?.destroy();
    return;
  }

  if (container && component.theme) {
    (container as ThemeableContainer).loadTheme?.(component.theme);
  }

  cb(container);
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
    this.$nextTick(() => {
      void particlesInit(this);
    });
  },
  beforeUnmount(this: ParticlesInstance): void {
    this.loadGeneration++;
    this.container?.destroy();
  },
  methods: {
    onPropChange(this: ParticlesInstance): void {
      this.container?.destroy();
      this.container = undefined;
      this.loadGeneration++;
      void particlesInit(this);
    },
    onThemeChange(this: ParticlesInstance, newTheme?: string): void {
      if (!this.container) {
        return;
      }

      (this.container as ThemeableContainer).loadTheme?.(newTheme);
    },
  },
});
</script>
