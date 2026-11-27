import { createRibbons } from "@tsparticles/ribbons";
import "./style.css";
import { engine } from "../particlesEngine";
const ribbons = createRibbons(engine);

const fireBtn = document.getElementById("fireBtn") as HTMLButtonElement;

fireBtn.addEventListener("click", () => {
  ribbons();
});
