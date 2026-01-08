import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";

async function checkErrors() {
    const angularParticlesFoundError = "ng-particles-found",
        particlesJsFoundError = "particles.js-found",
        reactParticlesJsFoundError = "react-particles-js-found",
        reactParticlesFoundError = "react-particles-found",
        reactTsParticlesFoundError = "react-tsparticles-found",
        svelteParticlesFoundError = "svelte-particles-found",
        vue2ParticlesFoundError = "vue2-particles-found",
        vue3ParticlesFoundError = "vue3-particles-found";

    try {
        console.log("Thank you for installing tsParticles.");
        console.log("Remember to checkout the official website https://particles.js.org to explore some samples.");
        console.log("You can find more samples on CodePen too: https://codepen.io/collection/DPOage");
        console.log("If you need documentation you can find it here: https://particles.js.org/docs");
        console.log(
            "Don't forget to star the tsParticles repository, if you like the project and want to support it: https://github.com/tsparticles/tsparticles"
        );

        const rootPkgPath = path.join(process.env.INIT_CWD, "package.json"),
            pkgSettings = await fs.readJson(rootPkgPath);

        if (!pkgSettings) {
            return;
        }

        const dependencies = pkgSettings.dependencies;

        if (!dependencies) {
            return;
        }

        if (dependencies["particles.js"]) {
            console.error(
                "\x1b[31m%s\x1b[0m",
                "The package particles.js can't be installed with tsparticles, since it can lead to unexpected behaviors, please uninstall particles.js and remove it from the package.json file."
            );

            throw new Error(reactParticlesJsFoundError);
        }

        if (dependencies["particlesjs"]) {
            console.error(
                "\x1b[31m%s\x1b[0m",
                "The package particlesjs can't be installed with tsparticles, since it can lead to unexpected behaviors, please uninstall particlesjs and remove it from the package.json file."
            );

            throw new Error(reactParticlesJsFoundError);
        }

        if (dependencies["react-particles-js"]) {
            console.error(
                "\x1b[31m%s\x1b[0m",
                "The package react-particles-js has been deprecated and is not supported anymore."
            );
            console.error("\x1b[31m%s\x1b[0m", "Please consider switching to react-particles package.");
            console.error(
                "\x1b[31m%s\x1b[0m",
                "This error will be fixed once react-particles-js is removed from the package.json file."
            );

            throw new Error(reactParticlesJsFoundError);
        }

        if (dependencies["react-tsparticles"]) {
            console.error(
                "\x1b[31m%s\x1b[0m",
                "The package react-tsparticles has been deprecated and is not supported anymore."
            );
            console.error("\x1b[31m%s\x1b[0m", "Please consider switching to @tsparticles/react package.");
            console.error(
                "\x1b[31m%s\x1b[0m",
                "This error will be fixed once react-tsparticles is removed from the package.json file."
            );

            throw new Error(reactTsParticlesFoundError);
        }

        if (dependencies["react-particles"]) {
            console.error(
                "\x1b[31m%s\x1b[0m",
                "The package react-particles has been deprecated and is not supported anymore."
            );
            console.error("\x1b[31m%s\x1b[0m", "Please consider switching to @tsparticles/react package.");
            console.error(
                "\x1b[31m%s\x1b[0m",
                "This error will be fixed once react-particles is removed from the package.json file."
            );

            throw new Error(reactParticlesFoundError);
        }

        if (dependencies["react"] || dependencies["next"]) {
            if (!dependencies["@tsparticles/react"]) {
                console.warn(
                    "\x1b[43m\x1b[30m%s\x1b[0m",
                    "Found React installed. Please download react-particles to use tsParticles with a component ready to use and easier to configure."
                );
                console.log(
                    "You can read more about the component here: https://github.com/tsparticles/react/#readme"
                );
            }
        }

        if (dependencies["ng-particles"]) {
            console.error(
                "\x1b[31m%s\x1b[0m",
                "The package ng-particles has been deprecated and is not supported anymore."
            );
            console.error("\x1b[31m%s\x1b[0m", "Please consider switching to @tsparticles/angular package.");
            console.error(
                "\x1b[31m%s\x1b[0m",
                "This error will be fixed once ng-particles is removed from the package.json file."
            );

            throw new Error(angularParticlesFoundError);
        }

        if (dependencies["@angular/core"]) {
            if (!dependencies["@tsparticles/angular"]) {
                console.warn(
                    "\x1b[43m\x1b[30m%s\x1b[0m",
                    "Found Angular installed. Please download ng-particles to use tsParticles with a component ready to use and easier to configure."
                );
                console.log("You can read more about the component here: https://github.com/tsparticles/angular/#readme");
            }
        }

        if (dependencies["vue3-particles"]) {
            console.error(
                "\x1b[31m%s\x1b[0m",
                "The package vue3-particles has been deprecated and is not supported anymore."
            );
            console.error("\x1b[31m%s\x1b[0m", "Please consider switching to @tsparticles/vue3 package.");
            console.error(
                "\x1b[31m%s\x1b[0m",
                "This error will be fixed once vue3-particles is removed from the package.json file."
            );

            throw new Error(vue3ParticlesFoundError);
        }

        if (dependencies["vue2-particles"]) {
            console.error(
                "\x1b[31m%s\x1b[0m",
                "The package vue2-particles has been deprecated and is not supported anymore."
            );
            console.error("\x1b[31m%s\x1b[0m", "Please consider switching to @tsparticles/vue2 package.");
            console.error(
                "\x1b[31m%s\x1b[0m",
                "This error will be fixed once vue2-particles is removed from the package.json file."
            );

            throw new Error(vue2ParticlesFoundError);
        }

        if (dependencies["vue"] || dependencies["nuxt"]) {
            const vueVersion = dependencies["vue"],
                nuxtVersion = dependencies["nuxt"],
                vueMajor = (vueVersion || nuxtVersion).split(".")[0];

            if (vueMajor > 2) {
                if (!dependencies["@tsparticles/vue3"]) {
                    console.warn(
                        "\x1b[43m\x1b[30m%s\x1b[0m",
                        "Found Vue 3.x installed. Please Download @tsparticles/vue3 to use tsParticles with a component ready to use and easier to configure."
                    );
                    console.log(
                        "You can read more about the component here: https://github.com/tsparticles/vue3/#readme"
                    );
                }
            } else {
                if (!dependencies["@tsparticles/vue2"]) {
                    console.warn(
                        "\x1b[43m\x1b[30m%s\x1b[0m",
                        "Found Vue 2.x installed. Please Download @tsparticles/vue2 to use tsParticles with a component ready to use and easier to configure."
                    );
                    console.log(
                        "You can read more about the component here: https://github.com/tsparticles/vue2/#readme"
                    );
                }
            }
        }

        if (dependencies["svelte"]) {
            if (dependencies["svelte-particles"]) {
                console.error(
                    "\x1b[31m%s\x1b[0m",
                    "The package svelte-particles has been deprecated and is not supported anymore."
                );
                console.error("\x1b[31m%s\x1b[0m", "Please consider switching to @tsparticles/svelte package.");
                console.error(
                    "\x1b[31m%s\x1b[0m",
                    "This error will be fixed once svelte-particles is removed from the package.json file."
                );

                throw new Error(svelteParticlesFoundError);
            }

            if (!dependencies["@tsparticles/svelte"]) {
                console.warn(
                    "\x1b[43m\x1b[30m%s\x1b[0m",
                    "Found Svelte installed. Please Download @tsparticles/svelte to use tsParticles with a component ready to use and easier to configure."
                );
                console.log(
                    "You can read more about the component here: https://github.com/tsparticles/svelte/#readme"
                );
            }
        }

        if (dependencies["inferno"]) {
            if (!dependencies["inferno-particles"]) {
                console.warn(
                    "\x1b[43m\x1b[30m%s\x1b[0m",
                    "Found Inferno installed. Please Download inferno-particles to use tsParticles with a component ready to use and easier to configure."
                );
                console.log(
                    "You can read more about the component here: https://github.com/tsparticles/tsparticles/blob/main/components/inferno/README.md"
                );
            }
        }

        if (dependencies["preact"]) {
            if (!dependencies["preact-particles"]) {
                console.warn(
                    "\x1b[43m\x1b[30m%s\x1b[0m",
                    "Found Preact installed. Please Download preact-particles to use tsParticles with a component ready to use and easier to configure."
                );
                console.log(
                    "You can read more about the component here: https://github.com/tsparticles/tsparticles/blob/main/components/preact/README.md"
                );
            }
        }

        if (dependencies["jquery"]) {
            if (!dependencies["jquery-particles"]) {
                console.warn(
                    "\x1b[43m\x1b[30m%s\x1b[0m",
                    "Found jQuery installed. Please Download jquery-particles to use tsParticles with a plugin ready to use and easier to configure."
                );
                console.log(
                    "You can read more about the plugin here: https://github.com/tsparticles/tsparticles/blob/main/components/jquery/README.md"
                );
            }
        }
    } catch (error) {
        if (error.message === reactParticlesJsFoundError ||
            error.message === particlesJsFoundError ||
            error.message === reactParticlesFoundError ||
            error.message === reactTsParticlesFoundError ||
            error.message === angularParticlesFoundError ||
            error.message === vue2ParticlesFoundError ||
            error.message === vue3ParticlesFoundError ||
            error.message === svelteParticlesFoundError
        ) {
            throw error;
        }

        console.log(error);
    }
}

checkErrors();