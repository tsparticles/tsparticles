import type { Container, Engine, ExportResult, IContainerPlugin } from "tsparticles-engine";

export class ExportJSONInstance implements IContainerPlugin {
    private readonly _container: Container;
    private readonly _engine: Engine;

    constructor(container: Container, engine: Engine) {
        this._container = container;
        this._engine = engine;
    }

    async export(type: string): Promise<ExportResult> {
        const res: ExportResult = {
            supported: false,
        };

        switch (type) {
            case "json":
                res.supported = true;
                res.blob = await this._exportJSON();

                break;
        }

        return res;
    }

    private readonly _exportJSON = async (): Promise<Blob | undefined> => {
        const json = JSON.stringify(
            this._container.actualOptions,
            (key, value) => {
                if (key.startsWith("_")) {
                    return;
                }

                return value;
            },
            2,
        );

        return new Blob([json], { type: "application/json" });
    };
}
