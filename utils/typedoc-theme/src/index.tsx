import type { Application /*, JSX*/ } from "typedoc";
import { CustomTheme } from "./theme";

export function load(app: Application): void {
    app.renderer.defineTheme("tsparticles-docs", CustomTheme);
    /*app.renderer.hooks.on("head.end", () => {
        const gaHtml = `window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }

            gtag("js", new Date());

            gtag("config", "UA-161253125-1", {
                "custom_map": {
                    "dimension1": "dimension_codepen_data",
                    "dimension2": "dimension_editor_data",
                    "dimension3": "dimension_editor_error",
                    "dimension4": "dimension_editor_mode",
                    "dimension5": "dimension_particles_export_config",
                    "dimension6": "dimension_new_preset",
                    "dimension7": "dimension_old_preset",
                    "dimension8": "dimension_status",
                    "dimension9": "dimension_particles_options"
                }
            });

            gtag("config", "AW-1021008757");
            gtag("event", "conversion", { "send_to": "AW-1021008757/3t7QCNqulswBEPW27eYD" });`;
        const clarityHtml = `(function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "8q4bxin4tm");`;

        const ga = JSX.createElement("script", { html: gaHtml });
        const clarity = JSX.createElement("script", { html: clarityHtml, type: "text/javascript" });

        return (
          <div>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-161253125-1"></script>
            {ga}
            {clarity}
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1784552607103901"
              crossOrigin="anonymous"
            ></script>
          </div>
        );
      });
      */
}
