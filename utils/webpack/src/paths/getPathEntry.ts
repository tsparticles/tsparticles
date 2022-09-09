import { getEntry } from "../common/getEntry";

const getPathEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("path", name, bundle);
};

export { getPathEntry };
