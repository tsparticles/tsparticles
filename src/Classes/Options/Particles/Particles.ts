import type { IParticles } from "../../../Interfaces/Options/Particles/IParticles";
import { OptionsColor } from "./OptionsColor";
import { LineLinked } from "./LineLinked/LineLinked";
import { Move } from "./Move";
import { ParticlesNumber } from "./ParticlesNumber";
import { Opacity } from "./Opacity/Opacity";
import { Shape } from "./Shape/Shape";
import { Size } from "./Size/Size";
import { Rotate } from "./Rotate/Rotate";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { Shadow } from "./Shadow";
import type { SingleOrMultiple } from "../../../Types/SingleOrMultiple";
import { Stroke } from "./Stroke";
import { Collisions } from "./Collisions";
import { Twinkle } from "./Twinkle/Twinkle";

export class Particles implements IParticles {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    public get line_linked(): LineLinked {
        return this.lineLinked;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    public set line_linked(value: LineLinked) {
        this.lineLinked = value;
    }

    public collisions: Collisions;
    public color: SingleOrMultiple<OptionsColor>;
    public lineLinked: LineLinked;
    public move: Move;
    public number: ParticlesNumber;
    public opacity: Opacity;
    public rotate: Rotate;
    public shape: Shape;
    public size: Size;
    public shadow: Shadow;
    public stroke: SingleOrMultiple<Stroke>;
    public twinkle: Twinkle;

    constructor() {
        this.collisions = new Collisions();
        this.color = new OptionsColor();
        this.lineLinked = new LineLinked();
        this.move = new Move();
        this.number = new ParticlesNumber();
        this.opacity = new Opacity();
        this.rotate = new Rotate();
        this.shadow = new Shadow();
        this.shape = new Shape();
        this.size = new Size();
        this.stroke = new Stroke();
        this.twinkle = new Twinkle();
    }

    public load(data?: RecursivePartial<IParticles>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                if (data.color instanceof Array) {
                    this.color = data.color.map((s) => OptionsColor.create(undefined, s));
                } else {
                    if (this.color instanceof Array) {
                        this.color = new OptionsColor();
                    }

                    this.color = OptionsColor.create(this.color, data.color);
                }
            }

            const lineLinked = data.lineLinked ?? data.line_linked;

            if (lineLinked !== undefined) {
                this.lineLinked.load(lineLinked);
            }

            this.move.load(data.move);
            this.number.load(data.number);
            this.opacity.load(data.opacity);
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

            if (strokeToLoad !== undefined) {
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
    }
}
