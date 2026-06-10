import { useState, useEffect } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import "./App.css";

async function init(engine: Engine): Promise<void> {
  await loadSlim(engine);
}

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
  return /^[^\s@]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(email);
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [loginMode, setLoginMode] = useState(true);
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

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  function handleSubmit(e: React.FormEvent) {
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

    if (!loginMode) {
      if (password !== confirm) {
        setConfirmErr("Passwords do not match");
        valid = false;
      } else {
        setConfirmErr("");
      }
    }

    if (!valid) return;

    if (loginMode) {
      alert("Logged in successfully! (demo)");
    } else {
      alert("Account created successfully! (demo)");
      setLoginMode(true);
    }

    setEmail("");
    setPassword("");
    setConfirm("");
  }

  function toggleMode(e: React.MouseEvent) {
    e.preventDefault();
    setLoginMode((m) => !m);
    setEmailErr("");
    setPassErr("");
    setConfirmErr("");
  }

  return (
    <ParticlesProvider init={init}>
      <Particles id="tsparticles" options={options} />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{loginMode ? "Login" : "Register"}</h1>
            <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? "\ud83c\udf19" : "\u2600\ufe0f"}
            </button>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <span className="error">{emailErr}</span>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <span className="error">{passErr}</span>
            </div>
            {!loginMode && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                <span className="error">{confirmErr}</span>
              </div>
            )}
            <button type="submit">{loginMode ? "Sign In" : "Create Account"}</button>
          </form>
          <p className="toggle-text">
            <span>{loginMode ? "Don't have an account?" : "Already have an account?"}</span>
            <a href="#" onClick={toggleMode}>{loginMode ? "Register" : "Login"}</a>
          </p>
        </div>
      </div>
    </ParticlesProvider>
  );
}
