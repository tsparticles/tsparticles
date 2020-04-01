if (!window) {
    throw new Error('window not found');
}

if (!tsParticles) {
    throw new Error('tsParticles not found');
}

window.addEventListener('load', function () {
    var data = {
        particles: {
            shape: {
                character: {
                    fill: true,
                    font: "Font Awesome 5 Free",
                    style: "",
                    weight: "400",
                },
                type: ShapeType.character,
            },
            size: {
                random: false,
                value: 16,
            },
        },
    };

    tsParticles.addPreset('fontAwesome', data);
    tsParticles.addPreset('font-awesome', data);
});