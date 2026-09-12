import type { BundleMatch, Framework, GenerateCodeInput, GenerateCodeOutput } from "../types.js";
import { suggestPlugins } from "./suggestPlugins.js";
import { bundles } from "../registry/bundles.js";
import { packageCatalog } from "../registry/packages.js";

// ── Base templates ────────────────────────────────────────────────
//
// The options generator uses a template + override approach instead of
// trying to be an AI. Each template is the "sane default" for the
// selected bundle; keyword-driven overrides then adjust common
// parameters (count, color, speed, shape, direction, ...).

const CONFETTI_TEMPLATE: Record<string, unknown> = {
  particleCount: 120,
  spread: 100,
  origin: { y: 0.7 },
  colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
  gravity: 1.2,
  ticks: 200,
};

const FIREWORKS_TEMPLATE: Record<string, unknown> = {
  particleCount: 50,
  spread: 360,
  startVelocity: 30,
  decay: 0.9,
  gravity: 0.8,
  ticks: 200,
  colors: ["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#ff00ff"],
  origin: { x: 0.5, y: 0.8 },
};

const RIBBONS_TEMPLATE: Record<string, unknown> = {
  particleCount: 60,
  spread: 120,
  origin: { y: 0.5 },
  colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
  gravity: 1.5,
  ticks: 300,
};

const GENERIC_TEMPLATE: Record<string, unknown> = {
  particles: {
    number: { value: 80, density: { enable: true } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: { min: 0.1, max: 0.8 } },
    size: { value: { min: 1, max: 5 } },
    move: { enable: true, speed: 3, direction: "none" },
  },
  background: { color: "#000000" },
};

// ── Stopwords (EN + IT) ───────────────────────────────────────────
//
// Excluded from the extracted keyword list so they don't inflate the
// keyword count used by the "simple → basic bundle" fallback rule.

const STOPWORDS = new Set<string>([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "for",
  "of",
  "with",
  "in",
  "on",
  "at",
  "to",
  "from",
  "by",
  "as",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "it",
  "its",
  "this",
  "that",
  "these",
  "those",
  "i",
  "you",
  "we",
  "they",
  "my",
  "your",
  "our",
  "their",
  "me",
  "him",
  "us",
  "them",
  "do",
  "does",
  "did",
  "have",
  "has",
  "had",
  "can",
  "could",
  "will",
  "would",
  "should",
  "may",
  "might",
  "must",
  "not",
  "no",
  "yes",
  "about",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "between",
  "behind",
  "there",
  "here",
  "very",
  "more",
  "most",
  "some",
  "such",
  "only",
  "own",
  "same",
  "than",
  "too",
  "then",
  "now",
  "over",
  "under",
  "again",
  "once",
  "also",
  "un",
  "una",
  "uno",
  "il",
  "lo",
  "la",
  "gli",
  "le",
  "di",
  "da",
  "su",
  "per",
  "tra",
  "fra",
  "e",
  "ed",
  "o",
  "u",
  "ma",
  "se",
  "come",
  "che",
  "chi",
  "cui",
  "dei",
  "delle",
  "degli",
  "della",
  "dello",
  "del",
  "al",
  "allo",
  "alla",
  "ai",
  "agli",
  "alle",
  "più",
  "piu",
  "molto",
  "anche",
  "sono",
  "ha",
  "ho",
  "essere",
  "avere",
  "questo",
  "questa",
  "questi",
  "queste",
  "quello",
  "quella",
  "quei",
  "quelle",
  "non",
  "mai",
  "qui",
  "li",
  "ne",
  "ci",
  "vi",
]);

// ── Keyword feature sets ──────────────────────────────────────────
//
// Used by the fallback selection logic (section 3.2 of the plan) and
// the keyword-driven option overrides (section 4.3).

const INTERACTIVITY_WORDS = [
  "interactive",
  "interattivo",
  "interattiva",
  "hover",
  "hovering",
  "click",
  "clicking",
  "mouse",
  "tap",
  "touch",
  "pointer",
  "cursor",
];

