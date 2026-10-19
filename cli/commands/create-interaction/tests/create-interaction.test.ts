/* eslint-disable */
import { describe, expect, it } from "vitest";
import { interactionCreateCommand } from "../src/interaction.js";

describe("create-interaction command", () => {
  it("should register the interaction command", () => {
    expect(interactionCreateCommand).toBeDefined();
    expect(interactionCreateCommand.name()).toBe("interaction");
  });

  it("should have a description", () => {
    expect(interactionCreateCommand).toBeDefined();
    expect(interactionCreateCommand.description().length).toBeGreaterThan(0);
  });
});
