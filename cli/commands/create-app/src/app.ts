import { type Framework, type UseCase, promptAppData } from "./prompts.js";
import { Command } from "commander";
import { createAppProject } from "./scaffold.js";

const appCreateCommand = new Command("app");

appCreateCommand.description("Create a new tsParticles app from a template");
appCreateCommand.argument("[destination]", "Destination folder (defaults to project name)");
appCreateCommand.option("--framework <name>", "Framework (vanilla|react|vue3|angular|svelte|solid)");
appCreateCommand.option("--skip-install", "Skip npm install after scaffolding");
appCreateCommand.option(
  "--template <name>",
  "Template to use (scaffold|login|portfolio|landing|tictactoe|confetti|ribbons|particles)",
);
appCreateCommand.action(
  async (
    destination: string | undefined,
    options: { framework?: string; skipInstall?: boolean; template?: string },
  ) => {
    const destArg = destination ?? "tsparticles-app",
      template = options.template as UseCase | undefined,
      framework = options.framework as Framework | undefined,
      skipInstall = options.skipInstall ?? false,
      data = await promptAppData(destArg, {
        framework,
        projectName: undefined,
        useCase: template,
      }),
      result = await createAppProject({
        destination: data.destinationPath,
        framework: data.framework,
        projectName: data.projectName,
        skipInstall,
        useCase: data.useCase,
      });

    console.log(`\nProject created successfully at ${result.targetDir}`);
    console.log("Run the following commands to get started:\n");
    console.log(`  cd ${result.targetDir}`);
    console.log(skipInstall ? "  npm install" : "");
    console.log("  npm run dev\n");
  },
);

export { appCreateCommand };
