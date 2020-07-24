import type { EditorContainer } from "../../../../Editors/EditorContainer";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IParticlesNumber } from "tsparticles/dist/Options/Interfaces/Particles/IParticlesNumber";
import { IModes } from "tsparticles/dist/Options/Interfaces/Interactivity/Modes/IModes";
import { EditorNumberInput } from "../../../../Editors/EditorNumberInput";
import { IRgb } from "tsparticles/dist/Core/Interfaces/IRgb";
import { IHsl } from "tsparticles/dist/Core/Interfaces/IHsl";
import { ColorUtils } from "tsparticles";

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

        (opacityInput.element as HTMLInputElement).step = "0.01";
        (opacityInput.element as HTMLInputElement).min = "0";
        (opacityInput.element as HTMLInputElement).max = "1";

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

    private addConnect(): void {}

    private addGrab(): void {}

    private addPush(): void {}

    private addRemove(): void {}

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

    private addSlow(): void {}

    private addTrail(): void {}
}
