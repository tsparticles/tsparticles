import { onMount } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import { loadSlim } from "@tsparticles/slim";
import configs from "@tsparticles/configs";
import type { ISourceOptions } from "@tsparticles/engine";

export default function App() {
  onMount(() => {
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  });

  const keys = Object.keys(configs);
  const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;
  const presetConfig = configs[randomKey] as Record<string, unknown>;

  const options: ISourceOptions = {
    ...presetConfig,
    fullScreen: { enable: true, zIndex: -1 },
  } as ISourceOptions;

  function handleSubmit(e: Event) {
    e.preventDefault();
    alert("Message sent! (demo)");
    const form = e.target as HTMLFormElement;
    form.reset();
  }

  return (
    <>
      <nav id="navbar">
        <a href="#hero" class="nav-link">Home</a>
        <a href="#about" class="nav-link">About</a>
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#skills" class="nav-link">Skills</a>
        <a href="#contact" class="nav-link">Contact</a>
      </nav>

      <section id="hero" class="section">
        <div class="hero-content">
          <h1>Hello, I'm <span class="highlight">Your Name</span></h1>
          <p class="subtitle">Full-Stack Developer &amp; Designer</p>
        </div>
      </section>

      <section id="about" class="section content-section">
        <div class="container">
          <h2>About Me</h2>
          <p>A passionate developer who loves building beautiful and performant web applications. Experienced in modern JavaScript frameworks, cloud infrastructure, and UI/UX design.</p>
        </div>
      </section>

      <section id="projects" class="section content-section">
        <div class="container">
          <h2>Projects</h2>
          <div class="project-grid">
            <div class="project-card">
              <h3>Project One</h3>
              <p>A web application built with React and TypeScript.</p>
            </div>
            <div class="project-card">
              <h3>Project Two</h3>
              <p>Real-time dashboard with data visualization.</p>
            </div>
            <div class="project-card">
              <h3>Project Three</h3>
              <p>Mobile-first e-commerce platform.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" class="section content-section">
        <div class="container">
          <h2>Skills</h2>
          <div class="skill-bar"><span class="skill-name">TypeScript</span><div class="bar"><div class="fill" style="width: 90%"></div></div></div>
          <div class="skill-bar"><span class="skill-name">React</span><div class="bar"><div class="fill" style="width: 85%"></div></div></div>
          <div class="skill-bar"><span class="skill-name">Node.js</span><div class="bar"><div class="fill" style="width: 80%"></div></div></div>
          <div class="skill-bar"><span class="skill-name">CSS</span><div class="bar"><div class="fill" style="width: 88%"></div></div></div>
        </div>
      </section>

      <section id="contact" class="section content-section">
        <div class="container">
          <h2>Contact</h2>
          <form id="contactForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows={5} required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      <Particles id="tsparticles" options={options} />
    </>
  );
}
