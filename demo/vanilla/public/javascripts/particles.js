const engine = tsParticles.createEngine();
const particles = tsParticles.createParticles(engine);

particles({
  radius: 3,
  speed: 2,
  opacity: 0.8,
  links: true,
  linksWidth: 140,
  color: "#ffffff",
  linksColor: "#00d8ff",
});
