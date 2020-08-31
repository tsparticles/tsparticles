import type { IParticles } from "../../Interfaces/Particles/IParticles";
import { Links } from "./Links/Links";
import { Move } from "./Move/Move";
import { ParticlesNumber } from "./ParticlesNumber";
import { Opacity } from "./Opacity/Opacity";
import { Shape } from "./Shape/Shape";
import { Size } from "./Size/Size";
import { Rotate } from "./Rotate/Rotate";
import type { RecursivePartial } from "../../../Types";
import { Shadow } from "./Shadow";
import type { SingleOrMultiple } from "../../../Types";
import { Stroke } from "./Stroke";
import { Collisions } from "./Collisions";
import { Twinkle } from "./Twinkle/Twinkle";
import { AnimatableColor } from "./AnimatableColor";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { Life } from "./Life/Life";
import { Bounce } from "./Bounce/Bounce";

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
    public life;
    public links;
    public move;
    public number;
    public opacity;
    public reduceDuplicates;
    public rotate;
    public shape;
    public size;
    public shadow;
    public stroke: SingleOrMultiple<Stroke>;
    public twinkle;

    constructor() {
        this.bounce = new Bounce();
        this.collisions = new Collisions();
        this.color = new AnimatableColor();
        this.life = new Life();
        this.links = new Links();
        this.move = new Move();
        this.number = new ParticlesNumber();
        this.opacity = new Opacity();
        this.reduceDuplicates = false;
        this.rotate = new Rotate();
        this.shadow = new Shadow();
        this.shape = new Shape();
        this.size = new Size();
        this.stroke = new Stroke();
        this.twinkle = new Twinkle();
    }

    public load(data?: RecursivePartial<IParticles>): void {
        if (data === undefined) {
            return;
        }

        this.bounce.load(data.bounce);
        this.color = AnimatableColor.create(this.color, data.color);

        this.life.load(data.life);

        const links = data.links ?? data.lineLinked ?? data.line_linked;

        if (links !== undefined) {
            this.links.load(links);
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
        this.twinkle.load(data.twinkle);

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
