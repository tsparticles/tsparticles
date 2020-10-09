const path = require('path');
const pkgSettings = require(path.join(process.env.INIT_CWD, "package.json"));

console.log(pkgSettings);

const dependencies = pkgSettings.dependencies;

if (!dependencies) {
    return;
}

if (dependencies.react) {
    console.log("Download react-tsparticles");
}

if (dependencies.angular) {
    console.log("Download ng-particles");
}

if (dependencies.vue) {
    console.log("Download particles.vue or particles.vue3");
}

if (dependencies.svelte) {
    console.log("Download svelte-particles");
}

if (dependencies.inferno) {
    console.log("Download inferno-particles");
}

if (dependencies.preact) {
    console.log("Download preact-particles");
}

if (dependencies.jquery) {
    console.log("Download jquery-particles");
}
