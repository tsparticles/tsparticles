/* eslint-disable */
import { type ReactNode, act } from "react";

import { type Root, createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const providerSpy = vi.fn();
const engine = {} as import("@tsparticles/engine").Engine;

vi.mock("next/dynamic", () => ({
  default: () => {
    const DynamicStub = (props: Record<string, unknown>): ReactNode => (
      <div data-testid="dynamic-particles" data-props={JSON.stringify(props)} />
    );

    return DynamicStub;
  },
}));

vi.mock("@tsparticles/react", () => ({
  ParticlesProvider: ({
    children,
    engine,
    init,
  }: {
    children?: ReactNode;
    engine: unknown;
    init?: () => Promise<void>;
  }): ReactNode => {
    providerSpy(engine, init);

    return <div data-testid="particles-provider">{children}</div>;
  },
}));

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  providerSpy.mockClear();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  container.remove();
});

describe("nextjs wrapper", () => {
  it("exports a dynamic particles component with ssr disabled", async () => {
    const module = await import("../lib/index.js"),
      element = <module.NextParticles id="next-test" />;

    act(() => {
      root.render(element);
    });

    expect(container.querySelector('[data-testid="dynamic-particles"]')).not.toBeNull();
  });

  it("passes the init registrar to the particles provider", async () => {
    const module = await import("../lib/index.js"),
      init = vi.fn(async () => Promise.resolve());

    act(() => {
      root.render(
        <module.NextParticlesProvider engine={engine} init={init}>
          <span>child</span>
        </module.NextParticlesProvider>,
      );
    });

    expect(providerSpy).toHaveBeenCalledWith(engine, init);
    expect(container.querySelector('[data-testid="particles-provider"]')).not.toBeNull();
    expect(container.textContent).toContain("child");
  });
});
