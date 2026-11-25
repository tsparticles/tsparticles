import { component, register } from "riot";
import RiotParticles from "@tsparticles/riot";
import App from "./app.riot";
import "./style.css";

register("riot-particles", RiotParticles);

const appElement = document.getElementById("app");

if (appElement) {
  component(App)(appElement);
}
