import {
    type Container,
    type Engine,
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
    const isSupported = (type: string): boolean => MediaRecorder.isTypeSupported(type),
        supported: string[] = [];

    videoTypes.forEach(type => {
        const mimeType = `video/${type}`;

        codecs.forEach(codec =>
            [
                `${mimeType};codecs=${codec}`,
                `${mimeType};codecs=${codec.toUpperCase()}`,
                // /!\ false positive /!\
                // `${mimeType};codecs:${codec}`,
                // `${mimeType};codecs:${codec.toUpperCase()}`
            ].forEach(variation => {
                if (isSupported(variation)) {
                    supported.push(variation);
                }
            }),
        );

        if (isSupported(mimeType)) {
            supported.push(mimeType);
        }
    });

    return supported;
}

export class ExportVideoInstance implements IContainerPlugin {
    private readonly _container: Container;
    private readonly _engine: Engine;
    private readonly _supportedTypes: string[] = [];

    constructor(container: Container, engine: Engine) {
        this._container = container;
        this._engine = engine;

        this._supportedTypes = getVideoSupportedMimeTypes();
    }

    async export(type: string, data: Record<string, unknown>): Promise<ExportResult> {
        const res: ExportResult = {
            supported: false,
        };

        switch (type) {
            case "video":
                res.supported = true;
                res.blob = await this._exportVideo(data as IExportVideoData);

                break;
        }

        return res;
    }

    private readonly _exportVideo: (data: IExportVideoData) => Promise<Blob | undefined> = async data => {
        const element = this._container.canvas.element;

        if (!element) {
            return;
        }

        return new Promise<Blob | undefined>(resolve => {
            const stream = element.captureStream(data.fps ?? this._container.actualOptions.fpsLimit),
                firstIndex = 0,
                mimeType = data.mimeType ?? this._supportedTypes[firstIndex],
                recorder = new MediaRecorder(stream, {
                    mimeType,
                }),
                chunks: Blob[] = [],
                defaultDuration = 5;

            recorder.addEventListener("dataavailable", (event): void => {
                chunks.push(event.data);
            });

            recorder.addEventListener("stop", (): void => {
                resolve(new Blob(chunks, { type: mimeType }));
            });

            recorder.start();

            setTimeout(
                () => {
                    recorder.stop();
                },
                data.duration ?? defaultDuration * millisecondsToSeconds,
            );
        });
    };
}
