const {getEntry} = require("../common/getEntry");

getPluginEntry = (name, bundle) => {
    return getEntry("plugin", name, bundle);
}

module.exports = {
    getPluginEntry
};
