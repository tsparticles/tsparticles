import { getDestinationDir, getRepositoryUrl } from "@tsparticles/cli-create-utils";
import path from "node:path";
import prompts from "prompts";

export type Framework = "vanilla" | "react" | "vue3" | "angular" | "svelte" | "solid";

export type UseCase = "none" | "login" | "portfolio" | "landing" | "tictactoe" | "confetti" | "ribbons" | "particles";

export interface IAppPromptResult {
  destinationPath: string;
  framework: Framework;
  projectName: string;
  useCase: UseCase;
}

const initialFrameworkIndex = 0,
  initialUseCaseIndex = 0,
  frameworkChoices: { title: string; value: Framework }[] = [
    { title: "Vanilla (Vite + TypeScript)", value: "vanilla" },
    { title: "React", value: "react" },
    { title: "Vue 3", value: "vue3" },
    { title: "Angular", value: "angular" },
    { title: "Svelte", value: "svelte" },
    { title: "Solid", value: "solid" },
  ],
  useCaseChoices: { title: string; value: UseCase }[] = [
    { title: "None (just the scaffold)", value: "none" },
    { title: "Login / Register", value: "login" },
    { title: "Portfolio", value: "portfolio" },
    { title: "Landing Page", value: "landing" },
    { title: "Tic Tac Toe", value: "tictactoe" },
    { title: "Confetti", value: "confetti" },
    { title: "Ribbons", value: "ribbons" },
    { title: "Particles", value: "particles" },
  ];

/**
 *
 * @param destination
 * @param prefill
 * @param prefill.framework
 * @param prefill.projectName
 * @param prefill.useCase
 */
export async function promptAppData(
  destination: string,
  prefill?: { framework?: Framework; projectName?: string; useCase?: UseCase },
): Promise<IAppPromptResult> {
  const destinationPath = await getDestinationDir(destination),
    repositoryUrl = await getRepositoryUrl(),
    initialName = destinationPath.split(path.sep).pop() ?? "tsparticles-app";

  void repositoryUrl;

  const questions: prompts.PromptObject[] = [];

  if (!prefill?.projectName) {
    questions.push({
      type: "text",
      name: "projectName",
      message: "What is the project name?",
      validate: (value: string) => (value ? true : "The project name can't be empty"),
      initial: initialName,
    });
  }

  if (!prefill?.framework) {
    questions.push({
      type: "select",
      name: "framework",
      message: "Which framework would you like to use?",
      choices: frameworkChoices,
      initial: initialFrameworkIndex,
    });
  }

  if (!prefill?.useCase) {
    questions.push({
      type: "select",
      name: "useCase",
      message: "Which use-case template would you like to include?",
      choices: useCaseChoices,
      initial: initialUseCaseIndex,
    });
  }

  if (!questions.length) {
    return {
      destinationPath,
      framework: prefill?.framework ?? "vanilla",
      projectName: prefill?.projectName ?? initialName,
      useCase: prefill?.useCase ?? "none",
    };
  }

  const answers = (await prompts(questions)) as {
    framework?: Framework;
    projectName?: string;
    useCase?: UseCase;
  };

  return {
    destinationPath,
    framework: prefill?.framework ?? answers.framework ?? "vanilla",
    projectName: (prefill?.projectName ?? answers.projectName ?? initialName).trim(),
    useCase: prefill?.useCase ?? answers.useCase ?? "none",
  };
}
