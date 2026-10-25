import fs from "node:fs";
import path from "node:path";

export interface EntryParams {
  bundle: boolean;
  dir: string;
  format: string;
  lazy: boolean;
  min: boolean;
  name?: string;
}

export const getEntry = (data: EntryParams): { input: string; name: string } => {
  const { bundle, dir, format, lazy, min, name } = data,
    fileName = bundle ? "bundle" : "index",
    browserFileName = "browser",
    completeFileName = lazy ? `${fileName}.lazy` : fileName,
    completeBrowserFileName = lazy ? `${browserFileName}.lazy` : browserFileName,
    browserCandidate = path.resolve(dir, "dist/browser", `${completeBrowserFileName}.js`),
    inputFileName = !bundle && fs.existsSync(browserCandidate) ? completeBrowserFileName : completeFileName,
    fixFormat = format ? `.${format}` : "",
    fixName = name ? `.${name}` : "",
    fixMin = min ? ".min" : "",
    fixLazy = lazy ? ".lazy" : "";

  return {
    input: `./dist/browser/${inputFileName}.js`,
    name: `tsparticles${fixFormat}${fixName}${fixLazy}${fixMin}`,
  };
};
