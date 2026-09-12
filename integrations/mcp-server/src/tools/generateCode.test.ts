import { describe, it, expect } from "vitest";
import {
  generateCode,
  extractKeywords,
  matchBundle,
  generateOptions,
  generateHtml,
  generateInstallCommand,
} from "./generateCode.js";

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
  const cases: Array<[string, string, string?]> = [
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
    const match = matchBundle(extractKeywords("confetti"), "confetti");
    const options = generateOptions(match, extractKeywords("confetti"), "confetti");
    expect(options).toMatchObject({
      particleCount: 120,
      spread: 100,
      gravity: 1.2,
      ticks: 200,
    });
    expect(options.origin).toEqual({ y: 0.7 });
    expect(Array.isArray(options.colors)).toBe(true);
  });

  it("produces the fireworks template", () => {
    const match = matchBundle(extractKeywords("fireworks"), "fireworks");
    const options = generateOptions(match, extractKeywords("fireworks"), "fireworks");
    expect(options).toMatchObject({ particleCount: 50, spread: 360, startVelocity: 30 });
  });

  it("produces a generic template with core sections", () => {
    const match = matchBundle(extractKeywords("particle animation"), "particle animation");
    const options = generateOptions(match, extractKeywords("particle animation"), "particle animation");
    expect(options.particles).toMatchObject({
      number: expect.any(Object),
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: expect.any(Object),
      size: expect.any(Object),
      move: expect.any(Object),
    });
    expect(options.background).toEqual({ color: "#000000" });
  });

  it("applies color keyword overrides", () => {
    const result = generateCode({ description: "red particles floating" });
    expect((result.options.particles as Record<string, unknown>).color).toEqual({
      value: "#ff0000",
    });
  });

  it("applies count and speed overrides", () => {
    const result = generateCode({ description: "200 slow particles moving" });
    expect((result.options.particles as Record<string, unknown>).number).toEqual({
      value: 200,
      density: { enable: true },
    });
    expect(((result.options.particles as Record<string, unknown>).move as Record<string, unknown>).speed).toBe(1);
  });

  it("adds links and interactivity for interactive link descriptions", () => {
    const result = generateCode({
      description: "interactive stars in the background with links on hover",
      framework: "react",
      typescript: true,
    });
    const particles = result.options.particles as Record<string, unknown>;
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
    expect(result.notes[0]).toContain("auto-initializes");
  });

  it("generates React code with the React wrapper", () => {
    const result = generateCode({ description: "particle animation", framework: "react" });
    expect(result.code).toContain('import Particles from "@tsparticles/react"');
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
        expect(result.code.length).toBeGreaterThan(0);
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
