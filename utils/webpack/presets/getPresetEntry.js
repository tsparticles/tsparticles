const {getEntry} = require("../common/getEntry");

const getPresetEntry = (name, bundle) => {
    return getEntry("preset", name, bundle);
}

module.exports = {
    getPresetEntry
};
