import type { Container, Engine, IContainerPlugin, IExportPluginData } from "tsparticles-engine";

export class ExportJSONInstance implements IContainerPlugin {
    private readonly _container: Container;
    private readonly _engine: Engine;

    constructor(container: Container, engine: Engine) {
        this._container = container;
        this._engine = engine;
    }

    async export(type: string, data: IExportPluginData): Promise<boolean> {
        switch (type) {
            case "json":
                data.callback(
                    JSON.stringify(
                        this._container.actualOptions,
                        (key, value) => {
                            if (key.startsWith("_")) {
                                return;
                            }

                            return value;
                        },
                        2,
                    ),
                );

                return true;
        }

        return false;
    }
}
