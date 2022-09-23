import { getEntry } from "../common/getEntry";

const getShapeEntry = (name: string, bundle: boolean): unknown => {
    return getEntry("shape", name, bundle);
};

export { getShapeEntry };
