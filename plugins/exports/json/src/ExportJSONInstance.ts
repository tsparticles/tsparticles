import type { Container, Engine, ExportResult, IContainerPlugin } from "@tsparticles/engine";

const indent = 2;

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
            (key, value: unknown) => {
                if (key.startsWith("_")) {
                    return;
                }

                return value;
            },
            indent,
        );

        return Promise.resolve(new Blob([json], { type: "application/json" }));
    };
}
