<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import type { ISourceOptions } from "@tsparticles/engine";

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
      links: {
        enable: true,
        distance: 150,
        color: "#6c5ce7",
        opacity: 0.15,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
      },
      modes: {
        grab: { distance: 200, links: { opacity: 0.5 } },
      },
    },
    detectRetina: true,
  };
</script>

<section id="hero" class="section">
  <div class="hero-content">
    <h1>Build <span class="gradient-text">Amazing</span> Products</h1>
    <p class="hero-subtitle">
      Modern solutions for modern teams. Ship faster with less friction.
    </p>
    <div class="hero-cta">
      <a href="#features" class="btn btn-primary btn-large">Get Started</a>
      <a href="#features" class="btn btn-secondary btn-large">Learn More</a>
    </div>
  </div>
</section>

<section id="features" class="section">
  <div class="container">
    <h2>Features</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>Lightning Fast</h3>
        <p>Optimized for performance with minimal overhead.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3>Secure by Default</h3>
        <p>Enterprise-grade security built into every layer.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🛠️</div>
        <h3>Developer First</h3>
        <p>Clean APIs and comprehensive documentation.</p>
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
        <div class="price">$0<span>/mo</span></div>
        <ul>
          <li>Up to 1,000 requests</li>
          <li>Basic analytics</li>
          <li>Community support</li>
        </ul>
        <a href="#cta" class="btn btn-secondary">Get Started</a>
      </div>
      <div class="pricing-card featured">
        <h3>Professional</h3>
        <div class="price">$29<span>/mo</span></div>
        <ul>
          <li>Up to 50,000 requests</li>
          <li>Advanced analytics</li>
          <li>Priority support</li>
          <li>Custom integrations</li>
        </ul>
        <a href="#cta" class="btn btn-primary">Get Started</a>
      </div>
      <div class="pricing-card">
        <h3>Enterprise</h3>
        <div class="price">$99<span>/mo</span></div>
        <ul>
          <li>Unlimited requests</li>
          <li>Real-time analytics</li>
          <li>Dedicated support</li>
          <li>Custom SLA</li>
        </ul>
        <a href="#cta" class="btn btn-secondary">Contact Us</a>
      </div>
    </div>
  </div>
</section>

<section id="testimonials" class="section">
  <div class="container">
    <h2>What Our Users Say</h2>
    <div class="testimonial-grid">
      <div class="testimonial-card">
        <p>"This platform transformed our workflow. The speed and reliability are unmatched."</p>
        <div class="author">— Sarah K., CTO</div>
      </div>
      <div class="testimonial-card">
        <p>"The developer experience is incredible. We built our entire product on top of it."</p>
        <div class="author">— Marcus J., Lead Developer</div>
      </div>
      <div class="testimonial-card">
        <p>"Outstanding support and documentation. Highly recommended for any team."</p>
        <div class="author">— Elena R., Product Manager</div>
      </div>
    </div>
  </div>
</section>

<section id="cta" class="section">
  <div class="container">
    <div class="cta-content">
      <h2>Ready to Get Started?</h2>
      <p>Join thousands of teams already building with us.</p>
      <a href="#hero" class="btn btn-primary btn-large">Start Free Trial</a>
    </div>
  </div>
</section>

<footer id="footer">
  <div class="container">
    <div class="footer-content">
      <p>&copy; 2024 {{projectName}}. All rights reserved.</p>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact</a>
      </div>
    </div>
  </div>
</footer>

<Particles id="tsparticles" options={options} />

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    color: #fff;
    background: #080818;
    overflow-x: hidden;
  }

  .section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 1rem;
    position: relative;
  }

  .container {
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  h2 {
    font-size: 2.5em;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #6c5ce7, #00cec9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  #hero {
    min-height: 100vh;
    position: relative;
  }

  .hero-content {
    text-align: center;
    z-index: 10;
    padding: 2rem;
  }

  .hero-content h1 {
    font-size: 4em;
    line-height: 1.1;
    margin-bottom: 1rem;
  }

  .gradient-text {
    background: linear-gradient(135deg, #6c5ce7, #fd79a8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.3em;
    opacity: 0.7;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.8em 2em;
    font-size: 1.1em;
    font-weight: 600;
    border-radius: 8px;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-block;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(108, 92, 231, 0.4);
  }

  .btn-primary {
    background: linear-gradient(135deg, #6c5ce7, #a29bfe);
    color: #fff;
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .btn-large {
    padding: 1em 3em;
    font-size: 1.2em;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    transition: transform 0.3s, border-color 0.3s;
  }

  .feature-card:hover {
    transform: translateY(-6px);
    border-color: #6c5ce7;
  }

  .feature-icon {
    font-size: 2.5em;
    margin-bottom: 1rem;
  }

  .feature-card h3 {
    margin-bottom: 0.5rem;
  }

  .feature-card p {
    opacity: 0.7;
    font-size: 0.95em;
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    align-items: center;
  }

  .pricing-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 2.5rem 2rem;
    text-align: center;
  }

  .pricing-card.featured {
    border-color: #6c5ce7;
    background: rgba(108, 92, 231, 0.08);
    transform: scale(1.05);
  }

  .price {
    font-size: 3em;
    font-weight: 700;
    margin: 1rem 0;
  }

  .price span {
    font-size: 0.4em;
    opacity: 0.5;
    font-weight: 400;
  }

  .pricing-card ul {
    list-style: none;
    margin: 1.5rem 0;
  }

  .pricing-card li {
    padding: 0.4em 0;
    opacity: 0.8;
  }

  .pricing-card li::before {
    content: "✓ ";
    color: #00cec9;
  }

  .testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .testimonial-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 2rem;
    text-align: left;
  }

  .testimonial-card p {
    font-style: italic;
    font-size: 1.1em;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .author {
    opacity: 0.6;
    font-size: 0.9em;
  }

  .cta-content h2 {
    margin-bottom: 1rem;
  }

  .cta-content p {
    font-size: 1.2em;
    opacity: 0.7;
    margin-bottom: 2rem;
  }

  #footer {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 2rem 1rem;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .footer-content p {
    opacity: 0.5;
    font-size: 0.9em;
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;
  }

  .footer-links a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 0.9em;
  }

  .footer-links a:hover {
    color: #6c5ce7;
  }
</style>
