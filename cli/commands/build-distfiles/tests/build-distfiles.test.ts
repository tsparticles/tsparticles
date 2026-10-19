/* eslint-disable */
import { describe, expect, it } from "vitest";
import { buildDistFiles, distFilesCommand } from "../src/distfiles.js";

describe("build-distfiles", () => {
  it("should export buildDistFiles function", () => {
    expect(typeof buildDistFiles).toBe("function");
  });

  it("should export distFilesCommand", () => {
    expect(distFilesCommand).toBeDefined();
    expect(typeof distFilesCommand.name).toBe("function");
  });
});
