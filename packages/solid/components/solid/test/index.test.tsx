import { createRoot } from "solid-js";
import { isServer } from "solid-js/web";
import { describe, expect, it } from "vitest";
import { Particles } from "../src";

describe("environment", () => {
    it("runs on client", () => {
        expect(typeof window).toBe("object");
        expect(isServer).toBe(false);
    });
});

describe("Particles", () => {
    it("renders a Particles-component", () => {
        createRoot(() => {
            const container = (<Particles />) as HTMLDivElement;
            expect(container.outerHTML).toBe('<div id="tsparticles"><canvas></canvas></div>');
        });
    });
});
