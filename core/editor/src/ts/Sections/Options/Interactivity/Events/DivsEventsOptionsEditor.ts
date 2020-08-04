import { EditorContainer } from "object-gui";
import { Container } from "tsparticles/dist/Core/Container";
import type { SingleOrMultiple } from "tsparticles";
import type { IDivEvent } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IDivEvent";

export class DivsEventsOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: SingleOrMultiple<IDivEvent>) {
        this.container = parent.addContainer("onDiv", "Divs Events");
        this.particles = this.container.data as Container;

        this.addDivs();
    }

    private addDivs(): void {
        const particles = this.particles;
        const options = this.options;
        const divsContainer = this.container;
    }
}
