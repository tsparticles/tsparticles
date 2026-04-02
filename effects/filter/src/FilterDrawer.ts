import { type Container, type IEffectDrawer, type IShapeDrawData } from "@tsparticles/engine";
import type { FilterParticle } from "./FilterParticle.js";
import type { IFilterData } from "./IFilterData.js";

export class FilterDrawer implements IEffectDrawer<FilterParticle> {
  drawAfter(data: IShapeDrawData<FilterParticle>): void {
    const { context } = data;

    context.restore();
  }

  drawBefore(data: IShapeDrawData<FilterParticle>): void {
    const { context, particle } = data;

    context.save();

    const blurValue = typeof particle.filterBlur === "number" ? `${particle.filterBlur}px` : particle.filterBlur,
      blurString = blurValue ? `blur(${blurValue})` : "",
      brightnessValue = particle.filterBrightness,
      brightnessString = brightnessValue ? `brightness(${brightnessValue})` : "",
      contrastValue = particle.filterContrast,
      contrastString = contrastValue ? `contrast(${contrastValue})` : "",
      dropShadowValue = particle.filterDropShadow,
      dropShadowString = dropShadowValue ? "drop-shadow(dropShadowValue)" : "",
      grayscaleValue = particle.filterGrayscale,
      grayscaleString = grayscaleValue ? `grayscale(${grayscaleValue})` : "",
      hueRotateValue =
        typeof particle.filterHueRotate === "number" ? `${particle.filterHueRotate}deg` : particle.filterHueRotate,
      hueRotateString = hueRotateValue ? `hue-rotate(${hueRotateValue})` : "",
      invertValue = particle.filterInvert,
      invertString = invertValue ? `invert(${invertValue})` : "",
      opacityValue = particle.filterOpacity,
      opacityString = opacityValue ? `opacity(${opacityValue})` : "",
      saturateValue = particle.filterSaturate,
      saturateString = saturateValue ? `saturate(${saturateValue})` : "",
      sepiaValue = particle.filterSepia,
      sepiaString = sepiaValue ? `sepia(${sepiaValue})` : "",
      urlValue = particle.filterUrl,
      urlString = urlValue ? `url(${urlValue})` : "";

    context.filter =
      `${blurString} ${brightnessString} ${contrastString} ${dropShadowString} ${grayscaleString} ${hueRotateString} ${invertString} ${opacityString} ${saturateString} ${sepiaString} ${urlString}`.trim();
  }

  particleInit(_container: Container, particle: FilterParticle): void {
    const effectData = particle.effectData as IFilterData | undefined;

    if (!effectData) {
      return;
    }

    particle.filterBlur = effectData.blur;
    particle.filterBrightness = effectData.brightness;
    particle.filterContrast = effectData.contrast;
    particle.filterDropShadow = effectData.dropShadow;
    particle.filterGrayscale = effectData.grayscale;
    particle.filterHueRotate = effectData.hueRotate;
    particle.filterInvert = effectData.invert;
    particle.filterOpacity = effectData.opacity;
    particle.filterSaturate = effectData.saturate;
    particle.filterSepia = effectData.sepia;
    particle.filterUrl = effectData.url;
  }
}
