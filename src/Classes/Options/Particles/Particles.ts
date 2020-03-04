import {IParticles} from "../../../Interfaces/Options/Particles/IParticles";
import {Color} from "./Color";
import {LineLinked} from "./LineLinked";
import {Move} from "./Move";
import {ParticlesNumber} from "./ParticlesNumber";
import {Opacity} from "./Opacity";
import {Shape} from "./Shape/Shape";
import {ParticlesSize} from "./ParticlesSize";

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

    public color: Color;
    public lineLinked: LineLinked;
    public move: Move;
    public number: ParticlesNumber;
    public opacity: Opacity;
    public shape: Shape;
    public size: ParticlesSize;

    constructor() {
        this.color = new Color();
        this.lineLinked = new LineLinked();
        this.move = new Move();
        this.number = new ParticlesNumber();
        this.opacity = new Opacity();
        this.shape = new Shape();
        this.size = new ParticlesSize();
    }
}

