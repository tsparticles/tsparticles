import type { Container } from "../Core/Container.js";
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
 * @param container -
 * @param sourceOptionsArr -
 * @returns the newly created {@link ParticlesOptions} object
 */
export function loadParticlesOptions(
  engine: Engine,
  container: Container,
  ...sourceOptionsArr: RecursivePartial<IParticlesOptions | undefined>[]
): ParticlesOptions {
  const options = new ParticlesOptions(engine, container);

  loadOptions(options, ...sourceOptionsArr);

  return options;
}
