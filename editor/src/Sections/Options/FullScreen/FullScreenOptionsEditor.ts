import type { Container, IFullScreen } from "tsparticles-engine";
import { EditorBase } from "../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class FullScreenOptionsEditor extends EditorBase {
    private group!: EditorGroup;
    private options!: () => IFullScreen;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("fullScreen", "Full Screen");
        this.options = this.group.data as () => IFullScreen;

        this.addProperties();
    }

    private addProperties(): void {
        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("zIndex", "zIndex", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }
}
