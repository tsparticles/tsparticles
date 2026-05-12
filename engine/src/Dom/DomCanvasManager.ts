import { cloneStyle, getFullScreenStyle, safeMutationObserver } from "../Utils/Utils.js";
import { getStyleFromRgb, rangeColorToRgb } from "../Utils/ColorUtils.js";
import type { Container } from "../Core/Container.js";
import type { PluginManager } from "../Core/Utils/PluginManager.js";

/**
 *
 * @param canvas
 * @param style
 * @param important
 */
function setStyle(canvas: HTMLCanvasElement, style?: CSSStyleDeclaration, important = false): void {
  if (!style) {
    return;
  }

  const elementStyle = canvas.style,
    keys = new Set<string>();

  for (let i = 0; i < elementStyle.length; i++) {
    const key = elementStyle.item(i);

    if (!key) {
      continue;
    }

    keys.add(key);
  }

  for (let i = 0; i < style.length; i++) {
    const key = style.item(i);

    if (!key) {
      continue;
    }

    keys.add(key);
  }

  for (const key of keys) {
    const value = style.getPropertyValue(key);

    if (value) {
      elementStyle.setProperty(key, value, important ? "important" : "");
    } else {
      elementStyle.removeProperty(key);
    }
  }
}

/**
 * Handles browser-specific canvas concerns: style, background and DOM mutation observers.
 */
export class DomCanvasManager {
  private _domElement?: HTMLCanvasElement;
  private _generated = false;
  private _mutationObserver?: MutationObserver;
  private _originalStyle?: CSSStyleDeclaration;
  private _pointerEvents = "none";

  constructor(
    private readonly _pluginManager: PluginManager,
    private readonly _container: Container,
  ) {}

  get domElement(): HTMLCanvasElement | undefined {
    return this._domElement;
  }

  destroy(): void {
    this.stop();

    if (this._generated) {
      this._domElement?.remove();
    } else {
      this._resetOriginalStyle();
    }

    this._domElement = undefined;
    this._originalStyle = undefined;
    this._generated = false;
  }

  init(): void {
    this._disconnectObserver();

    this._mutationObserver = safeMutationObserver(records => {
      for (const record of records) {
        if (record.type === "attributes" && record.attributeName === "style") {
          this._repairStyle();
        }
      }
    });

    this._repairStyle();
  }

  initBackground(): void {
    const domElement = this._domElement;

    if (!domElement) {
      return;
    }

    const { _container } = this,
      options = _container.actualOptions,
      background = options.background,
      elementStyle = domElement.style,
      color = rangeColorToRgb(this._pluginManager, background.color);

    if (color) {
      elementStyle.backgroundColor = getStyleFromRgb(color, _container.hdr, background.opacity);
    } else {
      elementStyle.backgroundColor = "";
    }

    elementStyle.backgroundImage = background.image || "";
    elementStyle.backgroundPosition = background.position || "";
    elementStyle.backgroundRepeat = background.repeat || "";
    elementStyle.backgroundSize = background.size || "";
  }

  loadCanvasElement(domElement: HTMLCanvasElement | undefined, generated: boolean): void {
    if (this._generated && this._domElement && this._domElement !== domElement) {
      this._domElement.remove();
    }

    this._domElement = domElement;
    this._generated = generated;

    if (!domElement) {
      this._originalStyle = undefined;

      return;
    }

    domElement.ariaHidden = "true";
    this._originalStyle = cloneStyle(domElement.style);
  }

  setPointerEvents(type: string): void {
    this._pointerEvents = type;
    this._repairStyle();
  }

  stop(): void {
    this._disconnectObserver();
    this._mutationObserver = undefined;
  }

  private readonly _disconnectObserver = (): void => {
    this._mutationObserver?.disconnect();
  };

  private readonly _initStyle = (): void => {
    const element = this._domElement,
      options = this._container.actualOptions;

    if (!element) {
      return;
    }

    if (options.fullScreen.enable) {
      this._setFullScreenStyle();
    } else {
      this._resetOriginalStyle();
    }

    for (const key in options.style) {
      if (!key || !(key in options.style)) {
        continue;
      }

      const value = options.style[key];

      if (!value) {
        continue;
      }

      element.style.setProperty(key, value, "important");
    }
  };

  private readonly _repairStyle = (): void => {
    const element = this._domElement,
      observer = this._mutationObserver;

    if (!element) {
      return;
    }

    observer?.disconnect();
    this._initStyle();
    this.initBackground();

    const pointerEvents = this._pointerEvents;

    element.style.pointerEvents = pointerEvents;
    element.style.setProperty("pointer-events", pointerEvents);

    if (observer && element instanceof Node) {
      observer.observe(element, { attributes: true });
    }
  };

  private readonly _resetOriginalStyle = (): void => {
    if (!this._domElement || !this._originalStyle) {
      return;
    }

    setStyle(this._domElement, this._originalStyle, true);
  };

  private readonly _setFullScreenStyle = (): void => {
    if (!this._domElement) {
      return;
    }

    setStyle(this._domElement, getFullScreenStyle(this._container.actualOptions.fullScreen.zIndex), true);
  };
}
