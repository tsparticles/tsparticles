<script setup lang="ts">
import { confetti, type ConfettiOptions } from "@tsparticles/confetti";
import { tsParticles, type Container } from "@tsparticles/engine";
import { fireworks, type FireworkOptions } from "@tsparticles/fireworks";
import { particles, type ParticlesOptions } from "@tsparticles/particles";
import { ribbons, type RibbonsOptions } from "@tsparticles/ribbons";
import { reactive, ref } from "vue";

type BundleKey = "confetti" | "fireworks" | "particles" | "ribbons";

const bundleIds: Record<BundleKey, string> = {
  confetti: "tsparticles-bundle-confetti",
  fireworks: "tsparticles-bundle-fireworks",
  particles: "tsparticles-bundle-particles",
  ribbons: "tsparticles-bundle-ribbons",
};

const defaultOptions: Record<BundleKey, unknown> = {
  confetti: {
    count: 80,
    spread: 55,
    angle: 90,
    startVelocity: 45,
    gravity: 1,
    zIndex: 10,
    colors: ["#ff577f", "#ffd166", "#06d6a0", "#4cc9f0"],
    position: {
      x: 50,
      y: 50,
    },
  },
  fireworks: {
    background: "#0a1026",
    colors: ["#ffffff", "#ffd166", "#72ddf7", "#f15bb5"],
    sounds: false,
    rate: {
      min: 2,
      max: 4,
    },
    speed: {
      min: 10,
      max: 25,
    },
  },
  particles: {
    count: 30,
    color: "#72ddf7",
    links: true,
    linksColor: "#72ddf7",
    linksLength: 100,
    collisions: true,
    radius: {
      min: 1,
      max: 3,
    },
    speed: {
      min: 0.3,
      max: 1.2,
    },
    shape: ["circle", "square"],
  },
  ribbons: {
    count: 1,
    spread: 0,
    startVelocity: 0,
    gravity: 1,
    colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF"],
    position: {
      x: 50,
      y: 0,
    },
  },
};

const editors = reactive<Record<BundleKey, string>>({
  confetti: JSON.stringify(defaultOptions.confetti, null, 2),
  fireworks: JSON.stringify(defaultOptions.fireworks, null, 2),
  particles: JSON.stringify(defaultOptions.particles, null, 2),
  ribbons: JSON.stringify(defaultOptions.ribbons, null, 2),
});

const statuses = reactive<Record<BundleKey, string>>({
  confetti: "Ready. Press Start.",
  fireworks: "Ready. Press Start.",
  particles: "Ready. Press Start.",
  ribbons: "Ready. Press Start.",
});

const parseErrors = reactive<Record<BundleKey, string>>({
  confetti: "",
  fireworks: "",
  particles: "",
  ribbons: "",
});

const busy = reactive<Record<BundleKey, boolean>>({
  confetti: false,
  fireworks: false,
  particles: false,
  ribbons: false,
});

const confettiContainer = ref<Container | undefined>();
const confettiCanvas = ref<HTMLCanvasElement | null>(null);
const confettiRunning = ref(false);
const fireworksCanvas = ref<HTMLCanvasElement | null>(null);
const fireworksInstance = ref<{ pause: () => void; play: () => void; stop: () => void } | undefined>();
const fireworksRunning = ref(false);
const particlesCanvas = ref<HTMLCanvasElement | null>(null);
const particlesInstance = ref<{ pause: () => void; play: () => void; stop: () => void } | undefined>();
const particlesRunning = ref(false);
const ribbonsCanvas = ref<HTMLCanvasElement | null>(null);
const ribbonsContainer = ref<Container | undefined>();
const ribbonsRunning = ref(false);

function getContainerById(id: string): Container | undefined {
  return tsParticles.items.find((container) => String(container.id) === id);
}

function destroyById(id: string): void {
  const container = getContainerById(id);

  container?.destroy();
}

function parseOptions<T>(bundle: BundleKey): T | undefined {
  parseErrors[bundle] = "";

  try {
    return JSON.parse(editors[bundle]) as T;
  } catch {
    parseErrors[bundle] = "Invalid JSON. Check commas, quotes, and braces.";
    statuses[bundle] = "JSON parsing error.";

    return;
  }
}

