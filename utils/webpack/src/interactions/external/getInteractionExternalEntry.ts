import { getEntry } from "../../common/getEntry";

const getInteractionExternalEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("interaction.external", name, bundle);
};

export { getInteractionExternalEntry };
