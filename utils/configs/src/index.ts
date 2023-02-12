import type { ISourceOptions } from "tsparticles-engine";
import _absorbers from "./absorbers.json";
import _amongUs from "./amongUs.json";
import _backgroundMask from "./backgroundMask.json";
import _basic from "./basic.json";
import _big from "./big.json";
import _blackHole from "./blackHole.json";
import _bubble from "./bubble.json";
import _cards from "./cards.json";
import _chars from "./chars.json";
import _clickConfetti from "./clickConfetti.json";
import _clickPause from "./clickPause.json";
import _collisionsAbsorb from "./collisionsAbsorb.json";
import _collisionsBounce from "./collisionsBounce.json";
import _collisionsDestroy from "./collisionsDestroy.json";
import _colorAnimation from "./colorAnimation.json";
import _connect from "./connect.json";
import _customPreset from "./customPreset.json";
import _customShape from "./customShape.json";
import _dataImages from "./dataImages.json";
import _delay from "./delay.json";
import _destroy from "./destroy.json";
import _disappearing from "./disappearing.json";
import _divEvents from "./divEvents.json";
import _emitter from "./emitter.json";
import _emitterAbsorber from "./emitterAbsorber.json";
import _emitterAngled from "./emitterAngled.json";
import _emitterImages from "./emitterImages.json";
import _emitterPaths from "./emitterPaths.json";
import _emitterShapes from "./emitterShapes.json";
import _fireworks from "./fireworks.json";
import _fontawesome from "./fontawesome.json";
import _forward from "./forward.json";
import _grabRandomColor from "./grabRandomColor.json";
import _gradients from "./gradients.json";
import _gravity from "./gravity.json";
import _growing from "./growing.json";
import _hexagonPath from "./hexagonPath.json";
import _hollowknight from "./hollowknight.json";
import _hyperspace from "./hyperspace.json";
import _imageMask from "./imageMask.json";
import _images from "./images.json";
import _imagesDirections from "./imagesDirections.json";
import _infection from "./infection.json";
import _life from "./life.json";
import _lightHover from "./lightHover.json";
import _linkTriangles from "./linkTriangles.json";
import _localPolygonMask from "./localPolygonMask.json";
import _manual from "./manual.json";
import _motionDisable from "./motionDisable.json";
import _motionReduce from "./motionReduce.json";
import _mouseAttract from "./mouseAttract.json";
import _mouseBounce from "./mouseBounce.json";
import _mouseFollow from "./mouseFollow.json";
import _mouseTrail from "./mouseTrail.json";
import _moveAngle from "./moveAngle.json";
import _moveDistance from "./moveDistance.json";
import _moveInside from "./moveInside.json";
import _moveOutside from "./moveOutside.json";
import _multipleClickEmitters from "./multipleClickEmitters.json";
import _multiplePolygonMasks from "./multiplePolygonMasks.json";
import _nasa from "./nasa.json";
import _noconfig from "./noconfig.json";
import _noisePlanes from "./noisePlanes.json";
import _nyancat from "./nyancat.json";
import _nyancat2 from "./nyancat2.json";
import _orbit from "./orbit.json";
import _parallax from "./parallax.json";
import _pathPolygonMask from "./pathPolygonMask.json";
import _planes from "./planes.json";
import _plasma from "./plasma.json";
import _polygonMask from "./polygonMask.json";
import _polygons from "./polygons.json";
import _random from "./random.json";
import _reactBubbles from "./reactBubbles.json";
import _reactDefaults from "./reactDefaults.json";
import _reactMultipleImages from "./reactMultipleImages.json";
import _reactNightSky from "./reactNightSky.json";
import _reactPolygonMask from "./reactPolygonMask.json";
import _reactSimple from "./reactSimple.json";
import _reactSnow from "./reactSnow.json";
import _reduceDuplicates from "./reduceDuplicates.json";
import _repulse from "./repulse.json";
import _repulseBack from "./repulseBack.json";
import _repulseCirc from "./repulseCirc.json";
import _repulseCubic from "./repulseCubic.json";
import _repulseExpo from "./repulseExpo.json";
import _repulseQuart from "./repulseQuart.json";
import _repulseQuint from "./repulseQuint.json";
import _repulseSine from "./repulseSine.json";
import _responsive from "./responsive.json";
import _ring from "./ring.json";
import _seaAnemone from "./seaAnemone.json";
import _shadow from "./shadow.json";
import _shapeBubble from "./shapeBubble.json";
import _shapeHeart from "./shapeHeart.json";
import _shapeMultilineText from "./shapeMultilineText.json";
import _shapeOptions from "./shapeOptions.json";
import _shapePath from "./shapePath.json";
import _shapeRoundedRect from "./shapeRoundedRect.json";
import _shapeSpiral from "./shapeSpiral.json";
import _slow from "./slow.json";
import _snow from "./snow.json";
import _soundsAudio from "./soundsAudio.json";
import _soundsLoop from "./soundsLoop.json";
import _soundsMelodies from "./soundsMelodies.json";
import _soundsMelodyLoop from "./soundsMelodyLoop.json";
import _soundsNotes from "./soundsNotes.json";
import _speedDecay from "./speedDecay.json";
import _spin from "./spin.json";
import _star from "./star.json";
import _strokeAnimation from "./strokeAnimation.json";
import _style from "./style.json";
import _svgReplace from "./svgReplace.json";
import _test from "./test.json";
import _textMask from "./textMask.json";
import _textMaskMultiline from "./textMaskMultiline.json";
import _trail from "./trail.json";
import _trailImage from "./trailImage.json";
import _twinkle from "./twinkle.json";
import _vibrate from "./vibrate.json";
import _virus from "./virus.json";
import _warp from "./warp.json";
import _wobble from "./wobble.json";
import _zIndex from "./zIndex.json";
import { tsParticles } from "tsparticles-engine";

