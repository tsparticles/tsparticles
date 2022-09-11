import { getEntry } from "../common/getEntry";

const getBundleEntry = (name: string, bundle: boolean): unknown => {
    const fixName = name && name.startsWith(".") ? name.substring(1) : name ? name : "";

    return getEntry("", fixName, bundle);
};

export { getBundleEntry };
