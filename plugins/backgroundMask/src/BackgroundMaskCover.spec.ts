/* eslint-disable @typescript-eslint/no-unused-expressions */

import { describe, expect, it } from "vitest";
import { BackgroundMaskCover } from "./Options/Classes/BackgroundMaskCover.js";

const defaultOpacity = 1,
  testOpacity = 0.5,
  testOpacity2 = 0.8;

describe("BackgroundMaskCover options", () => {
  it("default values", () => {
    const cover = new BackgroundMaskCover();

    expect(cover.color).to.be.undefined;
    expect(cover.draw).to.be.undefined;
    expect(cover.element).to.be.undefined;
    expect(cover.image).to.be.undefined;
    expect(cover.opacity).to.equal(defaultOpacity);
  });

  it("loads element as CSS selector string", () => {
    const cover = new BackgroundMaskCover();

    cover.load({ element: "#myCanvas" });

    expect(cover.element).to.equal("#myCanvas");
  });

  it("loads element as HTMLCanvasElement", () => {
    const cover = new BackgroundMaskCover(),
      canvas = document.createElement("canvas");

    cover.load({ element: canvas });

    expect(cover.element).to.equal(canvas);
  });

  it("loads draw callback", () => {
    const cover = new BackgroundMaskCover();
    let callCount = 0;
    const expectedCallCount = 1,
      testDeltaValue = 16.67;

    cover.load({
      draw: (_ctx: never, _delta: never) => {
        callCount++;
      },
    });

    expect(cover.draw).to.be.a("function");

    cover.draw?.({} as never, { value: testDeltaValue, factor: 1 });

    expect(callCount).to.equal(expectedCallCount);
  });

  it("loads legacy color option unchanged", () => {
    const cover = new BackgroundMaskCover();

    cover.load({ color: "#ff0000", opacity: testOpacity });

    expect(cover.color).not.to.be.undefined;
    expect(cover.color?.value).to.equal("#ff0000");
    expect(cover.opacity).to.equal(testOpacity);
  });

  it("loads legacy image option unchanged", () => {
    const cover = new BackgroundMaskCover();

    cover.load({ image: "https://example.com/bg.png" });

    expect(cover.image).to.equal("https://example.com/bg.png");
  });

  it("preserves existing values when loading undefined", () => {
    const cover = new BackgroundMaskCover();

    cover.load({
      element: "#bg",
      draw: (_ctx: never, _delta: never) => {
        /* noop */
      },
    });

    expect(cover.element).to.equal("#bg");
    expect(cover.draw).to.be.a("function");

    cover.load({ element: undefined, draw: undefined });

    expect(cover.element).to.equal("#bg");
  });

  it("handles null data gracefully", () => {
    const cover = new BackgroundMaskCover();

    cover.load(null as unknown as undefined);

    expect(cover.color).to.be.undefined;
    expect(cover.draw).to.be.undefined;
    expect(cover.element).to.be.undefined;
    expect(cover.image).to.be.undefined;
    expect(cover.opacity).to.equal(defaultOpacity);
  });

  it("loads all fields together", () => {
    const cover = new BackgroundMaskCover(),
      canvas = document.createElement("canvas");

    cover.load({
      color: "#00ff00",
      draw: () => {
        /* noop */
      },
      element: canvas,
      image: "bg.png",
      opacity: testOpacity2,
    });

    expect(cover.color?.value).to.equal("#00ff00");
    expect(cover.draw).to.be.a("function");
    expect(cover.element).to.equal(canvas);
    expect(cover.image).to.equal("bg.png");
    expect(cover.opacity).to.equal(testOpacity2);
  });

  it("element defaults to undefined after load with no element", () => {
    const cover = new BackgroundMaskCover();

    cover.load({ color: "#fff", opacity: defaultOpacity });

    expect(cover.element).to.be.undefined;
    expect(cover.draw).to.be.undefined;
  });
});
