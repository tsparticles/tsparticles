import { defineParticlesElement, initParticlesEngine } from "@tsparticles/webcomponents";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import "./style.css";

void initParticlesEngine(async (engine) => {
  await loadSlim(engine);
});

defineParticlesElement();

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

let isLogin = true;

const authTitle = document.getElementById("authTitle") as HTMLHeadingElement;
const authForm = document.getElementById("authForm") as HTMLFormElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const toggleAuth = document.getElementById("toggleAuth") as HTMLAnchorElement;
const toggleLabel = document.getElementById("toggleLabel") as HTMLSpanElement;
const confirmGroup = document.getElementById("confirmGroup") as HTMLDivElement;
const themeBtn = document.getElementById("themeToggle") as HTMLButtonElement;

const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const confirmInput = document.getElementById("confirmPassword") as HTMLInputElement;

const emailError = document.getElementById("emailError") as HTMLSpanElement;
const passwordError = document.getElementById("passwordError") as HTMLSpanElement;
const confirmError = document.getElementById("confirmError") as HTMLSpanElement;

function setTheme(theme: string): void {
  document.documentElement.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "🌙" : "☀️";
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

function validateEmail(val: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function validate(): boolean {
  let valid = true;

  if (!emailInput.value || !validateEmail(emailInput.value)) {
    emailError.textContent = "Please enter a valid email address";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  if (!passwordInput.value || passwordInput.value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    valid = false;
  } else {
    passwordError.textContent = "";
  }

  if (!isLogin) {
    if (passwordInput.value !== confirmInput.value) {
      confirmError.textContent = "Passwords do not match";
      valid = false;
    } else {
      confirmError.textContent = "";
    }
  }

  return valid;
}

function toggleMode(): void {
  isLogin = !isLogin;
  authTitle.textContent = isLogin ? "Login" : "Register";
  submitBtn.textContent = isLogin ? "Sign In" : "Create Account";
  toggleLabel.textContent = isLogin ? "Don't have an account?" : "Already have an account?";
  toggleAuth.textContent = isLogin ? "Register" : "Login";
  confirmGroup.style.display = isLogin ? "none" : "block";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmError.textContent = "";
}

toggleAuth.addEventListener("click", (e) => {
  e.preventDefault();
  toggleMode();
});

authForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validate()) return;

  if (isLogin) {
    alert("Logged in successfully! (demo)");
  } else {
    alert("Account created successfully! (demo)");
    toggleMode();
  }

  authForm.reset();
});
