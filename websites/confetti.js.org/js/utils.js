import { updateCode } from "./state.js";

export const optionsToCode = (container) => {
  updateCode(
    `tsParticles.load("tsparticles", ${JSON.stringify(
      container.sourceOptions,
      undefined,
      2
    )});`
  );

  hljs.highlightAll();
};
