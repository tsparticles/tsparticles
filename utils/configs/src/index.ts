import absorbers from "./absorbers.json";
import amongUs from "./amongUs.json";
import background from "./background.json";
import basic from "./basic.json";
import big from "./big.json";
import blackHole from "./blackHole.json";
import bubble from "./bubble.json";
import cards from "./cards.json";
import chars from "./chars.json";
import clickPause from "./clickPause.json";
import collisionsAbsorb from "./collisionsAbsorb.json";
import collisionsBounce from "./collisionsBounce.json";
import collisionsDestroy from "./collisionsDestroy.json";
import colorAnimation from "./colorAnimation.json";
import connect from "./connect.json";
import customPreset from "./customPreset.json";
import customShape from "./customShape.json";
import dataImages from "./dataImages.json";
import delay from "./delay.json";
import destroy from "./destroy.json";
import disappearing from "./disappearing.json";
import divEvents from "./divEvents.json";
import emitter from "./emitter.json";
import emitterAbsorber from "./emitterAbsorber.json";
import emitterAngled from "./emitterAngled.json";
import emitterImages from "./emitterImages.json";
import emitterPaths from "./emitterPaths.json";
import emitterShapes from "./emitterShapes.json";
import fireworks from "./fireworks.json";
import fontawesome from "./fontawesome.json";
import forward from "./forward.json";
import grabRandomColor from "./grabRandomColor.json";
import gradients from "./gradients.json";
import gravity from "./gravity.json";
import growing from "./growing.json";
import hexagonPath from "./hexagonPath.json";
import hollowknight from "./hollowknight.json";
import hyperspace from "./hyperspace.json";
import imageMask from "./imageMask.json";
import images from "./images.json";
import imagesDirections from "./imagesDirections.json";
import infection from "./infection.json";
import life from "./life.json";
import lightHover from "./lightHover.json";
import linkTriangles from "./linkTriangles.json";
import localPolygonMask from "./localPolygonMask.json";
import manual from "./manual.json";
import motionDisable from "./motionDisable.json";
import motionReduce from "./motionReduce.json";
import mouseAttract from "./mouseAttract.json";
import mouseBounce from "./mouseBounce.json";
import mouseFollow from "./mouseFollow.json";
import mouseTrail from "./mouseTrail.json";
import moveAngle from "./moveAngle.json";
import moveDistance from "./moveDistance.json";
import moveInside from "./moveInside.json";
import moveOutside from "./moveOutside.json";
import multipleClickEmitters from "./multipleClickEmitters.json";
import multiplePolygonMasks from "./multiplePolygonMasks.json";
import nasa from "./nasa.json";
import noconfig from "./noconfig.json";
import noisePlanes from "./noisePlanes.json";
import nyancat from "./nyancat.json";
import nyancat2 from "./nyancat2.json";
import orbit from "./orbit.json";
import parallax from "./parallax.json";
import pathPolygonMask from "./pathPolygonMask.json";
import planes from "./planes.json";
import plasma from "./plasma.json";
import polygonMask from "./polygonMask.json";
import polygons from "./polygons.json";
import random from "./random.json";
import reactBubbles from "./reactBubbles.json";
import reactDefaults from "./reactDefaults.json";
import reactMultipleImages from "./reactMultipleImages.json";
import reactNightSky from "./reactNightSky.json";
import reactPolygonMask from "./reactPolygonMask.json";
import reactSimple from "./reactSimple.json";
import reactSnow from "./reactSnow.json";
import reduceDuplicates from "./reduceDuplicates.json";
import repulse from "./repulse.json";
import repulseBack from "./repulseBack.json";
import repulseCirc from "./repulseCirc.json";
import repulseCubic from "./repulseCubic.json";
import repulseExpo from "./repulseExpo.json";
import repulseQuart from "./repulseQuart.json";
import repulseQuint from "./repulseQuint.json";
import repulseSine from "./repulseSine.json";
import responsive from "./responsive.json";
import ring from "./ring.json";
import seaAnemone from "./seaAnemone.json";
import shadow from "./shadow.json";
import shapeBubble from "./shapeBubble.json";
import shapeHeart from "./shapeHeart.json";
import shapeMultilineText from "./shapeMultilineText.json";
import shapeOptions from "./shapeOptions.json";
import shapePath from "./shapePath.json";
import shapeRoundedRect from "./shapeRoundedRect.json";
import shapeSpiral from "./shapeSpiral.json";
import slow from "./slow.json";
import snow from "./snow.json";
import speedDecay from "./speedDecay.json";
import spin from "./spin.json";
import star from "./star.json";
import strokeAnimation from "./strokeAnimation.json";
import style from "./style.json";
import svgReplace from "./svgReplace.json";
import test from "./test.json";
import textMask from "./textMask.json";
import textMaskMultiline from "./textMaskMultiline.json";
import trail from "./trail.json";
import { tsParticles } from "tsparticles-engine";
import twinkle from "./twinkle.json";
import vibrate from "./vibrate.json";
import virus from "./virus.json";
import warp from "./warp.json";
import wobble from "./wobble.json";
import zIndex from "./zIndex.json";

const mainConfigs = tsParticles as {
    configs?: unknown;
};

mainConfigs.configs = {
    absorbers,
    amongUs,
    background,
    basic,
    big,
    blackHole,
    bubble,
    cards,
    chars,
    clickPause,
    collisionsAbsorb,
    collisionsBounce,
    collisionsDestroy,
    colorAnimation,
    connect,
    customPreset,
    customShape,
    dataImages,
    delay,
    destroy,
    disappearing,
    divEvents,
    emitter,
    emitterAbsorber,
    emitterAngled,
    emitterImages,
    emitterPaths,
    emitterShapes,
    fireworks,
    fontawesome,
    forward,
    grabRandomColor,
    gradients,
    gravity,
    growing,
    hexagonPath,
    hollowknight,
    hyperspace,
    imageMask,
    images,
    imagesDirections,
    infection,
    life,
    lightHover,
    linkTriangles,
    localPolygonMask,
    manual,
    motionDisable,
    motionReduce,
    mouseAttract,
    mouseBounce,
    mouseFollow,
    mouseTrail,
    moveAngle,
    moveDistance,
    moveInside,
    moveOutside,
    multipleClickEmitters,
    multiplePolygonMasks,
    nasa,
    noconfig,
    noisePlanes,
    nyancat,
    nyancat2,
    orbit,
    parallax,
    pathPolygonMask,
    planes,
    plasma,
    polygonMask,
    polygons,
    random,
    reactBubbles,
    reactDefaults,
    reactMultipleImages,
    reactNightSky,
    reactPolygonMask,
    reactSimple,
    reactSnow,
    reduceDuplicates,
    repulse,
    repulseBack,
    repulseCirc,
    repulseCubic,
    repulseExpo,
    repulseQuart,
    repulseQuint,
    repulseSine,
    responsive,
    ring,
    seaAnemone,
    shadow,
    shapeBubble,
    shapeHeart,
    shapeMultilineText,
    shapeOptions,
    shapePath,
    shapeRoundedRect,
    shapeSpiral,
    slow,
    snow,
    speedDecay,
    spin,
    star,
    strokeAnimation,
    style,
    svgReplace,
    test,
    textMask,
    textMaskMultiline,
    trail,
    twinkle,
    vibrate,
    virus,
    warp,
    wobble,
    zIndex,
};
