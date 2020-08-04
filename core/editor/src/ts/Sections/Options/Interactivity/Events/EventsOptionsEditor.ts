import type { EditorContainer } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IEvents } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IEvents";
import { ClickEventsOptionsEditor } from "./ClickEventsOptionsEditor";
import { HoverEventsOptionsEditor } from "./HoverEventsOptionsEditor";
import { DivsEventsOptionsEditor } from "./DivsEventsOptionsEditor";

export class EventsOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IEvents) {
        this.container = parent.addContainer("events", "Events");
        this.particles = this.container.data as Container;

        this.addClick();
        this.addDivs();
        this.addHover();
        this.addProperties();
    }

    private addClick(): void {
        const clickEditor = new ClickEventsOptionsEditor(this.container, this.options.onClick);
    }

    private addDivs(): void {
        const divsEditor = new DivsEventsOptionsEditor(this.container, this.options.onDiv);
    }

    private addHover(): void {
        const hoverEditor = new HoverEventsOptionsEditor(this.container, this.options.onHover);
    }

    private addProperties(): void {
        const particles = this.particles;
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
