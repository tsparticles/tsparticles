import {IShape} from "../Shape/IShape";
import {IParticlesColor} from "./IParticlesColor";
import {ILineLinked} from "./ILineLinked";
import {IMove} from "./IMove";
import {IParticlesNumber} from "./IParticlesNumber";
import {IOpacity} from "./IOpacity";
import {ISize} from "./ISize";

export interface IParticles {
    color: IParticlesColor;
    line_linked: ILineLinked;
    move: IMove;
    number: IParticlesNumber;
    opacity: IOpacity;
    shape: IShape;
    size: ISize;
}
