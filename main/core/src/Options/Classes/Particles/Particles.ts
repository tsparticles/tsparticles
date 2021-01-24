import type { IParticles } from "../../Interfaces/Particles/IParticles";
import { Links } from "./Links/Links";
import { Move } from "./Move/Move";
import { ParticlesNumber } from "./Number/ParticlesNumber";
import { Opacity } from "./Opacity/Opacity";
import { Shape } from "./Shape/Shape";
import { Size } from "./Size/Size";
import { Rotate } from "./Rotate/Rotate";
import type { ParticlesGroups, RecursivePartial, SingleOrMultiple } from "../../../Types";
import { Shadow } from "./Shadow";
import { Stroke } from "./Stroke";
import { Collisions } from "./Collisions/Collisions";
import { Twinkle } from "./Twinkle/Twinkle";
import { AnimatableColor } from "../AnimatableColor";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { Life } from "./Life/Life";
import { Bounce } from "./Bounce/Bounce";
import { deepExtend } from "../../../Utils";
import { Orbit } from "./Orbit/Orbit";
import { ZIndex } from "./ZIndex/ZIndex";
import { Repulse } from "./Repulse/Repulse";
import { Destroy } from "./Destroy/Destroy";

/**
 * [[include:Options/Particles.md]]
 * @category Options
 */
export class Particles implements IParticles, IOptionLoader<IParticles> {
    /**
     *
     * @deprecated this property is obsolete, please use the new links
     */
    public get line_linked(): Links {
        return this.links;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new links
     * @param value
     */
    public set line_linked(value: Links) {
        this.links = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    public get lineLinked(): Links {
        return this.links;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    public set lineLinked(value: Links) {
        this.links = value;
    }

    public bounce;
    public collisions;
    public color;
    public destroy;
    public groups: ParticlesGroups;
    public life;
    public links;
    public move;
    public number;
    public opacity;
    public orbit;
    public reduceDuplicates;
    public repulse;
    public rotate;
    public shadow;
    public shape;
    public size;
    public stroke: SingleOrMultiple<Stroke>;
    public twinkle;
    public zIndex;

    constructor() {
        this.bounce = new Bounce();
        this.collisions = new Collisions();
        this.color = new AnimatableColor();
        this.destroy = new Destroy();
        this.groups = {};
        this.life = new Life();
        this.links = new Links();
        this.move = new Move();
        this.number = new ParticlesNumber();
        this.orbit = new Orbit();
        this.opacity = new Opacity();
        this.reduceDuplicates = false;
        this.repulse = new Repulse();
        this.rotate = new Rotate();
        this.shadow = new Shadow();
        this.shape = new Shape();
        this.size = new Size();
        this.stroke = new Stroke();
        this.twinkle = new Twinkle();
        this.zIndex = new ZIndex();
    }

    public load(data?: RecursivePartial<IParticles>): void {
        if (!data) {
            return;
        }

        this.zIndex.load(data.zIndex);
        this.repulse.load(data.repulse);
        this.bounce.load(data.bounce);

        this.color = AnimatableColor.create(this.color, data.color);
        this.destroy.load(data.destroy);

        if (data.groups !== undefined) {
            for (const group in data.groups) {
                const item = data.groups[group];

                if (item !== undefined) {
                    this.groups[group] = deepExtend(this.groups[group] ?? {}, item) as IParticles;
                }
            }
        }

        this.life.load(data.life);

        const links = data.links ?? data.lineLinked ?? data.line_linked;

        if (links !== undefined) {
            this.links.load(links);
        }

        this.move.load(data.move);

        // previous used value in attract usage, will be removed in 2.x
        if (data.move?.attract?.distance === undefined) {
            this.move.attract.distance = this.links.distance;
        }

        this.number.load(data.number);
        this.opacity.load(data.opacity);

        if (data.reduceDuplicates !== undefined) {
            this.reduceDuplicates = data.reduceDuplicates;
        }

        this.rotate.load(data.rotate);
        this.shape.load(data.shape);
        this.size.load(data.size);
        this.shadow.load(data.shadow);
        this.twinkle.load(data.twinkle);
        this.orbit.load(data.orbit);

        const collisions = data.move?.collisions ?? data.move?.bounce;

        if (collisions !== undefined) {
            this.collisions.enable = collisions;
        }

        this.collisions.load(data.collisions);

        const strokeToLoad = data.stroke ?? data.shape?.stroke;

        if (strokeToLoad === undefined) {
            return;
        }

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
}
