<template>
  <div :id="id" />
</template>

<script setup lang="ts">
import { type Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useParticlesProvider } from "./particles-provider";

export type IParticlesProps = ISourceOptions;

let container: Container | undefined;

const props = defineProps<{
  id: string;
  options?: IParticlesProps;
  url?: string;
  theme?: string;
}>();

const emit = defineEmits<{
  (e: "particlesLoaded", container?: Container): void;
}>();

const provider = useParticlesProvider();
const isMounted = ref(false);

const loadParticles = async () => {
  container?.destroy();

  container = await tsParticles.load({
    id: props.id,
    url: props.url,
    options: props.options,
  });

  emit("particlesLoaded", container);
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
  () => props.theme,
  () => {
    container?.loadTheme(props.theme);
  },
  { immediate: true },
);
</script>
