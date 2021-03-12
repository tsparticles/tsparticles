import type { Container } from "tsparticles-engine";
import { EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../EditorBase";
import type { IInfection } from "tsparticles-plugin-infection/Options/Interfaces/IInfection";
import type { IInfectionStage } from "tsparticles-plugin-infection/Options/Interfaces/IInfectionStage";

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
            this.addStage(stagesGroup, options.stages, i + 1);
        }

        stagesGroup.addButton("addStage", "Add Stage", false).click(async () => {
            this.addStage(stagesGroup, options.stages, options.stages.length);

            await particles.refresh();
        });
    }

    private addStage(parent: EditorGroup, stages: IInfectionStage[], index: number) {
        const particles = this.particles;
        const stageGroup = parent.addGroup(index.toString(10), `Stage ${index}`, true, stages);
        const stage = stageGroup.data as IInfectionStage;

        stageGroup
            .addProperty("color", "Color", EditorType.color, stage.color, false)
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