const LINK_WORDS = [
  "links",
  "link",
  "linked",
  "connect",
  "connected",
  "connection",
  "connecting",
  "line",
  "lines",
  "collegati",
  "collegate",
  "collegamento",
  "connessi",
  "connesse",
  "connesso",
];

const EMITTER_WORDS = [
  "emit",
  "emits",
  "emitting",
  "emitter",
  "emitters",
  "spawn",
  "spawning",
  "spawns",
  "shoot",
  "shooting",
  "shoots",
  "shot",
  "firing",
  "launch",
  "launching",
  "source",
  "sorgente",
];

const ABSORBER_WORDS = [
  "absorb",
  "absorbs",
  "absorbing",
  "absorber",
  "absorbers",
  "suck",
  "sucking",
  "swallow",
  "swallowing",
  "black hole",
  "buco nero",
];

const MOVEMENT_WORDS = [
  "move",
  "moving",
  "moves",
  "fall",
  "falling",
  "falls",
  "fell",
  "float",
  "floating",
  "floats",
  "drift",
  "drifting",
  "drifts",
  "flow",
  "flowing",
];

const NAMED_COLORS: Record<string, string> = {
  red: "#ff0000",
  blue: "#0000ff",
  green: "#00ff00",
  yellow: "#ffff00",
  purple: "#800080",
  orange: "#ffa500",
  pink: "#ffc0cb",
  white: "#ffffff",
  black: "#000000",
  teal: "#008080",
  cyan: "#00ffff",
  magenta: "#ff00ff",
  gold: "#ffd700",
  silver: "#c0c0c0",
  gray: "#808080",
  grey: "#808080",
  brown: "#a52a2a",
  violet: "#ee82ee",
  lime: "#00ff00",
};

const SHAPE_WORDS: Array<[string, string]> = [
  ["stars", "star"],
  ["star", "star"],
  ["starfield", "star"],
  ["hearts", "heart"],
  ["heart", "heart"],
  ["squares", "square"],
  ["square", "square"],
  ["triangles", "triangle"],
  ["triangle", "triangle"],
  ["polygons", "polygon"],
  ["polygon", "polygon"],
  ["lines", "line"],
  ["line", "line"],
  ["emojis", "emoji"],
  ["emoji", "emoji"],
  ["circles", "circle"],
  ["circle", "circle"],
];

// ── Framework metadata ────────────────────────────────────────────

const FRAMEWORK_PACKAGES: Record<Framework, string | undefined> = {
  vanilla: undefined,
  react: "@tsparticles/react",
  vue3: "@tsparticles/vue3",
  svelte: "@tsparticles/svelte",
  angular: "@tsparticles/angular",
};

const FRAMEWORK_LABELS: Record<Framework, string> = {
  vanilla: "vanilla",
  react: "React",
  vue3: "Vue 3",
  svelte: "Svelte",
  angular: "Angular",
};

// ── Specialized / preset rules (priority-ordered) ─────────────────
//
// First match wins (section 3.1). Presets only win when the description
// doesn't request advanced features (interactivity/links/emitters/
// absorbers) — e.g. "interactive stars with links on hover" must NOT be
// forced into the stars preset, otherwise rich descriptions would never
// reach the interactive fallback.

interface SpecializedRule {
  bundleName: string;
  loadFunction: string;
  keywords: string[];
  presetName?: string;
  presetPackage?: string;
  isPreset?: boolean;
  isAutoInitialized?: boolean;
}

