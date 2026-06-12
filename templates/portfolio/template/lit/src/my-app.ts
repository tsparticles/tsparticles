import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ParticlesBase } from "@tsparticles/lit";
import { loadSlim } from "@tsparticles/slim";
import configs from "@tsparticles/configs";
import type { ISourceOptions } from "@tsparticles/engine";
import style from "./style.css" with { type: "css" };

const keys = Object.keys(configs);
const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;
const options: ISourceOptions = {
  ...configs[randomKey],
  fullScreen: { enable: true, zIndex: -1 },
} as ISourceOptions;

@customElement("my-app")
export class MyApp extends LitElement {
  static styles = [style];

  @state()
  private projects = [
    { title: "Project One", desc: "A web application built with Lit and TypeScript." },
    { title: "Project Two", desc: "Real-time dashboard with data visualization." },
    { title: "Project Three", desc: "Mobile-first e-commerce platform." },
  ];

  @state()
  private skills = [
    { name: "TypeScript", pct: 90 },
    { name: "Lit", pct: 85 },
    { name: "Node.js", pct: 80 },
    { name: "CSS", pct: 88 },
  ];

  private navItems = ["Home", "About", "Projects", "Skills", "Contact"];

  connectedCallback(): void {
    super.connectedCallback();
    void ParticlesBase.init(async (engine) => {
      await loadSlim(engine);
    });
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();
    alert("Message sent! (demo)");
    (e.target as HTMLFormElement).reset();
  }

  render() {
    return html`
      <lit-particles id="tsparticles" .options=${options}></lit-particles>

      <nav id="navbar">
        ${this.navItems.map(
          (item) => html`<a href="#${item.toLowerCase()}" class="nav-link">${item}</a>`
        )}
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
            ${this.projects.map(
              (p) => html`
                <div class="project-card">
                  <h3>${p.title}</h3>
                  <p>${p.desc}</p>
                </div>
              `
            )}
          </div>
        </div>
      </section>

      <section id="skills" class="section content-section">
        <div class="container">
          <h2>Skills</h2>
          ${this.skills.map(
            (s) => html`
              <div class="skill-bar">
                <span class="skill-name">${s.name}</span>
                <div class="bar"><div class="fill" style="width: ${s.pct}%"></div></div>
              </div>
            `
          )}
        </div>
      </section>

      <section id="contact" class="section content-section">
        <div class="container">
          <h2>Contact</h2>
          <form id="contactForm" @submit=${this.handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    `;
  }
}
