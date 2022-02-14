const {getEntry} = require("../common/getEntry");

const getPathEntry = (name, bundle) => {
    return getEntry("path", name, bundle);
}

module.exports = {
    getPathEntry
};
