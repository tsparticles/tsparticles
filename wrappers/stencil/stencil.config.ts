import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "tsparticlesstencil",
  srcDir: "src",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "docs-readme"
    }
  ]
};
