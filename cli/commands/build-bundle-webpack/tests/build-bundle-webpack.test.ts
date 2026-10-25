/* eslint-disable */
import { describe, expect, it } from "vitest";
import { bundleWebpack, bundleWebpackCommand } from "../src/bundle-webpack.js";

describe("build-bundle-webpack", () => {
  it("should export bundleWebpack function", () => {
    expect(typeof bundleWebpack).toBe("function");
  });

  it("should export bundleWebpackCommand", () => {
    expect(bundleWebpackCommand).toBeDefined();
    expect(typeof bundleWebpackCommand.name).toBe("function");
  });
});
