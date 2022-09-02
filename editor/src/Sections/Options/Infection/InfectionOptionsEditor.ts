import type { IInfection, IInfectionStage } from "tsparticles-plugin-infection";
import type { Container } from "tsparticles-engine";
import { EditorBase } from "../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class InfectionOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IInfection;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("infection", "Infection");
        this.options = this.group.data as () => IInfection;

        this.addStages();
        this.addProperties();
    }

    private addProperties(): void {
        this.group.addProperty("cure", "Cure", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("delay", "Delay", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("infections", "Infections", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addStage(parent: EditorGroup, stages: () => IInfectionStage[], index: () => number): void {
        const stageGroup = parent.addGroup(index().toString(10), `Stage ${index}`, true, stages);
        const stage = stageGroup.data as () => IInfectionStage;

        stageGroup
            .addProperty("color", "Color", EditorType.color, stage().color, false)
            .change(async (value: unknown) => {
                if (typeof value === "string") {
                    if (typeof stage().color === "string") {
                        stage().color = value;
                    } else {
                        stage().color = {
                            value,
                        };
                    }
                }

                await this.particles().refresh();
            });

        stageGroup.addProperty("duration", "Duration", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        stageGroup.addProperty("infectedStage", "Infected Stage", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        stageGroup.addProperty("radius", "Radius", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        stageGroup.addProperty("rate", "Rate", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addStages(): void {
        const options = this.options();
        const stagesGroup = this.group.addGroup("stages", "Stages");

        if (options && !options.stages) {
            options.stages = [];
        }

        if (options) {
            for (let i = 0; i < options.stages.length; i++) {
                this.addStage(
                    stagesGroup,
                    () => options.stages,
                    () => i + 1
                );
            }
        }

        stagesGroup.addButton("addStage", "Add Stage", false).click(async () => {
            this.addStage(
                stagesGroup,
                () => this.options().stages,
                () => this.options().stages.length
            );

            await this.particles().refresh();
        });
    }
}
