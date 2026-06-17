import { Component } from "@angular/core";
import type { ISourceOptions } from "@tsparticles/engine";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "{{projectName}}";

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

  features = [
    { icon: "⚡", title: "Blazing Fast", desc: "Optimized for performance from the ground up." },
    { icon: "🔒", title: "Secure", desc: "Enterprise-grade security built into every layer." },
    { icon: "🌍", title: "Global Scale", desc: "Deploy anywhere with our global infrastructure." },
    { icon: "🎨", title: "Customizable", desc: "Tailor every aspect to your brand and needs." },
  ];

  pricingPlans = [
    { plan: "Starter", price: "$9", features: ["Up to 5 projects", "Basic analytics", "Email support"], featured: false },
    { plan: "Pro", price: "$29", features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom integrations"], featured: true },
    { plan: "Enterprise", price: "$99", features: ["Everything in Pro", "Dedicated support", "SLA guarantee", "Custom deployment"], featured: false },
  ];

  testimonials = [
    { text: "This platform transformed how our team ships features. Absolutely love it.", author: "Sarah K., CTO" },
    { text: "The best investment we made this year. The performance gains are incredible.", author: "Michael R., Developer" },
  ];
}
