const getEntry = (format, name, bundle) => {
    const fileName = bundle ? "bundle" : "index",
        fixFormat = format ? `.${format}` : "",
        fixName = name ? `.${name}` : "",
        obj = {};

    obj[`tsparticles${fixFormat}${fixName}`] = `./dist/browser/${fileName}.js`;
    obj[`tsparticles${fixFormat}${fixName}.min`] = `./dist/browser/${fileName}.js`;

    return obj;
}

module.exports = {
    getEntry
};
