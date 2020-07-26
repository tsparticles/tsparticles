import type { EditorContainer } from "../../../../Editors/EditorContainer";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IModes } from "tsparticles/dist/Options/Interfaces/Interactivity/Modes/IModes";
import type { EditorNumberInput } from "../../../../Editors/EditorNumberInput";
import type { IRgb } from "tsparticles/dist/Core/Interfaces/IRgb";
import type { IHsl } from "tsparticles/dist/Core/Interfaces/IHsl";
import { ColorUtils } from "tsparticles";
import { ParticlesOptionsEditor } from "../../Particles/ParticlesOptionsEditor";
import type { IParticles } from "tsparticles/dist/Options/Interfaces/Particles/IParticles";

export class ModesOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IModes) {
        this.container = parent.addContainer("modes", "Modes");
        this.particles = this.container.particles;

        this.addAttract();
        this.addBubble();
        this.addConnect();
        this.addGrab();
        this.addPush();
        this.addRemove();
        this.addRepulse();
        this.addSlow();
        this.addTrail();
    }

    private addAttract(): void {
        const particles = this.container.particles;
        const options = this.options.attract;
        const attractContainer = this.container.addContainer("attract", "Attract");

        attractContainer.addProperty(
            "distance",
            "Distance",
            options.distance,
            typeof options.distance,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.distance = value;

                    await particles.refresh();
                }
            }
        );

        attractContainer.addProperty(
            "duration",
            "Duration",
            options.duration,
            typeof options.duration,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.duration = value;

                    await particles.refresh();
                }
            }
        );

        attractContainer.addProperty(
            "speed",
            "Speed",
            options.speed,
            typeof options.speed,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.speed = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addBubble(): void {
        const particles = this.container.particles;
        const options = this.options.bubble;
        const bubbleContainer = this.container.addContainer("bubble", "Bubble");

        let colorStringValue: string | undefined;

        if (options.color !== undefined) {
            if (typeof options.color === "string") {
                colorStringValue = options.color;
            } else if (options.color instanceof Array) {
                colorStringValue = undefined;
            } else if (typeof options.color.value === "string") {
                colorStringValue = options.color.value;
            } else {
                let rgb = options.color.value as IRgb;
                const hsl = options.color.value as IHsl;

                if (hsl.h !== undefined) {
                    rgb = ColorUtils.hslToRgb(hsl);
                }

                colorStringValue = `${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`;
            }
        }

        bubbleContainer.addProperty(
            "color",
            "Color",
            colorStringValue,
            "color",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    if (typeof options.color === "string") {
                        options.color = value;
                    } else {
                        options.color = {
                            value,
                        };
                    }

                    await particles.refresh();
                }
            }
        );

        bubbleContainer.addProperty(
            "distance",
            "Distance",
            options.distance,
            typeof options.distance,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.distance = value;

                    await particles.refresh();
                }
            }
        );

        bubbleContainer.addProperty(
            "duration",
            "Duration",
            options.duration,
            typeof options.duration,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.duration = value;

                    await particles.refresh();
                }
            }
        );

        const opacityInput = bubbleContainer.addProperty(
            "opacity",
            "Opacity",
            options.opacity,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.opacity = value;

                    await particles.refresh();
                }
            }
        ) as EditorNumberInput;

        opacityInput.step(0.01).min(0).max(1);

        bubbleContainer.addProperty(
            "size",
            "Size",
            options.size,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.size = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addConnect(): void {
        const particles = this.container.particles;
        const options = this.options.connect;
        const connectContainer = this.container.addContainer("connect", "Connect");

        connectContainer.addProperty(
            "distance",
            "Distance",
            options.distance,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.distance = value;

                    await particles.refresh();
                }
            }
        );

        const connectLinksContainer = connectContainer.addContainer("links", "Links");

        const opacityInput = connectLinksContainer.addProperty(
            "opacity",
            "Opacity",
            options.links.opacity,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.links.opacity = value;

                    await particles.refresh();
                }
            }
        ) as EditorNumberInput;

        opacityInput.step(0.01).min(0).max(1);

        connectContainer.addProperty(
            "radius",
            "Radius",
            options.radius,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.radius = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addGrab(): void {
        const particles = this.container.particles;
        const options = this.options.grab;
        const connectContainer = this.container.addContainer("grab", "Grab");

        connectContainer.addProperty(
            "distance",
            "Distance",
            options.distance,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.distance = value;

                    await particles.refresh();
                }
            }
        );

        const grabLinksContainer = connectContainer.addContainer("links", "Links");

        let colorStringValue: string | undefined;

        if (options.links.color !== undefined) {
            if (typeof options.links.color === "string") {
                colorStringValue = options.links.color;
            } else if (options.links.color instanceof Array) {
                colorStringValue = undefined;
            } else if (typeof options.links.color.value === "string") {
                colorStringValue = options.links.color.value;
            } else {
                let rgb = options.links.color.value as IRgb;
                const hsl = options.links.color.value as IHsl;

                if (hsl.h !== undefined) {
                    rgb = ColorUtils.hslToRgb(hsl);
                }

                colorStringValue = `${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`;
            }
        }

        grabLinksContainer.addProperty(
            "color",
            "Color",
            colorStringValue,
            "color",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    if (typeof options.links.color === "string") {
                        options.links.color = value;
                    } else {
                        options.links.color = {
                            value,
                        };
                    }

                    await particles.refresh();
                }
            }
        );

        const opacityInput = grabLinksContainer.addProperty(
            "opacity",
            "Opacity",
            options.links.opacity,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.links.opacity = value;

                    await particles.refresh();
                }
            }
        ) as EditorNumberInput;

        opacityInput.step(0.01).min(0).max(1);
    }

    private addPush(): void {
        const particles = this.container.particles;
        const options = this.options.push;
        const pushContainer = this.container.addContainer("push", "Push");

        pushContainer.addProperty(
            "quantity",
            "Quantity",
            options.quantity,
            typeof options.quantity,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.quantity = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addRemove(): void {
        const particles = this.container.particles;
        const options = this.options.remove;
        const pushContainer = this.container.addContainer("remove", "Remove");

        pushContainer.addProperty(
            "remove",
            "Remove",
            options.quantity,
            typeof options.quantity,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.quantity = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addRepulse(): void {
        const particles = this.container.particles;
        const options = this.options.repulse;
        const repulseContainer = this.container.addContainer("repulse", "Repulse");

        repulseContainer.addProperty(
            "distance",
            "Distance",
            options.distance,
            typeof options.distance,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.distance = value;

                    await particles.refresh();
                }
            }
        );

        repulseContainer.addProperty(
            "duration",
            "Duration",
            options.duration,
            typeof options.duration,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.duration = value;

                    await particles.refresh();
                }
            }
        );

        repulseContainer.addProperty(
            "speed",
            "Speed",
            options.speed,
            typeof options.speed,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.speed = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addSlow(): void {
        const particles = this.container.particles;
        const options = this.options.slow;
        const slowContainer = this.container.addContainer("slow", "Slow");

        slowContainer.addProperty(
            "factor",
            "Factor",
            options.factor,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.factor = value;

                    await particles.refresh();
                }
            }
        );

        slowContainer.addProperty(
            "radius",
            "Radius",
            options.radius,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.radius = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addTrail(): void {
        const particles = this.container.particles;
        const options = this.options.trail;
        const trailContainer = this.container.addContainer("trail", "Trail");

        trailContainer.addProperty(
            "delay",
            "Delay",
            options.delay,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.delay = value;

                    await particles.refresh();
                }
            }
        );

        trailContainer.addProperty(
            "quantity",
            "Quantity",
            options.quantity,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.quantity = value;

                    await particles.refresh();
                }
            }
        );

        // TODO: Particles customization is not ready yet
    }
}
