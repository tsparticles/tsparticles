/* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-unused-expressions */
import { Background, type IDelta, type RecursivePartial } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";

describe("Background options", () => {
  it("check default values", () => {
    const bg = new Background();

    expect(bg.draw).to.be.undefined;
    expect(bg.element).to.be.undefined;
    expect(bg.color.value).to.equal("");
    expect(bg.image).to.equal("");
    expect(bg.opacity).to.equal(1);
    expect(bg.position).to.equal("");
    expect(bg.repeat).to.equal("");
    expect(bg.size).to.equal("");
  });

  it("loading draw callback", () => {
    const bg = new Background();
    let callCount = 0;

    bg.load({
      draw: (_ctx: unknown, _delta: IDelta) => {
        callCount++;
      },
    });

    expect(bg.draw).to.be.a("function");
    expect(callCount).to.equal(0);

    // invoke it
    if (bg.draw) {
      bg.draw({} as never, { value: 16.67, factor: 1 });
    }

    expect(callCount).to.equal(1);
  });

  it("loading element string selector", () => {
    const bg = new Background();

    bg.load({
      element: "#bg-canvas",
    });

    expect(bg.element).to.equal("#bg-canvas");
  });

  it("loading element HTMLCanvasElement", () => {
    const bg = new Background(),
      canvas = document.createElement("canvas");

    bg.load({
      element: canvas,
    });

    expect(bg.element).to.equal(canvas);
  });

  it("loading element OffscreenCanvas", () => {
    if (typeof OffscreenCanvas === "undefined") {
      return;
    }

    const bg = new Background(),
      canvas = new OffscreenCanvas(100, 100);

    bg.load({
      element: canvas,
    });

    expect(bg.element).to.equal(canvas);
  });

  it("loading draw with undefined does not clear it", () => {
    const bg = new Background();

    bg.load({ draw: () => undefined });
    expect(bg.draw).to.be.a("function");

    bg.load({ draw: undefined as unknown as RecursivePartial<{ draw?: never }> });
    expect(bg.draw).to.be.a("function");
  });

  it("loading element with undefined does not clear it", () => {
    const bg = new Background();

    bg.load({ element: "#bg" });
    expect(bg.element).to.equal("#bg");

    bg.load({ element: undefined as unknown as RecursivePartial<{ element?: never }> });
    expect(bg.element).to.equal("#bg");
  });

  it("loading legacy fields still works", () => {
    const bg = new Background();

    bg.load({
      color: "#ff0000",
      image: "url('test.png')",
      opacity: 0.5,
      position: "center",
      repeat: "repeat-x",
      size: "50%",
    });

    expect(bg.color.value).to.equal("#ff0000");
    expect(bg.image).to.equal("url('test.png')");
    expect(bg.opacity).to.equal(0.5);
    expect(bg.position).to.equal("center");
    expect(bg.repeat).to.equal("repeat-x");
    expect(bg.size).to.equal("50%");
  });

  it("loading mixed legacy and new fields", () => {
    const bg = new Background(),
      canvas = document.createElement("canvas");
    let called = false;

    bg.load({
      color: "#0f0",
      opacity: 0.8,
      element: canvas,
      draw: () => {
        called = true;
      },
    });

    expect(bg.color.value).to.equal("#0f0");
    expect(bg.opacity).to.equal(0.8);
    expect(bg.element).to.equal(canvas);
    expect(bg.draw).to.be.a("function");

    bg.draw?.({} as never, { value: 16.67, factor: 1 });
    expect(called).to.be.true;
  });

  // --- V2 layered redesign tests ---

  it("loading element HTMLVideoElement", () => {
    const bg = new Background();

    if (typeof HTMLVideoElement === "undefined") {
      return;
    }

    const video = document.createElement("video");

    bg.load({ element: video });
    expect(bg.element).to.equal(video);
  });

  it("loading element HTMLImageElement", () => {
    const bg = new Background();

    if (typeof HTMLImageElement === "undefined") {
      return;
    }

    const img = document.createElement("img");

    bg.load({ element: img });
    expect(bg.element).to.equal(img);
  });

  it("element and draw are independent layers", () => {
    const bg = new Background(),
      canvas = document.createElement("canvas");
    let drawCalled = false;

    bg.load({
      element: canvas,
      draw: () => {
        drawCalled = true;
      },
    });

    expect(bg.element).to.equal(canvas);
    expect(bg.draw).to.be.a("function");

    // element does NOT affect draw — draw still works independently
    bg.draw?.({} as never, { value: 16.67, factor: 1 });
    expect(drawCalled).to.be.true;
  });

  it("element can be unset independently of draw", () => {
    const bg = new Background();
    let callCount = 0;

    bg.load({
      element: "#bg-canvas",
      draw: () => {
        callCount++;
      },
    });

    expect(bg.element).to.equal("#bg-canvas");
    expect(bg.draw).to.be.a("function");

    // clear only element
    bg.load({ element: undefined as unknown as RecursivePartial<{ element?: never }> });
    expect(bg.element).to.equal("#bg-canvas");
    // draw still works
    bg.draw?.({} as never, { value: 16.67, factor: 1 });
    expect(callCount).to.equal(1);
  });
});
