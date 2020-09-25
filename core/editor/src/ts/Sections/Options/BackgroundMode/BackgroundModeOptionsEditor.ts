import type { Container } from "tsparticles/dist/Core/Container";
import { EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../EditorBase";
import { IBackgroundMode } from "tsparticles/dist/Options/Interfaces/BackgroundMode/IBackgroundMode";

export class BackgroundModeOptionsEditor extends EditorBase {
    private group!: EditorGroup;
    private options!: IBackgroundMode;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("backgroundMode", "Background Mode");
        this.options = this.group.data as IBackgroundMode;

        this.addProperties();
    }

    private addProperties(): void {
        const particles = this.particles;
        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("zIndex", "zIndex", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
