import type { EditorContainer } from "../../../../Editors/EditorContainer";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IParticlesNumber } from "tsparticles/dist/Options/Interfaces/Particles/IParticlesNumber";
import { IEvents } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IEvents";

export class EventsOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IEvents) {
        this.container = parent.addContainer("events", "Events", true);
        this.particles = this.container.particles;

        this.addEvents();
    }

    private addEvents(): void {
        const particles = this.container.particles;
        const options = this.options;

        this.container.addProperty(
            "resize",
            "Resize",
            options.resize,
            typeof options.resize,
            async (value: string | number | boolean) => {
                if (typeof value === "boolean") {
                    options.resize = value;

                    await particles.refresh();
                }
            }
        );
    }
}
