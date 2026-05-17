<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import configs from "@tsparticles/configs";

const excludedKeys: readonly string[] = ["test", "bubble", "stars", "polygonMask", "shadow"];
const excludedPrefixes: readonly string[] = ["palette-"];

const configKeys = Object.keys(configs).filter(
  (key) =>
    !excludedKeys.includes(key) &&
    !excludedPrefixes.some((p) => key.startsWith(p)),
);

const currentKey = ref(pickRandom());
const containerId = "random-demo-canvas";
const canvasRef = ref<HTMLElement | null>(null);

let cycleTimer: ReturnType<typeof setTimeout> | undefined;
let initialized = false;

function pickRandom(): string {
  return configKeys[Math.floor(Math.random() * configKeys.length)];
}

function toTitleCase(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[-_\s]+/)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

const currentTitle = computed(() => toTitleCase(currentKey.value));

async function loadAndStart(key: string) {
  if (!initialized) {
    await loadAll(tsParticles);
    initialized = true;
  }

  const container = tsParticles.items.find((c) => c.id === containerId);
  if (container) {
    container.destroy();
  }

  const options = {
    ...(configs[key] as Record<string, unknown>),
    fullScreen: { enable: false },
    fpsLimit: 30,
    autoPlay: true,
    pauseOnBlur: false,
    responsive: [],
    resize: { enable: false },
  };

  await tsParticles.load({
    id: containerId,
    element: canvasRef.value ?? undefined,
    options: options as any,
  });
}

async function nextRandom() {
  const newKey = pickRandom();
  currentKey.value = newKey;
  await loadAndStart(newKey);
  resetCycle();
}

function resetCycle() {
  if (cycleTimer) clearTimeout(cycleTimer);
  cycleTimer = setTimeout(nextRandom, 10000);
}

onMounted(async () => {
  await loadAndStart(currentKey.value);
  resetCycle();
});

onUnmounted(() => {
  if (cycleTimer) clearTimeout(cycleTimer);
  const container = tsParticles.items.find((c) => c.id === containerId);
  if (container) container.destroy();
});
</script>

<template>
  <div class="random-demo">
    <div class="demo-canvas" :id="containerId" ref="canvasRef" />
    <div class="demo-overlay">
      <div class="demo-bar">
        <span class="demo-name">{{ currentTitle }}</span>
        <button class="demo-shuffle" @click="nextRandom" title="Next random config">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <polyline points="23 20 23 14 17 14" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.random-demo {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: #090d1c;
  border: 1px solid var(--vp-c-divider);
}

.demo-canvas {
  width: 100%;
  height: 100%;
  min-height: 240px;
}

.demo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.55));
  padding: 2rem 1rem 0.75rem;
}

.demo-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.demo-name {
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.demo-shuffle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 6px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: #fff;
  transition: background 0.15s;
}

.demo-shuffle:hover {
  background: rgba(255, 255, 255, 0.25);
}

.demo-shuffle svg {
  display: block;
}
</style>
