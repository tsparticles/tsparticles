import type { Container, Engine, ExportResult, IContainerPlugin } from "tsparticles-engine";
import type { IExportVideoData } from "./IExportVideoData";

export class ExportVideoInstance implements IContainerPlugin {
    private readonly _container: Container;
    private readonly _engine: Engine;

    constructor(container: Container, engine: Engine) {
        this._container = container;
        this._engine = engine;
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

    private readonly _exportVideo: (data: IExportVideoData) => Promise<Blob | undefined> = async (data) => {
        const element = this._container.canvas.element;

        if (!element) {
            return;
        }

        return new Promise<Blob | undefined>((resolve) => {
            const stream = element.captureStream(data.fps ?? this._container.actualOptions.fpsLimit),
                mimeType = data.mimeType ?? "video/webm; codecs=vp9",
                recorder = new MediaRecorder(stream, {
                    mimeType,
                }),
                chunks: Blob[] = [];

            let record = true;

            recorder.addEventListener("dataavailable", (event): void => {
                chunks.push(event.data);

                if (!record) {
                    recorder.stop();

                    resolve(new Blob(chunks, { type: mimeType }));
                }
            });

            setTimeout(() => {
                record = false;
            }, data.duration ?? 1000);
        });
    };
}
