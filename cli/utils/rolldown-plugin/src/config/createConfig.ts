import type { ConfigParams, RolldownConfig } from "../types";
import { createLazyRuntimeConfig, createSingleConfig } from "./createSingleConfig";

export const createConfig = (params: ConfigParams): RolldownConfig[] => {
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
