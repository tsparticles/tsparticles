const {getEntry} = require("../../common/getEntry");

const getInteractionExternalEntry = (name, bundle) => {
    return getEntry("interaction.external", name, bundle);
}

module.exports = {
    getInteractionExternalEntry
};
