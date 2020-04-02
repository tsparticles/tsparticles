if (!tsParticles) {
    throw new Error('tsParticles not found');
}

tsParticles.addShape('heart', function (context, particle, radius, opacity) {
    var x = -radius / 2;
    var y = -radius / 2;

    context.moveTo(x, y + radius / 4);
    context.quadraticCurveTo(x, y, x + radius / 4, y);
    context.quadraticCurveTo(x + radius / 2, y, x + radius / 2, y + radius / 4);
    context.quadraticCurveTo(x + radius / 2, y, x + radius * 3 / 4, y);
    context.quadraticCurveTo(x + radius, y, x + radius, y + radius / 4);
    context.quadraticCurveTo(x + radius, y + radius / 2, x + radius * 3 / 4, y + radius * 3 / 4);
    context.lineTo(x + radius / 2, y + radius);
    context.lineTo(x + radius / 4, y + radius * 3 / 4);
    context.quadraticCurveTo(x, y + radius / 2, x, y + radius / 4);
});