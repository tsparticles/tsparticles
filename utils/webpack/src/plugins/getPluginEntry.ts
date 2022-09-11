import { getEntry } from "../common/getEntry";

const getPluginEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("plugin", name, bundle);
};

export { getPluginEntry };
