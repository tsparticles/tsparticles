import type { RecursivePartial, SingleOrMultiple } from "../../../Types";
import { AnimatableColor } from "../AnimatableColor";
import { AnimatableGradient } from "../AnimatableGradient";
import { Bounce } from "./Bounce/Bounce";
import { Collisions } from "./Collisions/Collisions";
import { Destroy } from "./Destroy/Destroy";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { IParticles } from "../../Interfaces/Particles/IParticles";
import { Life } from "./Life/Life";
import { Links } from "./Links/Links";
import { Move } from "./Move/Move";
import { Opacity } from "./Opacity/Opacity";
import { Orbit } from "./Orbit/Orbit";
import type { ParticlesGroups } from "../../../Types/ParticlesGroups";
import { ParticlesNumber } from "./Number/ParticlesNumber";
import { Repulse } from "./Repulse/Repulse";
import { Roll } from "./Roll/Roll";
import { Rotate } from "./Rotate/Rotate";
import { Shadow } from "./Shadow";
import { Shape } from "./Shape/Shape";
import { Size } from "./Size/Size";
import { Stroke } from "./Stroke";
import { Tilt } from "./Tilt/Tilt";
import { Twinkle } from "./Twinkle/Twinkle";
import { Wobble } from "./Wobble/Wobble";
import { ZIndex } from "./ZIndex/ZIndex";
import { deepExtend } from "../../../Utils";

/**
 * [[include:Options/Particles.md]]
 * @category Options
 */
export class ParticlesOptions implements IParticles, IOptionLoader<IParticles> {
    bounce;
    collisions;
    color;
    destroy;
    gradient: SingleOrMultiple<AnimatableGradient>;
    groups: ParticlesGroups;
    life;
    links;
    move;
    number;
    opacity;
    orbit;
    reduceDuplicates;
    repulse;
    roll;
    rotate;
    shape;
    size;
    shadow;
    stroke: SingleOrMultiple<Stroke>;
    tilt;
    twinkle;
    wobble;
    zIndex;

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

    constructor() {
        this.bounce = new Bounce();
        this.collisions = new Collisions();
        this.color = new AnimatableColor();
        this.destroy = new Destroy();
        this.gradient = [];
        this.groups = {};
        this.life = new Life();
        this.links = new Links();
        this.move = new Move();
        this.number = new ParticlesNumber();
        this.opacity = new Opacity();
        this.orbit = new Orbit();
        this.reduceDuplicates = false;
        this.repulse = new Repulse();
        this.roll = new Roll();
        this.rotate = new Rotate();
        this.shadow = new Shadow();
        this.shape = new Shape();
        this.size = new Size();
        this.stroke = new Stroke();
        this.tilt = new Tilt();
        this.twinkle = new Twinkle();
        this.wobble = new Wobble();
        this.zIndex = new ZIndex();
    }

    load(data?: RecursivePartial<IParticles>): void {
        if (data === undefined) {
            return;
        }

        this.bounce.load(data.bounce);
        this.color.load(AnimatableColor.create(this.color, data.color));

        this.destroy.load(data.destroy);
        this.life.load(data.life);

        const links = data.links ?? data.lineLinked ?? data.line_linked;

        if (links !== undefined) {
            this.links.load(links);
        }

        if (data.groups !== undefined) {
            for (const group in data.groups) {
                const item = data.groups[group];

                if (item !== undefined) {
                    this.groups[group] = deepExtend(this.groups[group] ?? {}, item) as IParticles;
                }
            }
        }

        this.move.load(data.move);
        this.number.load(data.number);
        this.opacity.load(data.opacity);
        this.orbit.load(data.orbit);

        if (data.reduceDuplicates !== undefined) {
            this.reduceDuplicates = data.reduceDuplicates;
        }

        this.repulse.load(data.repulse);
        this.roll.load(data.roll);
        this.rotate.load(data.rotate);
        this.shape.load(data.shape);
        this.size.load(data.size);
        this.shadow.load(data.shadow);
        this.tilt.load(data.tilt);
        this.twinkle.load(data.twinkle);
        this.wobble.load(data.wobble);
        this.zIndex.load(data.zIndex);

        const collisions = data.move?.collisions ?? data.move?.bounce;

        if (collisions !== undefined) {
            this.collisions.enable = collisions;
        }

        this.collisions.load(data.collisions);

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

        const gradientToLoad = data.gradient;

        if (gradientToLoad) {
            if (gradientToLoad instanceof Array) {
                this.gradient = gradientToLoad.map((s) => {
                    const tmp = new AnimatableGradient();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                if (this.gradient instanceof Array) {
                    this.gradient = new AnimatableGradient();
                }

                this.gradient.load(gradientToLoad);
            }
        }
    }
}
