import {IShape} from "../Shape/IShape";
import {IParticlesColor} from "./IParticlesColor";
import {ILineLinked} from "./ILineLinked";
import {IMove} from "./IMove";
import {IParticlesNumber} from "./IParticlesNumber";
import {IOpacity} from "./IOpacity";
import {ISize} from "./ISize";
import {IShadow} from "./IShadow";

export interface IParticles {
    color: IParticlesColor;

    /**
     * @deprecated use the new lineLinked instead
     */
    line_linked: ILineLinked;

    lineLinked: ILineLinked;
    move: IMove;
    number: IParticlesNumber;
    opacity: IOpacity;
    shadow: IShadow;
    shape: IShape;
    size: ISize;
}
