import { describe, expect, it } from "vitest";

import {
  extractKeywords,
  generateCode,
  generateHtml,
  generateInstallCommand,
  generateOptions,
  matchBundle,
} from "./generateCode.js";

const LARGE_COUNT_DIGITS = 400,
  LONG_WHITESPACE_LENGTH = 10000;

describe("extractKeywords", () => {
  it("extracts normalized lowercase tokens", () => {
    expect(extractKeywords("Simple Circles Moving")).toEqual(["simple", "circles", "moving"]);
  });

  it("drops stopwords and dedupes", () => {
    expect(extractKeywords("the red and the blue circle")).toEqual(["red", "blue", "circle"]);
  });

  it("handles Italian text", () => {
    expect(extractKeywords("coriandoli colorati che cadono")).toEqual(["coriandoli", "colorati", "cadono"]);
  });
});

describe("matchBundle", () => {
  const cases: [string, string, string?][] = [
    ["confetti falling", "@tsparticles/confetti"],
    ["coriandoli colorati", "@tsparticles/confetti"],
    ["fireworks display", "@tsparticles/fireworks"],
    ["fuochi d'artificio", "@tsparticles/fireworks"],
    ["ribbon effect", "@tsparticles/ribbons"],
    ["snow falling gently", "@tsparticles/basic", "@tsparticles/preset-snow"],
    ["fire flames", "@tsparticles/basic", "@tsparticles/preset-fire"],
    ["matrix rain code", "@tsparticles/basic", "@tsparticles/preset-matrix"],
    ["stars in the sky", "@tsparticles/basic", "@tsparticles/preset-stars"],
    ["interactive links between particles", "@tsparticles/slim"],
    ["emitters shooting particles", "tsparticles"],
    ["simple circles moving", "@tsparticles/basic"],
    ["particle animation", "@tsparticles/slim"],
  ];

  for (const [description, bundle, presetPackage] of cases) {
    it(`selects ${bundle} for "${description}"`, () => {
      const match = matchBundle(extractKeywords(description), description.toLowerCase());
      expect(match.bundleName).toBe(bundle);
      if (presetPackage) {
        expect(match.presetPackage).toBe(presetPackage);
        expect(match.isPreset).toBe(true);
      } else {
        expect(match.isPreset).toBeUndefined();
      }
    });
  }

  it("never forces a preset when advanced features are requested", () => {
    const match = matchBundle(
      extractKeywords("interactive stars in the background with links on hover"),
      "interactive stars in the background with links on hover".toLowerCase(),
    );
    expect(match.bundleName).toBe("@tsparticles/slim");
  });

  it("first match wins for conflicting effect keywords", () => {
    const match = matchBundle(
      extractKeywords("confetti and fireworks together"),
      "confetti and fireworks together".toLowerCase(),
    );
    expect(match.bundleName).toBe("@tsparticles/confetti");
    expect(match.isAutoInitialized).toBe(true);
  });
});

