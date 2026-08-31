import { defineAsyncComponent } from "vue";
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";

import "./custom.css";
import AppLayout from "./components/AppLayout.vue";
import WebsiteVersionInfo from "./components/WebsiteVersionInfo.vue";

const MyHome = defineAsyncComponent(() => import("./components/MyHome.vue"));
const PlaygroundBundlesPanel = defineAsyncComponent(() => import("./components/PlaygroundBundlesPanel.vue"));
const PlaygroundPanel = defineAsyncComponent(() => import("./components/PlaygroundPanel.vue"));
const RandomDemo = defineAsyncComponent(() => import("./components/RandomDemo.vue"));

const theme: Theme = {
  extends: DefaultTheme,
  Layout: AppLayout,
  enhanceApp({ app }) {
    app.component("MyHome", MyHome);
    app.component("PlaygroundBundlesPanel", PlaygroundBundlesPanel);
    app.component("PlaygroundPanel", PlaygroundPanel);
    app.component("RandomDemo", RandomDemo);
    app.component("WebsiteVersionInfo", WebsiteVersionInfo);
  },
};

export default theme;
