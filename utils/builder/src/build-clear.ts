import path from "path";

import rimraf from "rimraf";

export async function clearDist(basePath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            rimraf(path.join(basePath, "dist"), () => {
                resolve();
            });
        } catch (error) {
            reject(error);
        }
    });
}
