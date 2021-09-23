const getEntry = (format, name, bundle) => {
    const fileName = bundle ? "bundle" : "index", fixFormat = format ? `.${format}` : "", obj = {};

    obj[`tsparticles${fixFormat}.${name}`] = `./dist/${fileName}.js`;
    obj[`tsparticles${fixFormat}.${name}.min`] = `./dist/${fileName}.js`;

    return obj;
}

module.exports = {
    getEntry
};
