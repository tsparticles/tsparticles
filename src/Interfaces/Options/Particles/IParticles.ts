import {IShape} from "./Shape/IShape";
import {IColor} from "./IColor";
import {ILineLinked} from "./ILineLinked";
import {IMove} from "./IMove";
import {IParticlesNumber} from "./IParticlesNumber";
import {IOpacity} from "./IOpacity";
import {ISize} from "./ISize";
import {IOptionLoader} from "../IOptionLoader";
import {IRotate} from "./IRotate";
import {IShadow} from "./IShadow";

export interface IParticles extends IOptionLoader<IParticles> {
    color: IColor;

    /**
     * @deprecated use the new lineLinked instead
     */
    line_linked: ILineLinked;

    lineLinked: ILineLinked;
    move: IMove;
    number: IParticlesNumber;
    opacity: IOpacity;
    rotate: IRotate;
    shadow: IShadow;
    shape: IShape;
    size: ISize;
}
