import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { Engine } from "@tsparticles/engine";
import { JSDOM } from "jsdom";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFileSync } from "node:fs";

const currentDir = path.dirname(fileURLToPath(import.meta.url)),
  repoRoot = path.resolve(currentDir, "..", "..", "..", ".."),
  readDist = (relativePath: string): string => readFileSync(path.join(repoRoot, relativePath), "utf8"),
  engineBundle = readDist("engine/dist/tsparticles.engine.js"),
  slimBundle = readDist("bundles/slim/dist/tsparticles.slim.js"),
  emojiBundle = readDist("shapes/emoji/dist/tsparticles.shape.emoji.js"),
  evalInWindow = (window: Window, code: string): void => {
    (window as typeof window & { eval?: (code: string) => unknown }).eval?.(code);
  };

type EngineBundleWindow = Window & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEmojiShape?: (engine: unknown) => Promise<void>;
  loadSlim?: (engine: unknown) => Promise<void>;
  tsParticles?: {
    createEngine: () => Engine;
    loadSlim?: (engine: Engine) => Promise<void>;
  } & Record<string, unknown>;
};

describe("Browser IIFE bundles", () => {
  let window: EngineBundleWindow;

  beforeEach(() => {
    window = new JSDOM("", { runScripts: "outside-only" }).window as EngineBundleWindow;
  });

  afterEach(() => {
    window.close();
  });

  it("loads the engine bundle in a classic script", () => {
    evalInWindow(window, engineBundle);

    expect(window.tsParticles).toBeDefined();
    expect(window.tsParticles?.createEngine).toBeTypeOf("function");
  });

  it("merges slim into the shared __tsParticlesInternals namespace and exposes loadSlim on window", () => {
    evalInWindow(window, engineBundle);
    evalInWindow(window, slimBundle);

    const internals = window.__tsParticlesInternals;

    expect(window.loadSlim).toBeTypeOf("function");
    expect(internals).toBeDefined();
    expect((internals?.bundles as Record<string, unknown> | undefined)?.slim).toBeDefined();
    expect((internals?.engine as { createEngine?: unknown } | undefined)?.createEngine).toBe(
      window.tsParticles?.createEngine,
    );
  });

  it("loads a shape plugin resolving @tsparticles/engine and @tsparticles/utils globals", async () => {
    evalInWindow(window, engineBundle);
    evalInWindow(window, slimBundle);
    evalInWindow(window, emojiBundle);

    expect(window.loadEmojiShape).toBeTypeOf("function");

    const namespace = window.tsParticles;

    if (!namespace) {
      throw new Error("Factory namespace was not installed");
    }

    const engine = namespace.createEngine(),
      other = namespace.createEngine();

    expect(engine).not.toBe(other);

    await window.loadSlim?.(engine);
    await window.loadEmojiShape?.(engine);
    await window.loadSlim?.(other);
    expect(engine.pluginManager).not.toBe(other.pluginManager);
  });
});
