import { getEntry } from "../common/getEntry";

const getUpdaterEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("updater", name, bundle);
};

export { getUpdaterEntry };
