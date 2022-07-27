const path = require('path');
const reactParticlesJsFoundError = "react-particles-js-found";

if (!process.env.INIT_CWD) {
    return;
}

try {
    console.log("Thank you for installing tsParticles official React.js component.");
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
        console.error("\x1b[31m%s\x1b[0m", "The package react-particles-js has been deprecated, is not supported anymore, and can cause issues with react-tsparticles package. Please consider removing the deprecated dependency.");

        throw new Error(reactParticlesJsFoundError);
    }
} catch (error) {
    if (error.message === reactParticlesJsFoundError) {
        throw error;
    }

    console.log(error);
}
