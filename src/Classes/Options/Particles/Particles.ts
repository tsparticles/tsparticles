import {IParticles} from "../../../Interfaces/Options/Particles/IParticles";
import {Color} from "./Color";
import {LineLinked} from "./LineLinked";
import {Move} from "./Move";
import {ParticlesNumber} from "./ParticlesNumber";
import {Opacity} from "./Opacity";
import {Shape} from "./Shape/Shape";
import {ParticlesSize} from "./ParticlesSize";
import {IParticlesColor} from "../../../Interfaces/Options/Particles/IParticlesColor";
import {ILineLinked} from "../../../Interfaces/Options/Particles/ILineLinked";
import {IMove} from "../../../Interfaces/Options/Particles/IMove";
import {IParticlesNumber} from "../../../Interfaces/Options/Particles/IParticlesNumber";
import {IOpacity} from "../../../Interfaces/Options/Particles/IOpacity";
import {IShape} from "../../../Interfaces/Options/Shape/IShape";
import {ISize} from "../../../Interfaces/Options/Particles/ISize";

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

    public color: IParticlesColor;
    public lineLinked: ILineLinked;
    public move: IMove;
    public number: IParticlesNumber;
    public opacity: IOpacity;
    public shape: IShape;
    public size: ISize;
    // public shadow: IShadow;

    constructor() {
        this.color = new Color();
        this.lineLinked = new LineLinked();
        this.move = new Move();
        this.number = new ParticlesNumber();
        this.opacity = new Opacity();
        this.shape = new Shape();
        this.size = new ParticlesSize();
        //this.shadow = new Shadow();
    }
}

