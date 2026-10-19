import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "{{packageName}}",
  srcDir: "src",
  outputTargets: [
    {
      type: "dist",
    },
  ],
};
