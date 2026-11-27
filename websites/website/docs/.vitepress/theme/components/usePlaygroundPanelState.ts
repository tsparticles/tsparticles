import type { Container, ISourceOptions } from "@tsparticles/engine";
import { computed, nextTick, onMounted, ref } from "vue";
import {
  getPlaygroundFeaturesInitState,
  engine,
  initPlaygroundFeaturesOnce,
  playgroundFeaturesInfo,
} from "./playgroundLoaders";
import type { DemoPreset, PaletteGroupDefinition, PlaygroundMode } from "./playgroundTypes";

type UsePlaygroundPanelStateParams = {
  mode: PlaygroundMode;
  demoPresets: DemoPreset[];
  paletteGroupDefinitions: readonly PaletteGroupDefinition[];
};

function getPaletteSlugFromPreset(preset: DemoPreset): string | undefined {
  if (preset.kind !== "palette") {
    return undefined;
  }

  return typeof preset.options.palette === "string" ? preset.options.palette : undefined;
}

export function usePlaygroundPanelState({ mode, demoPresets, paletteGroupDefinitions }: UsePlaygroundPanelStateParams) {
  const selectedKey = ref(demoPresets[0].key);
  const editorText = ref(JSON.stringify(demoPresets[0].options, null, 2));
  const isRunning = ref(false);
  const isBusy = ref(false);
  const status = ref("Press Start to run the demo.");
  const parseError = ref("");

  const containerId = "tsparticles-playground";
  const playgroundTarget = ref<HTMLElement | null>(null);

  let particlesInstance:
    | {
        load: (params: {
          id: string;
          element?: HTMLElement;
          options: ISourceOptions;
        }) => Promise<Container | undefined>;
      }
    | undefined;
  let demoContainer: Container | undefined;

  const visiblePresets = computed(() => {
    if (mode === "configs") {
      return demoPresets.filter((preset) => preset.kind === "config");
    }

    if (mode === "palettes") {
      return demoPresets.filter((preset) => preset.kind === "palette");
    }

    if (mode === "presets") {
      return demoPresets.filter((preset) => preset.kind === "preset");
    }

    if (mode === "shapes") {
      return demoPresets.filter((preset) => preset.kind === "shape");
    }

    return demoPresets;
  });

  const selectedPreset = computed(
    () =>
      visiblePresets.value.find((preset: DemoPreset) => preset.key === selectedKey.value) ??
      visiblePresets.value[0] ??
      demoPresets[0],
  );
  const selectedPresetJson = computed(() => JSON.stringify(selectedPreset.value.options, null, 2));
  const isDirty = computed(() => editorText.value !== selectedPresetJson.value);
  const editorSizeLabel = computed(() => `${editorText.value.length} chars`);
  const modeLabel = computed(() => {
    if (mode === "configs") {
      return "Showing full config demos.";
    }

    if (mode === "presets") {
      return "Showing official preset demos.";
    }

    if (mode === "palettes") {
      return "Showing palette demos from the presets project.";
    }

    if (mode === "shapes") {
      return "Showing shape demos with per-shape options where available.";
    }

    return "Showing all demos.";
  });

  const groupedPalettePresets = computed(() => {
    if (mode !== "palettes") {
      return [] as { title: string; presets: DemoPreset[] }[];
    }

    const groups = paletteGroupDefinitions
      .map((group) => ({
        title: group.title,
        presets: visiblePresets.value.filter((preset: DemoPreset) => {
          const slug = getPaletteSlugFromPreset(preset);

          return slug !== undefined && group.slugs.includes(slug);
        }),
      }))
      .filter((group) => group.presets.length > 0);

    const groupedPresetKeys = new Set(groups.flatMap((group) => group.presets.map((preset: DemoPreset) => preset.key)));
    const uncategorizedPresets = visiblePresets.value.filter(
      (preset: DemoPreset) => !groupedPresetKeys.has(preset.key),
    );

    if (uncategorizedPresets.length > 0) {
      groups.push({
        title: "Other",
        presets: uncategorizedPresets,
      });
    }

    return groups;
  });

  function loadPresetToEditor(): void {
    editorText.value = selectedPresetJson.value;
    parseError.value = "";
    status.value = `Preset loaded: ${selectedPreset.value.title}. Starting demo...`;

    nextTick(() => {
      startDemo();
    });
  }

  function parseEditorOptions(): ISourceOptions | undefined {
    parseError.value = "";

    try {
      return JSON.parse(editorText.value) as ISourceOptions;
    } catch {
      parseError.value = "Invalid JSON. Check commas, quotes, and braces.";
      status.value = "JSON parsing error in options.";

      return undefined;
    }
  }

  async function ensureParticlesLoaded(): Promise<void> {
    if (particlesInstance) {
      return;
    }

    particlesInstance = engine;
  }

  async function startDemo(): Promise<void> {
    if (isBusy.value) {
      return;
    }

    const parsedOptions = parseEditorOptions();

    if (!parsedOptions) {
      return;
    }

    isBusy.value = true;

    try {
      const preloadState = getPlaygroundFeaturesInitState();

      if (!preloadState.initialized) {
        if (preloadState.initializing) {
          status.value = "Features are still initializing. Please wait a moment and press Start again.";
        } else {
          status.value = "Features are not initialized yet. Reload the page or wait for preload completion.";
        }

        return;
      }

      await ensureParticlesLoaded();

      if (!particlesInstance) {
        status.value = "tsParticles is not available.";

        return;
      }

      if (demoContainer) {
        demoContainer.destroy();
        demoContainer = undefined;
      }

      const safeOptions: ISourceOptions = {
        ...parsedOptions,
        fullScreen: {
          ...(typeof parsedOptions.fullScreen === "object" && parsedOptions.fullScreen ? parsedOptions.fullScreen : {}),
          enable: false,
        },
      };

      demoContainer = await particlesInstance.load({
        id: containerId,
        element: playgroundTarget.value ?? undefined,
        options: safeOptions,
      });

      isRunning.value = true;
      status.value = "Demo running. Edit JSON and press Start to reload.";
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown error";

      status.value = `Start failed: ${reason}`;
    } finally {
      isBusy.value = false;
    }
  }

  function stopDemo(): void {
    if (!demoContainer) {
      status.value = "No active demo to stop.";

      return;
    }

    demoContainer.pause();
    isRunning.value = false;
    status.value = "Demo paused. Press Resume to continue or Start to reload.";
  }

  function resumeDemo(): void {
    if (!demoContainer) {
      status.value = "No active demo. Press Start.";

      return;
    }

    demoContainer.play();
    isRunning.value = true;
    status.value = "Demo resumed.";
  }

  function destroyDemo(): void {
    if (!demoContainer) {
      status.value = "No demo to destroy.";

      return;
    }

    demoContainer.destroy();
    demoContainer = undefined;
    isRunning.value = false;
    status.value = "Demo destroyed. Press Start to create a new one.";
  }

  async function copyJson(): Promise<void> {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      status.value = "Clipboard is not available in this environment.";

      return;
    }

    await navigator.clipboard.writeText(editorText.value);
    status.value = "JSON copied to clipboard.";
  }

  async function copyShareLink(): Promise<void> {
    if (globalThis.window === undefined || typeof navigator === "undefined" || !navigator.clipboard) {
      status.value = "Share link is not available in this environment.";

      return;
    }

    const params = new URLSearchParams(globalThis.window.location.search);

    params.set("demo", selectedKey.value);
    params.set("options", encodeURIComponent(editorText.value));

    const shareUrl = `${globalThis.window.location.origin}${globalThis.window.location.pathname}?${params.toString()}${globalThis.window.location.hash}`;

    await navigator.clipboard.writeText(shareUrl);
    status.value = "Shareable link copied. Open it to restore preset and JSON.";
  }

  onMounted(() => {
    if (globalThis.window === undefined) {
      return;
    }

    const params = new URLSearchParams(globalThis.window.location.search);
    const presetParam = params.get("demo");
    const optionsParam = params.get("options");

    if (!visiblePresets.value.some((preset: DemoPreset) => preset.key === selectedKey.value)) {
      selectedKey.value = visiblePresets.value[0]?.key ?? demoPresets[0].key;
    }

    if (presetParam && visiblePresets.value.some((preset: DemoPreset) => preset.key === presetParam)) {
      selectedKey.value = presetParam;
    }

    if (optionsParam) {
      try {
        editorText.value = decodeURIComponent(optionsParam);
        status.value = "Preset loaded from shared link. Press Start to run.";

        return;
      } catch {
        status.value = "Invalid shared link, using current preset.";
      }
    }

    loadPresetToEditor();

    const preloadState = getPlaygroundFeaturesInitState();

    if (preloadState.initialized) {
      status.value = "Preload completed. Press Start to run the demo.";

      return;
    }

    status.value = `Preloading once: ${playgroundFeaturesInfo.presetCount} presets and ${playgroundFeaturesInfo.paletteCount} palettes...`;

    initPlaygroundFeaturesOnce()
      .then(() => {
        status.value = "Preload completed. Press Start to run the demo.";
      })
      .catch((error) => {
        const reason = error instanceof Error ? error.message : "Unknown error";

        status.value = `Preload failed: ${reason}`;
      });
  });

  return {
    copyJson,
    copyShareLink,
    containerId,
    destroyDemo,
    editorSizeLabel,
    editorText,
    groupedPalettePresets,
    isBusy,
    isDirty,
    isRunning,
    loadPresetToEditor,
    modeLabel,
    parseError,
    playgroundTarget,
    resumeDemo,
    selectedKey,
    selectedPreset,
    startDemo,
    status,
    stopDemo,
    visiblePresets,
  };
}
