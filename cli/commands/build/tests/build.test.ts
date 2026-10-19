/* eslint-disable */
import { describe, expect, it } from "vitest";
import { buildCommand } from "../src/build.js";

describe("build command", () => {
  it("should register the build command", () => {
    expect(buildCommand).toBeDefined();
    expect(buildCommand.name()).toBe("build");
  });

  it("should register the expected subcommands", () => {
    const names = buildCommand.commands.map(command => command.name());

    expect(names).toContain("bundle:webpack");
    expect(names).toContain("bundle:rollup");
    expect(names).toContain("bundle:rolldown");
    expect(names).toContain("circular-deps");
    expect(names).toContain("clear");
    expect(names).toContain("distfiles");
    expect(names).toContain("eslint");
    expect(names).toContain("prettier");
    expect(names).toContain("tsc");
  });
});
