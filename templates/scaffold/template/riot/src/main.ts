import { component } from "riot";
import App from "./app.riot";
import "./style.css";

const appElement = document.getElementById("app");

if (appElement) {
  component(App)(appElement);
}
