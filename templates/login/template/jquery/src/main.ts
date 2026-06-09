import $ from "jquery";
import "@tsparticles/jquery";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import "./style.css";

let isLogin = true;

function validateEmail(val: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function setTheme(theme: string): void {
  document.documentElement.setAttribute("data-theme", theme);
  $("#themeToggle").text(theme === "dark" ? "🌙" : "☀️");
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

$("#themeToggle").on("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

function validate(): boolean {
  let valid = true;

  const email = $("#email").val() as string;
  const password = $("#password").val() as string;
  const confirm = $("#confirmPassword").val() as string;

  if (!email || !validateEmail(email)) {
    $("#emailError").text("Please enter a valid email address");
    valid = false;
  } else {
    $("#emailError").text("");
  }

  if (!password || password.length < 6) {
    $("#passwordError").text("Password must be at least 6 characters");
    valid = false;
  } else {
    $("#passwordError").text("");
  }

  if (!isLogin && password !== confirm) {
    $("#confirmError").text("Passwords do not match");
    valid = false;
  } else {
    $("#confirmError").text("");
  }

  return valid;
}

function toggleMode(): void {
  isLogin = !isLogin;
  $("#authTitle").text(isLogin ? "Login" : "Register");
  $("#submitBtn").text(isLogin ? "Sign In" : "Create Account");
  $("#toggleLabel").text(isLogin ? "Don't have an account?" : "Already have an account?");
  $("#toggleAuth").text(isLogin ? "Register" : "Login");
  $("#confirmGroup").toggle(!isLogin);
  $("#emailError").text("");
  $("#passwordError").text("");
  $("#confirmError").text("");
}

$("#toggleAuth").on("click", (e) => {
  e.preventDefault();
  toggleMode();
});

$("#authForm").on("submit", (e) => {
  e.preventDefault();

  if (!validate()) return;

  if (isLogin) {
    alert("Logged in successfully! (demo)");
  } else {
    alert("Account created successfully! (demo)");
    toggleMode();
  }

  $("#authForm")[0].reset();
});

(async () => {
  await loadSlim(tsParticles);

  $("#tsparticles").particles().load({
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
  });
})();
