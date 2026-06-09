<template>
  <div>
    <NuxtParticles id="tsparticles" :options="options" />
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
          <div v-for="f in features" :key="f.title" class="feature-card">
            <div class="feature-icon">{{ f.icon }}</div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <section id="pricing" class="section">
      <div class="container">
        <h2>Pricing</h2>
        <div class="pricing-grid">
          <div v-for="p in pricingPlans" :key="p.plan" :class="['pricing-card', { featured: p.featured }]">
            <h3>{{ p.plan }}</h3>
            <p class="price">{{ p.price }}<span>/mo</span></p>
            <ul>
              <li v-for="f in p.features" :key="f">{{ f }}</li>
            </ul>
            <a href="#" :class="['btn', p.featured ? 'btn-primary' : 'btn-secondary']">{{ p.plan === 'Enterprise' ? 'Contact Sales' : 'Choose Plan' }}</a>
          </div>
        </div>
      </div>
    </section>
    <section id="testimonials" class="section">
      <div class="container">
        <h2>What Our Users Say</h2>
        <div class="testimonial-grid">
          <div v-for="t in testimonials" :key="t.author" class="testimonial-card">
            <p>"{{ t.text }}"</p>
            <span class="author">— {{ t.author }}</span>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
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
      },
      features: [
        { icon: "⚡", title: "Blazing Fast", desc: "Optimized for performance from the ground up." },
        { icon: "🔒", title: "Secure", desc: "Enterprise-grade security built into every layer." },
        { icon: "🌍", title: "Global Scale", desc: "Deploy anywhere with our global infrastructure." },
        { icon: "🎨", title: "Customizable", desc: "Tailor every aspect to your brand and needs." },
      ],
      pricingPlans: [
        { plan: "Starter", price: "$9", features: ["Up to 5 projects", "Basic analytics", "Email support"], featured: false },
        { plan: "Pro", price: "$29", features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom integrations"], featured: true },
        { plan: "Enterprise", price: "$99", features: ["Everything in Pro", "Dedicated support", "SLA guarantee", "Custom deployment"], featured: false },
      ],
      testimonials: [
        { text: "This platform transformed how our team ships features. Absolutely love it.", author: "Sarah K., CTO" },
        { text: "The best investment we made this year. The performance gains are incredible.", author: "Michael R., Developer" },
      ],
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
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
