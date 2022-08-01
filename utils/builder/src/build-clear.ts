import path from "path";

import rimraf from "rimraf";

export async function clearDist(basePath: string): Promise<boolean> {
    try {
        const res = await new Promise<boolean>((resolve, reject) => {
            try {
                rimraf(path.join(basePath, "dist"), () => {
                    resolve(true);
                });
            } catch (error) {
                reject(error);
            }
        });

        return res;
    } catch {
        return false;
    }
}
