import { Container } from "tsparticles/dist/Core/Container";
import { IInfection } from "tsparticles/dist/Options/Interfaces/Infection/IInfection";
import { IInfectionStage } from "tsparticles/dist/Options/Interfaces/Infection/IInfectionStage";
import { EditorContainer, ColorUtils, IRgb, IHsl } from "object-gui";

export class InfectionOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IInfection) {
        this.container = parent.addContainer("infection", "Infection");
        this.particles = this.container.data as Container;

        this.addStages();
        this.addProperties();
    }

    private addProperties() {
        const particles = this.particles;
        const options = this.options;

        this.container.addProperty(
            "cure",
            "Cure",
            options.cure,
            typeof options.cure,
            async (value: string | number | boolean) => {
                if (typeof value === "boolean") {
                    options.cure = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "delay",
            "Delay",
            options.delay,
            typeof options.delay,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.delay = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "enable",
            "Enable",
            options.enable,
            typeof options.enable,
            async (value: string | number | boolean) => {
                if (typeof value === "boolean") {
                    options.enable = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "infections",
            "Infections",
            options.infections,
            typeof options.infections,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.infections = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addStages() {
        const particles = this.particles;
        const options = this.options;
        const stagesContainer = this.container.addContainer("stages", "Stages");

        for (let i = 0; i < options.stages.length; i++) {
            const stage = options.stages[i];

            this.addStage(stagesContainer, stage, i + 1);
        }

        stagesContainer.addButton("addStage", "Add Stage", () => {
            const defaultValues = {
                color: {
                    value: "#ff0000",
                },
                radius: 0,
                rate: 1,
            };

            options.stages.push(defaultValues);

            this.addStage(stagesContainer, defaultValues, options.stages.length);

            particles.refresh();
        });
    }

    private addStage(parent: EditorContainer, stage: IInfectionStage, index: number) {
        const particles = this.particles;
        const stageContainer = parent.addContainer(`stage_${index}`, `Stage ${index}`);

        let colorStringValue: string | undefined;

        if (stage.color !== undefined) {
            if (typeof stage.color === "string") {
                colorStringValue = stage.color;
            } else if (typeof stage.color.value === "string") {
                colorStringValue = stage.color.value;
            } else {
                let rgb = stage.color.value as IRgb;
                const hsl = stage.color.value as IHsl;

                if (hsl.h !== undefined) {
                    rgb = ColorUtils.hslToRgb(hsl);
                }

                colorStringValue = `${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`;
            }
        }

        stageContainer.addProperty(
            "color",
            "Color",
            colorStringValue,
            "color",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    if (typeof stage.color === "string") {
                        stage.color = value;
                    } else {
                        stage.color = {
                            value,
                        };
                    }

                    await particles.refresh();
                }
            }
        );

        stageContainer.addProperty(
            "duration",
            "Duration",
            stage.duration,
            typeof stage.duration,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    stage.duration = value;

                    await particles.refresh();
                }
            }
        );

        stageContainer.addProperty(
            "infectedStage",
            "Infected Stage",
            stage.infectedStage,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    stage.infectedStage = value;

                    await particles.refresh();
                }
            }
        );

        stageContainer.addProperty(
            "radius",
            "Radius",
            stage.radius,
            typeof stage.radius,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    stage.radius = value;

                    await particles.refresh();
                }
            }
        );

        stageContainer.addProperty(
            "rate",
            "Rate",
            stage.rate,
            typeof stage.rate,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    stage.rate = value;

                    await particles.refresh();
                }
            }
        );
    }
}
