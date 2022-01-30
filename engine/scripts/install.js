const path = require('path');
const reactParticlesJsFoundError = "react-particles-js-found";

try {
    console.log("Thank you for installing tsParticles.");
    console.log("Remember to checkout the official website https://particles.js.org to explore some samples.");
    console.log("You can find more samples on CodePen too: https://codepen.io/collection/DPOage");
    console.log("If you need documentation you can find it here: https://particles.js.org");
    console.log("Remember to leave a star on the tsParticles repository if you like the project and want to support it: https://github.com/matteobruni/tsparticles");

    const pkgSettings = require(path.join(process.env.INIT_CWD, "package.json"));

    if (!pkgSettings) {
        return;
    }

    const dependencies = pkgSettings.dependencies;

    if (!dependencies) {
        return;
    }

    if (dependencies["react-particles-js"]) {
        console.error("\x1b[31m%s\x1b[0m", "The package react-particles-js has been deprecated and is not supported anymore. Please consider switching to react-tsparticles package.");

        throw new Error(reactParticlesJsFoundError);
    }

    if (dependencies["react"] || dependencies["next"]) {
        if (!dependencies["react-tsparticles"]) {
            console.warn("\x1b[43m\x1b[30m%s\x1b[0m", "Found React installed. Please download react-tsparticles to use tsParticles with a component ready to use and easier to configure.");
            console.log("You can read more about the component here: https://github.com/matteobruni/tsparticles/blob/main/components/react/README.md");
        }
    }

    if (dependencies["@angular/core"]) {
        if (!dependencies["ng-particles"]) {
            console.warn("\x1b[43m\x1b[30m%s\x1b[0m", "Found Angular installed. Please download ng-particles to use tsParticles with a component ready to use and easier to configure.");
            console.log("You can read more about the component here: https://github.com/matteobruni/tsparticles/blob/main/components/angular/README.md");
        }
    }

    if (dependencies["vue"] || dependencies["nuxt"]) {
        const vueVersion = dependencies["vue"];
        const nuxtVersion = dependencies["nuxt"];

        const vueMajor = (vueVersion || nuxtVersion).split(".")[0];

        if (vueMajor > 2) {
            if (!dependencies["particles.vue3"]) {
                console.warn("\x1b[43m\x1b[30m%s\x1b[0m", "Found Vue 3.x installed. Please Download particles.vue3 to use tsParticles with a component ready to use and easier to configure.");
                console.log("You can read more about the component here: https://github.com/matteobruni/tsparticles/blob/main/components/vue3/README.md");
            }
        } else {
            if (!dependencies["particles.vue"]) {
                console.warn("\x1b[43m\x1b[30m%s\x1b[0m", "Found Vue 2.x installed. Please Download particles.vue to use tsParticles with a component ready to use and easier to configure.");
                console.log("You can read more about the component here: https://github.com/matteobruni/tsparticles/blob/main/components/vue/README.md");
            }
        }

    }

    if (dependencies["svelte"]) {
        if (!dependencies["svelte-particles"]) {
            console.warn("\x1b[43m\x1b[30m%s\x1b[0m", "Found Svelte installed. Please Download svelte-particles to use tsParticles with a component ready to use and easier to configure.");
            console.log("You can read more about the component here: https://github.com/matteobruni/tsparticles/blob/main/components/svelte/README.md");
        }
    }

    if (dependencies["inferno"]) {
        if (!dependencies["inferno-particles"]) {
            console.warn("\x1b[43m\x1b[30m%s\x1b[0m", "Found Inferno installed. Please Download inferno-particles to use tsParticles with a component ready to use and easier to configure.");
            console.log("You can read more about the component here: https://github.com/matteobruni/tsparticles/blob/main/components/inferno/README.md");
        }
    }

    if (dependencies["preact"]) {
        if (!dependencies["preact-particles"]) {
            console.warn("\x1b[43m\x1b[30m%s\x1b[0m", "Found Preact installed. Please Download preact-particles to use tsParticles with a component ready to use and easier to configure.");
            console.log("You can read more about the component here: https://github.com/matteobruni/tsparticles/blob/main/components/preact/README.md");
        }
    }

    if (dependencies["jquery"]) {
        if (!dependencies["jquery-particles"]) {
            console.warn("\x1b[43m\x1b[30m%s\x1b[0m", "Found jQuery installed. Please Download jquery-particles to use tsParticles with a plugin ready to use and easier to configure.");
            console.log("You can read more about the plugin here: https://github.com/matteobruni/tsparticles/blob/main/components/jquery/README.md");
        }
    }
} catch (error) {
    if (error.message === reactParticlesJsFoundError) {
        throw error;
    }

    console.log(error);
}