function resetOptions(bundle: BundleKey): void {
  editors[bundle] = JSON.stringify(defaultOptions[bundle], null, 2);
  parseErrors[bundle] = "";
  statuses[bundle] = "Reset to default options.";
}

async function startConfetti(): Promise<void> {
  if (busy.confetti) {
    return;
  }

  const options = parseOptions<ConfettiOptions>("confetti");
  const canvas = confettiCanvas.value;

  if (!options || !canvas) {
    if (!canvas) {
      statuses.confetti = "Canvas not ready yet. Retry in a second.";
    }

    return;
  }

  busy.confetti = true;

  try {
    destroyById(bundleIds.confetti);
    const fireOnCanvas = await confetti.create(canvas, options);

    confettiContainer.value = await fireOnCanvas(options);

    if (!confettiContainer.value) {
      confettiRunning.value = false;
      statuses.confetti = "No confetti container created.";

      return;
    }

    confettiRunning.value = true;
    statuses.confetti = "Confetti running.";
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";

    statuses.confetti = `Start failed: ${reason}`;
  } finally {
    busy.confetti = false;
  }
}

function stopConfetti(): void {
  if (!confettiContainer.value) {
    statuses.confetti = "No active confetti demo.";

    return;
  }

  confettiContainer.value.pause();
  confettiRunning.value = false;
  statuses.confetti = "Confetti paused.";
}

function resumeConfetti(): void {
  if (!confettiContainer.value) {
    statuses.confetti = "No active confetti demo.";

    return;
  }

  confettiContainer.value.play();
  confettiRunning.value = true;
  statuses.confetti = "Confetti resumed.";
}

function destroyConfetti(): void {
  if (!confettiContainer.value) {
    statuses.confetti = "No confetti demo to destroy.";

    return;
  }

  confettiContainer.value.destroy();
  confettiContainer.value = undefined;
  confettiRunning.value = false;
  statuses.confetti = "Confetti destroyed.";
}

async function startFireworks(): Promise<void> {
  if (busy.fireworks) {
    return;
  }

  const options = parseOptions<FireworkOptions>("fireworks");
  const canvas = fireworksCanvas.value;

  if (!options || !canvas) {
    if (!canvas) {
      statuses.fireworks = "Canvas not ready yet. Retry in a second.";
    }

    return;
  }

  busy.fireworks = true;

  try {
    destroyById(bundleIds.fireworks);
    fireworksInstance.value = undefined;
    const instance = await fireworks.create(canvas, options);

    if (!instance) {
      fireworksRunning.value = false;
      statuses.fireworks = "No fireworks instance created.";

      return;
    }

    fireworksInstance.value = instance;
    fireworksRunning.value = true;
    statuses.fireworks = "Fireworks running.";
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";

    statuses.fireworks = `Start failed: ${reason}`;
  } finally {
    busy.fireworks = false;
  }
}

function stopFireworks(): void {
  if (!fireworksInstance.value) {
    statuses.fireworks = "No active fireworks demo.";

    return;
  }

  fireworksInstance.value.pause();
  fireworksRunning.value = false;
  statuses.fireworks = "Fireworks paused.";
}

function resumeFireworks(): void {
  if (!fireworksInstance.value) {
    statuses.fireworks = "No active fireworks demo.";

    return;
  }

  fireworksInstance.value.play();
  fireworksRunning.value = true;
  statuses.fireworks = "Fireworks resumed.";
}

function destroyFireworks(): void {
  if (!fireworksInstance.value) {
    statuses.fireworks = "No fireworks demo to destroy.";

    return;
  }

  fireworksInstance.value.stop();
  fireworksInstance.value = undefined;
  destroyById(bundleIds.fireworks);
  fireworksRunning.value = false;
  statuses.fireworks = "Fireworks destroyed.";
}

async function startParticles(): Promise<void> {
  if (busy.particles) {
    return;
  }

  const options = parseOptions<ParticlesOptions>("particles");
  const canvas = particlesCanvas.value;

  if (!options || !canvas) {
    if (!canvas) {
      statuses.particles = "Canvas not ready yet. Retry in a second.";
    }

    return;
  }

  busy.particles = true;

  try {
    destroyById(bundleIds.particles);
    particlesInstance.value = undefined;
    const instance = await particles.create(canvas, options);

    if (!instance) {
      particlesRunning.value = false;
      statuses.particles = "No particles instance created.";

      return;
    }

    particlesInstance.value = instance;
    particlesRunning.value = true;
    statuses.particles = "Particles running.";
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";

    statuses.particles = `Start failed: ${reason}`;
  } finally {
    busy.particles = false;
  }
}

