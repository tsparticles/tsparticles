import { EditorGroup, ColorUtils, IRgb, IHsl, EditorSelectInput } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IMove } from "tsparticles/dist/Options/Interfaces/Particles/Move/IMove";
import type { IMoveAngle } from "tsparticles/dist/Options/Interfaces/Particles/Move/IMoveAngle";
import { MoveDirection, OutMode } from "tsparticles";

export class MoveOptionsEditor {
    public readonly group: EditorGroup;
    private readonly options: IMove;

    constructor(private readonly parent: EditorGroup, private readonly particles: Container) {
        this.group = parent.addGroup("move", "Move");
        this.options = this.group.data as IMove;

        this.addAngle();
        this.addAttract();
        this.addNoise();
        this.addTrail();
        this.addProperties();
    }

    private addAngle(): void {
        const particles = this.particles;
        const group = this.group.addGroup("angle", "Angle");
        const options = this.options.angle as IMoveAngle;

        group.addProperty("angle", "Angle", options.value, typeof options.value, async () => {
            await particles.refresh();
        });

        group.addProperty("offset", "Offset", options.offset, typeof options.offset, async () => {
            await particles.refresh();
        });
    }

    private addAttract(): void {
        const particles = this.particles;
        const group = this.group.addGroup("attract", "Attract");
        const options = this.options.attract;

        const rotateOptions = options.rotate;
        const rotateGroup = group.addGroup("rotate", "Rotate", undefined, false);

        rotateGroup.addProperty("x", "X", rotateOptions.x, typeof rotateOptions.x, async () => {
            await particles.refresh();
        });

        rotateGroup.addProperty("y", "Y", rotateOptions.y, typeof rotateOptions.y, async () => {
            await particles.refresh();
        });

        group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });
    }

    private addNoise(): void {
        const particles = this.particles;
        const group = this.group.addGroup("noise", "Noise");
        const options = this.options.noise;
        const delayGroup = group.addGroup("delay", "Delay");
        const delayOptions = options.delay;

        delayGroup.addProperty("value", "value", delayOptions.value, typeof delayOptions.value, async () => {
            await particles.refresh();
        });

        const randomGroup = delayGroup.addGroup("random", "Random");
        const randomOptions = delayOptions.random;

        randomGroup.addProperty("enable", "Enable", randomOptions.enable, typeof randomOptions.enable, async () => {
            await particles.refresh();
        });

        randomGroup.addProperty(
            "minimumValue",
            "Minimum Value",
            randomOptions.minimumValue,
            typeof randomOptions.minimumValue,
            async () => {
                await particles.refresh();
            }
        );

        group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });
    }

    private addTrail(): void {
        const particles = this.particles;
        const group = this.group.addGroup("trail", "Trail");
        const options = this.options.trail;

        group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });

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

        group.addProperty(
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
            },
            false
        );

        group.addProperty("length", "Length", options.length, typeof options.length, async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;
        const group = this.group;

        const directionSelectInput = group.addProperty(
            "direction",
            "Direction",
            options.direction,
            "select",
            async () => {
                await particles.refresh();
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

        group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });

        const outModeSelectInput = group.addProperty("outMode", "Out Mode", options.outMode, "select", async () => {
            await particles.refresh();
        }) as EditorSelectInput;

        outModeSelectInput.addItem(OutMode.bounce);
        outModeSelectInput.addItem(OutMode.bounceHorizontal);
        outModeSelectInput.addItem(OutMode.bounceVertical);
        outModeSelectInput.addItem(OutMode.destroy);
        outModeSelectInput.addItem(OutMode.out);

        group.addProperty("random", "Random", options.random, typeof options.random, async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", options.speed, typeof options.speed, async () => {
            await particles.refresh();
        });

        group.addProperty("straight", "Straight", options.straight, typeof options.straight, async () => {
            await particles.refresh();
        });

        group.addProperty("vibrate", "Vibrate", options.vibrate, typeof options.vibrate, async () => {
            await particles.refresh();
        });

        group.addProperty("warp", "Warp", options.warp, typeof options.warp, async () => {
            await particles.refresh();
        });
    }
}
