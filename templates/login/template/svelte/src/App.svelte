<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import type { ISourceOptions } from "@tsparticles/engine";

  let isLogin = $state(true);
  let email = $state("");
  let password = $state("");
  let confirmPassword = $state("");
  let emailError = $state("");
  let passwordError = $state("");
  let confirmError = $state("");
  let theme = $state("dark");

  function validateEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setTheme(value: string): void {
    theme = value;
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("theme", value);
  }

  function toggleTheme(): void {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const savedTheme = typeof localStorage !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark";
  setTheme(savedTheme);

  function validate(): boolean {
    let valid = true;

    if (!email || !validateEmail(email)) {
      emailError = "Please enter a valid email address";
      valid = false;
    } else {
      emailError = "";
    }

    if (!password || password.length < 6) {
      passwordError = "Password must be at least 6 characters";
      valid = false;
    } else {
      passwordError = "";
    }

    if (!isLogin) {
      if (password !== confirmPassword) {
        confirmError = "Passwords do not match";
        valid = false;
      } else {
        confirmError = "";
      }
    }

    return valid;
  }

  function toggleMode(): void {
    isLogin = !isLogin;
    emailError = "";
    passwordError = "";
    confirmError = "";
  }

  function handleSubmit(e: Event): void {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (isLogin) {
      alert("Logged in successfully! (demo)");
    } else {
      alert("Account created successfully! (demo)");
      isLogin = true;
    }

    email = "";
    password = "";
    confirmPassword = "";
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
</script>

<div class="auth-container">
  <div class="auth-card">
    <div class="auth-header">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <button class="theme-btn" onclick={toggleTheme}>
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
    </div>

    <form onsubmit={handleSubmit}>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          bind:value={email}
        />
        <span class="error">{emailError}</span>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          bind:value={password}
        />
        <span class="error">{passwordError}</span>
      </div>

      {#if !isLogin}
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            bind:value={confirmPassword}
          />
          <span class="error">{confirmError}</span>
        </div>
      {/if}

      <button type="submit">{isLogin ? "Sign In" : "Create Account"}</button>
    </form>

    <div class="toggle-text">
      {isLogin ? "Don't have an account?" : "Already have an account?"}
      <a href="#" onclick={toggleMode}>{isLogin ? "Register" : "Login"}</a>
    </div>
  </div>
</div>

<Particles id="tsparticles" options={options} />

<style>
  :global(:root) {
    --bg: #0f0f1a;
    --card-bg: rgba(255, 255, 255, 0.05);
    --text: #fff;
    --border: rgba(255, 255, 255, 0.1);
    --input-bg: rgba(255, 255, 255, 0.08);
    --accent: #6c5ce7;
    --accent-hover: #a29bfe;
    --error: #e74c3c;
  }

  :global([data-theme="light"]) {
    --bg: #f0f0f5;
    --card-bg: rgba(255, 255, 255, 0.8);
    --text: #1a1a2e;
    --border: rgba(0, 0, 0, 0.1);
    --input-bg: rgba(0, 0, 0, 0.05);
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
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
