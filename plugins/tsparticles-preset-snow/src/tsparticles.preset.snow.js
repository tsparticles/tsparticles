if (!window) {
    throw new Error('window not found');
}

if (!tsParticles) {
    throw new Error('tsParticles not found');
}

window.addEventListener('load', function () {
    tsParticles.addPreset('snow', {
        particles: {
            color: {
                value: "#fff",
            },
            move: {
                bounce: false,
                direction: 'bottom',
                enable: true,
                outMode: 'out',
                random: false,
                speed: 2,
                straight: false,
            },
            opacity: {
                random: true,
                value: 0.5,
            },
            shape: {
                type: 'circle',
            },
            size: {
                random: true,
                value: 10,
            },
        },
    });
});