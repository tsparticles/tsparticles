import { createLazyRuntimeConfig, createSingleConfig } from "./createSingleConfig";
import type { ConfigParams } from "../types";
import type { RollupOptions } from "rollup";

export const createConfig = (params: ConfigParams): RollupOptions[] => {
  const configs = [createSingleConfig(params, false, false), createSingleConfig(params, true, false)];

  if (params.includeLazy) {
    configs.push(
      createLazyRuntimeConfig(params, false),
      createSingleConfig(params, false, true),
      createLazyRuntimeConfig(params, true),
      createSingleConfig(params, true, true),
    );
  }

  return configs;
};
