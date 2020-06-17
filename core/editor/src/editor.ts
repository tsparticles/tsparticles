import { GUI } from "dat.gui";
import { Container } from "tsparticles/dist/Core/Container";
import { addOptions } from "./editors/options";
import { IEditorSettings } from "./IEditorSettings";

function addEditor(container: Container, params?: IEditorSettings): void {
    const settings = params ?? {
        buttons: true,
        options: true
    };

    const gui = new GUI();

    if (settings.options) {
        addOptions(gui, container);
    }

    if (settings.buttons) {
        gui.add(container, "play");
        gui.add(container, "pause");
        gui.add(container, "refresh");
        gui.add(container, "start");
        gui.add(container, "stop");
    }
}

export type { IEditorSettings };
export { addEditor };