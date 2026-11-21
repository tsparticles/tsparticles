/* eslint-disable */
import { type Container, type ISourceOptions, createEngine } from "@tsparticles/engine";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadExportImagePlugin } from "@tsparticles/plugin-export-image";
import { loadExportJSONPlugin } from "@tsparticles/plugin-export-json";
import { loadExportVideoPlugin } from "@tsparticles/plugin-export-video";
import { ExportVideoPluginInstance } from "../../../../plugins/exports/video/src/ExportVideoPluginInstance.js";

const tsParticles = createEngine();

const exporterIds = ["export-json", "export-image", "export-video"],
  bootParticles = {
    particles: {
      number: { value: 1 },
    },
  };

let containerId = 0;

class TestMediaRecorder extends EventTarget {
  static instances: TestMediaRecorder[] = [];

  static isTypeSupported(type: string): boolean {
    return type === "video/webm";
  }

  readonly stop = vi.fn((): void => {
    this.state = "inactive";

    const dataEvent = new Event("dataavailable");

    Object.defineProperty(dataEvent, "data", { value: new Blob(["encoded-video"]) });
    this.dispatchEvent(dataEvent);
    this.dispatchEvent(new Event("stop"));
  });
  state: RecordingState = "inactive";

  constructor(_stream: MediaStream, _options: MediaRecorderOptions) {
    super();
    TestMediaRecorder.instances.push(this);
  }

  start(): void {
    this.state = "recording";
  }

  fail(error: Error): void {
    const event = new Event("error");

    Object.defineProperty(event, "error", { value: error });
    this.dispatchEvent(event);
  }
}

function installCaptureStream(container: Container) {
  const element = container.canvas.domElement as HTMLCanvasElement,
    track = { stop: vi.fn() } as unknown as MediaStreamTrack,
    stream = { getTracks: () => [track] } as unknown as MediaStream,
    captureStream = vi.fn(() => stream),
    descriptor = Object.getOwnPropertyDescriptor(element, "captureStream");

  Object.defineProperty(element, "captureStream", { configurable: true, value: captureStream });

  return {
    captureStream,
    restore: (): void => {
      if (descriptor) {
        Object.defineProperty(element, "captureStream", descriptor);
      } else {
        Reflect.deleteProperty(element, "captureStream");
      }
    },
    track,
  };
}

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

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    TestMediaRecorder.instances = [];
  });

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

  it("returns no video when MediaRecorder is unavailable", async () => {
    vi.stubGlobal("MediaRecorder", undefined);

    const container = await loadContainer(bootParticles);

    try {
      const video = new ExportVideoPluginInstance(container),
        result = await video.export("video", { duration: 0.01 });

      expect(result.supported).toBe(true);
      expect(result.blob).toBeUndefined();
    } finally {
      container.destroy(false);
    }
  });

  it("uses duration seconds and releases the recorder stream after export", async () => {
    vi.stubGlobal("MediaRecorder", TestMediaRecorder);
    const container = await loadContainer(bootParticles),
      capture = installCaptureStream(container),
      video = new ExportVideoPluginInstance(container);

    vi.useFakeTimers();

    try {
      const promise = video.export("video", { duration: 0.01 }),
        recorder = TestMediaRecorder.instances[0];

      expect(recorder).toBeDefined();

      await vi.advanceTimersByTimeAsync(9);
      expect(recorder?.stop).not.toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(1);
      const result = await promise,
        blob = result.blob;

      expect(result.supported).toBe(true);
      expect(blob).toBeInstanceOf(Blob);
      expect(await blob?.text()).toBe("encoded-video");
      expect(recorder?.stop).toHaveBeenCalledOnce();
      expect(capture.track.stop).toHaveBeenCalledOnce();
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      capture.restore();
      container.destroy(false);
    }
  });

  it("settles a failed or destroyed video export and releases its resources", async () => {
    vi.stubGlobal("MediaRecorder", TestMediaRecorder);
    const container = await loadContainer(bootParticles),
      capture = installCaptureStream(container),
      video = new ExportVideoPluginInstance(container),
      failure = new Error("recorder failed");

    try {
      const failedExport = video.export("video", { duration: 30 }),
        failedRecorder = TestMediaRecorder.instances[0];

      failedRecorder?.fail(failure);

      const failedResult = await failedExport;

      expect(failedResult.blob).toBeUndefined();
      expect(failedRecorder?.stop).toHaveBeenCalledOnce();
      expect(capture.track.stop).toHaveBeenCalledOnce();

      capture.track.stop.mockClear();

      const pendingExport = video.export("video", { duration: 30 }),
        secondPendingExport = video.export("video", { duration: 30 }),
        pendingRecorder = TestMediaRecorder.instances[1],
        secondPendingRecorder = TestMediaRecorder.instances[2];

      video.destroy();

      const [pendingResult, secondPendingResult] = await Promise.all([pendingExport, secondPendingExport]);

      expect(pendingResult.blob).toBeUndefined();
      expect(secondPendingResult.blob).toBeUndefined();
      expect(pendingRecorder?.stop).toHaveBeenCalledOnce();
      expect(secondPendingRecorder?.stop).toHaveBeenCalledOnce();
      expect(capture.track.stop).toHaveBeenCalledTimes(2);
    } finally {
      video.destroy();
      capture.restore();
      container.destroy(false);
    }
  });
});
