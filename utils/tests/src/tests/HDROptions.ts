/* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-unused-expressions */
import { HDROptions, HdrMode, type IHDROptions, type RecursivePartial } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";

describe("HDR options", () => {
  it("check default values", () => {
    const hdr = new HDROptions();

    expect(hdr.enable).to.be.true;
    expect(hdr.mode).to.equal(HdrMode.standard);
    expect(hdr.peakNits).to.equal(400);
  });

  it("loading valid values", () => {
    const hdr = new HDROptions();

    hdr.load({
      enable: false,
      mode: "vivid",
      peakNits: 1000,
    });

    expect(hdr.enable).to.be.false;
    expect(hdr.mode).to.equal("vivid");
    expect(hdr.peakNits).to.equal(1000);
  });

  it("loading undefined values does not clear them", () => {
    const hdr = new HDROptions();

    hdr.load({ mode: "natural", peakNits: 600 });
    hdr.load({ mode: undefined, peakNits: undefined });

    expect(hdr.mode).to.equal("natural");
    expect(hdr.peakNits).to.equal(600);
  });

  it("rejects an invalid mode", () => {
    const hdr = new HDROptions(),
      data = { mode: "invalid-mode" } as unknown as RecursivePartial<IHDROptions>;

    expect(() => {
      hdr.load(data);
    }).to.throw(/Invalid HDR "mode" value/);
    expect(() => {
      hdr.load({ mode: 42 as unknown as IHDROptions["mode"] });
    }).to.throw(/Invalid HDR "mode" value/);
  });

  it("rejects a Symbol mode with a validation error instead of a TypeError", () => {
    const hdr = new HDROptions();

    expect(() => {
      hdr.load({ mode: Symbol("custom") as unknown as IHDROptions["mode"] });
    }).to.throw(Error, /Invalid HDR "mode" value/);
  });

  it("rejects peakNits at or below minPeakNits", () => {
    const hdr = new HDROptions();

    expect(() => {
      hdr.load({ peakNits: 0 });
    }).to.throw(/Invalid HDR "peakNits" value/);
    expect(() => {
      hdr.load({ peakNits: -100 });
    }).to.throw(/Invalid HDR "peakNits" value/);
  });

  it("rejects non-finite peakNits", () => {
    const hdr = new HDROptions();

    expect(() => {
      hdr.load({ peakNits: Number.NaN });
    }).to.throw(/Invalid HDR "peakNits" value/);
    expect(() => {
      hdr.load({ peakNits: Number.POSITIVE_INFINITY });
    }).to.throw(/Invalid HDR "peakNits" value/);
    expect(() => {
      hdr.load({ peakNits: Number.NEGATIVE_INFINITY });
    }).to.throw(/Invalid HDR "peakNits" value/);
  });

  it("rejects a non-number peakNits", () => {
    const hdr = new HDROptions();

    expect(() => {
      hdr.load({ peakNits: "500" as unknown as RecursivePartial<IHDROptions>["peakNits"] });
    }).to.throw(/Invalid HDR "peakNits" value/);
  });
});
