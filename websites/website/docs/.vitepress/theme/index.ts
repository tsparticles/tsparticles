import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";

import "./custom.css";
import AppLayout from "./components/AppLayout.vue";
import MyHome from "./components/MyHome.vue";
import PlaygroundBundlesPanel from "./components/PlaygroundBundlesPanel.vue";
import PlaygroundPanel from "./components/PlaygroundPanel.vue";
import RandomDemo from "./components/RandomDemo.vue";
import WebsiteVersionInfo from "./components/WebsiteVersionInfo.vue";
import { initPlaygroundFeaturesOnce } from "./components/playgroundLoaders";

const theme: Theme = {
  extends: DefaultTheme,
  Layout: AppLayout,
  enhanceApp({ app }) {
    app.component("MyHome", MyHome);
    app.component("PlaygroundBundlesPanel", PlaygroundBundlesPanel);
    app.component("PlaygroundPanel", PlaygroundPanel);
    app.component("RandomDemo", RandomDemo);
    app.component("WebsiteVersionInfo", WebsiteVersionInfo);

    if (typeof globalThis.window !== "undefined") {
      void initPlaygroundFeaturesOnce().catch((error) => {
        console.error("[playground] Feature preload failed.", error);
      });
    }
  },
};

export default theme;
