import { deepExtend, executeOnSingleOrMultiple } from "../../../Utils/Utils.js";
import { AnimatableColor } from "../AnimatableColor.js";
import { Collisions } from "./Collisions/Collisions.js";
import type { Container } from "../../../Core/Container.js";
import { Effect } from "./Effect/Effect.js";
import type { Engine } from "../../../Core/Engine.js";
import type { IInteractivity } from "../../Interfaces/Interactivity/IInteractivity.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { IParticlesOptions } from "../../Interfaces/Particles/IParticlesOptions.js";
import { Move } from "./Move/Move.js";
import { Opacity } from "./Opacity/Opacity.js";
import { ParticlesBounce } from "./Bounce/ParticlesBounce.js";
import type { ParticlesGroups } from "../../../Types/ParticlesGroups.js";
import { ParticlesNumber } from "./Number/ParticlesNumber.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { Shadow } from "./Shadow.js";
import { Shape } from "./Shape/Shape.js";
import type { SingleOrMultiple } from "../../../Types/SingleOrMultiple.js";
import { Size } from "./Size/Size.js";
import { Stroke } from "./Stroke.js";
import { ZIndex } from "./ZIndex/ZIndex.js";

/**
 * [[include:Options/Particles.md]]
 */
export class ParticlesOptions implements IParticlesOptions, IOptionLoader<IParticlesOptions> {
    [name: string]: unknown;

    readonly bounce;
    readonly collisions;
    color;
    readonly effect;
    readonly groups: ParticlesGroups;
    interactivity?: RecursivePartial<IInteractivity>;
    readonly move;
    readonly number;
    readonly opacity;
    reduceDuplicates;
    readonly shadow;
    readonly shape;
    readonly size;
    stroke: SingleOrMultiple<Stroke>;
    readonly zIndex;

    private readonly _container;
    private readonly _engine;

    constructor(engine: Engine, container?: Container) {
        this._engine = engine;
        this._container = container;

        this.bounce = new ParticlesBounce();
        this.collisions = new Collisions();
        this.color = new AnimatableColor();
        this.color.value = "#fff";
        this.effect = new Effect();
        this.groups = {};
        this.move = new Move();
        this.number = new ParticlesNumber();
        this.opacity = new Opacity();
        this.reduceDuplicates = false;
        this.shadow = new Shadow();
        this.shape = new Shape();
        this.size = new Size();
        this.stroke = new Stroke();
        this.zIndex = new ZIndex();
    }

    load(data?: RecursivePartial<IParticlesOptions>): void {
        if (!data) {
            return;
        }

        if (data.groups !== undefined) {
            for (const group of Object.keys(data.groups)) {
                if (!Object.hasOwn(data.groups, group)) {
                    continue;
                }

                const item = data.groups[group];

                if (item !== undefined) {
                    this.groups[group] = deepExtend(this.groups[group] ?? {}, item) as IParticlesOptions;
                }
            }
        }

        if (data.reduceDuplicates !== undefined) {
            this.reduceDuplicates = data.reduceDuplicates;
        }

        this.bounce.load(data.bounce);
        this.color.load(AnimatableColor.create(this.color, data.color));
        this.effect.load(data.effect);
        this.move.load(data.move);
        this.number.load(data.number);
        this.opacity.load(data.opacity);
        this.shape.load(data.shape);
        this.size.load(data.size);
        this.shadow.load(data.shadow);
        this.zIndex.load(data.zIndex);
        this.collisions.load(data.collisions);

        if (data.interactivity !== undefined) {
            this.interactivity = deepExtend({}, data.interactivity) as RecursivePartial<IInteractivity>;
        }

        const strokeToLoad = data.stroke;

        if (strokeToLoad) {
            this.stroke = executeOnSingleOrMultiple(strokeToLoad, t => {
                const tmp = new Stroke();

                tmp.load(t);

                return tmp;
            });
        }

        if (this._container) {
            const updaters = this._engine.updaters.get(this._container);

            if (updaters) {
                for (const updater of updaters) {
                    if (updater.loadOptions) {
                        updater.loadOptions(this, data);
                    }
                }
            }

            const interactors = this._engine.interactors.get(this._container);

            if (interactors) {
                for (const interactor of interactors) {
                    if (interactor.loadParticlesOptions) {
                        interactor.loadParticlesOptions(this, data);
                    }
                }
            }
        }
    }
}
