# MCP `generate_code` Tool — Deep Technical Specification

## Status

Draft — ready for review.

The MCP server (`@tsparticles/mcp-server`) currently provides 4 tools for inspection/diagnostics and 1 prompt template for option generation. The missing piece is a **deterministic tool** that takes a natural language description and produces complete, ready-to-use code — with smart bundle selection favoring specialized bundles (`@tsparticles/confetti`, `@tsparticles/fireworks`, etc.) over generic ones.

---

## Table of Contents

0. [Decision and constraints](#0-decision-and-constraints)
1. [Problem analysis](#1-problem-analysis)
2. [Architecture](#2-architecture)
3. [Bundle selection algorithm](#3-bundle-selection-algorithm)
4. [Options generation from description](#4-options-generation-from-description)
5. [Framework codegen](#5-framework-codegen)
6. [Data model and types](#6-data-model-and-types)
7. [Integration with existing tools](#7-integration-with-existing-tools)
8. [File-by-file specification](#8-file-by-file-specification)
9. [Failure modes and mitigations](#9-failure-modes-and-mitigations)
10. [Testing strategy](#10-testing-strategy)
11. [Implementation checklist](#11-implementation-checklist)
12. [Acceptance criteria](#12-acceptance-criteria)
13. [Default configurations and examples](#13-default-configurations-and-examples)

---

## 0. Decision and constraints

### 0.1 Product decision

Add a new MCP tool `generate_code` that deterministically generates complete, framework-specific tsParticles code from a natural language description.

### 0.2 Non-negotiable constraints

1. **No filesystem I/O** — the tool is a pure function like all existing tools. It returns code; the AI client inserts it.
2. **No network calls** — no npm install, no fetch. The tool returns an `installCommand` string for the client to execute.
3. **No NLP/LLM dependency** — bundle selection and option generation use deterministic keyword matching and heuristics. The tool does not call any external AI service.
4. **Backward compatible** — no changes to existing tools, resources, or prompts.
5. **Single file scope** — all new code lives under `src/tools/` and `src/validation.ts`. Registry/catalog files are read-only imports.
6. **Specialized bundles preferred** — when description matches a specialized bundle (`confetti`, `fireworks`, `ribbons`, `particles`), that bundle MUST be suggested over generic `slim`/`full`/`all`.
7. **Framework-agnostic core** — the options generation logic is framework-independent; framework-specific code is a template layer on top.

### 0.3 Design rationale

- The existing `generate-options` prompt delegates all logic to the AI — bundle selection, framework adaptation, and code structure are non-deterministic.
- A deterministic tool gives predictable, auditable results that can be tested.
- Specialized bundles like `@tsparticles/confetti` are dramatically simpler for users (1 import vs 10+) but are currently under-suggested because generic bundles are more "well-known".
- The tool bridges the gap between "I want confetti" and "here's the code in your React project".

---

## 1. Problem analysis

### 1.1 Current user flow (without `generate_code`)

```
User: "I want confetti on my website"
  → AI uses generate-options prompt (or guesses)
  → AI may suggest: import { loadBasic } + loadEmittersPlugin + loadMotionPlugin + 7 shapes + 5 updaters
  → User gets 15+ imports, needs to figure out bundle, framework, HTML
  → Or AI suggests canvas-confetti (different library entirely)
```

### 1.2 Target user flow (with `generate_code`)

```
User: "I want confetti on my React website"
  → AI calls generate_code({ description: "confetti", framework: "react" })
  → Tool returns: @tsparticles/confetti, 1 import, React component code, npm install command
  → User gets copy-pasteable code in 5 seconds
```

### 1.3 Why this matters for bundle adoption

`@tsparticles/confetti` is a self-contained bundle that auto-initializes all plugins internally. But it's currently only discoverable via:
- Reading the bundles resource (requires AI to actively look)
- The `generate-options` prompt's bundle recommendation rules (soft guidance, not enforced)

A deterministic tool that **always** recommends `@tsparticles/confetti` for confetti descriptions will significantly increase adoption of specialized bundles.

---

## 2. Architecture

### 2.1 Tool position in the MCP server

```
Existing tools:                New tool:
  suggest_plugins                generate_code
  list_packages                    ↓
  get_package_info               uses:
  diagnose_issues                  → keyword matcher (new)
                                    → bundle selector (new)
                                    → option generator (new)
                                    → framework codegen (new)
                                    → suggestPlugins() (existing, for validation)
```

### 2.2 Data flow

```
Input: { description, framework?, typescript? }
  ↓
1. Keyword extraction from description
  ↓
2. Bundle matching (keywords → specialized bundle, or fallback)
  ↓
3. Options generation (bundle defaults + description overrides)
  ↓
4. Validation via suggestPlugins() (verify options are coherent)
  ↓
5. Framework codegen (template × framework × options × bundle)
  ↓
Output: { options, bundle, installCommand, html, code, notes }
```

### 2.3 Why not extend the `generate-options` prompt?

The prompt template is **non-deterministic** — it instructs the AI how to generate options but doesn't enforce behavior. Different AI models/versions may produce different results for the same input. A tool gives:
- Deterministic, testable output
- Consistent bundle selection
- Guaranteed framework-specific code generation
- No dependency on AI model capability

---

## 3. Bundle selection algorithm

### 3.1 Priority-ordered keyword matching

Keywords are matched case-insensitively against the description. First match wins.

| Priority | Keywords (IT + EN) | Bundle | Rationale |
|----------|---------------------|--------|-----------|
| 1 | `confetti`, `coriandoli`, `celebration`, `party`, `festa` | `@tsparticles/confetti` | Self-contained confetti effect |
| 2 | `fireworks`, `fuochi d'artificio`, `spettacolo pirotecnico` | `@tsparticles/fireworks` | Self-contained fireworks effect |
| 3 | `ribbon`, `nastro`, `nastro volante` | `@tsparticles/ribbons` | Self-contained ribbon effect |
| 4 | `snow`, `neve`, `fiocchi di neve`, `snowfall` | Preset `snow` via `@tsparticles/basic` + preset loading | Snow preset |
| 5 | `fire`, `fuoco`, `fiamme`, `flame` | Preset `fire` via `@tsparticles/basic` + preset loading | Fire preset |
| 6 | `matrix`, `hacker`, `codice` | Preset `matrix` via `@tsparticles/basic` + preset loading | Matrix rain |
| 7 | `stars`, `stelle`, `cielo stellato` | Preset `stars` via `@tsparticles/basic` + preset loading | Starfield |
| 8 | (none of the above) | fallback selection (see 3.2) | Generic use case |

### 3.2 Fallback selection logic

When no specialized keyword matches:

1. **Has interactivity** (hover, click, mouse mentioned) AND **has links** (connect, line, link mentioned):
   → `@tsparticles/slim`

2. **Has emitters** (emit, spawn, shoot, source mentioned) OR **has absorbers**:
   → `tsparticles`

3. **Simple** (few keywords, basic movement):
   → `@tsparticles/basic`

4. **Default**:
   → `@tsparticles/slim` (best balance of features and bundle size)

### 3.3 Preset handling

For presets (snow, fire, matrix, stars, etc.):
- Bundle is `@tsparticles/basic` (minimum needed)
- Additional package: the preset package itself (e.g., `@tsparticles/preset-snow`)
- Load function changes: `loadBasic` + `loadSnowPreset` instead of just `loadBasic`
- Options use `{ preset: "snow" }` instead of full particle config

### 3.4 Bundle metadata resolution

From `src/registry/bundles.ts`:
- `bundle.name` → npm package name
- `bundle.loadFunction` → import function name
- `bundle.packages` → all included packages (for install command)
- `bundle.extends` → parent bundle (for import chain)

---

## 4. Options generation from description

### 4.1 Strategy

The tool does NOT try to be an AI. It uses a **template + override** approach:

1. Start with a **base template** appropriate for the selected bundle/preset
2. Apply **keyword-driven overrides** for common parameters
3. Return the result

### 4.2 Base templates

#### Confetti template

```typescript
{
  emitters: [{
    position: { x: 50, y: 0 },
    life: { duration: 0.1 },
    rate: { quantity: 50, delay: 0 }
  }],
  particles: {
    number: { value: 0 },
    color: { value: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"] },
    shape: { type: ["square", "circle"] },
    opacity: { value: { min: 0.1, max: 1 }, animation: { enable: true, minimumValue: 0.1, speed: 1, sync: false } },
    rotate: { value: { min: 0, max: 360 }, direction: "random" },
    tilt: { enable: true, value: { min: 0, max: 360 }, direction: "random" },
    wobble: { enable: true, distance: 10, speed: { min: -10, max: 10 } },
    roll: { enable: true, speed: { min: -5, max: 5 } },
    move: { enable: true, speed: { min: 10, max: 50 }, gravity: { enable: true, acceleration: 10 }, decay: 0.1 }
  }
}
```

#### Fireworks template

```typescript
{
  emitters: [{
    position: { x: 50, y: 100 },
    life: { duration: 0.05 },
    rate: { quantity: 1, delay: 0.4 }
  }],
  particles: {
    number: { value: 0 },
    color: { value: ["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#ff00ff"] },
    shape: { type: "circle" },
    opacity: { value: 1, animation: { enable: true, speed: 0.2, minimumValue: 0, sync: false } },
    size: { value: { min: 1, max: 4 }, animation: { enable: true, speed: 5, minimumValue: 0.5, sync: false } },
    move: { enable: true, speed: { min: 10, max: 50 }, decay: 0.5, direction: "none" }
  }
}
```

#### Generic template (slim/basic/full)

```typescript
{
  particles: {
    number: { value: 80, density: { enable: true } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: { min: 0.1, max: 0.8 } },
    size: { value: { min: 1, max: 5 } },
    move: { enable: true, speed: 3, direction: "none" }
  },
  background: { color: "#000000" }
}
```

### 4.3 Keyword-driven overrides

| Keyword pattern | Override |
|----------------|----------|
| `color` + color name (red, blue, etc.) | `particles.color.value` |
| `count` / `number` + N | `particles.number.value` |
| `slow` / `lento` | `particles.move.speed` = 1 |
| `fast` / `veloce` | `particles.move.speed` = 10 |
| `interactive` / `interattivo` / `hover` / `mouse` | add `interactivity` section |
| `links` / `collegati` / `connessi` | add `particles.links` |
| `gravity` / `gravità` | `particles.move.gravity.enable` = true |
| `direction` + direction name | `particles.move.direction` |
| `background` + color | `background.color` |

### 4.4 Limitations

The options generator is intentionally simple. Complex descriptions may produce incomplete configs. The tool's `notes` array will include hints like:
- "The generated options are a starting point — adjust values for your specific needs"
- "For advanced confetti customization, see @tsparticles/confetti documentation"

---

## 5. Framework codegen

### 5.1 Supported frameworks

| Framework | Package | Component | Init pattern |
|-----------|---------|-----------|-------------|
| `vanilla` | (none) | DOM element | `tsParticles.load()` |
| `react` | `@tsparticles/react` | `<Particles>` | `initParticlesEngine` + `<Particles>` |
| `vue3` | `@tsparticles/vue3` | `<vue-particles>` | `onMounted` + `<vue-particles>` |
| `svelte` | `@tsparticles/svelte` | `<svelte-particles>` | `<svelte-particles>` |
| `angular` | `@tsparticles/angular` | `<tsparticles>` | Service + template |

### 5.2 Code templates per framework

#### Vanilla (TypeScript variant when `typescript: true`)

```typescript
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";

// OR for specialized bundles:
// import { confetti } from "@tsparticles/confetti";

async function init() {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: { /* generated options */ },
  });
}

init();
```

#### React

```typescript
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// OR for specialized bundles:
// import { confetti } from "@tsparticles/confetti";

export function ParticlesBackground() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      options={/* generated options */}
    />
  );
}
```

#### Vue 3

```vue
<script setup>
import { onMounted } from "vue";
import { vueParticles } from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";

// OR for specialized bundles:
// import { confetti } from "@tsparticles/confetti";

onMounted(async () => {
  await loadSlim(tsParticles);
});
</script>

<template>
  <vue-particles
    id="tsparticles"
    :options="/* generated options */"
  />
</template>
```

#### Svelte

```svelte
<script>
  import SvelteParticles from "@tsparticles/svelte";
  import { loadSlim } from "@tsparticles/slim";

  // OR for specialized bundles:
  // import { confetti } from "@tsparticles/confetti";

  const options = { /* generated options */ };

  async function init(engine) {
    await loadSlim(engine);
  }
</script>

<SvelteParticles
  id="tsparticles"
  {options}
  {init}
/>
```

#### Angular

```typescript
// component.ts
import { Component, OnInit } from "@angular/core";
import { loadSlim } from "@tsparticles/slim";

@Component({ /* ... */ })
export class ParticlesComponent implements OnInit {
  async ngOnInit() {
    await loadSlim(tsParticles);
  }
}
```

```html
<!-- component.html -->
<tsparticles id="tsparticles" [options]="particlesOptions"></tsparticles>
```

### 5.3 Specialized bundle codegen

When a specialized bundle is selected, the codegen changes:

| Bundle | Import | Init pattern |
|--------|--------|-------------|
| `@tsparticles/confetti` | `import { confetti } from "@tsparticles/confetti"` | `await confetti(options)` (no manual load) |
| `@tsparticles/fireworks` | `import { fireworks } from "@tsparticles/fireworks"` | `await fireworks(options)` (no manual load) |
| `@tsparticles/ribbons` | `import { ribbons } from "@tsparticles/ribbons"` | `await ribbons(options)` (no manual load) |

For specialized bundles, the code is **much simpler** because plugins are auto-initialized. The framework wrapper may not even be needed — vanilla `confetti()` works in all frameworks.

### 5.4 TypeScript vs JavaScript

When `typescript: true`:
- Use `import type` for type-only imports
- Add type annotations to variables
- Use `.ts` file extensions in comments

When `typescript: false` (default) or omitted:
- Use plain `import`
- No type annotations
- Use `.js` file extensions in comments

---

## 6. Data model and types

### 6.1 Input schema

```typescript
interface GenerateCodeInput {
  /** Natural language description of the desired particle effect */
  description: string;
  /** Target framework (default: "vanilla") */
  framework?: "vanilla" | "react" | "vue3" | "svelte" | "angular";
  /** Generate TypeScript code (default: false) */
  typescript?: boolean;
}
```

### 6.2 Output schema

```typescript
interface GenerateCodeOutput {
  /** The generated tsParticles options object */
  options: Record<string, unknown>;
  /** Selected bundle package name */
  bundle: string;
  /** Bundle's load function name */
  loadFunction: string;
  /** All npm packages needed (bundle + engine + additional) */
  installPackages: string[];
  /** Shell command to install all packages */
  installCommand: string;
  /** Target framework used for code generation */
  framework: string;
  /** HTML container element (if needed) */
  html: string;
  /** Complete, ready-to-use code for the target framework */
  code: string;
  /** Additional notes, warnings, or hints */
  notes: string[];
}
```

### 6.3 Zod validation schema

```typescript
export const generateCodeArgsSchema = z.object({
  description: z.string().min(1, "description must be a non-empty string"),
  framework: z.enum(["vanilla", "react", "vue3", "svelte", "angular"]).optional(),
  typescript: z.boolean().optional(),
});
```

---

## 7. Integration with existing tools

### 7.1 Internal usage of `suggestPlugins()`

After generating options, the tool calls `suggestPlugins(options)` internally to:
1. Verify the generated options are coherent (all required plugins detected)
2. Cross-check the selected bundle matches what `suggestPlugins` would recommend
3. Include any additional packages not covered by the bundle

If `suggestPlugins` detects packages NOT in the selected bundle, they are added to `installPackages` and a note is generated.

### 7.2 No changes to existing tools

- `suggest_plugins` — unchanged
- `list_packages` — unchanged
- `get_package_info` — unchanged
- `diagnose_issues` — unchanged
- `generate-options` prompt — unchanged (remains for AI-driven custom configs)

### 7.3 Relationship with `generate-options` prompt

| Aspect | `generate-options` (prompt) | `generate_code` (tool) |
|--------|---------------------------|----------------------|
| Invocation | AI decides how to use prompt | Direct tool call |
| Determinism | Non-deterministic | Deterministic |
| Bundle selection | AI judgment | Algorithm |
| Framework support | None | 5 frameworks |
| Output format | JSON with options + usage | Complete code + install + HTML |
| Best for | Custom/complex configs | Quick, standard use cases |

---

## 8. File-by-file specification

### 8.1 `src/tools/generateCode.ts` (NEW)

**Exports:**

```typescript
export function generateCode(input: GenerateCodeInput): GenerateCodeOutput;
```

**Internal structure:**

```
├── extractKeywords(description: string): string[]
│   └── Tokenizes + normalizes description
├── matchBundle(keywords: string[]): BundleMatch
│   └── Priority-ordered keyword → bundle mapping
├── generateOptions(bundle: BundleMatch, keywords: string[]): Record<string, unknown>
│   └── Template selection + keyword overrides
├── generateFrameworkCode(framework, options, bundle, typescript): string
│   └── Framework-specific code templates
├── generateHtml(framework, bundle): string
│   └── HTML container element
├── generateInstallCommand(packages): string
│   └── npm/yarn/pnpm install string
└── generateCode(input): GenerateCodeOutput
    └── Orchestrator function
```

**Dependencies (imports):**

```typescript
import type { GenerateCodeInput, GenerateCodeOutput } from "../types.js";
import { suggestPlugins } from "./suggestPlugins.js";
import { bundles } from "../registry/bundles.js";
import { packageCatalog } from "../registry/packages.js";
```

### 8.2 `src/types.ts` (MODIFY)

Add:

```typescript
export interface GenerateCodeInput {
  description: string;
  framework?: "vanilla" | "react" | "vue3" | "svelte" | "angular";
  typescript?: boolean;
}

export interface GenerateCodeOutput {
  options: Record<string, unknown>;
  bundle: string;
  loadFunction: string;
  installPackages: string[];
  installCommand: string;
  framework: string;
  html: string;
  code: string;
  notes: string[];
}

export interface BundleMatch {
  bundleName: string;
  loadFunction: string;
  packages: string[];
  isPreset?: boolean;
  presetName?: string;
  presetPackage?: string;
}
```

### 8.3 `src/validation.ts` (MODIFY)

Add:

```typescript
export const generateCodeArgsSchema = z.object({
  description: z.string().min(1, "description must be a non-empty string"),
  framework: z.enum(["vanilla", "react", "vue3", "svelte", "angular"]).optional(),
  typescript: z.boolean().optional(),
});

export type GenerateCodeArgs = z.infer<typeof generateCodeArgsSchema>;
```

### 8.4 `src/index.ts` (MODIFY)

**Add import:**

```typescript
import { generateCode } from "./tools/generateCode.js";
import { generateCodeArgsSchema } from "./validation.js";
```

**Add tool metadata** in `ListToolsRequestSchema` handler:

```typescript
{
  name: "generate_code",
  description:
    "Generate complete, ready-to-use tsParticles code from a natural language description. Automatically selects the best bundle (preferring specialized bundles like @tsparticles/confetti over generic ones) and generates framework-specific code with install commands.",
  inputSchema: {
    type: "object",
    properties: {
      description: {
        type: "string",
        description: "Natural language description of the desired particle effect (e.g., 'confetti falling from the top', 'interactive stars in the background')",
      },
      framework: {
        type: "string",
        description: "Target framework for code generation (default: vanilla JavaScript)",
        enum: ["vanilla", "react", "vue3", "svelte", "angular"],
      },
      typescript: {
        type: "boolean",
        description: "Generate TypeScript code instead of JavaScript (default: false)",
      },
    },
    required: ["description"],
  },
},
```

**Add dispatch case** in `CallToolRequestSchema` switch:

```typescript
case "generate_code": {
  const parsed = generateCodeArgsSchema.safeParse(args);
  if (!parsed.success) {
    return {
      content: [{ type: "text", text: `Invalid arguments: ${formatZodError(parsed.error)}` }],
      isError: true,
    };
  }
  const result = generateCode(parsed.data);
  return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
}
```

### 8.5 `src/tools/generateCode.test.ts` (NEW)

Test file covering:
- Bundle selection for each keyword category
- Fallback logic when no keywords match
- Options generation for each bundle type
- Framework codegen for all 5 frameworks
- TypeScript vs JavaScript output
- Install command correctness
- Integration with suggestPlugins validation
- Edge cases (empty description, unknown framework, mixed languages)

### 8.6 `README.md` (MODIFY)

Add `generate_code` to the tools table:

```markdown
| `generate_code`   | Generate complete code from a natural language description with smart bundle selection |
```

---

## 9. Failure modes and mitigations

### 9.1 Ambiguous descriptions

**Trigger:** "particles" (could be anything)
**Mitigation:** Fallback to `@tsparticles/slim` with generic template. Add note: "Generated generic particles — try being more specific (e.g., 'confetti', 'snow', 'stars') for specialized bundles."

### 9.2 Mixed language descriptions

**Trigger:** "confetti italiani colorati"
**Mitigation:** Keywords are matched case-insensitively and support both IT + EN. The keyword table includes both languages.

### 9.3 Unknown/invalid framework

**Trigger:** `framework: "solid"` (not supported)
**Mitigation:** Zod validation rejects invalid enum values before the function runs. Returns `isError: true` with validation message.

### 9.4 Very long descriptions

**Trigger:** 500-word paragraph
**Mitigation:** Keyword extraction uses first-match semantics. Long descriptions don't break anything — only matching keywords matter.

### 9.5 Conflicting keywords

**Trigger:** "confetti and fireworks together"
**Mitigation:** First-match wins (confetti priority 1 > fireworks priority 2). Add note: "For combining effects, consider using @tsparticles/all with both emitters."

### 9.6 Bundle not found in registry

**Trigger:** Keyword matches but bundle metadata missing
**Mitigation:** Graceful fallback to `@tsparticles/slim`. Add note explaining the fallback.

---

## 10. Testing strategy

### 10.1 Unit tests

#### Bundle selection tests

| Test case | Expected bundle |
|-----------|----------------|
| "confetti falling" | `@tsparticles/confetti` |
| "coriandoli colorati" | `@tsparticles/confetti` |
| "fireworks display" | `@tsparticles/fireworks` |
| "fuochi d'artificio" | `@tsparticles/fireworks` |
| "ribbon effect" | `@tsparticles/ribbons` |
| "snow falling gently" | preset `snow` |
| "fire flames" | preset `fire` |
| "matrix rain code" | preset `matrix` |
| "stars in the sky" | preset `stars` |
| "interactive links between particles" | `@tsparticles/slim` |
| "emitters shooting particles" | `tsparticles` |
| "simple circles moving" | `@tsparticles/basic` |
| "particle animation" (generic) | `@tsparticles/slim` |

#### Options generation tests

| Test case | Verified property |
|-----------|-------------------|
| Confetti template | Has emitters, rotate, tilt, wobble, roll |
| Fireworks template | Has emitters, decay, speed animation |
| Generic template | Has number, color, shape, opacity, size, move |
| Color override | `particles.color.value` matches keyword |
| Speed override | `particles.move.speed` matches keyword |

#### Framework codegen tests

| Test case | Verified property |
|-----------|-------------------|
| React output | Contains `import Particles from "@tsparticles/react"` |
| Vue 3 output | Contains `<vue-particles>` |
| Svelte output | Contains `<SvelteParticles>` |
| Angular output | Contains `<tsparticles>` + `@Component` |
| TypeScript output | Contains type annotations |
| JavaScript output | No type annotations |

#### Integration tests

| Test case | Verified property |
|-----------|-------------------|
| Options validate via suggestPlugins | No crash, valid result |
| Install command contains all packages | All `installPackages` in command string |
| HTML contains container div | `<div id="tsparticles">` present |

### 10.2 Manual/visual tests

1. Call tool with "confetti on a birthday page" → verify output is usable confetti code
2. Call with "stelle che brillano nel cielo" → verify Italian keyword matching
3. Call with "interactive particles with links on hover" → verify slim bundle + interactivity
4. Call with "simple moving circles" → verify basic bundle, minimal config

### 10.3 Regression tests

- All existing tool tests must pass unchanged
- Existing `suggestPlugins.test.ts` must pass unchanged
- Build must succeed with no new lint errors

---

## 11. Implementation checklist

### Step 1 — Types and validation

- [ ] Add `GenerateCodeInput`, `GenerateCodeOutput`, `BundleMatch` to `src/types.ts`
- [ ] Add `generateCodeArgsSchema` to `src/validation.ts`

### Step 2 — Core logic

- [ ] Create `src/tools/generateCode.ts` with keyword extraction
- [ ] Implement `matchBundle()` with priority-ordered keyword table
- [ ] Implement `generateOptions()` with templates + overrides
- [ ] Implement framework codegen for all 5 frameworks
- [ ] Implement HTML generation
- [ ] Implement install command generation
- [ ] Wire `suggestPlugins()` for validation

### Step 3 — MCP integration

- [ ] Import and register in `src/index.ts` (ListTools + CallTool)
- [ ] Verify tool appears in MCP tool listing

### Step 4 — Tests

- [ ] Create `src/tools/generateCode.test.ts`
- [ ] Bundle selection tests (13+ cases)
- [ ] Options generation tests (5+ cases)
- [ ] Framework codegen tests (5 frameworks × 2 TS/JS)
- [ ] Integration tests (3+ cases)
- [ ] Run `pnpm exec vitest` — all pass

### Step 5 — Documentation

- [ ] Update `README.md` tools table
- [ ] Add `diagnose_issues` to README tools table (currently missing)

### Step 6 — Validation

- [ ] Run lint: `pnpm nx run @tsparticles/mcp-server:lint`
- [ ] Run build: `pnpm nx run @tsparticles/mcp-server:build`
- [ ] Run tests: `pnpm --filter @tsparticles/mcp-server test`
- [ ] Manual test via MCP client (if available)

---

## 12. Acceptance criteria

1. `generate_code` tool is callable with `{ description: "confetti" }` and returns valid output.
2. `@tsparticles/confetti` is always selected for confetti-related descriptions (EN + IT).
3. `@tsparticles/fireworks` is always selected for fireworks-related descriptions.
4. Specialized bundles are NEVER bypassed in favor of generic bundles when keywords match.
5. Generated code compiles/runs without modification for vanilla + each framework.
6. Install command includes all required packages.
7. All existing tests pass without modification.
8. New test file achieves >90% branch coverage for `generateCode.ts`.

---

## 13. Default configurations and examples

### 13.1 Confetti example

**Input:**
```json
{
  "description": "confetti colorati che cadono dallo schermo",
  "framework": "vanilla"
}
```

**Output (abbreviated):**
```json
{
  "options": {
    "emitters": [{ "position": { "x": 50, "y": 0 }, "life": { "duration": 0.1 }, "rate": { "quantity": 50, "delay": 0 } }],
    "particles": {
      "number": { "value": 0 },
      "color": { "value": ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"] },
      "shape": { "type": ["square", "circle"] },
      "move": { "enable": true, "speed": { "min": 10, "max": 50 }, "gravity": { "enable": true, "acceleration": 10 }, "decay": 0.1 },
      "rotate": { "value": { "min": 0, "max": 360 }, "direction": "random" },
      "tilt": { "enable": true, "value": { "min": 0, "max": 360 }, "direction": "random" },
      "wobble": { "enable": true, "distance": 10, "speed": { "min": -10, "max": 10 } },
      "roll": { "enable": true, "speed": { "min": -5, "max": 5 } }
    }
  },
  "bundle": "@tsparticles/confetti",
  "loadFunction": "doInitPlugins",
  "installPackages": ["@tsparticles/confetti"],
  "installCommand": "npm install @tsparticles/confetti",
  "framework": "vanilla",
  "html": "<div id=\"tsparticles\"></div>",
  "code": "import { confetti } from \"@tsparticles/confetti\";\n\nawait confetti({\n  // ... generated options\n});",
  "notes": ["@tsparticles/confetti auto-initializes all plugins — no manual load() needed."]
}
```

### 13.2 React interactive stars

**Input:**
```json
{
  "description": "interactive stars in the background with links on hover",
  "framework": "react",
  "typescript": true
}
```

**Output (abbreviated):**
```json
{
  "bundle": "@tsparticles/slim",
  "loadFunction": "loadSlim",
  "installPackages": ["@tsparticles/slim", "@tsparticles/react"],
  "installCommand": "npm install @tsparticles/slim @tsparticles/react",
  "code": "import { useCallback } from \"react\";\nimport type { Engine } from \"@tsparticles/engine\";\nimport Particles from \"@tsparticles/react\";\nimport { loadSlim } from \"@tsparticles/slim\";\n\nexport function ParticlesBackground() {\n  const init = useCallback(async (engine: Engine) => {\n    await loadSlim(engine);\n  }, []);\n\n  return (\n    <Particles\n      id=\"tsparticles\"\n      init={init}\n      options={{\n        particles: {\n          number: { value: 80, density: { enable: true } },\n          shape: { type: \"star\" },\n          links: { enable: true, distance: 150 },\n          move: { enable: true, speed: 2 },\n        },\n        interactivity: {\n          events: { onHover: { enable: true, mode: \"grab\" } },\n        },\n        background: { color: \"#000000\" },\n      }}\n    />\n  );\n}",
  "notes": ["Generated for React — ensure @tsparticles/react is compatible with your React version."]
}
```

### 13.3 Snow preset

**Input:**
```json
{
  "description": "snow falling gently",
  "framework": "vanilla"
}
```

**Output (abbreviated):**
```json
{
  "bundle": "@tsparticles/basic",
  "loadFunction": "loadBasic",
  "installPackages": ["@tsparticles/basic", "@tsparticles/preset-snow"],
  "installCommand": "npm install @tsparticles/basic @tsparticles/preset-snow",
  "code": "import { loadBasic } from \"@tsparticles/basic\";\nimport { loadSnowPreset } from \"@tsparticles/preset-snow\";\nimport { tsParticles } from \"@tsparticles/engine\";\n\nawait loadBasic(tsParticles);\nawait loadSnowPreset(tsParticles);\n\nawait tsParticles.load({\n  id: \"tsparticles\",\n  options: { preset: \"snow\" },\n});",
  "notes": ["Using snow preset — all snow options are pre-configured. Override with custom options if needed."]
}
```
