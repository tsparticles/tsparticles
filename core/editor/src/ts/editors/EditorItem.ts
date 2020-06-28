import { Container } from "tsparticles/dist/Core/Container";

export abstract class EditorItem {
    public readonly element!: HTMLElement;

    protected constructor(public readonly container: Container) {
        this.element = this.createElement();
    }

    public abstract createElement(): HTMLElement;
}