describe("generateOptions", () => {
  it("produces the confetti template", () => {
    const match = matchBundle(extractKeywords("confetti"), "confetti"),
      options = generateOptions(match, extractKeywords("confetti"), "confetti");
    expect(options).toMatchObject({
      count: 120,
      spread: 100,
      gravity: 1.2,
      ticks: 200,
    });
    expect(options.origin).toEqual({ y: 0.7 });
    expect(Array.isArray(options.colors)).toBe(true);
  });

  it("produces the fireworks template", () => {
    const match = matchBundle(extractKeywords("fireworks"), "fireworks"),
      options = generateOptions(match, extractKeywords("fireworks"), "fireworks");
    expect(options).toMatchObject({ splitCount: 50, speed: 30, gravity: 30 });
    expect(options).not.toHaveProperty("particleCount");
    expect(options).not.toHaveProperty("spread");
  });

  it("returns independent copies of specialized templates", () => {
    const match = matchBundle(extractKeywords("confetti"), "confetti"),
      keywords = extractKeywords("confetti"),
      first = generateOptions(match, keywords, "confetti"),
      firstColors = first.colors as string[],
      firstOrigin = first.origin as Record<string, number>;

    firstColors[0] = "#000000";
    firstOrigin.y = 0.5;

    const second = generateOptions(match, keywords, "confetti");

    expect(second.colors).toEqual(["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"]);
    expect(second.origin).toEqual({ y: 0.7 });
  });

  it("applies fireworks count overrides to splitCount", () => {
    const result = generateCode({ description: "200 fireworks" });

    expect(result.options).toHaveProperty("splitCount", 200);
  });

  it("does not treat a year as a fireworks splitCount request", () => {
    const result = generateCode({ description: "fireworks for 2026" });

    expect(result.options).toHaveProperty("splitCount", 50);
    expect(result.notes.some(note => note.includes("exceeds the maximum"))).toBe(false);
  });

  it("reports a year before the event phrase as an ambiguous fireworks count", () => {
    const result = generateCode({ description: "2000 fireworks" });

    expect(result.options).toHaveProperty("splitCount", 50);
    expect(result.notes.some(note => note.includes("Please clarify with a labeled count"))).toBe(true);
  });

  it("reports a year-like value after fireworks with as ambiguous", () => {
    const result = generateCode({ description: "fireworks with 2026 written in the sky" }),
      futureYearResult = generateCode({ description: "fireworks with 2100 written in the sky" }),
      labeledResult = generateCode({ description: "fireworks with 2100 written in the sky, split count: 75" });

    expect(result.options).toHaveProperty("splitCount", 50);
    expect(result.notes.some(note => note.includes("Please clarify with a labeled count"))).toBe(true);
    expect(futureYearResult.options).toHaveProperty("splitCount", 50);
    expect(futureYearResult.notes.some(note => note.includes("Please clarify with a labeled count"))).toBe(true);
    expect(labeledResult.options).toHaveProperty("splitCount", 75);
    expect(labeledResult.notes.some(note => note.includes("Please clarify with a labeled count"))).toBe(false);
  });

  it("uses explicitly labeled four-digit counts instead of treating them as years", () => {
    const result = generateCode({ description: "count: 2100 fireworks" });

    expect(result.options).toHaveProperty("splitCount", 500);
    expect(result.notes.some(note => note.includes("Please clarify with a labeled count"))).toBe(false);
  });

  it("does not treat a bare number after fireworks as a splitCount request", () => {
    const result = generateCode({ description: "fireworks 2026" });

    expect(result.options).toHaveProperty("splitCount", 50);
    expect(result.notes.some(note => note.includes("Requested fireworks splitCount"))).toBe(false);
  });

  it("parses labeled split counts separated by a colon or equals sign", () => {
    const colonResult = generateCode({ description: "fireworks split count: 200" }),
      equalsResult = generateCode({ description: "fireworks count=200" });

    expect(colonResult.options).toHaveProperty("splitCount", 200);
    expect(equalsResult.options).toHaveProperty("splitCount", 200);
  });

  it("prioritizes a valid split count label over an earlier generic count", () => {
    const result = generateCode({ description: "count 4 fireworks, split count: 20" });

    expect(result.options).toHaveProperty("splitCount", 20);
  });

  it("prioritizes an explicit spark count over the number of fireworks", () => {
    const result = generateCode({ description: "10 fireworks with 50 sparks each" });

    expect(result.options).toHaveProperty("splitCount", 50);
  });

  it("prioritizes a spark count over a generic count but keeps split count labels highest", () => {
    const sparkCountResult = generateCode({ description: "count 4 fireworks with 200 sparks" }),
      splitCountResult = generateCode({ description: "count 4 fireworks with 200 sparks, split count: 300" });

    expect(sparkCountResult.options).toHaveProperty("splitCount", 200);
    expect(splitCountResult.options).toHaveProperty("splitCount", 300);
  });

  it("parses labeled counts after long whitespace without stalling", () => {
    const result = generateCode({ description: `fireworks${" ".repeat(LONG_WHITESPACE_LENGTH)}split count: 200` }),
      malformedResult = generateCode({
        description: `fireworks count${" ".repeat(LONG_WHITESPACE_LENGTH)}not-a-number`,
      });

    expect(result.options).toHaveProperty("splitCount", 200);
    expect(malformedResult.options).toHaveProperty("splitCount", 50);
  });

  it("caps excessive fireworks splitCount requests and reports the cap", () => {
    const result = generateCode({ description: "fireworks split count: 1000" });

    expect(result.options).toHaveProperty("splitCount", 500);
    expect(result.notes).toContain("Requested fireworks splitCount of 1000 exceeds the maximum of 500; using 500.");
  });

  it.each(["10 fireworks, 1000 sparks each", "fireworks 1000 particles"])(
    "caps explicit fireworks particle counts in %s",
    description => {
      const result = generateCode({ description });

      expect(result.options).toHaveProperty("splitCount", 500);
      expect(result.notes).toContain("Requested fireworks splitCount of 1000 exceeds the maximum of 500; using 500.");
    },
  );

  it("captures full fireworks counts before applying the cap", () => {
    const result = generateCode({ description: "10000 fireworks" });

    expect(result.options).toHaveProperty("splitCount", 500);
    expect(result.notes).toContain("Requested fireworks splitCount of 10000 exceeds the maximum of 500; using 500.");
  });

  it("preserves the original text for imprecise and infinite requested counts", () => {
    const impreciseCount = "9007199254740993",
      infiniteCount = "9".repeat(LARGE_COUNT_DIGITS),
      impreciseResult = generateCode({ description: `${impreciseCount} fireworks` }),
      infiniteResult = generateCode({ description: `${infiniteCount} fireworks` });

    expect(impreciseResult.notes).toContain(
      `Requested fireworks splitCount of ${impreciseCount} exceeds the maximum of 500; using 500.`,
    );
    expect(infiniteResult.notes).toContain(
      `Requested fireworks splitCount of ${infiniteCount} exceeds the maximum of 500; using 500.`,
    );
    expect(infiniteResult.notes.some(note => note.includes("Infinity"))).toBe(false);
  });

  it("preserves count overrides above the fireworks cap for other bundles", () => {
    const result = generateCode({ description: "1000 ribbons" });

    expect(result.options).toHaveProperty("count", 1000);
    expect(result.notes.some(note => note.includes("exceeds the maximum"))).toBe(false);
  });

  it("uses supported ribbon options and count overrides", () => {
    const result = generateCode({ description: "200 ribbons" });

    expect(result.options).toMatchObject({ count: 200, positionX: 50 });
    expect(result.options).not.toHaveProperty("spread");
    expect(result.options).not.toHaveProperty("gravity");
  });

  it("produces a generic template with core sections", () => {
    const match = matchBundle(extractKeywords("particle animation"), "particle animation"),
      options = generateOptions(match, extractKeywords("particle animation"), "particle animation");
    expect(options.particles).toMatchObject({
      number: expect.any(Object) as Record<string, unknown>,
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: expect.any(Object) as Record<string, unknown>,
      size: expect.any(Object) as Record<string, unknown>,
      move: expect.any(Object) as Record<string, unknown>,
    });
    expect(options.background).toEqual({ color: "#000000" });
  });

  it("applies color keyword overrides", () => {
    const result = generateCode({ description: "red particles floating" });
    expect((result.options.particles as Record<string, unknown>).paint).toEqual({
      color: { value: "#ff0000" },
    });
  });

  it("applies color keyword override to paint.color", () => {
    const result = generateCode({ description: "red particles floating" });
    expect((result.options.particles as unknown as { paint: { color: { value: string } } }).paint!.color).toEqual({
      value: "#ff0000",
    });
  });

  it("applies count and speed overrides", () => {
    const result = generateCode({ description: "200 slow particles moving" });
    expect((result.options.particles as Record<string, unknown>).number).toEqual({
      value: 200,
      density: { enable: true },
    });
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(((result.options.particles as Record<string, unknown>).move as Record<string, unknown>).speed).toBe(1);
  });

  it("maps triangle descriptions to the polygon shape", () => {
    const plural = generateCode({ description: "triangles floating" }),
      singular = generateCode({ description: "a floating triangle" });
    expect((plural.options.particles as Record<string, unknown>).shape).toEqual({ type: "polygon" });
    expect((singular.options.particles as Record<string, unknown>).shape).toEqual({ type: "polygon" });
  });

  it("adds links and interactivity for interactive link descriptions", () => {
    const result = generateCode({
        description: "interactive stars in the background with links on hover",
        framework: "react",
        typescript: true,
      }),
      particles = result.options.particles as Record<string, unknown>;
    expect(particles.shape).toEqual({ type: "star" });
    expect(particles.links).toMatchObject({ enable: true, distance: 150 });
    const interactivity = result.options.interactivity as Record<string, unknown>;
    expect(((interactivity.events as Record<string, unknown>).onHover as Record<string, unknown>).mode).toBe("grab");
  });

  it("uses preset options for preset bundles", () => {
    const result = generateCode({ description: "snow falling" });
    expect(result.options).toEqual({ preset: "snow" });
  });
});

