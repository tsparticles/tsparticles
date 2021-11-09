import { Application } from "typedoc";
import { CustomTheme } from "./theme";

export function load(app: Application): void {
    app.renderer.defineTheme("tsparticles-docs", CustomTheme);
}
