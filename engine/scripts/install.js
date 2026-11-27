import path from "node:path";
import { readFile } from "node:fs/promises";

const ERR_INCOMPATIBLE = "incompatible-package-found",
  ERR_DEPRECATED = "deprecated-package-found",
  incompatible = [
    {
      package: "particles.js",
      message:
        "The package particles.js can't be installed with tsparticles, since it can lead to unexpected behaviors. Please uninstall particles.js and remove it from the package.json file.",
    },
    {
      package: "particlesjs",
      message:
        "The package particlesjs can't be installed with tsparticles, since it can lead to unexpected behaviors. Please uninstall particlesjs and remove it from the package.json file.",
    },
  ],
  deprecated = [
    {
      package: "react-particles-js",
      replacement: "@tsparticles/react",
      message: "The package react-particles-js has been deprecated and is not supported anymore.",
    },
    {
      package: "react-tsparticles",
      replacement: "@tsparticles/react",
      message: "The package react-tsparticles has been deprecated and is not supported anymore.",
    },
    {
      package: "react-particles",
      replacement: "@tsparticles/react",
      message: "The package react-particles has been deprecated and is not supported anymore.",
    },
    {
      package: "ng-particles",
      replacement: "@tsparticles/angular",
      message: "The package ng-particles has been deprecated and is not supported anymore.",
    },
    {
      package: "vue3-particles",
      replacement: "@tsparticles/vue3",
      message: "The package vue3-particles has been deprecated and is not supported anymore.",
    },
    {
      package: "vue2-particles",
      replacement: "@tsparticles/vue3 (requires upgrading the application to Vue 3)",
      message: "The package vue2-particles has been deprecated and is not supported anymore.",
    },
  ],
  wrappers = [
    {
      framework: "react",
      detector: deps => deps["react"] || deps["next"],
      wrapper: "@tsparticles/react",
      message:
        "Found React installed. Please install @tsparticles/react to use tsParticles with a component ready to use and easier to configure.",
      url: "https://github.com/tsparticles/react/#readme",
    },
    {
      framework: "nextjs",
      detector: deps => deps["next"],
      wrapper: "@tsparticles/nextjs",
      message:
        "Found Next.js installed. Please install @tsparticles/nextjs to use tsParticles with a component optimized for Next.js.",
      url: "https://github.com/tsparticles/nextjs/#readme",
    },
    {
      framework: "angular",
      detector: deps => deps["@angular/core"],
      wrapper: "@tsparticles/angular",
      message:
        "Found Angular installed. Please install @tsparticles/angular to use tsParticles with a component ready to use and easier to configure.",
      url: "https://github.com/tsparticles/angular/#readme",
    },
    {
      framework: "vue3",
      detector: deps => {
        if (deps["nuxt"]) {
          return false;
        }

        const version = deps["vue"];

        return getMajorVersion(version) >= 3;
      },
      wrapper: "@tsparticles/vue3",
      message:
        "Found Vue 3.x installed. Please install @tsparticles/vue3 to use tsParticles with a component ready to use and easier to configure.",
      url: "https://github.com/tsparticles/vue3/#readme",
    },
    {
      framework: "nuxt4",
      detector: deps => getMajorVersion(deps["nuxt"]) >= 4,
      wrapper: "@tsparticles/nuxt4",
      message:
        "Found Nuxt 4.x installed. Please install @tsparticles/nuxt4 to use tsParticles with a component optimized for Nuxt 4.",
      url: "https://github.com/tsparticles/nuxt4/#readme",
    },
    {
      framework: "svelte",
      detector: deps => deps["svelte"],
      wrapper: "@tsparticles/svelte",
      message:
        "Found Svelte installed. Please install @tsparticles/svelte to use tsParticles with a component ready to use and easier to configure.",
      url: "https://github.com/tsparticles/svelte/#readme",
    },
    {
      framework: "solid",
      detector: deps => deps["solid-js"],
      wrapper: "@tsparticles/solid",
      message:
        "Found Solid.js installed. Please install @tsparticles/solid to use tsParticles with a component ready to use and easier to configure.",
      url: "https://github.com/tsparticles/solid/#readme",
    },
    {
      framework: "preact",
      detector: deps => deps["preact"],
      wrapper: "@tsparticles/preact",
      message:
        "Found Preact installed. Please install @tsparticles/preact to use tsParticles with a component ready to use and easier to configure.",
      url: "https://github.com/tsparticles/preact/#readme",
    },
    {
      framework: "inferno",
      detector: deps => deps["inferno"],
      wrapper: "@tsparticles/inferno",
      message:
        "Found Inferno installed. Please install @tsparticles/inferno to use tsParticles with a component ready to use and easier to configure.",
      url: "https://github.com/tsparticles/inferno/#readme",
    },
    {
      framework: "jquery",
      detector: deps => deps["jquery"],
      wrapper: "@tsparticles/jquery",
      message:
        "Found jQuery installed. Please install @tsparticles/jquery to use tsParticles with a plugin ready to use and easier to configure.",
      url: "https://github.com/tsparticles/jquery/#readme",
    },
    {
      framework: "riot",
      detector: deps => deps["riot"],
      wrapper: "@tsparticles/riot",
      message:
        "Found Riot.js installed. Please install @tsparticles/riot to use tsParticles with a component ready to use and easier to configure.",
      url: "https://github.com/tsparticles/riot/#readme",
    },
    {
      framework: "lit",
      detector: deps => deps["lit"],
      wrapper: "@tsparticles/lit",
      message:
        "Found Lit installed. Please install @tsparticles/lit to use tsParticles with a component ready to use and easier to configure.",
      url: "https://github.com/tsparticles/lit/#readme",
    },
    {
      framework: "ember",
      detector: deps => deps["ember-source"],
      wrapper: "@tsparticles/ember",
      message:
        "Found Ember.js installed. Please install @tsparticles/ember to use tsParticles with a component ready to use and easier to configure.",
      url: "https://github.com/tsparticles/ember/#readme",
    },
    {
      framework: "qwik",
      detector: deps => deps["@builder.io/qwik"],
      wrapper: "@tsparticles/qwik",
      message:
        "Found Qwik installed. Please install @tsparticles/qwik to use tsParticles with a component ready to use and easier to configure.",
      url: "https://github.com/tsparticles/qwik/#readme",
    },
    {
      framework: "astro",
      detector: deps => deps["astro"],
      wrapper: "@tsparticles/astro",
      message:
        "Found Astro installed. Please install @tsparticles/astro to use tsParticles with a component ready to use and easier to configure.",
      url: "https://github.com/tsparticles/astro/#readme",
    },
    {
      framework: "webcomponents",
      detector: deps => true,
      wrapper: "@tsparticles/webcomponents",
      message:
        "You can also use @tsparticles/webcomponents to use tsParticles as a standard Web Component, framework-agnostic.",
      url: "https://github.com/tsparticles/webcomponents/#readme",
      alwaysSuggest: true,
    },
  ];

