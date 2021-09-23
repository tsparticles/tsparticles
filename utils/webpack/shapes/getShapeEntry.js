const {getEntry} = require("../common/getEntry");

getShapeEntry = (name, bundle) => {
    return getEntry("shape", name, bundle);
}

module.exports = {
    getShapeEntry
};
