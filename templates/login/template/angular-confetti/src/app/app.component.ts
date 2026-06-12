import { Component, OnInit } from "@angular/core";
import { NgxConfettiService } from "angular-confetti";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isLogin = true;
  theme = localStorage.getItem("theme") || "dark";
  email = "";
  password = "";
  confirm = "";
  emailErr = "";
  passErr = "";
  confirmErr = "";

  constructor(private readonly confettiService: NgxConfettiService) {}

  options: ISourceOptions = {
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

  ngOnInit(): void {
    document.documentElement.setAttribute("data-theme", this.theme);
    void this.confettiService.init(async (engine) => {
      await loadSlim(engine);
    });
  }

  toggleTheme(): void {
    this.theme = this.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", this.theme);
    localStorage.setItem("theme", this.theme);
  }

  private validateEmail(val: string): boolean {
    return /^[^\s@]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(val);
  }

  onSubmit(): void {
    let valid = true;

    if (!this.email || !this.validateEmail(this.email)) {
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
  }

  toggleMode(event: Event): void {
    event.preventDefault();
    this.isLogin = !this.isLogin;
    this.emailErr = "";
    this.passErr = "";
    this.confirmErr = "";
  }
}
