if (!tsParticles) {
    throw new Error('tsParticles not found');
}

tsParticles.addPreset('basic', {
    particles: {
        color: {
            value: "#ffffff",
        },
        lineLinked: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'out',
            speed: 2,
        },
    },
});