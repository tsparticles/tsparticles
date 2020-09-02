import { ColorUtils, EditorGroup, IHsl, IRgb, EditorType } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IMove } from "tsparticles/dist/Options/Interfaces/Particles/Move/IMove";
import { MoveDirection, OutMode } from "tsparticles";
import { EditorBase } from "../../../../EditorBase";
import { ITrail } from "tsparticles/dist/Options/Interfaces/Particles/Move/ITrail";

export class MoveOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IMove;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("move", "Move");
        this.options = this.group.data as IMove;

        this.addAngle();
        this.addAttract();
        this.addGravity();
        this.addNoise();
        this.addTrail();
        this.addProperties();
    }

    private addAngle(): void {
        const particles = this.particles;
        const group = this.group.addGroup("angle", "Angle");

        group.addProperty("angle", "Angle", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("offset", "Offset", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addAttract(): void {
        const particles = this.particles;
        const group = this.group.addGroup("attract", "Attract");

        const rotateGroup = group.addGroup("rotate", "Rotate", false);

        rotateGroup.addProperty("x", "X", EditorType.number).change(async () => {
            await particles.refresh();
        });

        rotateGroup.addProperty("y", "Y", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }

    private addGravity(): void {
        const particles = this.particles;
        const group = this.group.addGroup("gravity", "Gravity");

        group.addProperty("acceleration", "Acceleration", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("maxSpeed", "Max Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addNoise(): void {
        const particles = this.particles;
        const group = this.group.addGroup("noise", "Noise");
        const delayGroup = group.addGroup("delay", "Delay");

        delayGroup.addProperty("value", "value", EditorType.number).change(async () => {
            await particles.refresh();
        });

        const randomGroup = delayGroup.addGroup("random", "Random");

        randomGroup.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        randomGroup.addProperty("minimumValue", "Minimum Value", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }

    private addTrail(): void {
        const particles = this.particles;
        const group = this.group.addGroup("trail", "Trail");
        const options = group.data as ITrail;

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        let fillColorStringValue: string | undefined;

        if (options?.fillColor) {
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
        }

        group
            .addProperty("fillColor", "Fill Color", EditorType.color, fillColorStringValue, false)
            .change(async (value: unknown) => {
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
                }

                await particles.refresh();
            });

        group.addProperty("length", "Length", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;
        const group = this.group;

        group
            .addProperty("direction", "Direction", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems([
                {
                    value: MoveDirection.bottom,
                },
                {
                    value: MoveDirection.bottomLeft,
                },
                {
                    value: MoveDirection.bottomRight,
                },
                {
                    value: MoveDirection.left,
                },
                {
                    value: MoveDirection.none,
                },
                {
                    value: MoveDirection.right,
                },
                {
                    value: MoveDirection.top,
                },
                {
                    value: MoveDirection.topLeft,
                },
                {
                    value: MoveDirection.topRight,
                },
            ]);

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group
            .addProperty("outMode", "Out Mode", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems([
                {
                    value: OutMode.bounce,
                },
                {
                    value: OutMode.bounceHorizontal,
                },
                {
                    value: OutMode.bounceVertical,
                },
                {
                    value: OutMode.destroy,
                },
                {
                    value: OutMode.out,
                },
            ]);

        group.addProperty("random", "Random", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("straight", "Straight", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("vibrate", "Vibrate", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("warp", "Warp", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }
}
