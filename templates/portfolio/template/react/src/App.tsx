import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import configs from "@tsparticles/configs";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import "./App.css";

async function init(engine: Engine): Promise<void> {
  await loadSlim(engine);
}

const keys = Object.keys(configs);
const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;
const options: ISourceOptions = {
  ...configs[randomKey],
  fullScreen: { enable: true, zIndex: -1 },
} as ISourceOptions;

export default function App() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Message sent! (demo)");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <ParticlesProvider init={init}>
      <Particles id="tsparticles" options={options} />
      <nav id="navbar">
        {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
        ))}
      </nav>
      <section id="hero" className="section">
        <div className="hero-content">
          <h1>Hello, I'm <span className="highlight">Your Name</span></h1>
          <p className="subtitle">Full-Stack Developer &amp; Designer</p>
        </div>
      </section>
      <section id="about" className="section content-section">
        <div className="container">
          <h2>About Me</h2>
          <p>A passionate developer who loves building beautiful and performant web applications. Experienced in modern JavaScript frameworks, cloud infrastructure, and UI/UX design.</p>
        </div>
      </section>
      <section id="projects" className="section content-section">
        <div className="container">
          <h2>Projects</h2>
          <div className="project-grid">
            {[{ title: "Project One", desc: "A web application built with React and TypeScript." },
              { title: "Project Two", desc: "Real-time dashboard with data visualization." },
              { title: "Project Three", desc: "Mobile-first e-commerce platform." }
            ].map((p, i) => (
              <div key={i} className="project-card">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="skills" className="section content-section">
        <div className="container">
          <h2>Skills</h2>
          {[{ name: "TypeScript", pct: 90 }, { name: "React", pct: 85 }, { name: "Node.js", pct: 80 }, { name: "CSS", pct: 88 }].map((s, i) => (
            <div key={i} className="skill-bar">
              <span className="skill-name">{s.name}</span>
              <div className="bar"><div className="fill" style={{ width: `${s.pct}%` }}></div></div>
            </div>
          ))}
        </div>
      </section>
      <section id="contact" className="section content-section">
        <div className="container">
          <h2>Contact</h2>
          <form id="contactForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows={5} required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </ParticlesProvider>
  );
}
