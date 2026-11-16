import { type ICruiseResult, type IReporterOutput, type IViolation, cruise } from "dependency-cruiser";
import { loadDependencyCruiserConfig } from "@tsparticles/depcruise-config";

const ZERO_VIOLATIONS = 0;

/**
 * Extracts the dependency graph from Dependency Cruiser's API response.
 * @param result - The API response or a direct cruise result.
 * @returns The dependency graph result.
 */
export function getCruiseResult(result: IReporterOutput | ICruiseResult): Partial<ICruiseResult> {
  const output = "output" in result ? result.output : result;

  return typeof output === "object" ? output : {};
}

/**
 * Checks for circular dependencies using dependency-cruiser
 * @param basePath - The project root path
 * @param silent - If true, reduces the amount of output during the check
 * @returns true if no circular dependencies are found, false otherwise
 */
export async function circularDeps(basePath: string, silent: boolean): Promise<boolean> {
  const srcPath = "src",
    cruiseOptions = await loadDependencyCruiserConfig(basePath);

  try {
    const result = await cruise([srcPath], {
        ...cruiseOptions.options,
        baseDir: basePath,
        ruleSet: {
          forbidden: cruiseOptions.forbidden ?? [],
        },
      }),
      cruiseResult = getCruiseResult(result),
      violations: IViolation[] = cruiseResult.summary?.violations ?? [],
      architectureViolations = violations.filter(
        violation =>
          violation.rule.name === "no-circular" ||
          violation.rule.name === "no-engine-entrypoint-backedge" ||
          violation.rule.name === "no-core-domain-barrel-import",
      ),
      graphViolations = (cruiseResult.modules ?? []).flatMap(module =>
        module.dependencies.flatMap(dependency => {
          const isCoreModule = /(?:^|\/)src\/Core\//.test(module.source),
            target = dependency.resolved,
            isEntrypointBackedge =
              isCoreModule && /(?:^|\/)src\/(?:index(?:\.lazy)?|browser|exports|export-types)\.ts$/.test(target),
            isDomainBarrelImport =
              isCoreModule &&
              /(?:^|\/)src\/Core\/(?:Canvas|Container|Engine|Particles|Rendering)\/index\.ts$/.test(target);

          if (isEntrypointBackedge || isDomainBarrelImport) {
            return [
              `${isEntrypointBackedge ? "no-engine-entrypoint-backedge" : "no-core-domain-barrel-import"}: ${module.source} -> ${target}`,
            ];
          }

          return [];
        }),
      );

    if (architectureViolations.length + graphViolations.length > ZERO_VIOLATIONS) {
      console.error("⚠️ Dependency boundary violations found!");

      for (const violation of architectureViolations) {
        const cyclePath = (violation.cycle ?? []).map(step => (step as { name: string }).name);

        console.error(
          `${violation.rule.name}: ${cyclePath.length > 0 ? cyclePath.join(" -> ") : `${violation.from} -> ${violation.to}`}`,
        );
      }

      for (const violation of graphViolations) {
        console.error(violation);
      }

      return false;
    }

    if (!silent) {
      console.info("✅ No circular dependencies found.");
    }

    return true;
  } catch (e) {
    console.error("❌ Error while checking dependencies:", e);

    return false;
  } finally {
    if (!silent) {
      console.info("Finished checking circular dependencies.");
    }
  }
}
