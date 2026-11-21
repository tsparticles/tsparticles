import {
  type Container,
  type ExportResult,
  type IContainerPlugin,
  millisecondsToSeconds,
} from "@tsparticles/engine";
import type { IExportVideoData } from "./IExportVideoData.js";

const videoTypes = ["webm", "ogg", "mp4", "x-matroska"],
  codecs = [
    "vp9",
    "vp9.0",
    "vp8",
    "vp8.0",
    "avc1",
    "av1",
    "h265",
    "h.265",
    "h264",
    "h.264",
    "opus",
    "pcm",
    "aac",
    "mpeg",
    "mp4a",
  ];

/**
 * @returns the video supported mime types
 */
function getVideoSupportedMimeTypes(): string[] {
  if (
    typeof MediaRecorder === "undefined" ||
    typeof MediaRecorder.isTypeSupported !== "function"
  ) {
    return [];
  }

  const isSupported = (type: string): boolean =>
      MediaRecorder.isTypeSupported(type),
    supported: string[] = [];

  videoTypes.forEach((type) => {
    const mimeType = `video/${type}`;

    codecs.forEach((codec) => {
      [
        `${mimeType};codecs=${codec}`,
        `${mimeType};codecs=${codec.toUpperCase()}`,
        // /!\ false positive /!\
        // `${mimeType};codecs:${codec}`,
        // `${mimeType};codecs:${codec.toUpperCase()}`
      ].forEach((variation) => {
        if (isSupported(variation)) {
          supported.push(variation);
        }
      });
    });

    if (isSupported(mimeType)) {
      supported.push(mimeType);
    }
  });

  return supported;
}

/** Video export plugin instance */
export class ExportVideoPluginInstance implements IContainerPlugin {
  readonly #activeExports = new Set<() => void>();
  readonly #container: Container;
  readonly #supportedTypes: string[] = [];

  constructor(container: Container) {
    this.#container = container;

    this.#supportedTypes = getVideoSupportedMimeTypes();
  }

  destroy(): void {
    for (const cancel of this.#activeExports) {
      cancel();
    }
  }

  async export(
    type: string,
    data: Record<string, unknown>,
  ): Promise<ExportResult> {
    const res: ExportResult = {
      supported: false,
    };

    switch (type) {
      case "video":
        res.supported = true;
        res.blob = await this.#exportVideo(data);

        break;
    }

    return res;
  }

  async #exportVideo(data: IExportVideoData): Promise<Blob | undefined> {
    const element = this.#container.canvas.domElement;

    if (!element || typeof MediaRecorder === "undefined") {
      return;
    }

    const defaultDuration = 5,
      duration = data.duration ?? defaultDuration,
      mimeType = data.mimeType ?? this.#supportedTypes[0];

    if (!Number.isFinite(duration) || duration <= 0) {
      this.#container.engine
        .getLogger()
        .error(
          "Video export duration must be a finite positive number of seconds",
        );

      return;
    }

    if (!mimeType) {
      this.#container.engine
        .getLogger()
        .error("No supported video MIME type is available");

      return;
    }

    return new Promise<Blob | undefined>((resolve) => {
      const chunks: Blob[] = [];
      let stream: MediaStream | undefined,
        recorder: MediaRecorder | undefined,
        timeout: ReturnType<typeof setTimeout> | undefined,
        settled = false;

      const onDataAvailable = (event: BlobEvent): void => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        },
        onStop = (): void => {
          finish(new Blob(chunks, { type: mimeType }));
        },
        onError = (event: Event): void => {
          const error: unknown = (event as ErrorEvent).error ?? event;

          this.#container.engine
            .getLogger()
            .error("Video export failed", error);
          finish();
        },
        cleanup = (): void => {
          if (timeout !== undefined) {
            clearTimeout(timeout);
          }

          this.#activeExports.delete(cancel);
          recorder?.removeEventListener("dataavailable", onDataAvailable);
          recorder?.removeEventListener("stop", onStop);
          recorder?.removeEventListener("error", onError);

          if (recorder && recorder.state !== "inactive") {
            try {
              recorder.stop();
            } catch (error: unknown) {
              this.#container.engine
                .getLogger()
                .warning(`Error stopping video recorder: ${error as string}`);
            }
          }

          for (const track of stream?.getTracks() ?? []) {
            try {
              track.stop();
            } catch (error: unknown) {
              this.#container.engine
                .getLogger()
                .warning(
                  `Error stopping video stream track: ${error as string}`,
                );
            }
          }
        },
        finish = (blob?: Blob): void => {
          if (settled) {
            return;
          }

          settled = true;
          cleanup();
          resolve(blob);
        },
        cancel = (): void => {
          finish();
        };

      try {
        stream = element.captureStream(
          data.fps ?? this.#container.actualOptions.fpsLimit,
        );
        recorder = new MediaRecorder(stream, { mimeType });

        recorder.addEventListener("dataavailable", onDataAvailable);
        recorder.addEventListener("stop", onStop);
        recorder.addEventListener("error", onError);
        this.#activeExports.add(cancel);
        recorder.start();

        timeout = setTimeout((): void => {
          try {
            recorder?.stop();
          } catch (error: unknown) {
            this.#container.engine
              .getLogger()
              .error("Error stopping video recorder", error);
            finish();
          }
        }, duration * millisecondsToSeconds);
      } catch (error: unknown) {
        this.#container.engine
          .getLogger()
          .error("Error starting video export", error);
        finish();
      }
    });
  }
}
