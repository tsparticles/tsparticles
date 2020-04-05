if (!tsParticles) {
    throw new Error('tsParticles not found');
}

tsParticles.addShape('heart', function (context, particle, radius, opacity) {
    var x = -radius;
    var y = -radius;

    context.moveTo(x, y + radius / 2);
    context.quadraticCurveTo(x, y, x + radius / 2, y);
    context.quadraticCurveTo(x + radius, y, x + radius, y + radius / 2);
    context.quadraticCurveTo(x + radius, y, x + radius * 3 / 2, y);
    context.quadraticCurveTo(x + radius * 2, y, x + radius * 2, y + radius / 2);
    context.quadraticCurveTo(x + radius * 2, y + radius, x + radius * 3 / 2, y + radius * 3 / 2);
    context.lineTo(x + radius, y + radius * 2);
    context.lineTo(x + radius / 2, y + radius * 3 / 2);
    context.quadraticCurveTo(x, y + radius, x, y + radius / 2);
});