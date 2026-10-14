/* eslint-disable */
import { vi } from "vitest";

const { containerMock } = vi.hoisted(() => ({
  containerMock: {
    destroy: vi.fn(),
  },
}));

vi.mock("@tsparticles/engine", () => ({
  tsParticles: {
    load: vi.fn(async () => containerMock),
  },
}));

const { initParticlesEngine } = await import("../src/initParticlesEngine");

await initParticlesEngine();