const absorbers = _absorbers as unknown as ISourceOptions,
    amongUs = _amongUs as unknown as ISourceOptions,
    backgroundMask = _backgroundMask as unknown as ISourceOptions,
    basic = _basic as unknown as ISourceOptions,
    big = _big as unknown as ISourceOptions,
    blackHole = _blackHole as unknown as ISourceOptions,
    bubble = _bubble as unknown as ISourceOptions,
    cards = _cards as unknown as ISourceOptions,
    chars = _chars as unknown as ISourceOptions,
    clickConfetti = _clickConfetti as unknown as ISourceOptions,
    clickPause = _clickPause as unknown as ISourceOptions,
    collisionsAbsorb = _collisionsAbsorb as unknown as ISourceOptions,
    collisionsBounce = _collisionsBounce as unknown as ISourceOptions,
    collisionsDestroy = _collisionsDestroy as unknown as ISourceOptions,
    colorAnimation = _colorAnimation as unknown as ISourceOptions,
    connect = _connect as unknown as ISourceOptions,
    customPreset = _customPreset as unknown as ISourceOptions,
    customShape = _customShape as unknown as ISourceOptions,
    dataImages = _dataImages as unknown as ISourceOptions,
    delay = _delay as unknown as ISourceOptions,
    destroy = _destroy as unknown as ISourceOptions,
    disappearing = _disappearing as unknown as ISourceOptions,
    divEvents = _divEvents as unknown as ISourceOptions,
    emitter = _emitter as unknown as ISourceOptions,
    emitterAbsorber = _emitterAbsorber as unknown as ISourceOptions,
    emitterAngled = _emitterAngled as unknown as ISourceOptions,
    emitterImages = _emitterImages as unknown as ISourceOptions,
    emitterPaths = _emitterPaths as unknown as ISourceOptions,
    emitterShapes = _emitterShapes as unknown as ISourceOptions,
    fireworks = _fireworks as unknown as ISourceOptions,
    fontawesome = _fontawesome as unknown as ISourceOptions,
    forward = _forward as unknown as ISourceOptions,
    grabRandomColor = _grabRandomColor as unknown as ISourceOptions,
    gradients = _gradients as unknown as ISourceOptions,
    gravity = _gravity as unknown as ISourceOptions,
    growing = _growing as unknown as ISourceOptions,
    hexagonPath = _hexagonPath as unknown as ISourceOptions,
    hollowknight = _hollowknight as unknown as ISourceOptions,
    hyperspace = _hyperspace as unknown as ISourceOptions,
    imageMask = _imageMask as unknown as ISourceOptions,
    images = _images as unknown as ISourceOptions,
    imagesDirections = _imagesDirections as unknown as ISourceOptions,
    infection = _infection as unknown as ISourceOptions,
    life = _life as unknown as ISourceOptions,
    lightHover = _lightHover as unknown as ISourceOptions,
    linkTriangles = _linkTriangles as unknown as ISourceOptions,
    localPolygonMask = _localPolygonMask as unknown as ISourceOptions,
    manual = _manual as unknown as ISourceOptions,
    motionDisable = _motionDisable as unknown as ISourceOptions,
    motionReduce = _motionReduce as unknown as ISourceOptions,
    mouseAttract = _mouseAttract as unknown as ISourceOptions,
    mouseBounce = _mouseBounce as unknown as ISourceOptions,
    mouseFollow = _mouseFollow as unknown as ISourceOptions,
    mouseTrail = _mouseTrail as unknown as ISourceOptions,
    moveAngle = _moveAngle as unknown as ISourceOptions,
    moveDistance = _moveDistance as unknown as ISourceOptions,
    moveInside = _moveInside as unknown as ISourceOptions,
    moveOutside = _moveOutside as unknown as ISourceOptions,
    multipleClickEmitters = _multipleClickEmitters as unknown as ISourceOptions,
    multiplePolygonMasks = _multiplePolygonMasks as unknown as ISourceOptions,
    nasa = _nasa as unknown as ISourceOptions,
    noconfig = _noconfig as unknown as ISourceOptions,
    noisePlanes = _noisePlanes as unknown as ISourceOptions,
    nyancat = _nyancat as unknown as ISourceOptions,
    nyancat2 = _nyancat2 as unknown as ISourceOptions,
    orbit = _orbit as unknown as ISourceOptions,
    parallax = _parallax as unknown as ISourceOptions,
    pathPolygonMask = _pathPolygonMask as unknown as ISourceOptions,
    planes = _planes as unknown as ISourceOptions,
    plasma = _plasma as unknown as ISourceOptions,
    polygonMask = _polygonMask as unknown as ISourceOptions,
    polygons = _polygons as unknown as ISourceOptions,
    random = _random as unknown as ISourceOptions,
    reactBubbles = _reactBubbles as unknown as ISourceOptions,
    reactDefaults = _reactDefaults as unknown as ISourceOptions,
    reactMultipleImages = _reactMultipleImages as unknown as ISourceOptions,
    reactNightSky = _reactNightSky as unknown as ISourceOptions,
    reactPolygonMask = _reactPolygonMask as unknown as ISourceOptions,
    reactSimple = _reactSimple as unknown as ISourceOptions,
    reactSnow = _reactSnow as unknown as ISourceOptions,
    reduceDuplicates = _reduceDuplicates as unknown as ISourceOptions,
    repulse = _repulse as unknown as ISourceOptions,
    repulseBack = _repulseBack as unknown as ISourceOptions,
    repulseCirc = _repulseCirc as unknown as ISourceOptions,
    repulseCubic = _repulseCubic as unknown as ISourceOptions,
    repulseExpo = _repulseExpo as unknown as ISourceOptions,
    repulseQuart = _repulseQuart as unknown as ISourceOptions,
    repulseQuint = _repulseQuint as unknown as ISourceOptions,
    repulseSine = _repulseSine as unknown as ISourceOptions,
    responsive = _responsive as unknown as ISourceOptions,
    ring = _ring as unknown as ISourceOptions,
    seaAnemone = _seaAnemone as unknown as ISourceOptions,
    shadow = _shadow as unknown as ISourceOptions,
    shapeBubble = _shapeBubble as unknown as ISourceOptions,
    shapeHeart = _shapeHeart as unknown as ISourceOptions,
    shapeMultilineText = _shapeMultilineText as unknown as ISourceOptions,
    shapeOptions = _shapeOptions as unknown as ISourceOptions,
    shapePath = _shapePath as unknown as ISourceOptions,
    shapeRoundedRect = _shapeRoundedRect as unknown as ISourceOptions,
    shapeSpiral = _shapeSpiral as unknown as ISourceOptions,
    slow = _slow as unknown as ISourceOptions,
    snow = _snow as unknown as ISourceOptions,
    soundsAudio = _soundsAudio as unknown as ISourceOptions,
    soundsLoop = _soundsLoop as unknown as ISourceOptions,
    soundsMelodies = _soundsMelodies as unknown as ISourceOptions,
    soundsMelodyLoop = _soundsMelodyLoop as unknown as ISourceOptions,
    soundsNotes = _soundsNotes as unknown as ISourceOptions,
    speedDecay = _speedDecay as unknown as ISourceOptions,
    spin = _spin as unknown as ISourceOptions,
    star = _star as unknown as ISourceOptions,
    strokeAnimation = _strokeAnimation as unknown as ISourceOptions,
    style = _style as unknown as ISourceOptions,
    svgReplace = _svgReplace as unknown as ISourceOptions,
    test = _test as unknown as ISourceOptions,
    textMask = _textMask as unknown as ISourceOptions,
    textMaskMultiline = _textMaskMultiline as unknown as ISourceOptions,
    trail = _trail as unknown as ISourceOptions,
    trailImage = _trailImage as unknown as ISourceOptions,
    twinkle = _twinkle as unknown as ISourceOptions,
    vibrate = _vibrate as unknown as ISourceOptions,
    virus = _virus as unknown as ISourceOptions,
    warp = _warp as unknown as ISourceOptions,
    wobble = _wobble as unknown as ISourceOptions,
    zIndex = _zIndex as unknown as ISourceOptions;

