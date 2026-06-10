import { createSignal, createEffect, onMount } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function App() {
  const [isLogin, setIsLogin] = createSignal(true);
  const [theme, setTheme] = createSignal(localStorage.getItem("theme") || "dark");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirm, setConfirm] = createSignal("");
  const [emailError, setEmailError] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");
  const [confirmError, setConfirmError] = createSignal("");

  createEffect(() => {
    document.documentElement.setAttribute("data-theme", theme());
  });

  onMount(() => {
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  });

  const options: ISourceOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      number: { value: 60, density: { enable: true } },
      color: { value: ["#6c5ce7", "#a29bfe", "#fd79a8", "#00cec9"] },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: { min: 1, max: 3 }, random: true },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "bubble" },
      },
      modes: {
        bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8 },
      },
    },
    detectRetina: true,
  };

  function validateEmail(value: string): boolean {
    return /^[^\s@]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(value);
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    let valid = true;

    if (!email() || !validateEmail(email())) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password() || password().length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!isLogin() && password() !== confirm()) {
      setConfirmError("Passwords do not match");
      valid = false;
    } else {
      setConfirmError("");
    }

    if (!valid) return;

    if (isLogin()) {
      alert("Logged in successfully! (demo)");
    } else {
      alert("Account created successfully! (demo)");
      setIsLogin(true);
    }

    setEmail("");
    setPassword("");
    setConfirm("");
  }

  function toggleMode() {
    setIsLogin(!isLogin());
    setEmailError("");
    setPasswordError("");
    setConfirmError("");
  }

  function toggleTheme() {
    setTheme(theme() === "dark" ? "light" : "dark");
    localStorage.setItem("theme", theme());
  }

  return (
    <>
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1>{isLogin() ? "Login" : "Register"}</h1>
            <button class="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme() === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
          <form onSubmit={handleSubmit} novalidate>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                required
              />
              <span class="error">{emailError()}</span>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
                required
              />
              <span class="error">{passwordError()}</span>
            </div>
            <div class="form-group" style={{ display: isLogin() ? "none" : "block" }}>
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirm()}
                onInput={(e) => setConfirm(e.currentTarget.value)}
              />
              <span class="error">{confirmError()}</span>
            </div>
            <button type="submit">{isLogin() ? "Sign In" : "Create Account"}</button>
          </form>
          <p class="toggle-text">
            <span>{isLogin() ? "Don't have an account?" : "Already have an account?"}</span>
            <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>
              {isLogin() ? "Register" : "Login"}
            </a>
          </p>
        </div>
      </div>
      <Particles id="tsparticles" options={options} />
    </>
  );
}
