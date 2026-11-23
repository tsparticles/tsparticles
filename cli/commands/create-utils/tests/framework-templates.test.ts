import { expect, it, vi } from "vitest";
import { readFile, readdir } from "node:fs/promises";
import { Script, createContext } from "node:vm";
import ts from "typescript";

const root = new URL("../../../../templates/", import.meta.url);

it("keeps template factory initialization after static imports", async () => {
  const entries = await readdir(root, { recursive: true });

  for (const entry of entries.filter(entry => /\.[cm]?tsx?$/.test(entry))) {
    const source = ts.createSourceFile(
      entry,
      await readFile(new URL(entry, root), "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );
    const imports = source.statements.filter(ts.isImportDeclaration);
    const lastImport = imports.at(-1)?.end ?? 0;

    for (const statement of source.statements.filter(ts.isVariableStatement)) {
      for (const declaration of statement.declarationList.declarations) {
        const initializer = declaration.initializer;

        if (
          initializer &&
          ts.isCallExpression(initializer) &&
          /^create(Particles|Confetti|Ribbons)$/.test(initializer.expression.getText(source))
        ) {
          expect(statement.getStart(source), entry).toBeGreaterThan(lastImport);
        }
      }
    }
  }
});

it.each(["landing", "portfolio", "login", "confetti", "particles", "scaffold", "tictactoe"])(
  "publishes the %s Qwik engine only after initialization succeeds",
  async kind => {
    const source = (await readFile(new URL(`${kind}/template/qwik/src/App.tsx`, root), "utf8")).replace(
      /\{\{\s*projectName\s*\}\}/g,
      "Example project",
    );
    const engine = {};
    const signals: { value: unknown }[] = [];
    const tasks: (() => Promise<void>)[] = [];
    let release!: () => void;
    const registration = new Promise<void>(resolve => {
      release = resolve;
    });
    const init = vi.fn(async (_engine, register) => {
      await registration;
      await register(engine);
    });
    const api = Object.assign(vi.fn(), { init: vi.fn(async () => {}) });
    const modules: Record<string, unknown> = {
      "@builder.io/qwik": {
        $: (callback: unknown) => callback,
        component$: (callback: unknown) => callback,
        noSerialize: (value: unknown) => value,
        useSignal: (value: unknown) => {
          const signal = { value };
          signals.push(signal);
          return signal;
        },
        useVisibleTask$: (callback: () => Promise<void>) => tasks.push(callback),
      },
      "@tsparticles/qwik": { Particles: "Particles", initParticlesEngine: init },
      "@tsparticles/confetti": { createConfetti: () => api },
      "@tsparticles/particles": { createParticles: () => api },
      "@tsparticles/configs": { default: { example: {} } },
      "@tsparticles/slim": { loadSlim: vi.fn(async () => {}) },
      "../particlesEngine": { engine },
    };
    const exports: { default?: () => void } = {};
    const context = createContext({
      exports,
      require: (name: string) => {
        if (!(name in modules)) throw new Error(`Unexpected template import: ${name}`);
        return modules[name];
      },
      h: () => null,
      localStorage: { getItem: () => null },
      document: { documentElement: { setAttribute: vi.fn() } },
    });
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.React,
        jsxFactory: "h",
        jsxFragmentFactory: "h",
      },
    });

    new Script(outputText).runInContext(context);
    exports.default!();
    const pending = tasks.map(task => task());

    expect(signals[0].value).toBeUndefined();
    release();
    await Promise.all(pending);
    expect(init).toHaveBeenCalledWith(engine, expect.any(Function));
    expect(signals[0].value).toBe(engine);
  },
);

it.each(["registration", "load"])("reports rejected canvas demo %s operations", async stage => {
  const source = await readFile(new URL("../demo/vanilla/public/javascripts/canvas.js", root), "utf8");
  const failure = new Error("Demo initialization failed");
  const error = vi.fn();
  const load = vi.fn(async () => {
    if (stage === "load") throw failure;
  });
  const api = { init: vi.fn(async () => {}) };
  const context = createContext({
    tsParticles: {
      createEngine: () => ({ load }),
      createConfetti: () => api,
      createFireworks: () => api,
      createParticles: () => api,
    },
    document: { addEventListener: vi.fn(), getElementById: () => ({}) },
    performance: { now: () => 0 },
    loadAll: async () => {
      if (stage === "registration") throw failure;
    },
    console: { log: vi.fn(), error },
  });

  new Script(source).runInContext(context);
  await new Script("startDemo().catch(console.error)").runInContext(context);
  expect(error).toHaveBeenCalledExactlyOnceWith(failure);
  expect(load).toHaveBeenCalledTimes(stage === "load" ? 1 : 0);
});
