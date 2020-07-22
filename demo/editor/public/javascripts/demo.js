tsParticles.load("particles", {
    fpsLimit: 60,
    particles: {
        color: {
            value: '#000'
        },
        links: {
            color: '#000',
            enable: true
        },
        move: {
            enable: true
        },
        size: {
            value: 1
        }
    }
}).then(container => {
    var editor = createEditor(container);
})

