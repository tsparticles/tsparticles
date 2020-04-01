if (!window) {
    throw new Error('window not found');
}

if (!tsParticles) {
    throw new Error('tsParticles not found');
}

window.addEventListener('load', function () {
    tsParticles.addPreset('stars', {
        particles: {
            color: {
                value: "#ffffff",
            },
            lineLinked: {
                enable: false,
            },
            move: {
                bounce: false,
                direction: 'none',
                enable: true,
                outMode: 'out',
                random: true,
                speed: 0.3,
                straight: false,
            },
            opacity: {
                anim: {
                    enable: true,
                    minimumValue: 0,
                    speed: 1,
                    sync: false,
                },
                random: true,
                value: 1,
            },
            shape: {
                type: 'circle',
            },
            size: {
                random: true,
                value: 3,
            },
        },
    });
});