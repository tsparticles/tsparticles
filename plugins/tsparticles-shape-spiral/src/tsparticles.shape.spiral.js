if (!window) {
    throw new Error('window not found');
}

if (!tsParticles) {
    throw new Error('tsParticles not found');
}

/**
 * usage:
 */
window.addEventListener('load', function () {
    tsParticles.addCustomShape('spiral', function (context, particle, radius) {
        var shapeData = particle.shapeData, realWidth = (radius - shapeData.innerRadius) / shapeData.lineSpacing;

        for (var i = 0; i < realWidth * 10; i++) {
            var angle = 0.1 * i, positionFactor = shapeData.innerRadius + shapeData.lineSpacing * angle,
                x = positionFactor * Math.cos(angle), y = positionFactor * Math.sin(angle);

            context.lineTo(x, y);
        }
    });
});