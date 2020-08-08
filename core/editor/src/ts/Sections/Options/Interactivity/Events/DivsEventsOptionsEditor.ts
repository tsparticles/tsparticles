import { EditorGroup } from "object-gui";
import { Container } from "tsparticles/dist/Core/Container";
import type { SingleOrMultiple } from "tsparticles";
import type { IDivEvent } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IDivEvent";

export class DivsEventsOptionsEditor {
    public readonly group: EditorGroup;
    private readonly options: SingleOrMultiple<IDivEvent>;

    constructor(private readonly parent: EditorGroup, private readonly particles: Container) {
        this.group = parent.addGroup("onDiv", "Divs Events");
        this.options = this.group.data as SingleOrMultiple<IDivEvent>;

        this.addDivs();
    }

    private addDivs(): void {
        const particles = this.particles;
        const options = this.options;
        const divsGroups = this.group;
    }
}
