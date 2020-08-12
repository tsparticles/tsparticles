import { Container } from "tsparticles/dist/Core/Container";
import { IInfection } from "tsparticles/dist/Options/Interfaces/Infection/IInfection";
import { IInfectionStage } from "tsparticles/dist/Options/Interfaces/Infection/IInfectionStage";
import { ColorUtils, EditorGroup, IHsl, IRgb, EditorType } from "object-gui";
import { EditorBase } from "../../../EditorBase";

export class InfectionOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IInfection;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("infection", "Infection");
        this.options = this.group.data as IInfection;

        this.addStages();
        this.addProperties();
    }

    private addProperties() {
        const particles = this.particles;

        this.group.addProperty("cure", "Cure", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("delay", "Delay", EditorType.number).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("infections", "Infections", EditorType.number).change(async () => {
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

        stagesGroup.addButton("addStage", "Add Stage", false).click(async () => {
            const defaultValues = {
                color: {
                    value: "#ff0000",
                },
                radius: 0,
                rate: 1,
            };

            options.stages.push(defaultValues);

            this.addStage(stagesGroup, defaultValues, options.stages.length);

            await particles.refresh();
        });
    }

    private addStage(parent: EditorGroup, stage: IInfectionStage, index: number) {
        const particles = this.particles;
        const stageGroup = parent.addGroup(`stage_${index}`, `Stage ${index}`, true, stage);

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

        stageGroup
            .addProperty("color", "Color", EditorType.color, colorStringValue, false)
            .change(async (value: unknown) => {
                if (typeof value === "string") {
                    if (typeof stage.color === "string") {
                        stage.color = value;
                    } else {
                        stage.color = {
                            value,
                        };
                    }
                }

                await particles.refresh();
            });

        stageGroup.addProperty("duration", "Duration", EditorType.number).change(async () => {
            await particles.refresh();
        });

        stageGroup.addProperty("infectedStage", "Infected Stage", EditorType.number).change(async () => {
            await particles.refresh();
        });

        stageGroup.addProperty("radius", "Radius", EditorType.number).change(async () => {
            await particles.refresh();
        });

        stageGroup.addProperty("rate", "Rate", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
