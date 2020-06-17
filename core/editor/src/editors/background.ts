import { GUI } from "dat.gui";
import { Container } from "tsparticles/dist/Core/Container";
import { changeHandler } from "../utils";

export function addBackground(gui: GUI, container: Container) {
    const fBg = gui.addFolder("background");

    if (container.options.background.color) {
        const fBgColor = fBg.addFolder("color");

        fBgColor
            .addColor(container.options.background.color, "value")
            .onChange(async (v) => await changeHandler(container));

        fBgColor.open();
    }

    if (container.options.background.image) {
        fBg.add(container.options.background, "image").onChange(async () => await changeHandler(container));
    }

    if (container.options.background.opacity) {
        fBg.add(container.options.background, "opacity").onChange(async () => await changeHandler(container));
    }

    if (container.options.background.position) {
        fBg.add(container.options.background, "position").onChange(async () => await changeHandler(container));
    }

    if (container.options.background.repeat) {
        fBg.add(container.options.background, "repeat").onChange(async () => await changeHandler(container));
    }

    if (container.options.background.size) {
        fBg.add(container.options.background, "size").onChange(async () => await changeHandler(container));
    }

    fBg.open();
}