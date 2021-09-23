const {getEntry} = require("../common/getEntry");

getPresetEntry = (name, bundle) => {
    return getEntry("preset", name, bundle);
}

module.exports = {
    getPresetEntry
};