const SPECIALIZED_RULES: SpecializedRule[] = [
  {
    bundleName: "@tsparticles/confetti",
    loadFunction: "confetti",
    keywords: ["confetti", "coriandoli", "celebration", "party", "festa", "feste"],
    isAutoInitialized: true,
  },
  {
    bundleName: "@tsparticles/fireworks",
    loadFunction: "fireworks",
    keywords: ["fireworks", "fuochi d'artificio", "fuochi artificiali", "spettacolo pirotecnico"],
    isAutoInitialized: true,
  },
  {
    bundleName: "@tsparticles/ribbons",
    loadFunction: "ribbons",
    keywords: ["ribbon", "ribbons", "nastro", "nastri", "nastro volante"],
    isAutoInitialized: true,
  },
  {
    bundleName: "@tsparticles/basic",
    loadFunction: "loadBasic",
    keywords: ["snow", "snowfall", "neve", "nevicata", "fiocchi di neve", "fiocchi"],
    presetName: "snow",
    presetPackage: "@tsparticles/preset-snow",
    isPreset: true,
  },
  {
    bundleName: "@tsparticles/basic",
    loadFunction: "loadBasic",
    keywords: ["fire", "flame", "flames", "fuoco", "fiamme", "fiamma", "incendio"],
    presetName: "fire",
    presetPackage: "@tsparticles/preset-fire",
    isPreset: true,
  },
  {
    bundleName: "@tsparticles/basic",
    loadFunction: "loadBasic",
    keywords: ["matrix", "hacker", "codice", "digital rain", "pioggia di codice"],
    presetName: "matrix",
    presetPackage: "@tsparticles/preset-matrix",
    isPreset: true,
  },
  {
    bundleName: "@tsparticles/basic",
    loadFunction: "loadBasic",
    keywords: ["stars", "starfield", "stelle", "cielo stellato", "starry"],
    presetName: "stars",
    presetPackage: "@tsparticles/preset-stars",
    isPreset: true,
  },
];

// ── Small helpers ─────────────────────────────────────────────────

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesKeyword(text: string, keyword: string): boolean {
  const k = keyword.trim().toLowerCase();
  if (!k) {
    return false;
  }
  if (!k.includes(" ") && /^[a-z0-9]+$/i.test(k)) {
    return new RegExp(`\\b${escapeRegExp(k)}\\b`).test(text);
  }
  return text.includes(k);
}

function matchesAny(text: string, keywords: string[]): boolean {
  return keywords.some(keyword => matchesKeyword(text, keyword));
}

