const {getEntry} = require("../common/getEntry");

const getMoveEntry = (name, bundle) => {
    return getEntry("move", name, bundle);
}

module.exports = {
    getMoveEntry
};
