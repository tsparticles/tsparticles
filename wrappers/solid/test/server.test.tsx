import { describe, expect, it } from "vitest";
const engine = createEngine();
import { isServer, renderToString } from "solid-js/web";
import { Particles } from "../src";
import { createEngine } from "@tsparticles/engine";

describe("environment", () => {
  it("runs on server", () => {
    expect(typeof window).toBe("undefined");
    expect(isServer).toBe(true);
  });
});

describe("Particles", () => {
  it("renders a Particles-component", () => {
    const string = renderToString(() => <Particles engine={engine} />);
    expect(string).toBe('<div id="tsparticles"><canvas style=""></canvas></div>');
  });
});
