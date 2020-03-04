import {IGrabLineLinked} from "../../../../Interfaces/Options/Interactivity/Modes/IGrabLineLinked";

export class GrabLineLinked implements IGrabLineLinked {
    public opacity: number;

    constructor() {
        this.opacity = 1;
    }
}
