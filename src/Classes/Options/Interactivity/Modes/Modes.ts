import {IOptionsInteractivityModes} from "../../../../Interfaces/Options/Interactivity/Modes/IOptionsInteractivityModes";
import {Bubble} from "./Bubble";
import {Connect} from "./Connect";
import {Grab} from "./Grab";
import {Remove} from "./Remove";
import {Push} from "./Push";
import {Repulse} from "./Repulse";
import {IBubble} from "../../../../Interfaces/Options/Interactivity/Modes/IBubble";
import {IConnect} from "../../../../Interfaces/Options/Interactivity/Modes/IConnect";
import {IGrab} from "../../../../Interfaces/Options/Interactivity/Modes/IGrab";
import {IPush} from "../../../../Interfaces/Options/Interactivity/Modes/IPush";
import {IRemove} from "../../../../Interfaces/Options/Interactivity/Modes/IRemove";
import {IRepulse} from "../../../../Interfaces/Options/Interactivity/Modes/IRepulse";

export class Modes implements IOptionsInteractivityModes {
    public bubble: IBubble;
    public connect: IConnect;
    public grab: IGrab;
    public push: IPush;
    public remove: IRemove;
    public repulse: IRepulse;

    constructor() {
        this.bubble = new Bubble();
        this.connect = new Connect();
        this.grab = new Grab();
        this.push = new Push();
        this.remove = new Remove();
        this.repulse = new Repulse();
    }
}
