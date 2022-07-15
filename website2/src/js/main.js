"use strict";

//Alpine JS and plugins import
import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import Fern from "@ryangjchandler/fern";
import "regenerator-runtime";
import hljs from "highlight.js";
import hljsjavascript from 'highlight.js/lib/languages/javascript';
import hljstypescript from 'highlight.js/lib/languages/typescript';
import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

window.Alpine = Alpine;
//Init intersect plugin
Alpine.plugin(intersect);
//Init Fern plugin
Alpine.plugin(Fern);
//Init Fern persisted store
Alpine.persistedStore("app", {
    isSiderbarOpen: false,
});
//Start Alpine JS
Alpine.start();

import { env } from "./libs/utils/constants";
import { initPageLoader } from "./libs/components/pageloader/pageloader";
import {
    switchDemoImages,
    insertBgImages,
    initModals,
} from "./libs/utils/utils";
import './libs/components'

const feather = require("feather-icons");

const showPageloader = initPageLoader();

hljs.registerLanguage('javascript', hljsjavascript);
hljs.registerLanguage('typescript', hljstypescript);

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        //Switch demo images
        const changeImages = switchDemoImages(env);

        //Switch backgrounds
        const changeBackgrounds = insertBgImages();

        //Feather Icons
        const featherIcons = feather.replace();

        // Add modal windows
        const modals = initModals();

        document.querySelectorAll('pre code').forEach((el) => {
            hljs.highlightElement(el);
        });

        (async () => {
            await loadFull(tsParticles);

            await tsParticles.load("tsparticles", {
                fullScreen: {
                    enable: false
                },
                particles: {
                    color: {
                        value: "#000"
                    },
                    links: {
                        color: "#000",
                        enable: true
                    },
                    move: {
                        enable: true
                    },
                    size: {
                        value: {
                            min: 1,
                            max: 3
                        }
                    }
                }
            });
        })();
    }
};
