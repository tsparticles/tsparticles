import { Command } from "commander";
import { createAppProject } from "./scaffold.js";
import { promptAppData } from "./prompts.js";

const appCreateCommand = new Command("app");

appCreateCommand.description("Create a new tsParticles app from a template");
appCreateCommand.argument("<destination>", "Destination folder");
appCreateCommand.action(async (destination: string) => {
  const data = await promptAppData(destination);

  await createAppProject({
    destination: data.destinationPath,
    framework: data.framework,
    projectName: data.projectName,
    useCase: data.useCase,
  });

  console.log(`\nProject created successfully at ${data.destinationPath}`);
  console.log("Run the following commands to get started:\n");
  console.log(`  cd ${data.destinationPath}`);
  console.log("  npm run dev\n");
});

export { appCreateCommand };
