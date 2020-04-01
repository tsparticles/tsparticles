if (!window) {
    throw new Error('window not found');
}

if (!tsParticles) {
    throw new Error('tsParticles not found');
}

window.addEventListener('load', function () {
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
                direction: MoveDirection.none,
                enable: true,
                outMode: OutMode.out,
                speed: 2,
            },
        },
    });
});