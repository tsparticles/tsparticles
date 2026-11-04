<template>
  <div :id="id" />
</template>

<script setup lang="ts">
import { type Container, type ISourceOptions, getLogger, tsParticles } from "@tsparticles/engine";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useParticlesProvider } from "./particles-provider";

let container: Container | undefined,
  loadId = 0;

const props = defineProps<{
    id: string;
    options?: ISourceOptions;
    url?: string;
    theme?: string;
  }>(),
  emit = defineEmits<{
    (e: "particlesLoaded", container?: Container): void;
  }>(),
  provider = useParticlesProvider(),
  isMounted = ref(false),
  loadParticles = async (): Promise<void> => {
    const currentLoadId = ++loadId;

    /* every requested load starts immediately, the load id discards the results of the outdated ones */
    container?.destroy();
    container = undefined;

    try {
      const newContainer = await tsParticles.load({
        id: props.id,
        url: props.url,
        options: props.options,
      });

      if (currentLoadId !== loadId) {
        newContainer?.destroy();

        return;
      }

      container = newContainer;

      if (container && props.theme) {
        (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(props.theme);
      }

      emit("particlesLoaded", container);
    } catch (error: unknown) {
      /* a failure must not block the next load, and only the latest one is worth reporting */
      if (currentLoadId === loadId) {
        getLogger().error("Particles: error during load", error);
      }
    }
  };

onMounted(() => {
  void nextTick(() => {
    if (!props.id) {
      throw new Error("Prop 'id' is required!");
    }

    isMounted.value = true;
  });
});

onUnmounted(() => {
  ++loadId;

  container?.destroy();

  container = undefined;
});

watch(
  () => provider.loaded,
  loaded => {
    if (loaded && isMounted.value) {
      void loadParticles();
    }
  },
  { immediate: true },
);

watch(
  () => isMounted.value,
  mounted => {
    if (mounted && provider.loaded) {
      void loadParticles();
    }
  },
  { immediate: true },
);

watch(
  () => props.id,
  () => {
    if (provider.loaded && isMounted.value) {
      void loadParticles();
    }
  },
);

watch(
  () => props.options,
  () => {
    if (provider.loaded && isMounted.value) {
      void loadParticles();
    }
  },
  { deep: true },
);

watch(
  () => props.url,
  () => {
    if (provider.loaded && isMounted.value) {
      void loadParticles();
    }
  },
);

watch(
  () => props.theme,
  newTheme => {
    if (!container) return;
    (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(newTheme);
  },
);
</script>