describe("framework codegen", () => {
  it("generates copy-pasteable confetti code for any framework", () => {
    const result = generateCode({ description: "confetti", framework: "react" });
    expect(result.code).toContain('import { confetti } from "@tsparticles/confetti"');
    expect(result.code).toContain("await confetti(");
    expect(result.installPackages).toEqual(["@tsparticles/confetti"]);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(result.notes[0]).toContain("auto-initializes");
  });

  it("generates React code with the React wrapper", () => {
    const result = generateCode({ description: "particle animation", framework: "react" });
    expect(result.code).toContain('import Particles, { ParticlesProvider } from "@tsparticles/react"');
    expect(result.code).toContain("<ParticlesProvider init={init}>");
    expect(result.code).toContain("export function ParticlesBackground()");
    expect(result.installPackages).toContain("@tsparticles/react");
  });

  it("generates Vue 3 code with the vue-particles component", () => {
    const result = generateCode({ description: "particle animation", framework: "vue3" });
    expect(result.code).toContain("<vue-particles");
    expect(result.code).toContain('from "@tsparticles/vue3"');
    expect(result.installPackages).toContain("@tsparticles/vue3");
  });

  it("generates Svelte code with the Svelte wrapper", () => {
    const result = generateCode({ description: "particle animation", framework: "svelte" });
    expect(result.code).toContain('from "@tsparticles/svelte"');
    expect(result.code).toContain("initParticlesEngine");
    expect(result.installPackages).toContain("@tsparticles/svelte");
  });

  it("generates Angular code with @Component and ngx-particles", () => {
    const result = generateCode({ description: "particle animation", framework: "angular" });
    expect(result.code).toContain("@Component");
    expect(result.code).toContain("<ngx-particles");
    expect(result.code).toContain("NgParticlesService");
    expect(result.installPackages).toContain("@tsparticles/angular");
  });

  it("emits TypeScript annotations when typescript: true", () => {
    const ts = generateCode({ description: "particle animation", framework: "react", typescript: true });
    expect(ts.code).toContain('import type { Engine } from "@tsparticles/engine"');
    expect(ts.code).toContain("(engine: Engine)");

    const js = generateCode({ description: "particle animation", framework: "react", typescript: false });
    expect(js.code).not.toContain("import type");
    expect(js.code).toContain("(engine)");
  });

  it("emits plain JavaScript Angular without type-only syntax", () => {
    const js = generateCode({ description: "particle animation", framework: "angular", typescript: false });
    expect(js.code).not.toContain("implements OnInit");
    expect(js.code).not.toContain("ISourceOptions");
    expect(js.code).toBeTruthy();
  });

  it("emits plain JavaScript Vue without TypeScript-only syntax", () => {
    const js = generateCode({ description: "particle animation", framework: "vue3", typescript: false });
    expect(js.code).toContain("function particlesLoaded(container) {");
    expect(js.code).not.toContain("container?: Container");
    expect(js.code).not.toContain(": void");
  });

  it("emits TypeScript Vue output with typed particlesLoaded", () => {
    const ts = generateCode({ description: "particle animation", framework: "vue3", typescript: true });
    expect(ts.code).toContain('import type { Container, ISourceOptions } from "@tsparticles/engine"');
    expect(ts.code).toContain("container?: Container");
  });

  it("emits TypeScript vanilla output when typescript: true", () => {
    const ts = generateCode({ description: "particle animation", framework: "vanilla", typescript: true });
    expect(ts.code).toContain('import type { ISourceOptions } from "@tsparticles/engine"');
    expect(ts.code).toContain("const options: ISourceOptions =");

    const js = generateCode({ description: "particle animation", framework: "vanilla", typescript: false });
    expect(js.code).not.toContain("import type");
  });

  it("emits TypeScript Svelte output when typescript: true", () => {
    const ts = generateCode({ description: "particle animation", framework: "svelte", typescript: true });
    expect(ts.code).toContain('<script lang="ts">');
    expect(ts.code).toContain('import type { Engine, ISourceOptions } from "@tsparticles/engine"');
    expect(ts.code).toContain("(engine: Engine)");

    const js = generateCode({ description: "particle animation", framework: "svelte", typescript: false });
    expect(js.code).toContain("<script>");
    expect(js.code).not.toContain("(engine: Engine)");
  });

  it("loads the preset loader for preset bundles in React", () => {
    const result = generateCode({ description: "snow falling", framework: "react" });
    expect(result.code).toContain("loadSnowPreset");
    expect(result.code).toContain('from "@tsparticles/preset-snow"');
  });

  it("emits loader imports and calls for suggested packages outside the selected bundle", () => {
    const result = generateCode({ description: "triangles floating", typescript: true });

    expect(result.bundle).toBe("@tsparticles/basic");
    expect(result.installPackages).toContain("@tsparticles/shape-polygon");
    expect(result.code).toContain('import { loadPolygonShape } from "@tsparticles/shape-polygon";');
    expect(result.code).toContain("await loadPolygonShape(tsParticles);");
    expect(result.code).toContain('import { loadBasic } from "@tsparticles/basic";');
    expect(result.code).toContain("await loadBasic(tsParticles);");
  });

  it("emits extra loader imports and calls for every framework", () => {
    const engineVar = (framework: string): string => (framework === "vanilla" ? "tsParticles" : "engine");

    for (const framework of ["vanilla", "react", "vue3", "svelte", "angular"] as const) {
      const result = generateCode({ description: "triangles floating", framework });

      expect(result.installPackages).toContain("@tsparticles/shape-polygon");
      expect(result.code).toContain('import { loadPolygonShape } from "@tsparticles/shape-polygon"');
      expect(result.code).toContain(`loadPolygonShape(${engineVar(framework)})`);
    }
  });
});

