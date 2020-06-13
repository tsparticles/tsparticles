if (!tsParticles) {
    throw new Error('tsParticles not found');
}

var data = {
    particles: {
        shape: {
            character: {
                fill: true,
                font: "Font Awesome 5 Free",
                style: "",
                weight: "400",
            },
            type: 'character',
        },
        size: {
            random: false,
            value: 16,
        },
    },
};

tsParticles.addPreset('fontAwesome', data);
tsParticles.addPreset('font-awesome', data);