import "./style.css";
import { ribbons } from "@tsparticles/ribbons";

const app = document.getElementById("app")!;

const btn = document.createElement("button");
btn.textContent = "Fire Ribbons";
btn.addEventListener("click", () => ribbons());

const controls = document.createElement("div");
controls.className = "controls";
controls.appendChild(btn);

const title = document.createElement("h1");
title.textContent = "Ribbons";

app.appendChild(title);
app.appendChild(controls);
