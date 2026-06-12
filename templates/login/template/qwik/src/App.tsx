import { component$, useVisibleTask$, useSignal, $ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

function validateEmail(val: string): boolean {
  return /^[^\s@]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(val);
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

export default component$(() => {
  const isLogin = useSignal(true);
  const theme = useSignal("dark");
  const email = useSignal("");
  const password = useSignal("");
  const confirm = useSignal("");
  const emailErr = useSignal("");
  const passErr = useSignal("");
  const confirmErr = useSignal("");

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
    theme.value = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", theme.value);
  });

  const toggleTheme = $(() => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme.value);
    localStorage.setItem("theme", theme.value);
  });

  const handleSubmit = $((e: Event) => {
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
  });

  const toggleMode = $((e: Event) => {
    e.preventDefault();
    isLogin.value = !isLogin.value;
    emailErr.value = "";
    passErr.value = "";
    confirmErr.value = "";
  });

  return (
    <div>
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1>{isLogin.value ? "Login" : "Register"}</h1>
            <button class="theme-btn" onClick$={toggleTheme} aria-label="Toggle theme">{theme.value === "dark" ? "🌙" : "☀️"}</button>
          </div>
          <form onSubmit$={handleSubmit} novalidate>
            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" type="email" placeholder="you@example.com" value={email.value} onInput$={(e: InputEvent) => { email.value = (e.target as HTMLInputElement).value; }} required />
              <span class="error">{emailErr.value}</span>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" type="password" placeholder="Enter password" value={password.value} onInput$={(e: InputEvent) => { password.value = (e.target as HTMLInputElement).value; }} required />
              <span class="error">{passErr.value}</span>
            </div>
            {!isLogin.value && (
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" placeholder="Confirm password" value={confirm.value} onInput$={(e: InputEvent) => { confirm.value = (e.target as HTMLInputElement).value; }} />
                <span class="error">{confirmErr.value}</span>
              </div>
            )}
            <button type="submit">{isLogin.value ? "Sign In" : "Create Account"}</button>
          </form>
          <p class="toggle-text">
            <span>{isLogin.value ? "Don't have an account?" : "Already have an account?"}</span>
            <a href="#" onClick$={toggleMode}>{isLogin.value ? "Register" : "Login"}</a>
          </p>
        </div>
      </div>
      <Particles id="tsparticles" options={options} />
    </div>
  );
});
