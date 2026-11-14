/* eslint-disable */
import { vi } from "vitest";

const { containerMock, errorMock } = vi.hoisted(() => ({
  containerMock: {
    destroy: vi.fn(),
    loadTheme: vi.fn(async () => Promise.resolve()),
  },
  errorMock: vi.fn(),
}));

vi.mock("@tsparticles/engine", () => ({
  getLogger: () => ({ error: errorMock }),
  createEngine: () => ({
    init: vi.fn(async () => undefined),
    load: vi.fn(async () => containerMock),
  }),
}));

const { initParticlesEngine } = await import("../src/initParticlesEngine");

export const engine = (await import("@tsparticles/engine")).createEngine();
await initParticlesEngine(engine);