describe("generateHtml and generateInstallCommand", () => {
  it("returns a container div for vanilla", () => {
    expect(generateHtml("vanilla", matchBundle(extractKeywords("confetti"), "confetti"))).toBe(
      '<div id="tsparticles"></div>',
    );
  });

  it("returns empty HTML for framework components", () => {
    const match = matchBundle(extractKeywords("confetti"), "confetti");
    expect(generateHtml("react", match)).toBe("");
  });

  it("builds a valid npm install command", () => {
    expect(generateInstallCommand(["@tsparticles/confetti"])).toBe("npm install @tsparticles/confetti");
    expect(generateInstallCommand(["@tsparticles/basic", "@tsparticles/preset-snow"])).toBe(
      "npm install @tsparticles/basic @tsparticles/preset-snow",
    );
  });
});

describe("generateCode integration", () => {
  it("matches the plan's React interactive stars example", () => {
    const result = generateCode({
      description: "interactive stars in the background with links on hover",
      framework: "react",
      typescript: true,
    });
    expect(result.bundle).toBe("@tsparticles/slim");
    expect(result.loadFunction).toBe("loadSlim");
    expect(result.installPackages).toEqual(["@tsparticles/slim", "@tsparticles/react"]);
    expect(result.installCommand).toBe("npm install @tsparticles/slim @tsparticles/react");
    expect(result.html).toBe("");
    expect(result.code).toContain("ParticlesBackground");
  });

  it("matches the plan's snow preset example packages", () => {
    const result = generateCode({ description: "snow falling gently" });
    expect(result.bundle).toBe("@tsparticles/basic");
    expect(result.loadFunction).toBe("loadBasic");
    expect(result.isAutoInitialized).toBeUndefined();
    expect(result.installPackages).toEqual(["@tsparticles/basic", "@tsparticles/preset-snow"]);
    expect(result.installCommand).toContain("@tsparticles/preset-snow");
    expect(result.html).toBe('<div id="tsparticles"></div>');
  });

  it("matches the plan's confetti example", () => {
    const result = generateCode({ description: "confetti colorati che cadono dallo schermo" });
    expect(result.bundle).toBe("@tsparticles/confetti");
    expect(result.loadFunction).toBe("confetti");
    expect(result.isAutoInitialized).toBe(true);
    expect(result.installPackages).toEqual(["@tsparticles/confetti"]);
    expect(result.installCommand).toBe("npm install @tsparticles/confetti");
    expect(result.code).toContain("await confetti(");
    expect(result.notes.some(n => n.includes("auto-initializes"))).toBe(true);
  });

  it("does not crash on a whitespace-only description and falls back to slim", () => {
    const result = generateCode({ description: "   " });
    expect(result.bundle).toBe("@tsparticles/slim");
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(result.code.length).toBeGreaterThan(0);
    expect(result.notes.some(n => n.includes("try being more specific"))).toBe(true);
  });

  it("handles mixed language descriptions", () => {
    const result = generateCode({ description: "confetti italiani colorati" });
    expect(result.bundle).toBe("@tsparticles/confetti");
  });

  it("adds a note when the description conflicts across multiple effects", () => {
    const result = generateCode({ description: "confetti and fireworks together" });
    expect(result.bundle).toBe("@tsparticles/confetti");
    expect(result.notes.some(n => n.includes("@tsparticles/all"))).toBe(true);
  });

  it("produces valid code for every framework without throwing", () => {
    for (const framework of ["vanilla", "react", "vue3", "svelte", "angular"] as const) {
      for (const typescript of [true, false]) {
        const result = generateCode({ description: "white particles floating", framework, typescript });
        expect(result.framework).toBe(framework);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(result.code.length).toBeGreaterThan(0);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(result.installPackages.length).toBeGreaterThan(0);
      }
    }
  });

  it("uses a framework wrapper package only for non-auto-initialized bundles", () => {
    const generic = generateCode({ description: "particle animation", framework: "angular" });
    expect(generic.installPackages).toContain("@tsparticles/angular");

    const specialized = generateCode({ description: "fireworks", framework: "angular" });
    expect(specialized.installPackages).toEqual(["@tsparticles/fireworks"]);
  });
});
