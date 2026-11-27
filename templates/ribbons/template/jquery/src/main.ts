import $ from "jquery";
import "./style.css";
import { createRibbons } from "@tsparticles/ribbons";
import { engine } from "../particlesEngine";
const ribbons = createRibbons(engine);

$(() => {
  $("#fireBtn").on("click", () => ribbons());
});
