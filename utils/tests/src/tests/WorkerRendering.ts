import { afterEach, expect, it, vi } from "vitest";
import { InteractionManager } from "../../../../plugins/interactivity/src/InteractionManager.js";
import type { InteractivityContainer } from "../../../../plugins/interactivity/src/types.js";

afterEach(() => {
  vi.unstubAllGlobals();
});

it("starts and stops interactivity for an OffscreenCanvas without DOM globals", () => {
  const container = {
      actualOptions: { interactivity: { detectsOn: "window" } },
      canvas: { setPointerEvents: vi.fn() },
    } as unknown as InteractivityContainer,
    manager = new InteractionManager({} as ConstructorParameters<typeof InteractionManager>[0], container);

  vi.stubGlobal("document", undefined);
  vi.stubGlobal("HTMLElement", undefined);
  expect(() => {
    manager.addListeners();
    manager.startObserving();
    manager.removeListeners();
    manager.stopObserving();
  }).not.toThrow();
  expect(manager.interactivityData.element).toBeUndefined();
});
