import { defineConfig, type DefaultTheme } from "vitepress";

const base = process.env.VITEPRESS_BASE ?? "/";
const hostname = "https://particles.js.org";

const nav: DefaultTheme.NavItem[] = [
  { text: "Start", link: "/guide/getting-started" },
  { text: "Playground", link: "/playground/" },
  { text: "Demos", link: "/demos/" },
  { text: "Wrappers", link: "/guide/wrappers" },
  { text: "Options", link: "/options/" },
  { text: "API", link: "/docs/", target: "_blank" },
  {
    text: "Sponsor",
    items: [
      { text: "@matteobruni", link: "https://github.com/matteobruni" },
      { text: "@tsparticles", link: "https://github.com/tsparticles" },
    ],
  },
  { text: "Changelog", link: "/changelog" },
  { text: "Releases", link: "/releases/" },
];

const baseSidebar: DefaultTheme.Sidebar = {
  "/guide/wrappers": [
    {
      text: "Guides",
      items: [
        { text: "Wrappers Overview", link: "/guide/wrappers" },
        { text: "Framework Integrations", link: "/guide/frameworks" },
      ],
    },
    {
      text: "Wrappers",
      items: [
        { text: "Angular", link: "/guide/wrappers-angular" },
        { text: "React", link: "/guide/wrappers-react" },
        { text: "Svelte", link: "/guide/wrappers-svelte" },
        { text: "Vue", link: "/guide/wrappers-vue3" },
        { text: "Next.js", link: "/guide/wrappers-nextjs" },
        { text: "Nuxt 2", link: "/guide/wrappers-nuxt2" },
        { text: "Nuxt 3", link: "/guide/wrappers-nuxt3" },
        { text: "Nuxt 4", link: "/guide/wrappers-nuxt4" },
        { text: "Vue 2", link: "/guide/wrappers-vue2" },
        { text: "Vue 3", link: "/guide/wrappers-vue3" },
        { text: "Angular Confetti", link: "/guide/wrappers-angular-confetti" },
        { text: "Angular Fireworks", link: "/guide/wrappers-angular-fireworks" },
        { text: "Astro", link: "/guide/wrappers-astro" },
        { text: "Ember", link: "/guide/wrappers-ember" },
        { text: "Inferno", link: "/guide/wrappers-inferno" },
        { text: "jQuery", link: "/guide/wrappers-jquery" },
        { text: "Lit", link: "/guide/wrappers-lit" },
        { text: "Preact", link: "/guide/wrappers-preact" },
        { text: "Qwik", link: "/guide/wrappers-qwik" },
        { text: "Riot", link: "/guide/wrappers-riot" },
        { text: "Solid", link: "/guide/wrappers-solid" },
        { text: "Web Components", link: "/guide/wrappers-webcomponents" },
        { text: "WordPress", link: "/guide/wrappers-wordpress" },
      ],
    },
  ],
  "/guide/": [
    {
      text: "Guide",
      items: [
        { text: "Getting Started", link: "/guide/getting-started" },
        { text: "Installation", link: "/guide/installation" },
        { text: "Migrations", link: "/guide/migrations" },
        { text: "Option Rename Matrix", link: "/guide/option-rename-matrix" },
        { text: "Migrate from v3.x", link: "/guide/migrate-from-v3" },
        { text: "Migrate from v2.x", link: "/guide/migrate-from-v2" },
        { text: "Migrate from v1.x", link: "/guide/migrate-from-v1" },
        { text: "Bundles", link: "/guide/bundles" },
        { text: "Bundle: Basic", link: "/guide/bundles-basic" },
        { text: "Bundle: Slim", link: "/guide/bundles-slim" },
        { text: "Bundle: tsparticles (Full)", link: "/guide/bundles-full" },
        { text: "Bundle: All", link: "/guide/bundles-all" },
        { text: "Bundle: Confetti", link: "/guide/bundles-confetti" },
        { text: "Bundle: Fireworks", link: "/guide/bundles-fireworks" },
        { text: "Bundle: Particles", link: "/guide/bundles-particles" },
        { text: "Framework Integrations", link: "/guide/frameworks" },
        { text: "Color Formats", link: "/guide/color-formats" },
        { text: "Container Lifecycle", link: "/guide/container-lifecycle" },
        { text: "Plugins & Customization", link: "/guide/plugins-customization" },
        { text: "Templates & Resources", link: "/guide/templates-resources" },
        { text: "Video Tutorials", link: "/guide/video-tutorials" },
        { text: "Dependency Graph", link: "/guide/dependency-graph" },
      ],
    },
  ],
  "/guide/wrappers-": [
    {
      text: "Guides",
      items: [
        { text: "Wrappers Overview", link: "/guide/wrappers" },
        { text: "Framework Integrations", link: "/guide/frameworks" },
      ],
    },
    {
      text: "Wrappers",
      items: [
        { text: "Angular", link: "/guide/wrappers-angular" },
        { text: "React", link: "/guide/wrappers-react" },
        { text: "Svelte", link: "/guide/wrappers-svelte" },
        { text: "Vue", link: "/guide/wrappers-vue3" },
        { text: "Next.js", link: "/guide/wrappers-nextjs" },
        { text: "Nuxt 2", link: "/guide/wrappers-nuxt2" },
        { text: "Nuxt 3", link: "/guide/wrappers-nuxt3" },
        { text: "Nuxt 4", link: "/guide/wrappers-nuxt4" },
        { text: "Vue 2", link: "/guide/wrappers-vue2" },
        { text: "Vue 3", link: "/guide/wrappers-vue3" },
        { text: "Angular Confetti", link: "/guide/wrappers-angular-confetti" },
        { text: "Angular Fireworks", link: "/guide/wrappers-angular-fireworks" },
        { text: "Astro", link: "/guide/wrappers-astro" },
        { text: "Ember", link: "/guide/wrappers-ember" },
        { text: "Inferno", link: "/guide/wrappers-inferno" },
        { text: "jQuery", link: "/guide/wrappers-jquery" },
        { text: "Lit", link: "/guide/wrappers-lit" },
        { text: "Preact", link: "/guide/wrappers-preact" },
        { text: "Qwik", link: "/guide/wrappers-qwik" },
        { text: "Riot", link: "/guide/wrappers-riot" },
        { text: "Solid", link: "/guide/wrappers-solid" },
        { text: "Web Components", link: "/guide/wrappers-webcomponents" },
        { text: "WordPress", link: "/guide/wrappers-wordpress" },
      ],
    },
  ],
  "/playground/": [
    {
      text: "Playground",
      items: [
        { text: "Overview", link: "/playground/" },
        { text: "Bundles", link: "/playground/bundles" },
        { text: "Configs", link: "/playground/configs" },
        { text: "Shapes", link: "/playground/shapes" },
        { text: "Palettes", link: "/playground/palettes" },
        { text: "Presets", link: "/playground/presets" },
      ],
    },
  ],
  "/demos/": [
    {
      text: "Demos",
      items: [
        { text: "Ready-to-Use", link: "/demos/" },
        { text: "Presets Catalog", link: "/demos/presets" },
        { text: "Palettes Catalog", link: "/demos/palettes" },
        { text: "Shapes Catalog", link: "/demos/shapes" },
        { text: "Ambient", link: "/demos/recipes/ambient" },
        { text: "Big Circles", link: "/demos/recipes/big-circles" },
        { text: "Bubbles", link: "/demos/recipes/bubbles" },
        { text: "Confetti", link: "/demos/recipes/confetti" },
        { text: "Confetti Cannon", link: "/demos/recipes/confetti-cannon" },
        { text: "Confetti Explosions", link: "/demos/recipes/confetti-explosions" },
        { text: "Confetti Falling", link: "/demos/recipes/confetti-falling" },
        { text: "Confetti Parade", link: "/demos/recipes/confetti-parade" },
        { text: "Fire", link: "/demos/recipes/fire" },
        { text: "Firefly", link: "/demos/recipes/firefly" },
        { text: "Fireworks", link: "/demos/recipes/fireworks" },
        { text: "Fountain", link: "/demos/recipes/fountain" },
        { text: "Hyperspace", link: "/demos/recipes/hyperspace" },
        { text: "Links", link: "/demos/recipes/links" },
        { text: "Matrix", link: "/demos/recipes/matrix" },
        { text: "Sea Anemone", link: "/demos/recipes/sea-anemone" },
        { text: "Snow", link: "/demos/recipes/snow" },
        { text: "Squares", link: "/demos/recipes/squares" },
        { text: "Stars", link: "/demos/recipes/stars" },
        { text: "Triangles", link: "/demos/recipes/triangles" },
      ],
    },
  ],
  "/options/": [
    {
      text: "Getting Started",
      items: [
        { text: "Options Reference", link: "/options/" },
        { text: "Background & Canvas", link: "/options/background" },
        { text: "Background Mask", link: "/options/background-mask" },
        { text: "Full Screen", link: "/options/fullscreen" },
        { text: "Motion", link: "/options/motion" },
        { text: "Manual Particles", link: "/options/manual-particles" },
        { text: "Themes", link: "/options/themes" },
        { text: "Performance Guide", link: "/options/performance" },
      ],
    },
    {
      text: "Particles Essentials",
      items: [
        { text: "Particles", link: "/options/particles" },
        { text: "Particles Number", link: "/options/particles-number" },
        { text: "Particles Move", link: "/options/particles-move" },
        { text: "Particles Links", link: "/options/particles-links" },
        { text: "Particles Shape", link: "/options/particles-shape" },
        { text: "Particles Color", link: "/options/particles-color" },
        { text: "Particles Size", link: "/options/particles-size" },
        { text: "Particles Opacity", link: "/options/particles-opacity" },
        { text: "Particles ZIndex", link: "/options/particles-zindex" },
      ],
    },
    {
      text: "Particles Advanced",
      items: [
        { text: "Particles Palette", link: "/options/particles-palette" },
        { text: "Particles Bounce", link: "/options/particles-bounce" },
        { text: "Particles Collisions", link: "/options/particles-collisions" },
        { text: "Particles Destroy", link: "/options/particles-destroy" },
        { text: "Particles Group", link: "/options/particles-group" },
        { text: "Particles Life", link: "/options/particles-life" },
        { text: "Particles Orbit", link: "/options/particles-orbit" },
        { text: "Particles Repulse", link: "/options/particles-repulse" },
        { text: "Particles Roll", link: "/options/particles-roll" },
        { text: "Particles Rotate", link: "/options/particles-rotate" },
        { text: "Particles Shadow", link: "/options/particles-shadow" },
        { text: "Particles Stroke", link: "/options/particles-stroke" },
        { text: "Particles Tilt", link: "/options/particles-tilt" },
        { text: "Particles Twinkle", link: "/options/particles-twinkle" },
        { text: "Particles Wobble", link: "/options/particles-wobble" },
      ],
    },
    {
      text: "Interactivity",
      items: [
        { text: "Interactivity", link: "/options/interactivity" },
        { text: "Interactivity Click", link: "/options/interactivity-click" },
        { text: "Interactivity Hover", link: "/options/interactivity-hover" },
        { text: "Interactivity Div", link: "/options/interactivity-div" },
        { text: "Interactivity Events", link: "/options/interactivity-events" },
        { text: "Interactivity Modes", link: "/options/interactivity-modes" },
      ],
    },
    {
      text: "Plugins",
      items: [
        { text: "Plugin: Absorbers", link: "/options/plugin-absorbers" },
        { text: "Plugin: Emitters", link: "/options/plugin-emitters" },
        { text: "Plugin: Infection", link: "/options/plugin-infection" },
        { text: "Plugin: Polygon Mask", link: "/options/plugin-polygon-mask" },
      ],
    },
  ],
  "/migration/": [{ text: "Migration", items: [{ text: "Compatibility & Migrations", link: "/migration/" }] }],
  "/changelog": [{ text: "Changelog", items: [{ text: "Latest Release", link: "/changelog" }] }],
  "/releases/": [{ text: "Releases", items: [{ text: "Versioning & Release", link: "/releases/" }] }],
};

