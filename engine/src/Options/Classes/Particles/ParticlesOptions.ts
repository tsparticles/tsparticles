import type { IOptionLoader, IParticlesOptions } from "../../Interfaces";
import { Links } from "./Links";
import { Move } from "./Move";
import { ParticlesNumber } from "./Number/ParticlesNumber";
import { Opacity } from "./Opacity/Opacity";
import { Orbit } from "./Orbit/Orbit";
import type { ParticlesGroups } from "../../../Types/ParticlesGroups";
import { Repulse } from "./Repulse/Repulse";
import { Roll } from "./Roll/Roll";
import { Rotate } from "./Rotate/Rotate";
import { Shadow } from "./Shadow";
import { Shape } from "./Shape/Shape";
import { Size } from "./Size/Size";
import { Stroke } from "./Stroke";
import { Collisions } from "./Collisions";
import { Twinkle } from "./Twinkle/Twinkle";
import { AnimatableColor } from "../AnimatableColor";
import { Life } from "./Life";
import { ParticlesBounce } from "./Bounce";
import { Destroy } from "./Destroy";
import { Wobble } from "./Wobble/Wobble";
import { ZIndex } from "./ZIndex/ZIndex";
import { deepExtend } from "../../../Utils";
import { Tilt } from ".";
import { AnimatableGradient } from "..";
import { SingleOrMultiple, RecursivePartial } from "../../..";

/**
 * [[include:Options/Particles.md]]
 * @category Options
 */
export class ParticlesOptions implements IParticlesOptions, IOptionLoader<IParticlesOptions> {
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

    constructor() {
        this.bounce = new ParticlesBounce();
        this.collisions = new Collisions();
        this.color = new AnimatableColor();
        this.color.value = "#fff";
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

    load(data?: RecursivePartial<IParticlesOptions>): void {
        if (!data) {
            return;
        }

        this.bounce.load(data.bounce);
        this.color.load(AnimatableColor.create(this.color, data.color));
        this.destroy.load(data.destroy);
        this.life.load(data.life);
        this.links.load(data.links);

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
        this.collisions.load(data.collisions);

        const strokeToLoad = data.stroke;

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
