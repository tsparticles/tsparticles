import { Attract } from "./Attract";
import { Bounce } from "./Bounce";
import { Bubble } from "./Bubble";
import type { Container } from "../../../../Core/Container";
import type { Engine } from "../../../../engine";
import type { IExternalInteractor } from "../../../../Core/Interfaces/IExternalInteractor";
import type { IModes } from "../../../Interfaces/Interactivity/Modes/IModes";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { Slow } from "./Slow";

/**
 * [[include:Options/Interactivity/Modes.md]]
 * @category Options
 */
export class Modes implements IModes, IOptionLoader<IModes> {
    [name: string]: unknown;

    attract;
    bounce;
    bubble;

    readonly #container;
    readonly #engine;

    slow;

    constructor(engine: Engine, container?: Container) {
        this.#engine = engine;
        this.#container = container;

        this.attract = new Attract();
        this.bounce = new Bounce();
        this.bubble = new Bubble();
        this.slow = new Slow();
    }

    load(data?: RecursivePartial<IModes>): void {
        if (!data) {
            return;
        }

        this.attract.load(data.attract);
        this.bubble.load(data.bubble);
        this.slow.load(data.slow);

        if (this.#container) {
            const interactors = this.#engine.plugins.interactors.get(this.#container);

            if (interactors) {
                for (const interactor of interactors as IExternalInteractor[]) {
                    if (interactor.loadModeOptions) {
                        interactor.loadModeOptions(this, data);
                    }
                }
            }
        }
    }
}
