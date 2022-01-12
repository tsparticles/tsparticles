import { EditorGroup, EditorType } from "object-gui";
import type { Container, IMove, IMoveTrail } from "tsparticles-engine";
import { MoveDirection, OutMode } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";

export class MoveOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IMove;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("move", "Move");
        this.options = this.group.data as IMove;

        this.addAngle();
        this.addAttract();
        this.addDistance();
        this.addGravity();
        this.addOutModes();
        this.addPath();
        this.addTrail();
        this.addProperties();
    }

    private addAngle(): void {
        const particles = this.particles;
        const group = this.group.addGroup("angle", "Angle");

        group.addProperty("offset", "Offset", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
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

    private addDistance(): void {
        const particles = this.particles;
        const group = this.group.addGroup("distance", "Distance");

        group.addProperty("horizontal", "Horizontal", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("vertical", "Vertical", EditorType.number).change(async () => {
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

    private addOutModes(): void {
        const particles = this.particles;
        const group = this.group.addGroup("outModes", "Out Modes");

        const outModesValues = [
            {
                value: OutMode.bounce,
            },
            {
                value: OutMode.destroy,
            },
            {
                value: OutMode.none,
            },
            {
                value: OutMode.split,
            },
            {
                value: OutMode.out,
            },
        ];

        group
            .addProperty("bottom", "Bottom", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems(outModesValues);

        group
            .addProperty("default", "Default", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems(outModesValues);

        group
            .addProperty("left", "Left", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems(outModesValues);

        group
            .addProperty("right", "Right", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems(outModesValues);

        group
            .addProperty("top", "Top", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems(outModesValues);
    }

    private addPath(): void {
        const particles = this.particles;
        const group = this.group.addGroup("path", "Path");
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

        group.addProperty("clamp", "Clamp", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("generator", "Generator", EditorType.string).change(async () => {
            await particles.refresh();
        });
    }

    private addTrail(): void {
        const particles = this.particles;
        const group = this.group.addGroup("trail", "Trail");
        const options = group.data as IMoveTrail;
        const color = typeof options.fillColor === "string" ? options.fillColor : options.fillColor?.value;

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("fillColor", "Fill Color", EditorType.color, color, false).change(async (value: unknown) => {
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

        group.addProperty("drift", "Drift", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("random", "Random", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("size", "Size", EditorType.boolean).change(async () => {
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
