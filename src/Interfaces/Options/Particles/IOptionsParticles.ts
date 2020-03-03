import {IOptionsShape} from "../Shape/IOptionsShape";
import {IOptionsParticlesColor} from "./IOptionsParticlesColor";
import {IOptionsParticlesLineLinked} from "./IOptionsParticlesLineLinked";
import {IOptionsParticlesMove} from "./IOptionsParticlesMove";
import {IOptionsParticlesNumber} from "./IOptionsParticlesNumber";
import {IOptionsParticlesOpacity} from "./IOptionsParticlesOpacity";
import {IOptionsParticlesSize} from "./IOptionsParticlesSize";

export interface IOptionsParticles {
    color: IOptionsParticlesColor;
    line_linked: IOptionsParticlesLineLinked;
    move: IOptionsParticlesMove;
    number: IOptionsParticlesNumber;
    opacity: IOptionsParticlesOpacity;
    shape: IOptionsShape;
    size: IOptionsParticlesSize;
}
