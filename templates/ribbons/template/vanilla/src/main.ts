import "./style.css";
import { ribbons } from "@tsparticles/ribbons";

const fireBtn = document.getElementById("fireBtn") as HTMLButtonElement;

fireBtn.addEventListener("click", () => {
  ribbons();
});
