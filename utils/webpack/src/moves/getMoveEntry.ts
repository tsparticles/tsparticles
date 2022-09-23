import { getEntry } from "../common/getEntry";

const getMoveEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("move", name, bundle);
};

export { getMoveEntry };
