const {getEntry} = require("../common/getEntry");

const getInteractionEntry = (name, bundle) => {
    return getEntry("interaction", name, bundle);
}

module.exports = {
    getInteractionEntry
};
