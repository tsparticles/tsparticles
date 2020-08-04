import { EditorContainer, ColorUtils, IRgb, IHsl, EditorSelectInput } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IMove } from "tsparticles/dist/Options/Interfaces/Particles/Move/IMove";
import type { IMoveAngle } from "tsparticles/dist/Options/Interfaces/Particles/Move/IMoveAngle";
import { MoveDirection, OutMode } from "tsparticles";

export class MoveOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IMove) {
        this.container = parent.addContainer("move", "Move");
        this.particles = this.container.data as Container;

        this.addAngle();
        this.addAttract();
        this.addNoise();
        this.addTrail();
        this.addProperties();
    }

    private addAngle(): void {
        const particles = this.particles;
        const container = this.container.addContainer("angle", "Angle");
        const options = this.options.angle as IMoveAngle;

        container.addProperty(
            "angle",
            "Angle",
            options.value,
            typeof options.value,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.value = value;

                    await particles.refresh();
                }
            }
        );

        container.addProperty(
            "offset",
            "Offset",
            options.offset,
            typeof options.offset,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.offset = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addAttract(): void {
        const particles = this.particles;
        const container = this.container.addContainer("attract", "Attract");
        const options = this.options.attract;

        container.addProperty(
            "enable",
            "Enable",
            options.enable,
            typeof options.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.enable = value;

                    await particles.refresh();
                }
            }
        );

        const rotateContainer = container.addContainer("rotate", "Rotate", false);

        rotateContainer.addProperty(
            "x",
            "X",
            options.rotate.x,
            typeof options.rotate.x,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.rotate.x = value;

                    await particles.refresh();
                }
            }
        );

        rotateContainer.addProperty(
            "y",
            "Y",
            options.rotate.y,
            typeof options.rotate.y,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.rotate.y = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addNoise(): void {
        const particles = this.particles;
        const container = this.container.addContainer("noise", "Noise");
        const options = this.options.noise;

        const delayContainer = container.addContainer("delay", "Delay");

        delayContainer.addProperty(
            "value",
            "value",
            options.delay.value,
            typeof options.delay.value,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.delay.value = value;

                    await particles.refresh();
                }
            }
        );

        const randomContainer = delayContainer.addContainer("random", "Random");

        randomContainer.addProperty(
            "enable",
            "Enable",
            options.delay.random.enable,
            typeof options.delay.random.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.delay.random.enable = value;

                    await particles.refresh();
                }
            }
        );

        randomContainer.addProperty(
            "minimumValue",
            "Minimum Value",
            options.delay.random.minimumValue,
            typeof options.delay.random.minimumValue,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.delay.random.minimumValue = value;

                    await particles.refresh();
                }
            }
        );

        container.addProperty(
            "enable",
            "Enable",
            options.enable,
            typeof options.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.enable = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addTrail(): void {
        const particles = this.particles;
        const container = this.container.addContainer("trail", "Trail");
        const options = this.options.trail;

        container.addProperty(
            "enable",
            "Enable",
            options.enable,
            typeof options.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.enable = value;

                    await particles.refresh();
                }
            }
        );

        let fillColorStringValue: string;

        if (typeof options.fillColor === "string") {
            fillColorStringValue = options.fillColor;
        } else if (typeof options.fillColor.value === "string") {
            fillColorStringValue = options.fillColor.value;
        } else {
            let rgb = options.fillColor.value as IRgb;
            const hsl = options.fillColor.value as IHsl;

            if (hsl.h !== undefined) {
                rgb = ColorUtils.hslToRgb(hsl);
            }

            fillColorStringValue = `${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`;
        }

        container.addProperty(
            "fillColor",
            "Fill Color",
            fillColorStringValue,
            "color",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    if (typeof options.fillColor === "string") {
                        options.fillColor = value;
                    } else {
                        if (options.fillColor === undefined) {
                            options.fillColor = {
                                value: value,
                            };
                        } else {
                            options.fillColor.value = value;
                        }
                    }

                    await particles.refresh();
                }
            }
        );

        container.addProperty(
            "length",
            "Length",
            options.length,
            typeof options.length,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.length = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;
        const container = this.container;

        const directionSelectInput = container.addProperty(
            "direction",
            "Direction",
            options.direction,
            "select",
            async (value: number | string | boolean) => {
                switch (value as string) {
                    case MoveDirection.bottom:
                    case MoveDirection.bottomLeft:
                    case MoveDirection.bottomRight:
                    case MoveDirection.left:
                    case MoveDirection.none:
                    case MoveDirection.right:
                    case MoveDirection.top:
                    case MoveDirection.topLeft:
                    case MoveDirection.topRight:
                        options.direction = value as MoveDirection;

                        await particles.refresh();
                        break;
                }
            }
        ) as EditorSelectInput;

        directionSelectInput.addItem(MoveDirection.bottom);
        directionSelectInput.addItem(MoveDirection.bottomLeft);
        directionSelectInput.addItem(MoveDirection.bottomRight);
        directionSelectInput.addItem(MoveDirection.left);
        directionSelectInput.addItem(MoveDirection.none);
        directionSelectInput.addItem(MoveDirection.right);
        directionSelectInput.addItem(MoveDirection.top);
        directionSelectInput.addItem(MoveDirection.topLeft);
        directionSelectInput.addItem(MoveDirection.topRight);

        container.addProperty(
            "enable",
            "Enable",
            options.enable,
            typeof options.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.enable = value;

                    await particles.refresh();
                }
            }
        );

        const outModeSelectInput = container.addProperty(
            "outMode",
            "Out Mode",
            options.outMode,
            "select",
            async (value: number | string | boolean) => {
                switch (value as string) {
                    case OutMode.bounce:
                    case OutMode.bounceHorizontal:
                    case OutMode.bounceVertical:
                    case OutMode.destroy:
                    case OutMode.out:
                        options.outMode = value as OutMode;

                        await particles.refresh();
                        break;
                }
            }
        ) as EditorSelectInput;

        outModeSelectInput.addItem(OutMode.bounce);
        outModeSelectInput.addItem(OutMode.bounceHorizontal);
        outModeSelectInput.addItem(OutMode.bounceVertical);
        outModeSelectInput.addItem(OutMode.destroy);
        outModeSelectInput.addItem(OutMode.out);

        container.addProperty(
            "random",
            "Random",
            options.random,
            typeof options.random,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.random = value;

                    await particles.refresh();
                }
            }
        );

        container.addProperty(
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

        container.addProperty(
            "straight",
            "Straight",
            options.straight,
            typeof options.straight,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.straight = value;

                    await particles.refresh();
                }
            }
        );

        container.addProperty(
            "vibrate",
            "Vibrate",
            options.vibrate,
            typeof options.vibrate,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.vibrate = value;

                    await particles.refresh();
                }
            }
        );

        container.addProperty(
            "warp",
            "Warp",
            options.warp,
            typeof options.warp,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.warp = value;

                    await particles.refresh();
                }
            }
        );
    }
}
