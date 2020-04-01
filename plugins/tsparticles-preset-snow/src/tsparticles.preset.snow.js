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
                direction: MoveDirection.bottom,
                enable: true,
                outMode: OutMode.out,
                random: false,
                speed: 2,
                straight: false,
            },
            opacity: {
                random: true,
                value: 0.5,
            },
            shape: {
                type: ShapeType.circle,
            },
            size: {
                random: true,
                value: 10,
            },
        },
    });
});