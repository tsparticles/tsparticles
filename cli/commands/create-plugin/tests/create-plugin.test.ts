/* eslint-disable */
import { describe, expect, it } from "vitest";
import { pluginCreateCommand } from "../src/plugin.js";

describe("create-plugin command", () => {
  it("should register the plugin command", () => {
    expect(pluginCreateCommand).toBeDefined();
    expect(pluginCreateCommand.name()).toBe("plugin");
  });

  it("should have a description", () => {
    expect(pluginCreateCommand).toBeDefined();
    expect(pluginCreateCommand.description().length).toBeGreaterThan(0);
  });
});
