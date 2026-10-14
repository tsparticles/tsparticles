/* eslint-disable */
import { describe, expect, it } from "vitest";
import { updaterCreateCommand } from "../src/updater.js";

describe("create-updater command", () => {
  it("should register the updater command", () => {
    expect(updaterCreateCommand).toBeDefined();
    expect(updaterCreateCommand.name()).toBe("updater");
  });

  it("should have a description", () => {
    expect(updaterCreateCommand).toBeDefined();
    expect(updaterCreateCommand.description().length).toBeGreaterThan(0);
  });
});
