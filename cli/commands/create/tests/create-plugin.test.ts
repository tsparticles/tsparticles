/* eslint-disable */
import { describe, expect, it } from "vitest";
import { createCommand } from "../src/create.js";

describe("create-plugin", () => {
  it("should expose the plugin subcommand", () => {
    const plugin = createCommand.commands.find(command => command.name() === "plugin");

    expect(plugin).toBeDefined();
    expect(plugin?.description().length).toBeGreaterThan(0);
  });
});
