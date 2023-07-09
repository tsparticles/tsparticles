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
            recorder = new MediaRecorder(stream, {
                mimeType: data.mimeType ?? "video/webm; codecs=vp9"
            });

        recorder.ondataavailable = (event): void => {
            data.callback(event.data);

            recorder.stop();
        };
    }
}
