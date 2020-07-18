tsParticles.load("tsparticles", {
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
        }
    }
}).then(container => {
    var editor = createEditor(container);
})

