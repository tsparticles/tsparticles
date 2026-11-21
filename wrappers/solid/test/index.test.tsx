import { describe, expect, it } from "vitest";
import { Particles } from "../src";
import { createRoot } from "solid-js";
import { engine } from "./setup";
import { isServer } from "solid-js/web";

describe("environment", () => {
  it("runs on client", () => {
    expect(typeof window).toBe("object");
    expect(isServer).toBe(false);
  });
});

describe("Particles", () => {
  it("renders a Particles-component", () => {
    createRoot(() => {
      const container = (<Particles engine={engine} />) as HTMLDivElement;
      expect(container.outerHTML).toBe('<div id="tsparticles"><canvas></canvas></div>');
    });
  });
});
