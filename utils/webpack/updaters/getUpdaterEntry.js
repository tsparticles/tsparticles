const {getEntry} = require("../common/getEntry");

const getUpdaterEntry = (name, bundle) => {
    return getEntry("updater", name, bundle);
}

module.exports = {
    getUpdaterEntry
};
