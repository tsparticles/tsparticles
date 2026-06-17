<template>
  <div>
    <Particles id="tsparticles" :options="options" />
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>{{ isLogin ? 'Login' : 'Register' }}</h1>
          <button class="theme-btn" @click="toggleTheme" aria-label="Toggle theme">{{ theme === 'dark' ? '🌙' : '☀️' }}</button>
        </div>
        <form @submit="handleSubmit" novalidate>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" placeholder="you@example.com" required />
            <span class="error">{{ emailErr }}</span>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" placeholder="Enter password" required />
            <span class="error">{{ passErr }}</span>
          </div>
          <div v-if="!isLogin" class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" v-model="confirm" type="password" placeholder="Confirm password" />
            <span class="error">{{ confirmErr }}</span>
          </div>
          <button type="submit">{{ isLogin ? 'Sign In' : 'Create Account' }}</button>
        </form>
        <p class="toggle-text">
          <span>{{ isLogin ? "Don't have an account?" : 'Already have an account?' }}</span>
          <a href="#" @click="toggleMode">{{ isLogin ? 'Register' : 'Login' }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { loadSlim } from "@tsparticles/slim";

function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

export default {
  name: "HomePage",
  data() {
    return {
      isLogin: true,
      theme: (typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null) || "dark",
      email: "",
      password: "",
      confirm: "",
      emailErr: "",
      passErr: "",
      confirmErr: "",
      options: {
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: { value: 60, density: { enable: true } },
          color: { value: ["#6c5ce7", "#a29bfe", "#fd79a8", "#00cec9"] },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: { min: 1, max: 3 }, random: true },
          move: { enable: true, speed: 1, direction: "none", random: true, straight: false, outModes: { default: "out" } },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "bubble" } },
          modes: { bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8 } },
        },
        detectRetina: true,
      },
    };
  },
  mounted() {
    document.documentElement.setAttribute("data-theme", this.theme);
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", this.theme);
      localStorage.setItem("theme", this.theme);
    },
    handleSubmit(e) {
      e.preventDefault();
      let valid = true;

      if (!this.email || !validateEmail(this.email)) {
        this.emailErr = "Please enter a valid email address";
        valid = false;
      } else {
        this.emailErr = "";
      }

      if (!this.password || this.password.length < 6) {
        this.passErr = "Password must be at least 6 characters";
        valid = false;
      } else {
        this.passErr = "";
      }

      if (!this.isLogin) {
        if (this.password !== this.confirm) {
          this.confirmErr = "Passwords do not match";
          valid = false;
        } else {
          this.confirmErr = "";
        }
      }

      if (!valid) return;

      if (this.isLogin) {
        alert("Logged in successfully! (demo)");
      } else {
        alert("Account created successfully! (demo)");
        this.isLogin = true;
      }

      this.email = "";
      this.password = "";
      this.confirm = "";
    },
    toggleMode(e) {
      e.preventDefault();
      this.isLogin = !this.isLogin;
      this.emailErr = "";
      this.passErr = "";
      this.confirmErr = "";
    },
  },
  head() {
    return {
      script: [
        {
          innerHTML: `
            (async function() {
              const { loadSlim } = await import("@tsparticles/slim");
              const { tsParticles } = await import("@tsparticles/engine");
              await loadSlim(tsParticles);
            })();
          `,
        },
      ],
      __dangerouslyDisableSanitizers: ["script"],
    };
  },
};
</script>

<style>
:root {
  --bg: #0f0f1a;
  --card-bg: rgba(255, 255, 255, 0.05);
  --text: #fff;
  --border: rgba(255, 255, 255, 0.1);
  --input-bg: rgba(255, 255, 255, 0.08);
  --accent: #6c5ce7;
  --accent-hover: #a29bfe;
  --error: #e74c3c;
}

[data-theme="light"] {
  --bg: #f0f0f5;
  --card-bg: rgba(255, 255, 255, 0.8);
  --text: #1a1a2e;
  --border: rgba(0, 0, 0, 0.1);
  --input-bg: rgba(0, 0, 0, 0.05);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s, color 0.3s;
}

.auth-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 100%;
  max-width: 400px;
  padding: 1rem;
}

.auth-card {
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.auth-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.auth-header h1 {
  margin: 0;
  font-size: 1.8em;
}

.theme-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.4em 0.6em;
  font-size: 1.2em;
  cursor: pointer;
  transition: background 0.2s;
}

.theme-btn:hover {
  background: var(--input-bg);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.3em;
  font-size: 0.9em;
  opacity: 0.8;
}

input {
  width: 100%;
  padding: 0.7em 1em;
  font-size: 1em;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--input-bg);
  color: var(--text);
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: var(--accent);
}

input::placeholder {
  color: var(--text);
  opacity: 0.4;
}

.error {
  display: block;
  margin-top: 0.3em;
  font-size: 0.8em;
  color: var(--error);
  min-height: 1em;
}

button[type="submit"] {
  width: 100%;
  padding: 0.8em;
  font-size: 1em;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: var(--accent);
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 0.5rem;
}

button[type="submit"]:hover {
  background: var(--accent-hover);
}

.toggle-text {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9em;
  opacity: 0.7;
}

.toggle-text a {
  color: var(--accent);
  text-decoration: none;
  margin-left: 0.3em;
}

.toggle-text a:hover {
  text-decoration: underline;
}
</style>
