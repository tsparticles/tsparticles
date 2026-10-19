/* eslint-disable */
import { describe, expect, it } from "vitest";
import { circularDeps, circularDepsCommand } from "../src/circular-deps.js";

describe("build-circular-deps", () => {
  it("should export circularDeps function", () => {
    expect(typeof circularDeps).toBe("function");
  });

  it("should export circularDepsCommand", () => {
    expect(circularDepsCommand).toBeDefined();
    expect(typeof circularDepsCommand.name).toBe("function");
  });
});
