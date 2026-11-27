/* eslint-disable */
import { describe, expect, it } from "vitest";
import { circularDeps, circularDepsCommand } from "../src/circular-deps.js";
import { getCruiseResult } from "../src/utils.js";

describe("build-circular-deps", () => {
  it("should export circularDeps function", () => {
    expect(typeof circularDeps).toBe("function");
  });

  it("should export circularDepsCommand", () => {
    expect(circularDepsCommand).toBeDefined();
    expect(typeof circularDepsCommand.name).toBe("function");
  });

  it("should read the graph from the Dependency Cruiser API output", () => {
    const cruiseResult = { modules: [], summary: { violations: [] } };

    expect(getCruiseResult({ output: cruiseResult, exitCode: 0 })).toBe(cruiseResult);
  });
});
