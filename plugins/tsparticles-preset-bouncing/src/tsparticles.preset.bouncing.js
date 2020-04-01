if (!tsParticles) {
    throw new Error('tsParticles not found');
}

tsParticles.addPreset('bouncing', {
    particles: {
        move: {
            outMode: 'bounce',
        },
    },
});