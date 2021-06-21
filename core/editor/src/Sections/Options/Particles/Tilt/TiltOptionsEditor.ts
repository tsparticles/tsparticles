import type { Container } from "tsparticles";
import { EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";
import { TiltDirection } from "tsparticles";
import type { ITilt } from "tsparticles/dist/Options/Interfaces/Particles/Tilt/ITilt";

export class TiltOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: ITilt;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("tilt", "Tilt");
        this.options = this.group.data as ITilt;

        this.addAnimation();
        this.addProperties();
    }

    private addAnimation(): void {
        const group = this.group.addGroup("animation", "Animation");
        const particles = this.particles;

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("sync", "Sync", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group
            .addProperty("direction", "Direction", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems([
                {
                    value: TiltDirection.clockwise,
                },
                {
                    value: TiltDirection.counterClockwise,
                },
                {
                    value: TiltDirection.random,
                },
            ]);

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("random", "Random", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
