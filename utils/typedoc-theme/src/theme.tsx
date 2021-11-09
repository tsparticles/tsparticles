import { Options, DefaultTheme, DefaultThemeRenderContext, JSX } from "typedoc";

class TestThemeContext extends DefaultThemeRenderContext {
  _header: DefaultThemeRenderContext["header"];

  constructor(theme: DefaultTheme, options: Options) {
    super(theme, options);
    this._header = this.header;

    this.header = (props) => {
      const res = this._header(props);

      res.children.push(<div class="patched-header-test"> </div>);

      console.log(res.children);

      return res;
    };
  }
}

export class TestTheme extends DefaultTheme {
  private _contextCache?: TestThemeContext;
  override getRenderContext(): TestThemeContext {
    this._contextCache ||= new TestThemeContext(this, this.application.options);
    return this._contextCache;
  }
}
