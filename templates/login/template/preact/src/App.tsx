import { useState, useEffect } from "preact/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import "./App.css";

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

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    let valid = true;

    if (!email || !validateEmail(email)) {
      setEmailErr("Please enter a valid email address");
      valid = false;
    } else {
      setEmailErr("");
    }

    if (!password || password.length < 6) {
      setPassErr("Password must be at least 6 characters");
      valid = false;
    } else {
      setPassErr("");
    }

    if (!isLogin) {
      if (password !== confirm) {
        setConfirmErr("Passwords do not match");
        valid = false;
      } else {
        setConfirmErr("");
      }
    }

    if (!valid) return;

    if (isLogin) {
      alert("Logged in successfully! (demo)");
    } else {
      alert("Account created successfully! (demo)");
      setIsLogin(true);
    }

    setEmail("");
    setPassword("");
    setConfirm("");
  }

  function toggleMode(e: Event) {
    e.preventDefault();
    setIsLogin((m) => !m);
    setEmailErr("");
    setPassErr("");
    setConfirmErr("");
  }

  return (
    <div>
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1>{isLogin ? "Login" : "Register"}</h1>
            <button class="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">{theme === "dark" ? "🌙" : "☀️"}</button>
          </div>
          <form onSubmit={handleSubmit} novalidate>
            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" type="email" placeholder="you@example.com" value={email} onInput={(e) => setEmail(e.currentTarget.value)} required />
              <span class="error">{emailErr}</span>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" type="password" placeholder="Enter password" value={password} onInput={(e) => setPassword(e.currentTarget.value)} required />
              <span class="error">{passErr}</span>
            </div>
            {!isLogin && (
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" placeholder="Confirm password" value={confirm} onInput={(e) => setConfirm(e.currentTarget.value)} />
                <span class="error">{confirmErr}</span>
              </div>
            )}
            <button type="submit">{isLogin ? "Sign In" : "Create Account"}</button>
          </form>
          <p class="toggle-text">
            <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
            <a href="#" onClick={toggleMode}>{isLogin ? "Register" : "Login"}</a>
          </p>
        </div>
      </div>
      <Particles id="tsparticles" options={options} />
    </div>
  );
}
