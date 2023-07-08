import type { Container, Engine, IContainerPlugin } from "tsparticles-engine";

export class ExportJSONInstance implements IContainerPlugin {
    private readonly _container: Container;
    private readonly _engine: Engine;

    constructor(container: Container, engine: Engine) {
        this._container = container;
        this._engine = engine;
    }

    async export(type: string, callback: Function): Promise<boolean> {
        switch (type) {
            case "json":
                callback();

                return true;
        }

        return false;
    }
}
