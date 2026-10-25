/* eslint-disable */
import { describe, expect, it } from "vitest";
import { pathCreateCommand } from "../src/path.js";

describe("create-path command", () => {
  it("should register the path command", () => {
    expect(pathCreateCommand).toBeDefined();
    expect(pathCreateCommand.name()).toBe("path");
  });

  it("should have a description", () => {
    expect(pathCreateCommand).toBeDefined();
    expect(pathCreateCommand.description().length).toBeGreaterThan(0);
  });
});
