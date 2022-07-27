import { AnimatableColor } from "../AnimatableColor";
import { Collisions } from "./Collisions/Collisions";
import type { Container } from "../../../Core/Container";
import { Destroy } from "./Destroy/Destroy";
import type { Engine } from "../../../engine";
import type { IInteractivity } from "../../Interfaces/Interactivity/IInteractivity";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { IParticlesOptions } from "../../Interfaces/Particles/IParticlesOptions";
import { Links } from "./Links/Links";
import { Move } from "./Move/Move";
import { Opacity } from "./Opacity/Opacity";
import { ParticlesBounce } from "./Bounce/ParticlesBounce";
import type { ParticlesGroups } from "../../../Types/ParticlesGroups";
import { ParticlesNumber } from "./Number/ParticlesNumber";
import { ParticlesRepulse } from "./Repulse/ParticlesRepulse";
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
    readonly #container;
    destroy;
    readonly #engine;
    groups: ParticlesGroups;
    interactivity?: RecursivePartial<IInteractivity>;
    links;
    move;
    number;
    opacity;
    reduceDuplicates;
    repulse;
    rotate;
    shadow;
    shape;
    size;
    stroke: SingleOrMultiple<Stroke>;
    zIndex;

    constructor(engine: Engine, container?: Container) {
        this.#engine = engine;
        this.#container = container;

        this.bounce = new ParticlesBounce();
        this.collisions = new Collisions();
        this.color = new AnimatableColor();
        this.color.value = "#fff";
        this.destroy = new Destroy();
        this.groups = {};
        this.links = new Links();
        this.move = new Move();
        this.number = new ParticlesNumber();
        this.opacity = new Opacity();
        this.reduceDuplicates = false;
        this.repulse = new ParticlesRepulse();
        this.rotate = new Rotate();
        this.shadow = new Shadow();
        this.shape = new Shape();
        this.size = new Size();
        this.stroke = new Stroke();
        this.zIndex = new ZIndex();
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    get lineLinked(): Links {
        return this.links;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    set lineLinked(value: Links) {
        this.links = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new links
     */
    get line_linked(): Links {
        return this.links;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new links
     * @param value
     */
    set line_linked(value: Links) {
        this.links = value;
    }

    load(data?: RecursivePartial<IParticlesOptions>): void {
        if (!data) {
            return;
        }

        this.bounce.load(data.bounce);
        this.color.load(AnimatableColor.create(this.color, data.color));

        this.destroy.load(data.destroy);

        const links = data.links ?? data.lineLinked ?? data.line_linked;

        if (links !== undefined) {
            this.links.load(links);
        }

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

        this.repulse.load(data.repulse);
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

        if (this.#container) {
            const updaters = this.#engine.plugins.updaters.get(this.#container);

            if (updaters) {
                for (const updater of updaters) {
                    if (updater.loadOptions) {
                        updater.loadOptions(this, data);
                    }
                }
            }
        }
    }
}
