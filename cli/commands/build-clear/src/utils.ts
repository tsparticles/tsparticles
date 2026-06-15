import path from "node:path";
import { rimraf } from "rimraf";

/**
 * @param basePath - The basePath
 * @param silent - The silent
 * @returns true if the dist folder was cleared
 */
export async function clearDist(basePath: string, silent: boolean): Promise<boolean> {
  if (!silent) {
    console.log("Clearing dist folder");
  }

  let res: boolean;

  try {
    await rimraf(path.join(basePath, "dist"));

    res = true;
  } catch (e) {
    console.error(e);

    res = false;
  }

  if (!silent) {
    console.log("Clearing dist folder done");
  }

  return res;
}
