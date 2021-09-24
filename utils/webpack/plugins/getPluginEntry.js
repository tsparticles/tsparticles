const {getEntry} = require("../common/getEntry");

const getPluginEntry = (name, bundle) => {
    return getEntry("plugin", name, bundle);
}

module.exports = {
    getPluginEntry
};
