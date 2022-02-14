const {getEntry} = require("../common/getEntry");

const getBundleEntry = (name, bundle) => {
    const fixName = name && name.startsWith(".") ? name.substring(1) : name ? name : "";

    return getEntry("", fixName, bundle);
}

module.exports = {
    getBundleEntry
};
