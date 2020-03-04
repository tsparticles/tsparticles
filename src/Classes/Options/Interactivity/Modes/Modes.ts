import {IOptionsInteractivityModes} from "../../../../Interfaces/Options/Interactivity/Modes/IOptionsInteractivityModes";
import {Bubble} from "./Bubble";
import {Connect} from "./Connect";
import {Grab} from "./Grab";
import {Remove} from "./Remove";
import {Push} from "./Push";
import {Repulse} from "./Repulse";

export class Modes implements IOptionsInteractivityModes {
    public bubble: Bubble;
    public connect: Connect;
    public grab: Grab;
    public push: Push;
    public remove: Remove;
    public repulse: Repulse;

    constructor() {
        this.bubble = new Bubble();
        this.connect = new Connect();
        this.grab = new Grab();
        this.push = new Push();
        this.remove = new Remove();
        this.repulse = new Repulse();
    }
}
