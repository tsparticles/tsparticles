if (!window) {
    throw new Error('window not found');
}

if (!tsParticles) {
    throw new Error('tsParticles not found');
}

window.addEventListener('load', function () {
    tsParticles.addPreset('60fps', {
        fpsLimit: 60,
    });
});