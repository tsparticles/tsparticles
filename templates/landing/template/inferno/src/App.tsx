import Particles, { initParticlesEngine } from "@tsparticles/inferno";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { Component } from "inferno";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { init: false };
  }

  componentDidMount() {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      this.setState({ init: true });
    });
  }

  options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: -1 },
    background: { color: { value: "#080818" } },
    fpsLimit: 60,
    particles: {
      number: { value: 100, density: { enable: true } },
      color: { value: ["#6c5ce7", "#00cec9", "#fd79a8", "#ffeaa7"] },
      shape: { type: "circle" },
      opacity: { value: 0.4, random: true },
      size: { value: { min: 1, max: 4 }, random: true },
      links: { enable: true, distance: 150, color: "#6c5ce7", opacity: 0.15, width: 1 },
      move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, outModes: { default: "out" } },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" } },
      modes: { grab: { distance: 200, links: { opacity: 0.5 } } },
    },
    detectRetina: true,
  };

  render() {
    return (
      <div>
        <Particles id="tsparticles" options={this.options} />
        <section id="hero" class="section">
          <div class="hero-content">
            <h1>Build Faster.<br /><span class="gradient-text">Go Further.</span></h1>
            <p class="hero-subtitle">The platform that helps teams ship products at the speed of light.</p>
            <div class="hero-cta">
              <a href="#features" class="btn btn-primary">Learn More</a>
              <a href="#cta" class="btn btn-secondary">Get Started</a>
            </div>
          </div>
        </section>
        <section id="features" class="section">
          <div class="container">
            <h2>Features</h2>
            <div class="features-grid">
              {[{ icon: "⚡", title: "Blazing Fast", desc: "Optimized for performance from the ground up." },
                { icon: "🔒", title: "Secure", desc: "Enterprise-grade security built into every layer." },
                { icon: "🌍", title: "Global Scale", desc: "Deploy anywhere with our global infrastructure." },
                { icon: "🎨", title: "Customizable", desc: "Tailor every aspect to your brand and needs." }
              ].map((f, i) => (
                <div key={i} class="feature-card">
                  <div class="feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" class="section">
          <div class="container">
            <h2>Pricing</h2>
            <div class="pricing-grid">
              {[{ plan: "Starter", price: "$9", features: ["Up to 5 projects", "Basic analytics", "Email support"] },
                { plan: "Pro", price: "$29", features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom integrations"], featured: true },
                { plan: "Enterprise", price: "$99", features: ["Everything in Pro", "Dedicated support", "SLA guarantee", "Custom deployment"] }
              ].map((p, i) => (
                <div key={i} class={`pricing-card${p.featured ? " featured" : ""}`}>
                  <h3>{p.plan}</h3>
                  <p class="price">{p.price}<span>/mo</span></p>
                  <ul>{p.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
                  <a href="#" class={`btn ${p.featured ? "btn-primary" : "btn-secondary"}`}>{p.plan === "Enterprise" ? "Contact Sales" : "Choose Plan"}</a>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="testimonials" class="section">
          <div class="container">
            <h2>What Our Users Say</h2>
            <div class="testimonial-grid">
              {[{ text: "This platform transformed how our team ships features. Absolutely love it.", author: "Sarah K., CTO" },
                { text: "The best investment we made this year. The performance gains are incredible.", author: "Michael R., Developer" }
              ].map((t, i) => (
                <div key={i} class="testimonial-card">
                  <p>"{t.text}"</p>
                  <span class="author">— {t.author}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="cta" class="section">
          <div class="container cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of teams already building with us.</p>
            <a href="#" class="btn btn-primary btn-large">Start Free Trial</a>
          </div>
        </section>
        <footer id="footer">
          <div class="container footer-content">
            <p>&copy; 2026 {{projectName}}. All rights reserved.</p>
            <div class="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
