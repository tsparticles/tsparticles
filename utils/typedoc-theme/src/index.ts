import { Application } from "typedoc";
import { TestTheme } from "./theme";

export function load(app: Application): void {
    app.renderer.defineTheme("tsparticles-docs", TestTheme);
}
