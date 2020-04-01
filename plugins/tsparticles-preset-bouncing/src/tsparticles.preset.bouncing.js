if (!window) {
    throw new Error('window not found');
}

if (!tsParticles) {
    throw new Error('tsParticles not found');
}

window.addEventListener('load', function () {
    tsParticles.addPreset('bouncing', {
        particles: {
            move: {
                outMode: 'bounce',
            },
        },
    });
});