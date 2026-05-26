import type { Container, ExportResult, IContainerPlugin } from "@tsparticles/engine";

const indent = 2;

/** JSON export plugin instance */
export class ExportJSONPluginInstance implements IContainerPlugin {
  readonly #container: Container;

  constructor(container: Container) {
    this.#container = container;
  }

  async export(type: string): Promise<ExportResult> {
    const res: ExportResult = {
      supported: false,
    };

    switch (type) {
      case "json":
        res.supported = true;
        res.blob = await this.#exportJSON();

        break;
    }

    return res;
  }

  readonly #exportJSON = async (): Promise<Blob | undefined> => {
    const json = JSON.stringify(
      this.#container.actualOptions,
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