function logInfo(msg) {
  console.log(msg);
}

function logWarn(msg) {
  console.warn("\x1b[43m\x1b[30m%s\x1b[0m", msg);
}

function logError(msg) {
  console.error("\x1b[31m%s\x1b[0m", msg);
}

function checkIncompatible(dependencies) {
  for (const entry of incompatible) {
    if (dependencies[entry.package]) {
      logError(entry.message);

      throw new Error(ERR_INCOMPATIBLE);
    }
  }
}

function checkDeprecated(dependencies) {
  for (const entry of deprecated) {
    if (dependencies[entry.package]) {
      logError(entry.message);
      logError(`Please consider switching to ${entry.replacement} instead.`);
      logError("This warning will be resolved once the deprecated package is removed from package.json.");

      throw new Error(ERR_DEPRECATED);
    }
  }
}

function getMajorVersion(version) {
  if (typeof version !== "string") {
    return undefined;
  }

  const match = version.match(/^(?:[~^]|>=?)?\s*(\d+)/u);

  return match ? Number(match[1]) : undefined;
}

function checkWrappers(dependencies) {
  for (const w of wrappers) {
    if (!w.detector(dependencies)) {
      continue;
    }

    if (w.alwaysSuggest && dependencies[w.wrapper]) {
      continue;
    }

    if (!dependencies[w.wrapper]) {
      logWarn(w.message);
      logInfo(`You can read more here: ${w.url}`);
    }
  }
}

async function checkErrors() {
  const initialMessage =
    "Thank you for installing tsParticles.\n" +
    "Remember to checkout the official website https://particles.js.org to explore some samples.\n" +
    "You can find more samples on CodePen too: https://codepen.io/collection/DPOage\n" +
    "If you need documentation you can find it here: https://particles.js.org/docs\n" +
    "Don't forget to star the tsParticles repository, if you like the project and want to support it: https://github.com/tsparticles/tsparticles";

  try {
    console.log(initialMessage);

    const rootPkgPath = path.join(process.env.INIT_CWD, "package.json"),
      pkgSettings = JSON.parse(await readFile(rootPkgPath, "utf8"));

    if (!pkgSettings) {
      return;
    }

    const dependencies = pkgSettings.dependencies;

    if (!dependencies) {
      return;
    }

    checkIncompatible(dependencies);
    checkDeprecated(dependencies);
    checkWrappers(dependencies);
  } catch (error) {
    if (error.message === ERR_INCOMPATIBLE || error.message === ERR_DEPRECATED) {
      throw error;
    }

    console.log(error);
  }
}

checkErrors();
