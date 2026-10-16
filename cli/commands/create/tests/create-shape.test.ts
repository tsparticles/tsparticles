/* eslint-disable */
import { describe, expect, it } from "vitest";
import { createCommand } from "../src/create.js";

describe("create command tree", () => {
  it("should register the create command", () => {
    expect(createCommand).toBeDefined();
    expect(createCommand.name()).toBe("create");
  });

  it("should expose every project creation subcommand", () => {
    const names = createCommand.commands.map(command => command.name()),
      expected = [
        "app",
        "bundle",
        "effect",
        "interaction",
        "palette",
        "path",
        "plugin",
        "preset",
        "shape",
        "updater",
      ];

    for (const name of expected) {
      expect(names).toContain(name);
    }
  });

  it("should expose the shape subcommand", () => {
    const shape = createCommand.commands.find(command => command.name() === "shape");

    expect(shape).toBeDefined();
    expect(shape?.description().length).toBeGreaterThan(0);
  });
});
