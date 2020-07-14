import { Container } from "tsparticles/dist/Core/Container";
import { changeHandler } from "../utils";

const addInteractivityEvents = (container: Container): void => {
    /*const fEvents = addFolder("events");

    const fClick = fEvents.addFolder("onClick");

    fClick.add(container.options.interactivity.events.onClick, "enable").onChange(async () => changeHandler(container));
    fClick
        .add(container.options.interactivity.events.onClick, "mode", [
            "bubble",
            "pause",
            "push",
            "remove",
            "repulse",
            "trail",
            // "emitter", // TODO: single or multiple, plugin
            // "absorber" // TODO: single or multiple, plugin
        ])
        .onChange(async () => changeHandler(container));

    const fHover = fEvents.addFolder("onHover");

    fHover.add(container.options.interactivity.events.onHover, "enable").onChange(async () => changeHandler(container));
    fHover
        .add(container.options.interactivity.events.onHover, "mode", [
            "bubble",
            "connect",
            "grab",
            "repulse",
            "slow",
            "trail",
        ])
        .onChange(async () => changeHandler(container));

    // TODO: onDiv

    fEvents.add(container.options.interactivity.events, "resize").onChange(async () => changeHandler(container));
     */
};

const addInteractivityModes = (container: Container): void => {
    /*const fModes = addFolder("modes");

    const fBubble = fModes.addFolder("bubble");

    if (container.options.interactivity.modes.bubble.color) {
        const fBubbleColor = fBubble.addFolder("color");

        fBubbleColor
            .addColor(container.options.interactivity.modes.bubble.color, "value")
            .onChange(async () => changeHandler(container));
    }

    fBubble
        .add(container.options.interactivity.modes.bubble, "distance")
        .min(0)
        .max(500)
        .onChange(async () => changeHandler(container));
    fBubble
        .add(container.options.interactivity.modes.bubble, "duration")
        .min(0)
        .max(10)
        .step(0.1)
        .onChange(async () => changeHandler(container));
    fBubble
        .add(container.options.interactivity.modes.bubble, "opacity")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange(async () => changeHandler(container));
    fBubble
        .add(container.options.interactivity.modes.bubble, "size")
        .min(0)
        .max(100)
        .step(0.1)
        .onChange(async () => changeHandler(container));

    const fConnect = fModes.addFolder("connect");

    fConnect
        .add(container.options.interactivity.modes.connect, "distance")
        .min(0)
        .max(500)
        .onChange(async () => changeHandler(container));
    fConnect
        .add(container.options.interactivity.modes.connect, "radius")
        .min(0)
        .max(500)
        .onChange(async () => changeHandler(container));

    const fConnectLinks = fConnect.addFolder("links");

    fConnectLinks
        .add(container.options.interactivity.modes.connect.links, "opacity")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange(async () => changeHandler(container));

    const fGrab = fModes.addFolder("grab");

    fGrab
        .add(container.options.interactivity.modes.grab, "distance")
        .min(0)
        .max(500)
        .onChange(async () => changeHandler(container));

    const fGrabLinks = fGrab.addFolder("links");

    fGrabLinks
        .add(container.options.interactivity.modes.grab.links, "opacity")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange(async () => changeHandler(container));

    if (container.options.interactivity.modes.grab.links.color) {
        const fGrabLinksColor = fGrabLinks.addFolder("color");

        fGrabLinksColor
            .addColor(container.options.interactivity.modes.grab.links.color, "value")
            .onChange(async (v) => changeHandler(container));
    }

    const fPush = fModes.addFolder("push");

    fPush
        .add(container.options.interactivity.modes.push, "quantity")
        .min(0)
        .onChange(async () => changeHandler(container));

    const fRemove = fModes.addFolder("remove");

    fRemove
        .add(container.options.interactivity.modes.push, "quantity")
        .min(0)
        .onChange(async () => changeHandler(container));

    const fRepulse = fModes.addFolder("repulse");

    fRepulse
        .add(container.options.interactivity.modes.repulse, "distance")
        .min(0)
        .max(500)
        .onChange(async () => changeHandler(container));
    fRepulse
        .add(container.options.interactivity.modes.repulse, "duration")
        .min(0)
        .max(10)
        .step(0.1)
        .onChange(async () => changeHandler(container));
    fRepulse
        .add(container.options.interactivity.modes.repulse, "speed")
        .min(0)
        .max(10)
        .step(0.1)
        .onChange(async () => changeHandler(container));

    const fSlow = fModes.addFolder("slow");

    fSlow
        .add(container.options.interactivity.modes.slow, "factor")
        .min(0)
        .max(5)
        .step(0.01)
        .onChange(async () => changeHandler(container));
    fSlow
        .add(container.options.interactivity.modes.slow, "radius")
        .min(0)
        .max(500)
        .step(1)
        .onChange(async () => changeHandler(container));

    const fTrail = fModes.addFolder("trail");

    fTrail
        .add(container.options.interactivity.modes.trail, "quantity")
        .min(0)
        .max(50)
        .onChange(async () => changeHandler(container));
    fTrail
        .add(container.options.interactivity.modes.trail, "delay")
        .min(0)
        .max(1)
        .step(0.0001)
        .onChange(async () => changeHandler(container));

    // TODO: absorber
    // TODO: emitter
     */
};

const addInteractivity = (container: Container): void => {
    /* const fInteract = addFolder("interactivity");

    addInteractivityEvents(container);
    addInteractivityModes(container);

    fInteract
        .add(container.options.interactivity, "detectsOn", [ "canvas", "parent", "window" ])
        .onChange(async () => changeHandler(container));
     */
};

export { addInteractivity };
