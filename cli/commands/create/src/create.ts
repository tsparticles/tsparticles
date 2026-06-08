import { Command } from "commander";
import { appCreateCommand } from "@tsparticles/cli-command-create-app";
import { bundleCreateCommand } from "@tsparticles/cli-command-create-bundle";
import { effectCreateCommand } from "@tsparticles/cli-command-create-effect";
import { interactionCreateCommand } from "@tsparticles/cli-command-create-interaction";
import { paletteCreateCommand } from "@tsparticles/cli-command-create-palette";
import { pathCreateCommand } from "@tsparticles/cli-command-create-path";
import { pluginCreateCommand } from "@tsparticles/cli-command-create-plugin";
import { presetCreateCommand } from "@tsparticles/cli-command-create-preset";
import { shapeCreateCommand } from "@tsparticles/cli-command-create-shape";
import { updaterCreateCommand } from "@tsparticles/cli-command-create-updater";

const createCommand = new Command("create");

createCommand.description("Create a new tsParticles project");

createCommand.addCommand(appCreateCommand);
createCommand.addCommand(bundleCreateCommand);
createCommand.addCommand(effectCreateCommand);
createCommand.addCommand(interactionCreateCommand);
createCommand.addCommand(paletteCreateCommand);
createCommand.addCommand(pathCreateCommand);
createCommand.addCommand(pluginCreateCommand);
createCommand.addCommand(presetCreateCommand);
createCommand.addCommand(shapeCreateCommand);
createCommand.addCommand(updaterCreateCommand);

export { createCommand };
