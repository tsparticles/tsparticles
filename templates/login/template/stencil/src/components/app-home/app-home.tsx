import { Component, State, h, type JSX } from "@stencil/core";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

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

function validateEmail(val: string): boolean {
  return /^[^\s@]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(val);
}

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  @State() isLogin = true;
  @State() theme = localStorage.getItem("theme") || "dark";
  @State() email = "";
  @State() password = "";
  @State() confirm = "";
  @State() emailErr = "";
  @State() passErr = "";
  @State() confirmErr = "";

  componentDidLoad(): void {
    document.documentElement.setAttribute("data-theme", this.theme);
  }

  private async particlesInit(engine: Engine): Promise<void> {
    await loadSlim(engine);
  }

  private setTheme(t: string): void {
    this.theme = t;
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  }

  private toggleTheme = (): void => {
    this.setTheme(this.theme === "dark" ? "light" : "dark");
  };

  private handleSubmit = (e: Event): void => {
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
  };

  private toggleMode = (e: Event): void => {
    e.preventDefault();
    this.isLogin = !this.isLogin;
    this.emailErr = "";
    this.passErr = "";
    this.confirmErr = "";
  };

  private handleEmailInput = (e: InputEvent): void => {
    this.email = (e.target as HTMLInputElement).value;
  };

  private handlePasswordInput = (e: InputEvent): void => {
    this.password = (e.target as HTMLInputElement).value;
  };

  private handleConfirmInput = (e: InputEvent): void => {
    this.confirm = (e.target as HTMLInputElement).value;
  };

  render(): JSX.Element {
    return (
      <div>
        <div class="auth-container">
          <div class="auth-card">
            <div class="auth-header">
              <h1>{this.isLogin ? "Login" : "Register"}</h1>
              <button class="theme-btn" onClick={this.toggleTheme} aria-label="Toggle theme">{this.theme === "dark" ? "🌙" : "☀️"}</button>
            </div>
            <form onSubmit={this.handleSubmit} noValidate>
              <div class="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="you@example.com" value={this.email} onInput={this.handleEmailInput} required />
                <span class="error">{this.emailErr}</span>
              </div>
              <div class="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Enter password" value={this.password} onInput={this.handlePasswordInput} required />
                <span class="error">{this.passErr}</span>
              </div>
              {!this.isLogin && (
                <div class="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input id="confirmPassword" type="password" placeholder="Confirm password" value={this.confirm} onInput={this.handleConfirmInput} />
                  <span class="error">{this.confirmErr}</span>
                </div>
              )}
              <button type="submit">{this.isLogin ? "Sign In" : "Create Account"}</button>
            </form>
            <p class="toggle-text">
              <span>{this.isLogin ? "Don't have an account?" : "Already have an account?"}</span>
              <a href="#" onClick={this.toggleMode}>{this.isLogin ? "Register" : "Login"}</a>
            </p>
          </div>
        </div>
        <stencil-particles
          container-id="tsparticles"
          init={this.particlesInit.bind(this)}
          options={options}
        />
      </div>
    );
  }
}
