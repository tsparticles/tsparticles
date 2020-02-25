require("pathseg");

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
export class ParticlesJS {
    /*
    * @deprecated this method is obsolete, please use the new tsParticles.load
    */
    static load(tagId, params) {
        if (console) {
            console.warn("this method is obsolete, please use the new tsParticles.load");
        }

        return window.tsParticles.load(tagId, params);
    }

    /*
    * @deprecated this method is obsolete, please use the new tsParticles.loadJSON
    */
    static loadJson(tagId, pathConfigJson, callback) {
        if (console) {
            console.warn("this method is obsolete, please use the new tsParticles.loadJSON");
        }

        window.tsParticles.loadJSON(tagId, pathConfigJson).then(callback).catch((error) => {
            console.error(error);
        });
    }

    /*
    * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
    */
    static setOnClickHandler(callback) {
        if (console) {
            console.warn("this method is obsolete, please use the new tsParticles.setOnClickHandler");
        }

        window.tsParticles.setOnClickHandler(callback);
    }
}