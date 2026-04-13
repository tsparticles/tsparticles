import { isServer, renderToString } from "solid-js/web";
import { describe, expect, it } from "vitest";
import { Particles } from "../src";

describe("environment", () => {
    it("runs on server", () => {
        expect(typeof window).toBe("undefined");
        expect(isServer).toBe(true);
    });
});

describe("Particles", () => {
    it("renders a Particles-component", () => {
        const string = renderToString(() => <Particles />);
        expect(string).toBe('<div id="tsparticles"><canvas style=""></canvas></div>');
    });
});
