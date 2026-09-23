import { createLazyRuntimeConfig, createSingleConfig } from "./createSingleConfig";
import type { ConfigParams } from "../types";
import type { RolldownConfig } from "../types";

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
