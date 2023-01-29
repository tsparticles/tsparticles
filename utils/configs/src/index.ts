import type { ISourceOptions } from "@tsparticles/engine";
import absorbers from "./absorbers";
import amongUs from "./amongUs";
import backgroundMask from "./backgroundMask";
import basic from "./basic";
import big from "./big";
import blackHole from "./blackHole";
import bubble from "./bubble";
import cards from "./cards";
import chars from "./chars";
import clickPause from "./clickPause";
import collisionsAbsorb from "./collisionsAbsorb";
import collisionsBounce from "./collisionsBounce";
import collisionsDestroy from "./collisionsDestroy";
import colorAnimation from "./colorAnimation";
import connect from "./connect";
import customPreset from "./customPreset";
import customShape from "./customShape";
import dataImages from "./dataImages";
import delay from "./delay";
import destroy from "./destroy";
import disappearing from "./disappearing";
import divEvents from "./divEvents";
import emitter from "./emitter";
import emitterAbsorber from "./emitterAbsorber";
import emitterAngled from "./emitterAngled";
import emitterImages from "./emitterImages";
import emitterPaths from "./emitterPaths";
import emitterShapes from "./emitterShapes";
import fireworks from "./fireworks";
import fontawesome from "./fontawesome";
import forward from "./forward";
import grabRandomColor from "./grabRandomColor";
import gradients from "./gradients";
import gravity from "./gravity";
import growing from "./growing";
import hexagonPath from "./hexagonPath";
import hollowknight from "./hollowknight";
import hyperspace from "./hyperspace";
import imageMask from "./imageMask";
import images from "./images";
import imagesDirections from "./imagesDirections";
import infection from "./infection";
import life from "./life";
import lightHover from "./lightHover";
import linkTriangles from "./linkTriangles";
import localPolygonMask from "./localPolygonMask";
import manual from "./manual";
import motionDisable from "./motionDisable";
import motionReduce from "./motionReduce";
import mouseAttract from "./mouseAttract";
import mouseBounce from "./mouseBounce";
import mouseFollow from "./mouseFollow";
import mouseTrail from "./mouseTrail";
import moveAngle from "./moveAngle";
import moveDistance from "./moveDistance";
import moveInside from "./moveInside";
import moveOutside from "./moveOutside";
import multipleClickEmitters from "./multipleClickEmitters";
import multiplePolygonMasks from "./multiplePolygonMasks";
import nasa from "./nasa";
import noconfig from "./noconfig";
import noisePlanes from "./noisePlanes";
import nyancat from "./nyancat";
import nyancat2 from "./nyancat2";
import orbit from "./orbit";
import parallax from "./parallax";
import pathPolygonMask from "./pathPolygonMask";
import planes from "./planes";
import plasma from "./plasma";
import polygonMask from "./polygonMask";
import polygons from "./polygons";
import random from "./random";
import reactBubbles from "./reactBubbles";
import reactDefaults from "./reactDefaults";
import reactMultipleImages from "./reactMultipleImages";
import reactNightSky from "./reactNightSky";
import reactPolygonMask from "./reactPolygonMask";
import reactSimple from "./reactSimple";
import reactSnow from "./reactSnow";
import reduceDuplicates from "./reduceDuplicates";
import repulse from "./repulse";
import repulseBack from "./repulseBack";
import repulseCirc from "./repulseCirc";
import repulseCubic from "./repulseCubic";
import repulseExpo from "./repulseExpo";
import repulseQuart from "./repulseQuart";
import repulseQuint from "./repulseQuint";
import repulseSine from "./repulseSine";
import responsive from "./responsive";
import ring from "./ring";
import seaAnemone from "./seaAnemone";
import shadow from "./shadow";
import shapeBubble from "./shapeBubble";
import shapeHeart from "./shapeHeart";
import shapeMultilineText from "./shapeMultilineText";
import shapeOptions from "./shapeOptions";
import shapePath from "./shapePath";
import shapeRibbon from "./shapeRibbon";
import shapeRoundedRect from "./shapeRoundedRect";
import shapeSpiral from "./shapeSpiral";
import slow from "./slow";
import snow from "./snow";
import soundsAudio from "./soundsAudio";
import soundsLoop from "./soundsLoop";
import soundsMelodies from "./soundsMelodies";
import soundsMelodyLoop from "./soundsMelodyLoop";
import soundsNotes from "./soundsNotes";
import speedDecay from "./speedDecay";
import spin from "./spin";
import star from "./star";
import strokeAnimation from "./strokeAnimation";
import style from "./style";
import svgReplace from "./svgReplace";
import test from "./test";
import textMask from "./textMask";
import textMaskMultiline from "./textMaskMultiline";
import trail from "./trail";
import trailImage from "./trailImage";
import { tsParticles } from "@tsparticles/engine";
import twinkle from "./twinkle";
import vibrate from "./vibrate";
import virus from "./virus";
import warp from "./warp";
import wobble from "./wobble";
import zIndex from "./zIndex";

const configs = {
    absorbers,
    amongUs,
    backgroundMask,
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
    shapeRibbon,
    shapeRoundedRect,
    shapeSpiral,
    slow,
    snow,
    soundsAudio,
    soundsLoop,
    soundsMelodies,
    soundsMelodyLoop,
    soundsNotes,
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
    trailImage,
    twinkle,
    vibrate,
    virus,
    warp,
    wobble,
    zIndex,
};

for (const key of Object.keys(configs)) {
    tsParticles.addConfig((configs as { [key: string]: ISourceOptions })[key]);
}

export default configs;
