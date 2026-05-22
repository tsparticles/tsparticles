import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "tsparticlesstencildemo",
  srcDir: "src",
  globalStyle: "src/global/app.css",
  outputTargets: [
    {
      type: "www",
      serviceWorker: null
    }
  ]
};
