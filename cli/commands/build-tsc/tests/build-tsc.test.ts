/* eslint-disable */
import { describe, expect, it } from "vitest";
import { buildTS, tscCommand } from "../src/tsc.js";

describe("build-tsc", () => {
  it("should export buildTS function", () => {
    expect(typeof buildTS).toBe("function");
  });

  it("should export tscCommand", () => {
    expect(tscCommand).toBeDefined();
    expect(typeof tscCommand.name).toBe("function");
  });
});
