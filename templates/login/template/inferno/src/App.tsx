import { Component, type ComponentType } from "inferno";
import Particles, { ParticlesProvider } from "@tsparticles/inferno";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
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

function validateEmail(val: string): boolean {
  return /^[^\s@]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(val);
}

interface AppState {
  isLogin: boolean;
  theme: string;
  email: string;
  password: string;
  confirm: string;
  emailErr: string;
  passErr: string;
  confirmErr: string;
}

const App: ComponentType<Record<string, unknown>> = class App extends Component<Record<string, unknown>, AppState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      isLogin: true,
      theme: localStorage.getItem("theme") || "dark",
      email: "",
      password: "",
      confirm: "",
      emailErr: "",
      passErr: "",
      confirmErr: "",
    };
  }

  componentDidMount(): void {
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  componentDidUpdate(): void {
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  private setTheme(t: string): void {
    this.setState({ theme: t });
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  }

  private toggleTheme = (): void => {
    this.setTheme(this.state.theme === "dark" ? "light" : "dark");
  };

  private handleSubmit = (e: Event): void => {
    e.preventDefault();
    let valid = true;

    if (!this.state.email || !validateEmail(this.state.email)) {
      this.setState({ emailErr: "Please enter a valid email address" });
      valid = false;
    } else {
      this.setState({ emailErr: "" });
    }

    if (!this.state.password || this.state.password.length < 6) {
      this.setState({ passErr: "Password must be at least 6 characters" });
      valid = false;
    } else {
      this.setState({ passErr: "" });
    }

    if (!this.state.isLogin) {
      if (this.state.password !== this.state.confirm) {
        this.setState({ confirmErr: "Passwords do not match" });
        valid = false;
      } else {
        this.setState({ confirmErr: "" });
      }
    }

    if (!valid) return;

    if (this.state.isLogin) {
      alert("Logged in successfully! (demo)");
    } else {
      alert("Account created successfully! (demo)");
      this.setState({ isLogin: true });
    }

    this.setState({ email: "", password: "", confirm: "" });
  };

  private toggleMode = (e: Event): void => {
    e.preventDefault();
    this.setState({ isLogin: !this.state.isLogin, emailErr: "", passErr: "", confirmErr: "" });
  };

  render() {
    return (
      <ParticlesProvider init={async (engine: Engine): Promise<void> => { await loadSlim(engine); }}>
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h1>{this.state.isLogin ? "Login" : "Register"}</h1>
              <button className="theme-btn" onClick={this.toggleTheme} aria-label="Toggle theme">{this.state.theme === "dark" ? "🌙" : "☀️"}</button>
            </div>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="you@example.com" value={this.state.email} onInput={(e) => this.setState({ email: (e.target as HTMLInputElement).value })} required />
                <span className="error">{this.state.emailErr}</span>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Enter password" value={this.state.password} onInput={(e) => this.setState({ password: (e.target as HTMLInputElement).value })} required />
                <span className="error">{this.state.passErr}</span>
              </div>
              {!this.state.isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input id="confirmPassword" type="password" placeholder="Confirm password" value={this.state.confirm} onInput={(e) => this.setState({ confirm: (e.target as HTMLInputElement).value })} />
                  <span className="error">{this.state.confirmErr}</span>
                </div>
              )}
              <button type="submit">{this.state.isLogin ? "Sign In" : "Create Account"}</button>
            </form>
            <p className="toggle-text">
              <span>{this.state.isLogin ? "Don't have an account?" : "Already have an account?"}</span>
              <a href="#" onClick={this.toggleMode}>{this.state.isLogin ? "Register" : "Login"}</a>
            </p>
          </div>
        </div>
        <Particles id="tsparticles" options={options} />
      </ParticlesProvider>
    );
  }
};

export default App;