function mentions(keywords: string[], text: string, terms: string[]): boolean {
  return terms.some(term => matchesKeyword(text, term) || keywords.includes(term));
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// ── Keyword extraction ────────────────────────────────────────────

export function extractKeywords(description: string): string[] {
  const tokens = description
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  return [...new Set(tokens)].filter(token => !STOPWORDS.has(token));
}

// ── Bundle matching ───────────────────────────────────────────────

function makeBundleMatch(bundleName: string, loadFunction: string, opts?: Partial<BundleMatch>): BundleMatch {
  const bundle = bundles.find(b => b.name === bundleName);
  return {
    bundleName,
    loadFunction,
    packages: bundle ? [...bundle.packages] : [bundleName],
    ...opts,
  };
}

function hasAdvancedFeatures(keywords: string[], text: string): boolean {
  return (
    mentions(keywords, text, INTERACTIVITY_WORDS) ||
    mentions(keywords, text, LINK_WORDS) ||
    mentions(keywords, text, EMITTER_WORDS) ||
    mentions(keywords, text, ABSORBER_WORDS)
  );
}

function isSimpleRequest(keywords: string[], text: string): boolean {
  if (keywords.length > 3) {
    return false;
  }
  if (hasAdvancedFeatures(keywords, text)) {
    return false;
  }
  return MOVEMENT_WORDS.some(word => matchesKeyword(text, word));
}

export function matchBundle(keywords: string[], description: string): BundleMatch {
  const text = description.toLowerCase();

  for (const rule of SPECIALIZED_RULES) {
    if (!matchesAny(text, rule.keywords)) {
      continue;
    }
    if (rule.isPreset && hasAdvancedFeatures(keywords, text)) {
      continue;
    }
    return makeBundleMatch(rule.bundleName, rule.loadFunction, {
      presetName: rule.presetName,
      presetPackage: rule.presetPackage,
      isPreset: rule.isPreset,
      isAutoInitialized: rule.isAutoInitialized,
    });
  }

  const hasInteractivity = mentions(keywords, text, INTERACTIVITY_WORDS);
  const hasLinks = mentions(keywords, text, LINK_WORDS);
  const hasEmitter = mentions(keywords, text, EMITTER_WORDS);
  const hasAbsorber = mentions(keywords, text, ABSORBER_WORDS);

  if (hasInteractivity && hasLinks) {
    return makeBundleMatch("@tsparticles/slim", "loadSlim");
  }
  if (hasEmitter || hasAbsorber) {
    return makeBundleMatch("tsparticles", "loadFull");
  }
  if (isSimpleRequest(keywords, text)) {
    return makeBundleMatch("@tsparticles/basic", "loadBasic");
  }
  return makeBundleMatch("@tsparticles/slim", "loadSlim");
}

// ── Options generation ────────────────────────────────────────────

function extractCount(text: string): number | undefined {
  const match = text.match(/\b(\d{1,4})\b/);
  return match ? Number(match[1]) : undefined;
}

function findNamedColor(text: string): string | undefined {
  for (const [name, hex] of Object.entries(NAMED_COLORS)) {
    if (matchesKeyword(text, name)) {
      return hex;
    }
  }
  return undefined;
}

function findShape(text: string): string | undefined {
  for (const [word, type] of SHAPE_WORDS) {
    if (matchesKeyword(text, word)) {
      return type;
    }
  }
  return undefined;
}

function findDirection(text: string): string | undefined {
  if (matchesKeyword(text, "up") || matchesKeyword(text, "top") || matchesKeyword(text, "sopra")) {
    return "top";
  }
  if (matchesKeyword(text, "down") || matchesKeyword(text, "bottom") || matchesKeyword(text, "sotto")) {
    return "bottom";
  }
  if (matchesKeyword(text, "left") || matchesKeyword(text, "sinistra")) {
    return "left";
  }
  if (matchesKeyword(text, "right") || matchesKeyword(text, "destra")) {
    return "right";
  }
  return undefined;
}

function applySpecializedOverrides(template: Record<string, unknown>, lower: string): Record<string, unknown> {
  const result = { ...template };
  const count = extractCount(lower);
  if (count !== undefined) {
    result.particleCount = count;
  }
  return result;
}

function generateGenericOptions(keywords: string[], lower: string): Record<string, unknown> {
  const options = JSON.parse(JSON.stringify(GENERIC_TEMPLATE)) as Record<string, unknown>;
  const particles = options.particles as Record<string, unknown>;
  const move = particles.move as Record<string, unknown>;

  const count = extractCount(lower);
  if (count !== undefined) {
    (particles.number as Record<string, unknown>).value = count;
  }

  if (mentions(keywords, lower, ["slow", "lento", "lenta", "lentamente"])) {
    move.speed = 1;
  }
  if (mentions(keywords, lower, ["fast", "veloce", "veloci", "rapido", "rapida", "rapidamente"])) {
    move.speed = 10;
  }

  const color = findNamedColor(lower);
  if (color !== undefined) {
    (particles.color as Record<string, unknown>).value = color;
  }

  const shape = findShape(lower);
  if (shape !== undefined) {
    (particles.shape as Record<string, unknown>).type = shape;
  }

  const direction = findDirection(lower);
  if (direction !== undefined) {
    move.direction = direction;
  }

  if (mentions(keywords, lower, ["gravity", "gravità", "gravita"])) {
    move.gravity = { enable: true };
  }

  const hasLinks = mentions(keywords, lower, LINK_WORDS);
  if (hasLinks) {
    particles.links = { enable: true, distance: 150, opacity: 0.5 };
  }

  const hasInteractivity = mentions(keywords, lower, INTERACTIVITY_WORDS);
  if (hasInteractivity) {
    options.interactivity = {
      events: {
        onHover: { enable: true, mode: hasLinks ? "grab" : "repulse" },
      },
      modes: {},
    };
    move.speed = 2;
  }

  if (color !== undefined && mentions(keywords, lower, ["background", "sfondo"])) {
    (options.background as Record<string, unknown>).color = color;
  }

  return options;
}

export function generateOptions(bundle: BundleMatch, keywords: string[], lower: string): Record<string, unknown> {
  if (bundle.isPreset && bundle.presetName) {
    return { preset: bundle.presetName };
  }
  if (bundle.isAutoInitialized) {
    const template =
      bundle.bundleName === "@tsparticles/fireworks"
        ? FIREWORKS_TEMPLATE
        : bundle.bundleName === "@tsparticles/ribbons"
          ? RIBBONS_TEMPLATE
          : CONFETTI_TEMPLATE;
    return applySpecializedOverrides(template, lower);
  }
  return generateGenericOptions(keywords, lower);
}

// ── Framework codegen ─────────────────────────────────────────────

function serializeOptions(options: Record<string, unknown>): string {
  return JSON.stringify(options, null, 2);
}

function buildLoadImports(bundle: BundleMatch): string[] {
  const mainLoad = `import { ${bundle.loadFunction} } from "${bundle.bundleName}";`;
  if (bundle.isPreset && bundle.presetPackage) {
    const presetInfo = packageCatalog.byName[bundle.presetPackage];
    const presetLoad = presetInfo?.loadFunction ?? `load${capitalize(bundle.presetName ?? "")}Preset`;
    return [mainLoad, `import { ${presetLoad} } from "${bundle.presetPackage}";`];
  }
  return [mainLoad];
}

function buildLoadCalls(bundle: BundleMatch, indent: string, engineVar: string): string {
  const calls = [`${indent}await ${bundle.loadFunction}(${engineVar});`];
  if (bundle.isPreset && bundle.presetPackage) {
    const presetInfo = packageCatalog.byName[bundle.presetPackage];
    const presetLoad = presetInfo?.loadFunction ?? `load${capitalize(bundle.presetName ?? "")}Preset`;
    calls.push(`${indent}await ${presetLoad}(${engineVar});`);
  }
  return calls.join("\n");
}

function autoInitCode(bundle: BundleMatch, options: Record<string, unknown>): string {
  return `import { ${bundle.loadFunction} } from "${bundle.bundleName}";

await ${bundle.loadFunction}(${serializeOptions(options)});
`;
}

function vanillaCode(bundle: BundleMatch, options: Record<string, unknown>, typescript: boolean): string {
  const imports = buildLoadImports(bundle);
  const calls = buildLoadCalls(bundle, "  ", "tsParticles");

  if (typescript) {
    return `${imports.join("\n")}
import { tsParticles } from "@tsparticles/engine";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = ${serializeOptions(options)};

async function init(): Promise<void> {
${calls}

  await tsParticles.load({
    id: "tsparticles",
    options,
  });
}

void init();
`;
  }

  return `${imports.join("\n")}
import { tsParticles } from "@tsparticles/engine";

async function init() {
${calls}

  await tsParticles.load({
    id: "tsparticles",
    options: ${serializeOptions(options)},
  });
}

init();
`;
}

function reactCode(bundle: BundleMatch, options: Record<string, unknown>, typescript: boolean): string {
  const engineTypeImport = typescript ? 'import type { Engine } from "@tsparticles/engine";\n' : "";
  const initParam = typescript ? "(engine: Engine)" : "(engine)";
  return `import { useCallback } from "react";
${engineTypeImport}import Particles from "@tsparticles/react";
${buildLoadImports(bundle).join("\n")}

export function ParticlesBackground() {
  const init = useCallback(async ${initParam} => {
${buildLoadCalls(bundle, "    ", "engine")}
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      options={${serializeOptions(options)}}
    />
  );
}
`;
}

function vueCode(bundle: BundleMatch, options: Record<string, unknown>, typescript: boolean): string {
  const engineTypeImport = typescript ? 'import type { Engine } from "@tsparticles/engine";\n' : "";
  const registerSignature = typescript
    ? "async function registerParticles(engine: Engine): Promise<void> {"
    : "async function registerParticles(engine) {";
  const scriptSetup = typescript ? '<script setup lang="ts">' : "<script setup>";
  const optionsType = typescript ? ": ISourceOptions" : "";
  return `// main.ts
import { createApp } from "vue";
${engineTypeImport}import Particles from "@tsparticles/vue3";
${buildLoadImports(bundle).join("\n")}

import App from "./App.vue";

${registerSignature}
${buildLoadCalls(bundle, "  ", "engine")}
}

const app = createApp(App);

app.use(Particles, {
  init: registerParticles,
});

app.mount("#app");

// App.vue
<template>
  <vue-particles
    id="tsparticles"
    :options="options"
    @particles-loaded="particlesLoaded"
  />
</template>

${scriptSetup}
${typescript ? 'import type { Container, ISourceOptions } from "@tsparticles/engine";\n\n' : ""}const options${optionsType} = ${serializeOptions(options)};

function particlesLoaded(${typescript ? "container?: Container" : "container"})${typescript ? ": void" : ""} {
  console.log(container);
}
</script>
`;
}

function svelteCode(bundle: BundleMatch, options: Record<string, unknown>, typescript: boolean): string {
  if (typescript) {
    return `<script lang="ts">
  import Particles, { initParticlesEngine } from "@tsparticles/svelte";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";
  ${buildLoadImports(bundle).join("\n  ")}

  const options: ISourceOptions = ${serializeOptions(options)};
  const onParticlesLoaded = (event: CustomEvent) => {
    console.log(event.detail.particles);
  };

  void initParticlesEngine(async (engine: Engine) => {
${buildLoadCalls(bundle, "    ", "engine")}
  });
</script>

<Particles
  id="tsparticles"
  options={options}
  on:particlesLoaded={onParticlesLoaded}
/>
`;
  }

  return `<script>
  import Particles, { initParticlesEngine } from "@tsparticles/svelte";
  ${buildLoadImports(bundle).join("\n  ")}

  const options = ${serializeOptions(options)};
  const onParticlesLoaded = (event) => {
    console.log(event.detail.particles);
  };

  void initParticlesEngine(async (engine) => {
${buildLoadCalls(bundle, "    ", "engine")}
  });
</script>

<Particles
  id="tsparticles"
  options={options}
  on:particlesLoaded={onParticlesLoaded}
/>
`;
}

function angularCode(bundle: BundleMatch, options: Record<string, unknown>, typescript: boolean): string {
  if (typescript) {
    return `import { Component, OnInit } from "@angular/core";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { NgParticlesService } from "@tsparticles/angular";
${buildLoadImports(bundle).join("\n")}

@Component({
  selector: "app-particles",
  template: \`<ngx-particles [id]="id" [options]="particlesOptions" (particlesLoaded)="particlesLoaded($event)"></ngx-particles>\`,
})
export class ParticlesComponent implements OnInit {
  id = "tsparticles";
  particlesOptions: ISourceOptions = ${serializeOptions(options)};

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  public ngOnInit(): void {
    void this.ngParticlesService.init(async engine => {
${buildLoadCalls(bundle, "      ", "engine")}
    });
  }

  public particlesLoaded(container?: Container): void {
    console.log(container);
  }
}
`;
  }

  return `import { Component } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
${buildLoadImports(bundle).join("\n")}

@Component({
  selector: "app-particles",
  template: \`<ngx-particles [id]="id" [options]="particlesOptions" (particlesLoaded)="particlesLoaded($event)"></ngx-particles>\`,
})
export class ParticlesComponent {
  id = "tsparticles";
  particlesOptions = ${serializeOptions(options)};

  constructor(ngParticlesService) {
    this.ngParticlesService = ngParticlesService;
  }

  ngOnInit() {
    void this.ngParticlesService.init(async engine => {
${buildLoadCalls(bundle, "      ", "engine")}
    });
  }

  particlesLoaded(container) {
    console.log(container);
  }
}
`;
}

function generateFrameworkCode(
  framework: Framework,
  options: Record<string, unknown>,
  bundle: BundleMatch,
  typescript: boolean,
): string {
  if (bundle.isAutoInitialized) {
    return autoInitCode(bundle, options);
  }
  switch (framework) {
    case "vanilla":
      return vanillaCode(bundle, options, typescript);
    case "react":
      return reactCode(bundle, options, typescript);
    case "vue3":
      return vueCode(bundle, options, typescript);
    case "svelte":
      return svelteCode(bundle, options, typescript);
    case "angular":
      return angularCode(bundle, options, typescript);
  }
}

// ── HTML / install command ────────────────────────────────────────

export function generateHtml(framework: Framework, bundle: BundleMatch): string {
  if (framework === "vanilla") {
    return '<div id="tsparticles"></div>';
  }
  return "";
}

export function generateInstallCommand(packages: string[]): string {
  return `npm install ${packages.join(" ")}`;
}

// ── Notes ─────────────────────────────────────────────────────────

function buildNotes(
  bundle: BundleMatch,
  framework: Framework,
  lower: string,
  keywords: string[],
  extraPackages: string[],
  conflicting: boolean,
): string[] {
  const notes: string[] = [];

  if (bundle.isAutoInitialized) {
    notes.push(`${bundle.bundleName} auto-initializes all plugins — no manual load() needed.`);
  }

  if (bundle.isPreset) {
    notes.push(
      `Using the ${bundle.presetName} preset — all ${bundle.presetName} options are pre-configured. Override with custom options if needed.`,
    );
  }

  if (framework !== "vanilla" && !bundle.isAutoInitialized) {
    const label = FRAMEWORK_LABELS[framework];
    notes.push(
      `Generated for ${label} — ensure ${FRAMEWORK_PACKAGES[framework]} is compatible with your ${label} version.`,
    );
  }

  const hasInteractivity = mentions(keywords, lower, INTERACTIVITY_WORDS);
  const hasLinks = mentions(keywords, lower, LINK_WORDS);
  const isAmbiguousFallback = bundle.bundleName === "@tsparticles/slim" && !(hasInteractivity && hasLinks);
  if (isAmbiguousFallback) {
    notes.push(
      "Generated generic particles — try being more specific (e.g. 'confetti', 'snow', 'stars') for specialized bundles.",
    );
  }

  if (conflicting) {
    notes.push(
      "The description matches multiple effects. First match wins — for combining effects, consider using @tsparticles/all.",
    );
  }

  if (extraPackages.length > 0) {
    notes.push(`Additional packages beyond the selected bundle: ${extraPackages.join(", ")}.`);
  }

  return notes;
}

// ── Orchestrator ──────────────────────────────────────────────────

function collectBundlePackages(bundleName: string): Set<string> {
  const packages = new Set<string>();
  const seen = new Set<string>();
  const walk = (name: string): void => {
    if (!name || seen.has(name)) {
      return;
    }
    seen.add(name);
    const bundle = bundles.find(b => b.name === name);
    if (!bundle) {
      return;
    }
    for (const pkg of bundle.packages) {
      packages.add(pkg);
    }
    if (bundle.extends) {
      walk(bundle.extends);
    }
  };
  walk(bundleName);
  return packages;
}

export function generateCode(input: GenerateCodeInput): GenerateCodeOutput {
  const description = input.description.trim();
  const framework = input.framework ?? "vanilla";
  const typescript = input.typescript ?? false;
  const lower = description.toLowerCase();
  const keywords = extractKeywords(description);

  const bundleMatch = matchBundle(keywords, lower);
  const options = generateOptions(bundleMatch, keywords, lower);

  const suggestion = suggestPlugins(options);
  const covered = collectBundlePackages(bundleMatch.bundleName);
  const extraPackages = suggestion.npmPackages.filter(p => !covered.has(p));

  const installPackages: string[] = [];
  if (bundleMatch.isAutoInitialized) {
    installPackages.push(bundleMatch.bundleName);
  } else {
    installPackages.push(bundleMatch.bundleName);
    if (bundleMatch.presetPackage) {
      installPackages.push(bundleMatch.presetPackage);
    }
    const frameworkPackage = FRAMEWORK_PACKAGES[framework];
    if (frameworkPackage) {
      installPackages.push(frameworkPackage);
    }
  }
  for (const extra of extraPackages) {
    if (!installPackages.includes(extra)) {
      installPackages.push(extra);
    }
  }

  const installCommand = generateInstallCommand(installPackages);
  const code = generateFrameworkCode(framework, options, bundleMatch, typescript);
  const html = generateHtml(framework, bundleMatch);

  const matchedRuleCount = SPECIALIZED_RULES.filter(rule => matchesAny(lower, rule.keywords)).length;

  const notes = buildNotes(bundleMatch, framework, lower, keywords, extraPackages, matchedRuleCount > 1);

  return {
    options,
    bundle: bundleMatch.bundleName,
    loadFunction: bundleMatch.loadFunction,
    isAutoInitialized: bundleMatch.isAutoInitialized,
    installPackages,
    installCommand,
    framework,
    html,
    code,
    notes,
  };
}
