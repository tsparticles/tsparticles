import { getPluginEntry } from "../getPluginEntry";

const getPluginEasingEntry = (name: string, bundle: boolean): unknown => {
    return getPluginEntry(`easing.${name}`, bundle);
};

export { getPluginEasingEntry };
