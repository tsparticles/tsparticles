if (!tsParticles) {
    throw new Error('tsParticles not found');
}

tsParticles.addPreset('60fps', {
    fpsLimit: 60,
});