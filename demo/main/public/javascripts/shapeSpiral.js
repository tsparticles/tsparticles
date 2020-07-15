window.addEventListener('load', function () {
    tsParticles.addShape('spiral', function (context, particle, radius, opacity, delta, pixelRatio) {
        const shapeData = particle.shapeData;
        const innerRadius = shapeData.innerRadius * pixelRatio;
        const lineSpacing = shapeData.lineSpacing * pixelRatio;
        const realWidth = (radius - innerRadius) / lineSpacing;

        for (let i = 0; i < realWidth * 10; i++) {
            const angle = 0.1 * i;
            const x = (innerRadius + lineSpacing * angle) * Math.cos(angle);
            const y = (innerRadius + lineSpacing * angle) * Math.sin(angle);

            context.lineTo(x, y);
        }
    });
});
