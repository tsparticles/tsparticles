import { Container } from "tsparticles/dist/Core/Container";
import { changeHandler } from "../utils";

const addInfection = (container: Container): void => {
    /*const fInfection = addFolder("infection");

    fInfection.add(container.options.infection, "cure").onChange(async () => changeHandler(container));
    fInfection
        .add(container.options.infection, "delay")
        .min(0)
        .max(5)
        .step(0.1)
        .onChange(async () => changeHandler(container));
    fInfection.add(container.options.infection, "enable").onChange(async () => changeHandler(container));
    fInfection
        .add(container.options.infection, "infections")
        .min(0)
        .max(50)
        .onChange(async () => changeHandler(container));

    container.options.infection.stages.forEach((value, index) => {
        const fItem = fInfection.addFolder(index.toString(10));

        const fColor = fItem.addFolder("color");

        fColor.addColor(value.color, "value").onChange(async () => changeHandler(container));

        if (value.duration !== undefined) {
            fItem
                .add(value, "duration")
                .step(0.1)
                .min(0)
                .max(5)
                .onChange(async () => changeHandler(container));
        }

        if (value.infectedStage !== undefined) {
            fItem
                .add(value, "infectedStage")
                .min(0)
                .onChange(async () => changeHandler(container));
        }

        fItem
            .add(value, "radius")
            .min(0)
            .max(100)
            .onChange(async () => changeHandler(container));
        fItem
            .add(value, "rate")
            .min(0)
            .max(50)
            .onChange(async () => changeHandler(container));
    });
     */
};

export { addInfection };
