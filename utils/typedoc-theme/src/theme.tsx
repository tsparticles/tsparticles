import { DefaultThemeRenderContext, JSX, DefaultTheme } from "typedoc";

class CustomThemeContext extends DefaultThemeRenderContext {
  // Important: If you use `this`, this function MUST be bound! Template functions are free
  // to destructure the context object to only grab what they care about.
  override analytics = () => {
    const oldRes = super.analytics ?? "";

    const clarityHtml = `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "8q4bxin4tm");`;

    return (
      <div>
        {oldRes}
        <script type="text/javascript">
          <JSX.Raw html={clarityHtml} />
        </script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1784552607103901"
          crossOrigin="anonymous"
        ></script>
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
