import type {ICharacterShape} from "../../../../Interfaces/Options/Particles/Shape/ICharacterShape";
import type {RecursivePartial} from "../../../../Types/RecursivePartial";
import type {SingleOrMultiple} from "../../../../Types/SingleOrMultiple";
import type {IColor} from "../../../../Interfaces/Options/Particles/IColor";
import type {IOpacity} from "../../../../Interfaces/Options/Particles/IOpacity";
import type {IRotate} from "../../../../Interfaces/Options/Particles/IRotate";
import type {ISize} from "../../../../Interfaces/Options/Particles/ISize";
import type {IShadow} from "../../../../Interfaces/Options/Particles/IShadow";
import type {IStroke} from "../../../../Interfaces/Options/Particles/IStroke";
import {Color} from "../Color";
import {Stroke} from "../Stroke";
import {Opacity} from "../Opacity";
import {Rotate} from "../Rotate";
import {ParticlesSize} from "../ParticlesSize";
import {Shadow} from "../Shadow";
import type {IShapeValues} from "../../../../Interfaces/Options/Particles/Shape/IShapeValues";

export class ShapeBase implements IShapeValues {
    public close?: boolean;
    public fill?: boolean;
    public color?: SingleOrMultiple<IColor>;
    public opacity?: IOpacity;
    public rotate?: IRotate;
    public size?: ISize;
    public shadow?: IShadow;
    public stroke?: SingleOrMultiple<IStroke>;

    constructor() {
        this.fill = true;
        this.close = true;
    }

    public load(data?: RecursivePartial<ICharacterShape>): void {
        if (data !== undefined) {
            if (data.fill !== undefined) {
                this.fill = data.fill;
            }

            if (data.color !== undefined) {
                if (data.color instanceof Array) {
                    this.color = data.color.map((s) => {
                        const tmp = new Color();

                        tmp.load(s);

                        return tmp;
                    });
                } else {
                    if (this.color === undefined) {
                        this.color = new Color();
                    }

                    if (this.color instanceof Array) {
                        this.color = new Color();
                    }

                    this.color.load(data.color);
                }
            }

            if (data.opacity !== undefined) {
                this.opacity = new Opacity();
                this.opacity.load(data.opacity);
            }

            if (data.rotate !== undefined) {
                this.rotate = new Rotate();
                this.rotate.load(data.rotate);
            }

            if (data.size !== undefined) {
                this.size = new ParticlesSize();
                this.size.load(data.size);
            }

            if (data.shadow !== undefined) {
                this.shadow = new Shadow();
                this.shadow.load(data.shadow);
            }

            if (data.stroke !== undefined) {
                if (data.stroke instanceof Array) {
                    this.stroke = data.stroke.map((s) => {
                        const tmp = new Stroke();

                        tmp.load(s);

                        return tmp;
                    });
                } else {
                    if (this.stroke === undefined) {
                        this.stroke = new Stroke();
                    }

                    if (this.stroke instanceof Array) {
                        this.stroke = new Stroke();
                    }

                    this.stroke.load(data.stroke);
                }
            }
        }
    }
}
