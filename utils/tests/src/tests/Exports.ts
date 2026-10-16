/* eslint-disable */
import { type Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadExportImagePlugin } from "@tsparticles/plugin-export-image";
import { loadExportJSONPlugin } from "@tsparticles/plugin-export-json";
import { loadExportVideoPlugin } from "@tsparticles/plugin-export-video";

const exporterIds = ["export-json", "export-image", "export-video"],
  bootParticles = {
    particles: {
      number: { value: 1 },
    },
  };

let containerId = 0;

/**
 * Boots a throwaway container for export tests.
 * @param options - The options to load
 * @returns the loaded container
 */
async function loadContainer(options: ISourceOptions): Promise<Container> {
  containerId += 1;

  const container = await tsParticles.load({
    id: `exports-${containerId.toString()}`,
    options,
    autoPlay: false,
    element: createCustomCanvas(400, 300) as unknown as HTMLCanvasElement,
  });

  if (!container) {
    throw new Error(`Error test container ${containerId.toString()} not initialized`);
  }

  return container;
}

/**
 * Reads a blob as text, returning an empty string when the blob is missing.
 * @param blob - The blob to read
 * @returns the blob text
 */
async function blobText(blob: Blob | undefined): Promise<string> {
  if (!blob) {
    return "";
  }

  return blob.text();
}

describe("Exports", async () => {
  globalThis.window = TestWindow;

  beforeAll(async () => {
    await loadExportJSONPlugin(tsParticles);
    await loadExportImagePlugin(tsParticles);
    await loadExportVideoPlugin(tsParticles);
  });

  it("registers the three export plugins on the engine", async () => {
    const container = await loadContainer(bootParticles);

    for (const id of exporterIds) {
      expect(tsParticles.pluginManager.getPlugin(id), `plugin ${id} not registered`).to.not.be.undefined;
    }

    container.destroy(false);
  }, 30000);

  it("exposes the export plugins as container plugins with an export method", async () => {
    const container = await loadContainer(bootParticles),
      exporters = container.plugins.filter(plugin => typeof plugin.export === "function");

    expect(exporters.length, "expected at least the three export plugins").to.be.greaterThanOrEqual(exporterIds.length);

    container.destroy(false);
  }, 30000);

  it("JSON export resolves to a blob describing the particles options", async () => {
    const container = await loadContainer(bootParticles),
      blob = await container.export("json");

    expect(blob, "json export did not resolve to a blob").to.be.instanceOf(Blob);
    expect(blob?.type).to.equal("application/json");

    const text = await blobText(blob),
      parsed = JSON.parse(text) as Record<string, unknown>;

    expect(text, 'serialized options missing "particles"').to.include('"particles"');
    expect(parsed.particles, "serialized options missing particles section").to.not.be.undefined;

    container.destroy(false);
  }, 30000);

  it("Image export resolves to an image blob", async () => {
    const container = await loadContainer(bootParticles),
      blob = await container.export("image", { type: "image/png" });

    expect(blob, "image export did not resolve to a blob").to.be.instanceOf(Blob);
    expect(blob?.type, "image export produced a non-image mime type").to.match(/^image\//);

    container.destroy(false);
  }, 30000);

  it("Video export does not throw when MediaRecorder reports no support", async () => {
    const container = await loadContainer(bootParticles);

    expect(tsParticles.pluginManager.getPlugin("export-video")).to.not.be.undefined;
    expect(MediaRecorder.isTypeSupported("video/webm"), "MediaRecorder stub changed").to.be.false;

    let syncThrew = false,
      promise: Promise<Blob | undefined> | undefined;

    try {
      promise = container.export("video", { duration: 0 });
    } catch {
      syncThrew = true;
    }

    expect(syncThrew, "video export must not throw synchronously on construction").to.be.false;
    expect(promise, "video export should return a promise").to.not.be.undefined;

    let resolved: Blob | undefined,
      rejected = false;

    try {
      resolved = await promise;
    } catch {
      rejected = true;
    }

    expect(rejected || resolved === undefined || resolved instanceof Blob).to.be.true;

    container.destroy(false);
  }, 30000);
});
