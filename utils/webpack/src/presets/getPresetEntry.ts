import { getEntry } from "../common/getEntry";

const getPresetEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("preset", name, bundle);
};

export { getPresetEntry };
