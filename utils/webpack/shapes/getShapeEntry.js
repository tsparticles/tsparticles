const {getEntry} = require("../common/getEntry");

const getShapeEntry = (name, bundle) => {
    return getEntry("shape", name, bundle);
}

module.exports = {
    getShapeEntry
};
