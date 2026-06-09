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

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const isLogin = ref(true);
const theme = ref("dark");
const email = ref("");
const password = ref("");
const confirm = ref("");
const emailErr = ref("");
const passErr = ref("");
const confirmErr = ref("");

const options: ISourceOptions = {
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
};

onMounted(() => {
  const saved = localStorage.getItem("theme") || "dark";
  theme.value = saved;
  document.documentElement.setAttribute("data-theme", saved);
});

function toggleTheme(): void {
  const t = theme.value === "dark" ? "light" : "dark";
  theme.value = t;
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
}

function validateEmail(val: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function handleSubmit(e: Event): void {
  e.preventDefault();
  let valid = true;

  if (!email.value || !validateEmail(email.value)) {
    emailErr.value = "Please enter a valid email address";
    valid = false;
  } else {
    emailErr.value = "";
  }

  if (!password.value || password.value.length < 6) {
    passErr.value = "Password must be at least 6 characters";
    valid = false;
  } else {
    passErr.value = "";
  }

  if (!isLogin.value) {
    if (password.value !== confirm.value) {
      confirmErr.value = "Passwords do not match";
      valid = false;
    } else {
      confirmErr.value = "";
    }
  }

  if (!valid) return;

  if (isLogin.value) {
    alert("Logged in successfully! (demo)");
  } else {
    alert("Account created successfully! (demo)");
    isLogin.value = true;
  }

  email.value = "";
  password.value = "";
  confirm.value = "";
}

function toggleMode(e: Event): void {
  e.preventDefault();
  isLogin.value = !isLogin.value;
  emailErr.value = "";
  passErr.value = "";
  confirmErr.value = "";
}
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
