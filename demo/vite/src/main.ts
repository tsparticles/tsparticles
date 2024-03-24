import "./style.css";

(async () => {
    const { loadAll } = await import("@tsparticles/all"),
        { tsParticles } = await import("@tsparticles/engine");

    await loadAll(tsParticles);

    const { default: configs } = await import("@tsparticles/configs");

    await tsParticles.load({
        id: "tsparticles",
        options: configs.basic
    });
})();
