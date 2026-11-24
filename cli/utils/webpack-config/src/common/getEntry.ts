interface IEntryParams {
  bundle: boolean;
  format: string;
  lazy: boolean;
  min: boolean;
  name?: string;
}

const getEntry = (data: IEntryParams): unknown => {
  const { bundle, format, lazy, min, name } = data,
    fileName = bundle ? "bundle" : "index",
    completeFileName = lazy ? `${fileName}.lazy` : fileName,
    fixFormat = format ? `.${format}` : "",
    fixName = name ? `.${name}` : "",
    fixMin = min ? ".min" : "",
    fixLazy = lazy ? ".lazy" : "",
    obj = {} as Record<string, string>;

  obj[`tsparticles${fixFormat}${fixName}${fixLazy}${fixMin}`] = `./dist/browser/${completeFileName}.js`;

  return obj;
};

export { getEntry };
