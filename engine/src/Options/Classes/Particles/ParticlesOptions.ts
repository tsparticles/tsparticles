import { AnimatableColor } from "../AnimatableColor";
import { Collisions } from "./Collisions/Collisions";
import type { Container } from "../../../Core/Container";
import type { Engine } from "../../../engine";
import type { IInteractivity } from "../../Interfaces/Interactivity/IInteractivity";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { IParticlesOptions } from "../../Interfaces/Particles/IParticlesOptions";
import { Move } from "./Move/Move";
import { Opacity } from "./Opacity/Opacity";
import { ParticlesBounce } from "./Bounce/ParticlesBounce";
import type { ParticlesGroups } from "../../../Types/ParticlesGroups";
import { ParticlesNumber } from "./Number/ParticlesNumber";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { Rotate } from "./Rotate/Rotate";
import { Shadow } from "./Shadow";
import { Shape } from "./Shape/Shape";
import type { SingleOrMultiple } from "../../../Types/SingleOrMultiple";
import { Size } from "./Size/Size";
import { Stroke } from "./Stroke";
import { ZIndex } from "./ZIndex/ZIndex";
import { deepExtend } from "../../../Utils/Utils";

/**
 * [[include:Options/Particles.md]]
 * @category Options
 */
export class ParticlesOptions implements IParticlesOptions, IOptionLoader<IParticlesOptions> {
    [name: string]: unknown;

    bounce;
    collisions;
    color;
    groups: ParticlesGroups;
    interactivity?: RecursivePartial<IInteractivity>;
    move;
    number;
    opacity;
    reduceDuplicates;
    rotate;
    shadow;
    shape;
    size;
    stroke: SingleOrMultiple<Stroke>;
    zIndex;

    private readonly _container;
    private readonly _engine;

    constructor(engine: Engine, container?: Container) {
        this._engine = engine;
        this._container = container;

        this.bounce = new ParticlesBounce();
        this.collisions = new Collisions();
        this.color = new AnimatableColor();
        this.color.value = "#fff";
        this.groups = {};
        this.move = new Move();
        this.number = new ParticlesNumber();
        this.opacity = new Opacity();
        this.reduceDuplicates = false;
        this.rotate = new Rotate();
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

        this.bounce.load(data.bounce);
        this.color.load(AnimatableColor.create(this.color, data.color));

        if (data.groups !== undefined) {
            for (const group in data.groups) {
                const item = data.groups[group];

                if (item !== undefined) {
                    this.groups[group] = deepExtend(this.groups[group] ?? {}, item) as IParticlesOptions;
                }
            }
        }

        this.move.load(data.move);
        this.number.load(data.number);
        this.opacity.load(data.opacity);

        if (data.reduceDuplicates !== undefined) {
            this.reduceDuplicates = data.reduceDuplicates;
        }

        this.rotate.load(data.rotate);
        this.shape.load(data.shape);
        this.size.load(data.size);
        this.shadow.load(data.shadow);
        this.zIndex.load(data.zIndex);

        const collisions = data.move?.collisions ?? data.move?.bounce;

        if (collisions !== undefined) {
            this.collisions.enable = collisions;
        }

        this.collisions.load(data.collisions);

        if (data.interactivity !== undefined) {
            this.interactivity = deepExtend({}, data.interactivity) as RecursivePartial<IInteractivity>;
        }

        const strokeToLoad = data.stroke ?? data.shape?.stroke;

        if (strokeToLoad) {
            if (strokeToLoad instanceof Array) {
                this.stroke = strokeToLoad.map((s) => {
                    const tmp = new Stroke();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                if (this.stroke instanceof Array) {
                    this.stroke = new Stroke();
                }

                this.stroke.load(strokeToLoad);
            }
        }

        if (this._container) {
            const updaters = this._engine.plugins.updaters.get(this._container);

            if (updaters) {
                for (const updater of updaters) {
                    if (updater.loadOptions) {
                        updater.loadOptions(this, data);
                    }
                }
            }

            const interactors = this._engine.plugins.interactors.get(this._container);

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