function stopParticles(): void {
  if (!particlesInstance.value) {
    statuses.particles = "No active particles demo.";

    return;
  }

  particlesInstance.value.pause();
  particlesRunning.value = false;
  statuses.particles = "Particles paused.";
}

function resumeParticles(): void {
  if (!particlesInstance.value) {
    statuses.particles = "No active particles demo.";

    return;
  }

  particlesInstance.value.play();
  particlesRunning.value = true;
  statuses.particles = "Particles resumed.";
}

function destroyParticles(): void {
  if (!particlesInstance.value) {
    statuses.particles = "No particles demo to destroy.";

    return;
  }

  particlesInstance.value.stop();
  particlesInstance.value = undefined;
  destroyById(bundleIds.particles);
  particlesRunning.value = false;
  statuses.particles = "Particles destroyed.";
}

async function startRibbons(): Promise<void> {
  if (busy.ribbons) {
    return;
  }

  const options = parseOptions<RibbonsOptions>("ribbons");

  if (!options) {
    return;
  }

  busy.ribbons = true;

  try {
    destroyById(bundleIds.ribbons);
    ribbonsContainer.value = undefined;
    const container = await ribbons(bundleIds.ribbons, options);

    if (!container) {
      ribbonsRunning.value = false;
      statuses.ribbons = "No ribbons container created.";

      return;
    }

    ribbonsContainer.value = container;
    ribbonsRunning.value = true;
    statuses.ribbons = "Ribbons running.";
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";

    statuses.ribbons = `Start failed: ${reason}`;
  } finally {
    busy.ribbons = false;
  }
}

function stopRibbons(): void {
  if (!ribbonsContainer.value) {
    statuses.ribbons = "No active ribbons demo.";

    return;
  }

  ribbonsContainer.value.pause();
  ribbonsRunning.value = false;
  statuses.ribbons = "Ribbons paused.";
}

function resumeRibbons(): void {
  if (!ribbonsContainer.value) {
    statuses.ribbons = "No active ribbons demo.";

    return;
  }

  ribbonsContainer.value.play();
  ribbonsRunning.value = true;
  statuses.ribbons = "Ribbons resumed.";
}

function destroyRibbons(): void {
  if (!ribbonsContainer.value) {
    statuses.ribbons = "No ribbons demo to destroy.";

    return;
  }

  ribbonsContainer.value.destroy();
  ribbonsContainer.value = undefined;
  ribbonsRunning.value = false;
  statuses.ribbons = "Ribbons destroyed.";
}
</script>

