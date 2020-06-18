window.addEventListener('load', function () {
    tsParticles.addShape('spiral', function (context, particle, radius, opacity) {
        const shapeData = particle.shapeData;
        const realWidth = (radius - shapeData.innerRadius) / shapeData.lineSpacing;

        for (let i = 0; i < realWidth * 10; i++) {
            const angle = 0.1 * i;
            const x = (shapeData.innerRadius + shapeData.lineSpacing * angle) * Math.cos(angle);
            const y = (shapeData.innerRadius + shapeData.lineSpacing * angle) * Math.sin(angle);

            context.lineTo(x, y);
        }
    });
});