function prefixSidebarItems(items: DefaultTheme.SidebarItem[], prefix: string): DefaultTheme.SidebarItem[] {
  return items.map((item) => ({
    ...item,
    link: item.link ? prefix + item.link : undefined,
    items: item.items ? prefixSidebarItems(item.items, prefix) : undefined,
  }));
}

function prefixNavItems(items: DefaultTheme.NavItem[], prefix: string): DefaultTheme.NavItem[] {
  return items.map((item) => {
    if ("link" in item && item.link && !item.link.startsWith("http") && !item.link.startsWith("//")) {
      return { ...item, link: prefix + item.link } as DefaultTheme.NavItem;
    }
    if ("items" in item && item.items) {
      return { ...item, items: prefixNavItems(item.items, prefix) } as DefaultTheme.NavItem;
    }
    return item;
  });
}

const localePrefixes = ["/it", "/fr", "/es", "/de", "/pt", "/ru", "/zh", "/ja", "/hi"];

const sidebar: DefaultTheme.Sidebar = {
  ...baseSidebar,
};

for (const prefix of localePrefixes) {
  for (const [key, value] of Object.entries(baseSidebar)) {
    sidebar[prefix + key] = prefixSidebarItems(value, prefix);
  }
}

export default defineConfig({
  title: "tsParticles",
  description: "Modern particle animations for the web",
  lang: "en-US",
  cleanUrls: true,
  lastUpdated: false,
  base,
  ignoreDeadLinks: [],
  locales: {
    root: {
      label: "English",
      lang: "en-US",
      link: "/",
      title: "tsParticles",
      description: "Modern particle animations for the web",
      themeConfig: {
        nav,
      },
    },
    it: {
      label: "Italiano",
      lang: "it-IT",
      link: "/it/",
      title: "tsParticles",
      description: "Animazioni particellari moderne per il web",
      themeConfig: {
        nav: prefixNavItems(nav, "/it"),
      },
    },
    fr: {
      label: "Français",
      lang: "fr-FR",
      link: "/fr/",
      title: "tsParticles",
      description: "Animations de particules modernes pour le web",
      themeConfig: {
        nav: prefixNavItems(nav, "/fr"),
      },
    },
    es: {
      label: "Español",
      lang: "es-ES",
      link: "/es/",
      title: "tsParticles",
      description: "Animaciones de partículas modernas para la web",
      themeConfig: {
        nav: prefixNavItems(nav, "/es"),
      },
    },
    de: {
      label: "Deutsch",
      lang: "de-DE",
      link: "/de/",
      title: "tsParticles",
      description: "Moderne Partikelanimationen für das Web",
      themeConfig: {
        nav: prefixNavItems(nav, "/de"),
      },
    },
    pt: {
      label: "Português",
      lang: "pt-PT",
      link: "/pt/",
      title: "tsParticles",
      description: "Animacoes modernas de particulas para a web",
      themeConfig: {
        nav: prefixNavItems(nav, "/pt"),
      },
    },
    ru: {
      label: "Русский",
      lang: "ru-RU",
      link: "/ru/",
      title: "tsParticles",
      description: "Современные анимации частиц для веба",
      themeConfig: {
        nav: prefixNavItems(nav, "/ru"),
      },
    },
    zh: {
      label: "中文",
      lang: "zh-CN",
      link: "/zh/",
      title: "tsParticles",
      description: "适用于 Web 的现代粒子动画",
      themeConfig: {
        nav: prefixNavItems(nav, "/zh"),
      },
    },
    ja: {
      label: "日本語",
      lang: "ja-JP",
      link: "/ja/",
      title: "tsParticles",
      description: "Web 向けのモダンなパーティクルアニメーション",
      themeConfig: {
        nav: prefixNavItems(nav, "/ja"),
      },
    },
    hi: {
      label: "हिन्दी",
      lang: "hi-IN",
      link: "/hi/",
      title: "tsParticles",
      description: "वेब के लिए आधुनिक पार्टिकल एनिमेशन",
      themeConfig: {
        nav: prefixNavItems(nav, "/hi"),
      },
    },
  },
  vite: {
    envDir: "..",
    build: {
      sourcemap: false,
    },
  },
  markdown: {
    shiki: {
      langs: [
        "typescript",
        "javascript",
        "jsx",
        "tsx",
        "css",
        "html",
        "json",
        "jsonc",
        "yaml",
        "bash",
        "shell",
        "markdown",
        "vue",
        "svelte",
        "astro",
      ],
    },
  },
  sitemap: {
    hostname,
  },
  head: [
    ["meta", { name: "theme-color", content: "#0b1020" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "tsParticles" }],
    ["meta", { property: "og:description", content: "TypeScript particle engine for websites and apps" }],
  ],
  themeConfig: {
    logo: "https://particles.js.org/tsParticles-64.png",
    socialLinks: [{ icon: "github", link: "https://github.com/tsparticles/tsparticles" }],
    sidebar,
    search: {
      provider: "local",
    },
    footer: {
      message:
        'Released under MIT License. <a href="/cookie-policy">Cookie Policy</a> · <a href="/privacy-policy">Privacy Policy</a> · Support: <a href="https://github.com/matteobruni">@matteobruni</a> / <a href="https://github.com/tsparticles">@tsparticles</a>',
      copyright: "Copyright © 2026 Matteo Bruni",
    },
  },
});
