import { Utils } from "../../Utils";
import { ClickMode, DivMode, HoverMode } from "../../Enums/Modes";
import { Grabber } from "./Interactions/Mouse/Grabber";
import { Repulser } from "./Interactions/Mouse/Repulser";
import { Bubbler } from "./Interactions/Mouse/Bubbler";
import { Connector } from "./Interactions/Mouse/Connector";
import { Container } from "../Container";
import { Interactions } from "./Interactions/Particles/Interactions";

export class InteractionManager {
    private interactionsEnabled: boolean;

    constructor(private readonly container: Container) {
        this.interactionsEnabled = false;
    }

    public init(): void {
        const options = this.container.options;

        this.interactionsEnabled =
            options.particles.links.enable ||
            options.particles.move.attract.enable ||
            options.particles.collisions.enable ||
            options.infection.enable;
    }

    public interact(delta: number): void {
        this.mouseInteract(delta);

        this.particlesInteract(delta);
    }

    private mouseInteract(delta: number): void {
        const container = this.container;

        const mouse = container.interactivity.mouse;
        const events = container.options.interactivity.events;
        const divs = container.options.interactivity.events.onDiv;

        let divEnabled: boolean;
        let divRepulse: boolean;
        let divBubble: boolean;

        if (divs instanceof Array) {
            const modes = divs.filter((t) => t.enable).map((t) => t.mode);

            divEnabled = modes.length > 0;
            divRepulse = modes.find((t) => Utils.isInArray(DivMode.repulse, t)) !== undefined;
            divBubble = modes.find((t) => Utils.isInArray(DivMode.bubble, t)) !== undefined;
        } else {
            divEnabled = divs.enable;
            divRepulse = Utils.isInArray(DivMode.repulse, divs.mode);
            divBubble = Utils.isInArray(DivMode.bubble, divs.mode);
        }

        if (
            !(divEnabled || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))
        ) {
            return;
        }
        const hoverMode = events.onHover.mode;
        const clickMode = events.onClick.mode;

        /* mouse events interactions */
        if (Utils.isInArray(HoverMode.grab, hoverMode)) {
            Grabber.grab(container, delta);
        }

        if (
            Utils.isInArray(HoverMode.repulse, hoverMode) ||
            Utils.isInArray(ClickMode.repulse, clickMode) ||
            divRepulse
        ) {
            Repulser.repulse(container, delta);
        }

        if (Utils.isInArray(HoverMode.bubble, hoverMode) || Utils.isInArray(ClickMode.bubble, clickMode) || divBubble) {
            Bubbler.bubble(container, delta);
        }

        if (Utils.isInArray(HoverMode.connect, hoverMode)) {
            Connector.connect(container, delta);
        }
    }

    private particlesInteract(delta: number): void {
        const container = this.container;

        // this loop is required to be done after mouse interactions
        for (const particle of container.particles.array) {
            Bubbler.reset(particle);

            /* interaction auto between particles */
            if (this.interactionsEnabled) {
                Interactions.interact(particle, container, delta);
            }
        }
    }
}
