if (!window) {
    throw new Error('window not found');
}

if (!tsParticles) {
    throw new Error('tsParticles not found');
}

window.addEventListener('load', function () {
    var data = {
        backgroundMask: {
            cover: {
                value: {
                    b: 255,
                    g: 255,
                    r: 255,
                },
            },
            enable: true,
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: 'bubble',
                },
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 1,
                    size: 100,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            lineLinked: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 1,
                width: 1,
            },
            move: {
                direction: 'none',
                enable: true,
                outMode: 'out',
                random: false,
                speed: 2,
                straight: false,
            },
            opacity: {
                random: false,
                value: 1,
            },
            shape: {
                type: 'circle',
            },
            size: {
                random: true,
                value: 30,
            },
        },
    };

    tsParticles.addPreset('backgroundMask', data);
    tsParticles.addPreset('background-mask', data);
});