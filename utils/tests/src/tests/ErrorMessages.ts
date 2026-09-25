import { ErrorCodes, addErrorMessages, getErrorMessage } from "@tsparticles/engine";
import { afterEach, describe, expect, it, vi } from "vitest";

const linkPrefix = "https://particles.js.org/errors/#",
  prodLink = (code: string): string => `[tsParticles Error ${code}] ${linkPrefix}${code}`;

describe("ErrorCodes", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("has unique codes", () => {
    const codes = Object.values(ErrorCodes),
      unique = new Set<string>(codes);

    expect(unique.size).to.equal(codes.length);
  });

  it("registers a message template for every engine code", () => {
    for (const code of Object.values(ErrorCodes)) {
      expect(getErrorMessage(code), code).not.to.equal(`Unknown error code ${code}`);
    }
  });

  it("formats positional placeholders", () => {
    const engineVersion = "4.4.0",
      pluginVersion = "4.3.0",
      expected = `The tsParticles version is different from the loaded plugins version. Engine version: ${engineVersion}. Plugin version: ${pluginVersion}`;

    expect(getErrorMessage(ErrorCodes.engineVersionMismatch, engineVersion, pluginVersion)).to.equal(expected);
  });

  it("formats the HDR mode message with two arguments", () => {
    const modes = "standard, vivid, natural";

    expect(getErrorMessage(ErrorCodes.hdrModeInvalid, modes, "warm")).to.equal(
      `Invalid HDR "mode" value: expected one of ${modes}, got "warm"`,
    );
  });

  it("keeps a placeholder intact when its argument is missing", () => {
    expect(getErrorMessage(ErrorCodes.hdrEnableInvalid)).to.equal(
      'Invalid HDR "enable" value: expected a boolean, got "{0}"',
    );
  });

  it("falls back to an unknown-code message for missing templates", () => {
    expect(getErrorMessage("TSP-9999")).to.equal("Unknown error code TSP-9999");
  });

  it("registers additional messages added by plugins", () => {
    const customCode = "TSP-9001",
      customMessage = "Custom {0} message";

    addErrorMessages({ [customCode]: customMessage });

    expect(getErrorMessage(customCode, "plugin")).to.equal("Custom plugin message");
  });

  it("overrides an existing message when re-registered", () => {
    const customCode = "TSP-9002";

    addErrorMessages({ [customCode]: "first" });
    addErrorMessages({ [customCode]: "second" });

    expect(getErrorMessage(customCode)).to.equal("second");
  });

  it("ignores undefined message values", () => {
    const customCode = "TSP-9003";

    addErrorMessages({ [customCode]: undefined });

    expect(getErrorMessage(customCode)).to.equal(`Unknown error code ${customCode}`);
  });

  it("returns a compact code and link in production builds", () => {
    const code = ErrorCodes.particlePositionNotFound;

    vi.stubEnv("NODE_ENV", "production");

    expect(getErrorMessage(code, "ignored argument")).to.equal(prodLink(code));
  });
});
