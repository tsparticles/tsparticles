import { GUI } from "dat.gui";
import { Container } from "tsparticles/dist/Core/Container";
import { addBackground } from "./background";
import { addInteractivity } from "./interactivity";
import { changeHandler } from "../utils";
import { addParticles } from "./particles";

const addOptions = (gui: GUI, container: Container): void => {
    const fOptions = gui.addFolder("options");

    addBackground(fOptions, container);
    addInteractivity(fOptions, container);
    addParticles(fOptions, container);

    fOptions.add(container.options, "fpsLimit", 0, 60).onChange(async () => changeHandler(container));
    fOptions.add(container.options, "detectRetina").onChange(async () => changeHandler(container));
    fOptions.add(container.options, "pauseOnBlur").onChange(async () => changeHandler(container));

    fOptions.open();
};

export { addOptions };
