"use strict";

//Alpine JS and plugins import
import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import Fern from "@ryangjchandler/fern";

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

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    //Switch demo images
    const changeImages = switchDemoImages(env);

    //Switch backgrounds
    const changeBackgrounds = insertBgImages();

    //Feather Icons
    const featherIcons = feather.replace();

    // Add modal windows
    const modals = initModals();
  }
};
