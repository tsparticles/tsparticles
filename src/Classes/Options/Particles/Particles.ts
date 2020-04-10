import type {IParticles} from "../../../Interfaces/Options/Particles/IParticles";
import {Color} from "./Color";
import {LineLinked} from "./LineLinked";
import {Move} from "./Move";
import {ParticlesNumber} from "./ParticlesNumber";
import {Opacity} from "./Opacity";
import {Shape} from "./Shape/Shape";
import {Size} from "./Size";
import type {IColor} from "../../../Interfaces/Options/Particles/IColor";
import type {ILineLinked} from "../../../Interfaces/Options/Particles/ILineLinked";
import type {IMove} from "../../../Interfaces/Options/Particles/IMove";
import type {IParticlesNumber} from "../../../Interfaces/Options/Particles/IParticlesNumber";
import type {IOpacity} from "../../../Interfaces/Options/Particles/IOpacity";
import type {ISize} from "../../../Interfaces/Options/Particles/ISize";
import type {IRotate} from "../../../Interfaces/Options/Particles/IRotate";
import {Rotate} from "./Rotate";
import type {RecursivePartial} from "../../../Types/RecursivePartial";
import type {IShadow} from "../../../Interfaces/Options/Particles/IShadow";
import {Shadow} from "./Shadow";
import type {SingleOrMultiple} from "../../../Types/SingleOrMultiple";
import type {IStroke} from "../../../Interfaces/Options/Particles/IStroke";
import {Stroke} from "./Stroke";
import type {IShape} from "../../../Interfaces/Options/Particles/Shape/IShape";

export class Particles implements IParticles {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    public get line_linked(): ILineLinked {
        return this.lineLinked;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    public set line_linked(value: ILineLinked) {
        this.lineLinked = value;
    }

    public color: SingleOrMultiple<IColor>;
    public lineLinked: ILineLinked;
    public move: IMove;
    public number: IParticlesNumber;
    public opacity: IOpacity;
    public rotate: IRotate;
    public shape: IShape;
    public size: ISize;
    public shadow: IShadow;
    public stroke: SingleOrMultiple<IStroke>;

    constructor() {
        this.color = new Color();
        this.lineLinked = new LineLinked();
        this.move = new Move();
        this.number = new ParticlesNumber();
        this.opacity = new Opacity();
        this.rotate = new Rotate();
        this.shape = new Shape();
        this.size = new Size();
        this.shadow = new Shadow();
        this.stroke = new Stroke();
    }

    public load(data?: RecursivePartial<IParticles>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                if (data.color instanceof Array) {
                    this.color = data.color.map((s) => {
                        const tmp = new Color();

                        tmp.load(s);

                        return tmp;
                    });
                } else {
                    if (this.color instanceof Array) {
                        this.color = new Color();
                    }

                    this.color.load(data.color);
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

