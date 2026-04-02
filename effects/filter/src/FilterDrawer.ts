import { type Container, type IEffectDrawer, type IShapeDrawData, isNull } from "@tsparticles/engine";
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
      brightnessValue = particle.filterBrightness,
      contrastValue = particle.filterContrast,
      dropShadowValue = particle.filterDropShadow,
      grayscaleValue = particle.filterGrayscale,
      hueRotateValue =
        typeof particle.filterHueRotate === "number" ? `${particle.filterHueRotate}deg` : particle.filterHueRotate,
      invertValue = particle.filterInvert,
      opacityValue = particle.filterOpacity,
      saturateValue = particle.filterSaturate,
      sepiaValue = particle.filterSepia,
      urlValue = particle.filterUrl,
      blurString = blurValue ? `blur(${blurValue})` : "",
      brightnessString = isNull(brightnessValue) ? "" : `brightness(${brightnessValue})`,
      contrastString = isNull(contrastValue) ? "" : `contrast(${contrastValue})`,
      dropShadowString = dropShadowValue ? `drop-shadow(${dropShadowValue})` : "",
      grayscaleString = isNull(grayscaleValue) ? "" : `grayscale(${grayscaleValue})`,
      hueRotateString = isNull(hueRotateValue) ? "" : `hue-rotate(${hueRotateValue})`,
      invertString = isNull(invertValue) ? "" : `invert(${invertValue})`,
      opacityString = isNull(opacityValue) ? "" : `opacity(${opacityValue})`,
      saturateString = isNull(saturateValue) ? "" : `saturate(${saturateValue})`,
      sepiaString = isNull(sepiaValue) ? "" : `sepia(${sepiaValue})`,
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
