<script setup lang="ts">
import configs from "@tsparticles/configs";
import type { ISourceOptions } from "@tsparticles/engine";

const keys = Object.keys(configs);
const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;
const options: ISourceOptions = {
  ...(configs[randomKey] as ISourceOptions),
  fullScreen: { enable: true, zIndex: -1 },
};

const navItems = ["Home", "About", "Projects", "Skills", "Contact"];

const projects = [
  { title: "Project One", desc: "A web application built with Nuxt 3 and TypeScript." },
  { title: "Project Two", desc: "Real-time dashboard with data visualization." },
  { title: "Project Three", desc: "Mobile-first e-commerce platform." },
];

const skills = [
  { name: "TypeScript", pct: 90 },
  { name: "Nuxt 3", pct: 85 },
  { name: "Node.js", pct: 80 },
  { name: "CSS", pct: 88 },
];

function handleSubmit(e: Event) {
  e.preventDefault();
  alert("Message sent! (demo)");
  (e.target as HTMLFormElement).reset();
}
</script>

<template>
  <div>
    <vue-particles id="tsparticles" :options="options" />
    <nav id="navbar">
      <a v-for="item in navItems" :key="item" :href="'#' + item.toLowerCase()" class="nav-link">{{ item }}</a>
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
          <div v-for="p in projects" :key="p.title" class="project-card">
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <section id="skills" class="section content-section">
      <div class="container">
        <h2>Skills</h2>
        <div v-for="s in skills" :key="s.name" class="skill-bar">
          <span class="skill-name">{{ s.name }}</span>
          <div class="bar"><div class="fill" :style="{ width: s.pct + '%' }"></div></div>
        </div>
      </div>
    </section>
    <section id="contact" class="section content-section">
      <div class="container">
        <h2>Contact</h2>
        <form id="contactForm" @submit="handleSubmit">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif; color: #fff; background: #0a0a1a; }
#navbar { position: fixed; top: 0; width: 100%; z-index: 100; display: flex; justify-content: center; gap: 2rem; padding: 1rem; background: rgba(10,10,26,0.8); backdrop-filter: blur(10px); }
.nav-link { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.9em; transition: color 0.2s; }
.nav-link:hover { color: #6c5ce7; }
.section { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
#hero { position: relative; }
.hero-content { text-align: center; z-index: 10; }
.hero-content h1 { font-size: 3.5em; margin-bottom: 0.5rem; }
.highlight { color: #6c5ce7; }
.subtitle { font-size: 1.3em; opacity: 0.7; }
.content-section { padding: 6rem 1rem; min-height: auto; }
.container { max-width: 900px; width: 100%; margin: 0 auto; }
h2 { font-size: 2.2em; margin-bottom: 2rem; color: #6c5ce7; }
p { line-height: 1.7; opacity: 0.85; font-size: 1.1em; }
.project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
.project-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.5rem; transition: transform 0.2s, border-color 0.2s; }
.project-card:hover { transform: translateY(-4px); border-color: #6c5ce7; }
.project-card h3 { margin-bottom: 0.5rem; }
.skill-bar { margin-bottom: 1.2rem; }
.skill-name { display: block; margin-bottom: 0.3em; font-size: 0.95em; opacity: 0.8; }
.bar { height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; overflow: hidden; }
.fill { height: 100%; background: linear-gradient(90deg,#6c5ce7,#a29bfe); border-radius: 5px; transition: width 1s ease; }
#contactForm { display: flex; flex-direction: column; gap: 1rem; max-width: 500px; }
#contactForm input, #contactForm textarea { padding: 0.8em 1em; font-size: 1em; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; background: rgba(255,255,255,0.05); color: #fff; outline: none; font-family: inherit; }
#contactForm input:focus, #contactForm textarea:focus { border-color: #6c5ce7; }
#contactForm button { padding: 0.8em; font-size: 1em; font-weight: 600; border: none; border-radius: 8px; background: #6c5ce7; color: #fff; cursor: pointer; transition: background 0.2s; }
#contactForm button:hover { background: #a29bfe; }
</style>
