const getEntry = (format, name, bundle) => {
    const fileName = bundle ? "bundle" : "index",
        fixFormat = format ? `.${format}` : "",
        fixName = name ? `.${name}` : "",
        obj = {};

    obj[`tsparticles${fixFormat}${fixName}`] = `./dist/${fileName}.js`;
    obj[`tsparticles${fixFormat}${fixName}.min`] = `./dist/${fileName}.js`;

    return obj;
}

module.exports = {
    getEntry
};