<template>
  <div class="bundle-playgrounds">
    <section class="bundle-card">
      <h2>@tsparticles/confetti</h2>
      <p class="bundle-description">One-call confetti API for celebratory bursts and overlays.</p>
      <canvas :id="bundleIds.confetti" ref="confettiCanvas" class="playground-canvas" />
      <div class="button-row">
        <button type="button" :disabled="busy.confetti" @click="resetOptions('confetti')">Reset JSON</button>
        <button type="button" :disabled="busy.confetti" @click="startConfetti">Start</button>
        <button type="button" :disabled="busy.confetti || !confettiRunning" @click="stopConfetti">Pause</button>
        <button type="button" :disabled="busy.confetti || confettiRunning" @click="resumeConfetti">Resume</button>
        <button type="button" :disabled="busy.confetti" @click="destroyConfetti">Destroy</button>
      </div>
      <p class="status">{{ statuses.confetti }}</p>
      <p v-if="parseErrors.confetti" class="parse-error">{{ parseErrors.confetti }}</p>
      <textarea
        v-model="editors.confetti"
        class="options-editor"
        spellcheck="false"
        aria-label="Confetti options editor"
      />
    </section>

    <section class="bundle-card">
      <h2>@tsparticles/fireworks</h2>
      <p class="bundle-description">Focused fireworks API with quick setup for launch/explosion scenes.</p>
      <canvas :id="bundleIds.fireworks" ref="fireworksCanvas" class="playground-canvas" />
      <div class="button-row">
        <button type="button" :disabled="busy.fireworks" @click="resetOptions('fireworks')">Reset JSON</button>
        <button type="button" :disabled="busy.fireworks" @click="startFireworks">Start</button>
        <button type="button" :disabled="busy.fireworks || !fireworksRunning" @click="stopFireworks">Pause</button>
        <button type="button" :disabled="busy.fireworks || fireworksRunning" @click="resumeFireworks">Resume</button>
        <button type="button" :disabled="busy.fireworks" @click="destroyFireworks">Destroy</button>
      </div>
      <p class="status">{{ statuses.fireworks }}</p>
      <p v-if="parseErrors.fireworks" class="parse-error">{{ parseErrors.fireworks }}</p>
      <textarea
        v-model="editors.fireworks"
        class="options-editor"
        spellcheck="false"
        aria-label="Fireworks options editor"
      />
    </section>

    <section class="bundle-card">
      <h2>@tsparticles/particles</h2>
      <p class="bundle-description">Simplified particles background API for network and geometric effects.</p>
      <canvas :id="bundleIds.particles" ref="particlesCanvas" class="playground-canvas" />
      <div class="button-row">
        <button type="button" :disabled="busy.particles" @click="resetOptions('particles')">Reset JSON</button>
        <button type="button" :disabled="busy.particles" @click="startParticles">Start</button>
        <button type="button" :disabled="busy.particles || !particlesRunning" @click="stopParticles">Pause</button>
        <button type="button" :disabled="busy.particles || particlesRunning" @click="resumeParticles">Resume</button>
        <button type="button" :disabled="busy.particles" @click="destroyParticles">Destroy</button>
      </div>
      <p class="status">{{ statuses.particles }}</p>
      <p v-if="parseErrors.particles" class="parse-error">{{ parseErrors.particles }}</p>
      <textarea
        v-model="editors.particles"
        class="options-editor"
        spellcheck="false"
        aria-label="Particles options editor"
      />
    </section>

    <section class="bundle-card">
      <h2>@tsparticles/ribbons</h2>
      <p class="bundle-description">Ready-to-use animated ribbons with emitters, gravity, and multi-color support.</p>
      <canvas :id="bundleIds.ribbons" ref="ribbonsCanvas" class="playground-canvas" />
      <div class="button-row">
        <button type="button" :disabled="busy.ribbons" @click="resetOptions('ribbons')">Reset JSON</button>
        <button type="button" :disabled="busy.ribbons" @click="startRibbons">Start</button>
        <button type="button" :disabled="busy.ribbons || !ribbonsRunning" @click="stopRibbons">Pause</button>
        <button type="button" :disabled="busy.ribbons || ribbonsRunning" @click="resumeRibbons">Resume</button>
        <button type="button" :disabled="busy.ribbons" @click="destroyRibbons">Destroy</button>
      </div>
      <p class="status">{{ statuses.ribbons }}</p>
      <p v-if="parseErrors.ribbons" class="parse-error">{{ parseErrors.ribbons }}</p>
      <textarea
        v-model="editors.ribbons"
        class="options-editor"
        spellcheck="false"
        aria-label="Ribbons options editor"
      />
    </section>
  </div>
</template>

<style scoped>
.bundle-playgrounds {
  display: grid;
  gap: 1.2rem;
}

.bundle-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
}

.bundle-card h2 {
  margin: 0;
  font-size: 1rem;
}

.bundle-description {
  margin: 0.5rem 0 0;
  color: var(--vp-c-text-2);
}

.button-row {
  margin-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.button-row button {
  padding: 0.45rem 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
}

.status {
  margin: 0.65rem 0 0;
}

.parse-error {
  margin: 0.4rem 0 0;
  color: #ff6b6b;
}

.options-editor {
  margin-top: 0.75rem;
  width: 100%;
  min-height: 210px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.9rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.82rem;
  line-height: 1.5;
  background: var(--vp-c-bg);
}

.playground-canvas {
  margin-top: 0.75rem;
  width: 100%;
  height: 280px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  background: #0a1026;
}
</style>
