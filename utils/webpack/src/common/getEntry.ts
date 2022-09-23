const getEntry = (format: string, name?: string, bundle?: boolean): unknown => {
    const fileName = bundle ? "bundle" : "index",
        fixFormat = format ? `.${format}` : "",
        fixName = name ? `.${name}` : "",
        obj = {} as Record<string, string>;

    obj[`tsparticles${fixFormat}${fixName}`] = `./dist/browser/${fileName}.js`;
    obj[`tsparticles${fixFormat}${fixName}.min`] = `./dist/browser/${fileName}.js`;

    return obj;
};

export { getEntry };