export type ExportedConfigurations = {
    absorbers: ISourceOptions;
    amongUs: ISourceOptions;
    backgroundMask: ISourceOptions;
    basic: ISourceOptions;
    big: ISourceOptions;
    blackHole: ISourceOptions;
    bubble: ISourceOptions;
    cards: ISourceOptions;
    chars: ISourceOptions;
    clickConfetti: ISourceOptions;
    clickPause: ISourceOptions;
    collisionsAbsorb: ISourceOptions;
    collisionsBounce: ISourceOptions;
    collisionsDestroy: ISourceOptions;
    colorAnimation: ISourceOptions;
    connect: ISourceOptions;
    customPreset: ISourceOptions;
    customShape: ISourceOptions;
    dataImages: ISourceOptions;
    delay: ISourceOptions;
    destroy: ISourceOptions;
    disappearing: ISourceOptions;
    divEvents: ISourceOptions;
    emitter: ISourceOptions;
    emitterAbsorber: ISourceOptions;
    emitterAngled: ISourceOptions;
    emitterImages: ISourceOptions;
    emitterPaths: ISourceOptions;
    emitterShapes: ISourceOptions;
    fireworks: ISourceOptions;
    fontawesome: ISourceOptions;
    forward: ISourceOptions;
    grabRandomColor: ISourceOptions;
    gradients: ISourceOptions;
    gravity: ISourceOptions;
    growing: ISourceOptions;
    hexagonPath: ISourceOptions;
    hollowknight: ISourceOptions;
    hyperspace: ISourceOptions;
    imageMask: ISourceOptions;
    images: ISourceOptions;
    imagesDirections: ISourceOptions;
    infection: ISourceOptions;
    life: ISourceOptions;
    lightHover: ISourceOptions;
    linkTriangles: ISourceOptions;
    localPolygonMask: ISourceOptions;
    manual: ISourceOptions;
    motionDisable: ISourceOptions;
    motionReduce: ISourceOptions;
    mouseAttract: ISourceOptions;
    mouseBounce: ISourceOptions;
    mouseFollow: ISourceOptions;
    mouseTrail: ISourceOptions;
    moveAngle: ISourceOptions;
    moveDistance: ISourceOptions;
    moveInside: ISourceOptions;
    moveOutside: ISourceOptions;
    multipleClickEmitters: ISourceOptions;
    multiplePolygonMasks: ISourceOptions;
    nasa: ISourceOptions;
    noconfig: ISourceOptions;
    noisePlanes: ISourceOptions;
    nyancat: ISourceOptions;
    nyancat2: ISourceOptions;
    orbit: ISourceOptions;
    parallax: ISourceOptions;
    pathPolygonMask: ISourceOptions;
    planes: ISourceOptions;
    plasma: ISourceOptions;
    polygonMask: ISourceOptions;
    polygons: ISourceOptions;
    random: ISourceOptions;
    reactBubbles: ISourceOptions;
    reactDefaults: ISourceOptions;
    reactMultipleImages: ISourceOptions;
    reactNightSky: ISourceOptions;
    reactPolygonMask: ISourceOptions;
    reactSimple: ISourceOptions;
    reactSnow: ISourceOptions;
    reduceDuplicates: ISourceOptions;
    repulse: ISourceOptions;
    repulseBack: ISourceOptions;
    repulseCirc: ISourceOptions;
    repulseCubic: ISourceOptions;
    repulseExpo: ISourceOptions;
    repulseQuart: ISourceOptions;
    repulseQuint: ISourceOptions;
    repulseSine: ISourceOptions;
    responsive: ISourceOptions;
    ring: ISourceOptions;
    seaAnemone: ISourceOptions;
    shadow: ISourceOptions;
    shapeBubble: ISourceOptions;
    shapeHeart: ISourceOptions;
    shapeMultilineText: ISourceOptions;
    shapeOptions: ISourceOptions;
    shapePath: ISourceOptions;
    shapeRoundedRect: ISourceOptions;
    shapeSpiral: ISourceOptions;
    slow: ISourceOptions;
    snow: ISourceOptions;
    soundsAudio: ISourceOptions;
    soundsLoop: ISourceOptions;
    soundsMelodies: ISourceOptions;
    soundsMelodyLoop: ISourceOptions;
    soundsNotes: ISourceOptions;
    speedDecay: ISourceOptions;
    spin: ISourceOptions;
    star: ISourceOptions;
    strokeAnimation: ISourceOptions;
    style: ISourceOptions;
    svgReplace: ISourceOptions;
    test: ISourceOptions;
    textMask: ISourceOptions;
    textMaskMultiline: ISourceOptions;
    trail: ISourceOptions;
    trailImage: ISourceOptions;
    twinkle: ISourceOptions;
    vibrate: ISourceOptions;
    virus: ISourceOptions;
    warp: ISourceOptions;
    wobble: ISourceOptions;
    zIndex: ISourceOptions;
};

const mainConfigs = tsParticles as {
    configs?: ExportedConfigurations;
};

mainConfigs.configs = {
    absorbers,
    amongUs,
    backgroundMask,
    basic,
    big,
    blackHole,
    bubble,
    cards,
    chars,
    clickConfetti,
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

export {
    absorbers,
    amongUs,
    backgroundMask,
    basic,
    big,
    blackHole,
    bubble,
    cards,
    chars,
    clickConfetti,
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
