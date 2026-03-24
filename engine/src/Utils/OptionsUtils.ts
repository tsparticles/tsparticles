import type { Engine } from "../Core/Engine.js";
import type { IOptionLoader } from "../Options/Interfaces/IOptionLoader.js";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";
import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";

/**
 * @param options -
 * @param sourceOptionsArr -
 */
export function loadOptions<T>(
  options: IOptionLoader<T>,
  ...sourceOptionsArr: RecursivePartial<T | undefined>[]
): void {
  for (const sourceOptions of sourceOptionsArr) {
    options.load(sourceOptions);
  }
}

/**
 * @param engine -
 * @param containerId -
 * @param sourceOptionsArr -
 * @returns the newly created {@link ParticlesOptions} object
 */
export function loadParticlesOptions(
  engine: Engine,
  containerId: symbol,
  ...sourceOptionsArr: RecursivePartial<IParticlesOptions | undefined>[]
): ParticlesOptions {
  const options = new ParticlesOptions(engine, containerId);

  loadOptions(options, ...sourceOptionsArr);

  return options;
}
