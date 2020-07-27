import { EditorContainer } from "../../../../Editors/EditorContainer";
import { Container } from "tsparticles/dist/Core/Container";
import { ICollisions } from "tsparticles/dist/Options/Interfaces/Particles/ICollisions";

export class CollisionsOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: ICollisions) {
        this.container = parent.addContainer("collisions", "Collisions");
        this.particles = this.container.particles;

        this.addCollisions();
    }

    private addCollisions(): void {}
}
