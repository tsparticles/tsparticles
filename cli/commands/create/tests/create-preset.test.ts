/* eslint-disable */
import { describe, expect, it } from "vitest";
import { createCommand } from "../src/create.js";

describe("create-preset", () => {
  it("should expose the preset subcommand", () => {
    const preset = createCommand.commands.find(command => command.name() === "preset");

    expect(preset).toBeDefined();
    expect(preset?.description().length).toBeGreaterThan(0);
  });
});
