import type { Options } from "typedoc";
import { DefaultThemeRenderContext, JSX, DefaultTheme } from "typedoc";

class CustomThemeContext extends DefaultThemeRenderContext {
  constructor(theme: DefaultTheme, options: Options) {
    super(theme, options);
  }

  override analytics = () => {
    const clarityHtml = `(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "8q4bxin4tm");`;

    return (
      <div>
        {super.analytics()}
        <script type="text/javascript">
          <JSX.Raw html={clarityHtml} />
        </script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1784552607103901"
          crossOrigin="anonymous"
        />
      </div>
    );
  };
}

export class CustomTheme extends DefaultTheme {
  private _contextCache?: CustomThemeContext;

  override getRenderContext(): CustomThemeContext {
    this._contextCache ||= new CustomThemeContext(this, this.application.options);

    return this._contextCache;
  }
}
