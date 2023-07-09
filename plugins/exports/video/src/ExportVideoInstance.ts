import type { Container, Engine, IContainerPlugin, IExportPluginData } from "tsparticles-engine";
import type { IExportVideoData } from "./IExportVideoData";

export class ExportVideoInstance implements IContainerPlugin {
    private readonly _container: Container;
    private readonly _engine: Engine;

    constructor(container: Container, engine: Engine) {
        this._container = container;
        this._engine = engine;
    }

    async export(type: string, data: IExportPluginData): Promise<boolean> {
        switch (type) {
            case "video":
                this._exportVideo(data);

                return true;
        }

        return false;
    }

    private _exportVideo(data: IExportVideoData): void {
        const element = this._container.canvas.element;

        if (!element) {
            return;
        }

        const stream = element.captureStream(data.fps ?? this._container.actualOptions.fpsLimit),
            mimeType = data.mimeType ?? "video/webm; codecs=vp9",
            recorder = new MediaRecorder(stream, {
                mimeType,
            }),
            chunks: Blob[] = [];

        recorder.addEventListener("dataavailable", (event): void => {
            chunks.push(event.data);
        });

        setTimeout(() => {
            recorder.stop();

            data.callback(new Blob(chunks, { type: mimeType }));
        }, data.duration ?? 1000);
    }
}
