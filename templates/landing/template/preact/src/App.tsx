import Particles from "@tsparticles/preact";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { useEffect, useState } from "preact/hooks";
import "./App.css";

export default function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    async function initEngine() {
      const engine = {} as Engine;
      await loadSlim(engine);
      setInit(true);
    }
    initEngine();
  }, []);

  const options: ISourceOptions = {
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

  return (
    <>
      <Particles id="tsparticles" options={options} />
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
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>Blazing Fast</h3>
              <p>Optimized for performance from the ground up.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔒</div>
              <h3>Secure</h3>
              <p>Enterprise-grade security built into every layer.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🌍</div>
              <h3>Global Scale</h3>
              <p>Deploy anywhere with our global infrastructure.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h3>Customizable</h3>
              <p>Tailor every aspect to your brand and needs.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" class="section">
        <div class="container">
          <h2>Pricing</h2>
          <div class="pricing-grid">
            <div class="pricing-card">
              <h3>Starter</h3>
              <p class="price">$9<span>/mo</span></p>
              <ul>
                <li>Up to 5 projects</li>
                <li>Basic analytics</li>
                <li>Email support</li>
              </ul>
              <a href="#" class="btn btn-secondary">Choose Plan</a>
            </div>
            <div class="pricing-card featured">
              <h3>Pro</h3>
              <p class="price">$29<span>/mo</span></p>
              <ul>
                <li>Unlimited projects</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
                <li>Custom integrations</li>
              </ul>
              <a href="#" class="btn btn-primary">Choose Plan</a>
            </div>
            <div class="pricing-card">
              <h3>Enterprise</h3>
              <p class="price">$99<span>/mo</span></p>
              <ul>
                <li>Everything in Pro</li>
                <li>Dedicated support</li>
                <li>SLA guarantee</li>
                <li>Custom deployment</li>
              </ul>
              <a href="#" class="btn btn-secondary">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials" class="section">
        <div class="container">
          <h2>What Our Users Say</h2>
          <div class="testimonial-grid">
            <div class="testimonial-card">
              <p>"This platform transformed how our team ships features. Absolutely love it."</p>
              <span class="author">— Sarah K., CTO</span>
            </div>
            <div class="testimonial-card">
              <p>"The best investment we made this year. The performance gains are incredible."</p>
              <span class="author">— Michael R., Developer</span>
            </div>
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
    </>
  );
}
