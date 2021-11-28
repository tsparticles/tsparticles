import { Application, JSX } from "typedoc";

//import { CustomTheme } from "./theme";

export function load(app: Application): void {
  //app.renderer.defineTheme("tsparticles-docs", CustomTheme);
  app.renderer.hooks.on("body.end", () => {
    const clarityHtml = `(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "8q4bxin4tm");`;

    const clarity = JSX.createElement("script", { html: clarityHtml, type: "text/javascript" });

    return (
      <div>
        {clarity}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1784552607103901"
          crossOrigin="anonymous"
        />
      </div>
    );
  });
}
