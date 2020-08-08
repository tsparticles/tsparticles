import { Container } from "tsparticles/dist/Core/Container";
import { IInfection } from "tsparticles/dist/Options/Interfaces/Infection/IInfection";
import { IInfectionStage } from "tsparticles/dist/Options/Interfaces/Infection/IInfectionStage";
import { EditorGroup, ColorUtils, IRgb, IHsl } from "object-gui";

export class InfectionOptionsEditor {
    public readonly group: EditorGroup;
    private readonly options: IInfection;

    constructor(private readonly parent: EditorGroup, private readonly particles: Container) {
        this.group = parent.addGroup("infection", "Infection");
        this.options = this.group.data as IInfection;

        this.addStages();
        this.addProperties();
    }

    private addProperties() {
        const particles = this.particles;
        const options = this.options;

        this.group.addProperty("cure", "Cure", options.cure, typeof options.cure, async () => {
            await particles.refresh();
        });

        this.group.addProperty("delay", "Delay", options.delay, typeof options.delay, async () => {
            await particles.refresh();
        });

        this.group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });

        this.group.addProperty("infections", "Infections", options.infections, typeof options.infections, async () => {
            await particles.refresh();
        });
    }

    private addStages() {
        const particles = this.particles;
        const options = this.options;
        const stagesGroup = this.group.addGroup("stages", "Stages");

        for (let i = 0; i < options.stages.length; i++) {
            const stage = options.stages[i];

            this.addStage(stagesGroup, stage, i + 1);
        }

        stagesGroup.addButton(
            "addStage",
            "Add Stage",
            () => {
                const defaultValues = {
                    color: {
                        value: "#ff0000",
                    },
                    radius: 0,
                    rate: 1,
                };

                options.stages.push(defaultValues);

                this.addStage(stagesGroup, defaultValues, options.stages.length);

                particles.refresh();
            },
            false
        );
    }

    private addStage(parent: EditorGroup, stage: IInfectionStage, index: number) {
        const particles = this.particles;
        const stageGroup = parent.addGroup(`stage_${index}`, `Stage ${index}`, stage);

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

        stageGroup.addProperty(
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
            },
            false
        );

        stageGroup.addProperty("duration", "Duration", stage.duration, typeof stage.duration, async () => {
            await particles.refresh();
        });

        stageGroup.addProperty("infectedStage", "Infected Stage", stage.infectedStage, "number", async () => {
            await particles.refresh();
        });

        stageGroup.addProperty("radius", "Radius", stage.radius, typeof stage.radius, async () => {
            await particles.refresh();
        });

        stageGroup.addProperty("rate", "Rate", stage.rate, typeof stage.rate, async () => {
            await particles.refresh();
        });
    }
}
