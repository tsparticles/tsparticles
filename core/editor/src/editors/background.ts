import { GUI } from "dat.gui";
import { Container } from "tsparticles/dist/Core/Container";
import { changeHandler } from "../utils";

const addBackground = (gui: GUI, container: Container): void => {
    const fBg = gui.addFolder("background");

    if (container.options.background.color) {
        const fBgColor = fBg.addFolder("color");

        fBgColor.addColor(container.options.background.color, "value").onChange(async () => changeHandler(container));

        fBgColor.open();
    }

    if (container.options.background.image) {
        fBg.add(container.options.background, "image").onChange(async () => changeHandler(container));
    }

    if (container.options.background.opacity) {
        fBg.add(container.options.background, "opacity").onChange(async () => changeHandler(container));
    }

    if (container.options.background.position) {
        fBg.add(container.options.background, "position").onChange(async () => changeHandler(container));
    }

    if (container.options.background.repeat) {
        fBg.add(container.options.background, "repeat").onChange(async () => changeHandler(container));
    }

    if (container.options.background.size) {
        fBg.add(container.options.background, "size").onChange(async () => changeHandler(container));
    }

    fBg.open();
};

export { addBackground };
