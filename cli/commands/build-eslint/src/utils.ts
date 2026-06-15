import { ESLint } from "eslint";

/**
 * @param ci - The ci
 * @param silent - The silent
 * @returns true if the linting was successful
 */
export async function lint(ci: boolean, silent: boolean): Promise<boolean> {
  if (!silent) {
    console.log("ESLint - started on src");
  }

  let res: boolean;

  try {
    const eslint = new ESLint({
        fix: !ci,
        cache: true,
        cacheLocation: ".cache/eslint/.eslintcache",
        cacheStrategy: "content",
      }),
      results = await eslint.lintFiles(["src"]),
      errors = ESLint.getErrorResults(results);

    await ESLint.outputFixes(results);

    const formatter = await eslint.loadFormatter("stylish"),
      resultText = formatter.format(results),
      minimumLength = 0;

    if (errors.length > minimumLength) {
      const messages = errors.map(t =>
        t.messages.map(m => `${t.filePath} (${m.line.toString()},${m.column.toString()}): ${m.message}`).join("\n"),
      );

      throw new Error(messages.join("\n"));
    }

    console.log(resultText);

    res = true;
  } catch (e) {
    console.error(e);

    res = false;
  }

  if (!silent) {
    console.log("ESLint - done on src");
  }

  return res;
}
