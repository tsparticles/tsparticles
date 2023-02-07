var end = Date.now() + 15 * 1000;

// go Buckeyes!
var colors = ["#bb0000", "#ffffff"];

(async function frame() {
    await confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
    });
    await confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
})();
