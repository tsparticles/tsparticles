import { type ParticlesBuildType, buildMap } from "./buildMap";
import type { ParticlesBuildParams } from "./types";
import type { RolldownOptions } from "rolldown";
import { createConfig } from "./config/createConfig";
import { getUmdPolicyData } from "./config/umdPolicy";

export const createParticlesBuild = (type: ParticlesBuildType, params: ParticlesBuildParams): RolldownOptions[] => {
  const def = buildMap[type],
    dir = params.dir,
    version = params.version,
    additionalExternals = params.additionalExternals,
    moduleName = params.moduleName,
    bundle = params.bundle,
    umdPolicy = getUmdPolicyData(type, moduleName),
    banner = def.banner(params),
    minBanner = def.minBanner(params),
    base = createConfig({
      entry: {
        format: def.format,
        name: moduleName,
        bundle: false,
      },
      version,
      banner,
      minBanner,
      dir,
      bundle: false,
      includeLazy: false,
      umdPolicy,
      additionalExternals,
    });

  if (def.hasBundle && (bundle ?? true)) {
    return [
      ...base,
      ...createConfig({
        entry: {
          format: def.format,
          name: moduleName ? `${moduleName}.bundle` : "bundle",
          bundle: true,
        },
        version,
        banner,
        minBanner,
        dir,
        bundle: true,
        includeLazy: false,
        umdPolicy,
        additionalExternals,
      }),
    ];
  }

  return base;
};
