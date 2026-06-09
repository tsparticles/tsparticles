import "./style.css";
import $ from "jquery";
import { ribbons } from "@tsparticles/ribbons";

$(() => {
  $("#fireBtn").on("click", () => ribbons());
});
