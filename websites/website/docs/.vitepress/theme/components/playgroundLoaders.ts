import { loadAll } from "@tsparticles/all";
import { confetti } from "@tsparticles/confetti";
import { tsParticles, type Engine } from "@tsparticles/engine";
import { fireworks } from "@tsparticles/fireworks";
import { particles } from "@tsparticles/particles";
import { ribbons } from "@tsparticles/ribbons";

import { loadAmbientPreset } from "@tsparticles/preset-ambient";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import { loadConfettiCannonPreset } from "@tsparticles/preset-confetti-cannon";
import { loadConfettiExplosionsPreset } from "@tsparticles/preset-confetti-explosions";
import { loadConfettiFallingPreset } from "@tsparticles/preset-confetti-falling";
import { loadConfettiParadePreset } from "@tsparticles/preset-confetti-parade";
import { loadFirePreset } from "@tsparticles/preset-fire";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import { loadFountainPreset } from "@tsparticles/preset-fountain";
import { loadHyperspacePreset } from "@tsparticles/preset-hyperspace";
import { loadLinksPreset } from "@tsparticles/preset-links";
import { loadMatrixPreset } from "@tsparticles/preset-matrix";
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { loadSquaresPreset } from "@tsparticles/preset-squares";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import { loadTrianglesPreset } from "@tsparticles/preset-triangles";

import { loadAcidPairPalette } from "@tsparticles/palette-acid-pair";
import { loadAuroraBorealisPalette } from "@tsparticles/palette-aurora-borealis";
import { loadAutumnLeavesPalette } from "@tsparticles/palette-autumn-leaves";
import { loadBioluminescencePalette } from "@tsparticles/palette-bioluminescence";
import { loadBloodAndGorePalette } from "@tsparticles/palette-blood-and-gore";
import { loadBokehColdPalette } from "@tsparticles/palette-bokeh-cold";
import { loadBokehGoldPalette } from "@tsparticles/palette-bokeh-gold";
import { loadBokehPastelPalette } from "@tsparticles/palette-bokeh-pastel";
import { loadBulletHitPalette } from "@tsparticles/palette-bullet-hit";
import { loadCandlelightPalette } from "@tsparticles/palette-candlelight";
import { loadCausticsPalette } from "@tsparticles/palette-caustics";
import { loadCherryBlossomPalette } from "@tsparticles/palette-cherry-blossom";
import { loadCmySecondariesPalette } from "@tsparticles/palette-cmy-secondaries";
import { loadColoredSmokeBluePalette } from "@tsparticles/palette-colored-smoke-blue";
import { loadColoredSmokeGreenPalette } from "@tsparticles/palette-colored-smoke-green";
import { loadColoredSmokeMagentaPalette } from "@tsparticles/palette-colored-smoke-magenta";
import { loadColoredSmokeOrangePalette } from "@tsparticles/palette-colored-smoke-orange";
import { loadColoredSmokePurplePalette } from "@tsparticles/palette-colored-smoke-purple";
import { loadColoredSmokeRainbowPalette } from "@tsparticles/palette-colored-smoke-rainbow";
import { loadColoredSmokeTealPalette } from "@tsparticles/palette-colored-smoke-teal";
import { loadConfettiPalette } from "@tsparticles/palette-confetti";
import { loadConfettiGoldPalette } from "@tsparticles/palette-confetti-gold";
import { loadConfettiMonochromeBluePalette } from "@tsparticles/palette-confetti-monochrome-blue";
import { loadConfettiMonochromeGreenPalette } from "@tsparticles/palette-confetti-monochrome-green";
import { loadConfettiMonochromePinkPalette } from "@tsparticles/palette-confetti-monochrome-pink";
import { loadConfettiNeonPalette } from "@tsparticles/palette-confetti-neon";
import { loadConfettiPastelPalette } from "@tsparticles/palette-confetti-pastel";
import { loadConfettiPatrioticPalette } from "@tsparticles/palette-confetti-patriotic";
import { loadConfettiRainbowPalette } from "@tsparticles/palette-confetti-rainbow";
import { loadConfettiWinterPalette } from "@tsparticles/palette-confetti-winter";
import { loadCosmicRadiationPalette } from "@tsparticles/palette-cosmic-radiation";
import { loadCrtPhosphorPalette } from "@tsparticles/palette-crt-phosphor";
import { loadDandelionSeedsPalette } from "@tsparticles/palette-dandelion-seeds";
import { loadDarkMatterPalette } from "@tsparticles/palette-dark-matter";
import { loadDeepOceanPalette } from "@tsparticles/palette-deep-ocean";
import { loadDesertSandPalette } from "@tsparticles/palette-desert-sand";
import { loadDualityBlueYellowPalette } from "@tsparticles/palette-duality-blue-yellow";
import { loadDualityGreenMagentaPalette } from "@tsparticles/palette-duality-green-magenta";
import { loadDualityRedCyanPalette } from "@tsparticles/palette-duality-red-cyan";
import { loadDustHazePalette } from "@tsparticles/palette-dust-haze";
import { loadEarthyNaturePalette } from "@tsparticles/palette-earthy-nature";
import { loadEmbersAndAshPalette } from "@tsparticles/palette-embers-and-ash";
import { loadExplosionDebrisPalette } from "@tsparticles/palette-explosion-debris";
import { loadFairyDustPalette } from "@tsparticles/palette-fairy-dust";
import { loadFirePalette } from "@tsparticles/palette-fire";
import { loadFireSeedPalette } from "@tsparticles/palette-fire-seed";
import { loadFirefliesPalette } from "@tsparticles/palette-fireflies";
import { loadFireworksBluePalette } from "@tsparticles/palette-fireworks-blue";
import { loadFireworksBlueStrokePalette } from "@tsparticles/palette-fireworks-blue-stroke";
import { loadFireworksCopperPalette } from "@tsparticles/palette-fireworks-copper";
import { loadFireworksCopperStrokePalette } from "@tsparticles/palette-fireworks-copper-stroke";
import { loadFireworksGoldPalette } from "@tsparticles/palette-fireworks-gold";
import { loadFireworksGoldStrokePalette } from "@tsparticles/palette-fireworks-gold-stroke";
import { loadFireworksGreenPalette } from "@tsparticles/palette-fireworks-green";
import { loadFireworksGreenStrokePalette } from "@tsparticles/palette-fireworks-green-stroke";
import { loadFireworksIcePalette } from "@tsparticles/palette-fireworks-ice";
import { loadFireworksIceStrokePalette } from "@tsparticles/palette-fireworks-ice-stroke";
import { loadFireworksMulticolorPalette } from "@tsparticles/palette-fireworks-multicolor";
import { loadFireworksMulticolorStrokePalette } from "@tsparticles/palette-fireworks-multicolor-stroke";
import { loadFireworksNeonPalette } from "@tsparticles/palette-fireworks-neon";
import { loadFireworksNeonStrokePalette } from "@tsparticles/palette-fireworks-neon-stroke";
import { loadFireworksPastelPalette } from "@tsparticles/palette-fireworks-pastel";
import { loadFireworksPastelStrokePalette } from "@tsparticles/palette-fireworks-pastel-stroke";
import { loadFireworksPurplePalette } from "@tsparticles/palette-fireworks-purple";
import { loadFireworksPurpleStrokePalette } from "@tsparticles/palette-fireworks-purple-stroke";
import { loadFireworksRainbowStrokePalette } from "@tsparticles/palette-fireworks-rainbow-stroke";
import { loadFireworksRedPalette } from "@tsparticles/palette-fireworks-red";
import { loadFireworksRedStrokePalette } from "@tsparticles/palette-fireworks-red-stroke";
import { loadFireworksSilverPalette } from "@tsparticles/palette-fireworks-silver";
import { loadFireworksSilverStrokePalette } from "@tsparticles/palette-fireworks-silver-stroke";
import { loadFoamAndBubblesPalette } from "@tsparticles/palette-foam-and-bubbles";
import { loadFogCoastalPalette } from "@tsparticles/palette-fog-coastal";
import { loadFogMorningPalette } from "@tsparticles/palette-fog-morning";
import { loadForestCanopyPalette } from "@tsparticles/palette-forest-canopy";
import { loadFullFireGradientPalette } from "@tsparticles/palette-full-fire-gradient";
import { loadFullSpectrumPalette } from "@tsparticles/palette-full-spectrum";
import { loadGalaxyDustPalette } from "@tsparticles/palette-galaxy-dust";
import { loadGlassBurstPalette } from "@tsparticles/palette-glass-burst";
import { loadGlitchPalette } from "@tsparticles/palette-glitch";
import { loadHeatDualityPalette } from "@tsparticles/palette-heat-duality";
import { loadHeatHazePalette } from "@tsparticles/palette-heat-haze";
import { loadHologramPalette } from "@tsparticles/palette-hologram";
import { loadHolographicShimmerPalette } from "@tsparticles/palette-holographic-shimmer";
import { loadHolyLightPalette } from "@tsparticles/palette-holy-light";
import { loadIceMagicPalette } from "@tsparticles/palette-ice-magic";
import { loadIceTriadPalette } from "@tsparticles/palette-ice-triad";
import { loadInkInWaterPalette } from "@tsparticles/palette-ink-in-water";
import { loadJellyfishGlowPalette } from "@tsparticles/palette-jellyfish-glow";
import { loadLaserScatterPalette } from "@tsparticles/palette-laser-scatter";
import { loadLavaLampPalette } from "@tsparticles/palette-lava-lamp";
import { loadLensFlareDustPalette } from "@tsparticles/palette-lens-flare-dust";
import { loadLightningPalette } from "@tsparticles/palette-lightning";
import { loadLofiWarmPalette } from "@tsparticles/palette-lofi-warm";
import { loadMatrixRainPalette } from "@tsparticles/palette-matrix-rain";
import { loadMetalSparksPalette } from "@tsparticles/palette-metal-sparks";
import { loadMeteorImpactPalette } from "@tsparticles/palette-meteor-impact";
import { loadMoltenMetalPalette } from "@tsparticles/palette-molten-metal";
import { loadMonochromeBluesPalette } from "@tsparticles/palette-monochrome-blues";
import { loadMonochromeBrownPalette } from "@tsparticles/palette-monochrome-brown";
import { loadMonochromeCyanPalette } from "@tsparticles/palette-monochrome-cyan";
import { loadMonochromeGoldPalette } from "@tsparticles/palette-monochrome-gold";
import { loadMonochromeGreensPalette } from "@tsparticles/palette-monochrome-greens";
import { loadMonochromeNoirPalette } from "@tsparticles/palette-monochrome-noir";
import { loadMonochromeOrangesPalette } from "@tsparticles/palette-monochrome-oranges";
import { loadMonochromePinksPalette } from "@tsparticles/palette-monochrome-pinks";
import { loadMonochromePurplesPalette } from "@tsparticles/palette-monochrome-purples";
import { loadMonochromeRedsPalette } from "@tsparticles/palette-monochrome-reds";
import { loadMonochromeTealPalette } from "@tsparticles/palette-monochrome-teal";
import { loadMonochromeWhitePalette } from "@tsparticles/palette-monochrome-white";
import { loadMonochromeYellowsPalette } from "@tsparticles/palette-monochrome-yellows";
import { loadMudAndDirtPalette } from "@tsparticles/palette-mud-and-dirt";
import { loadNeonCityPalette } from "@tsparticles/palette-neon-city";
import { loadNetworkNodesPalette } from "@tsparticles/palette-network-nodes";
import { loadNuclearGlowPalette } from "@tsparticles/palette-nuclear-glow";
import { loadOilSlickPalette } from "@tsparticles/palette-oil-slick";
import { loadOkabeItoAccessiblePalette } from "@tsparticles/palette-okabe-ito-accessible";
import { loadPastelCoolPalette } from "@tsparticles/palette-pastel-cool";
import { loadPastelDreamPalette } from "@tsparticles/palette-pastel-dream";
import { loadPastelMintPalette } from "@tsparticles/palette-pastel-mint";
import { loadPastelSunsetPalette } from "@tsparticles/palette-pastel-sunset";
import { loadPastelWarmPalette } from "@tsparticles/palette-pastel-warm";
import { loadPlasmaArcPalette } from "@tsparticles/palette-plasma-arc";
import { loadPoisonAndVenomPalette } from "@tsparticles/palette-poison-and-venom";
import { loadPollenAndSporesPalette } from "@tsparticles/palette-pollen-and-spores";
import { loadPortalPalette } from "@tsparticles/palette-portal";
import { loadPrismScatterPalette } from "@tsparticles/palette-prism-scatter";
import { loadPrismSpectrumPalette } from "@tsparticles/palette-prism-spectrum";
import { loadPulsarPalette } from "@tsparticles/palette-pulsar";
import { loadRainPalette } from "@tsparticles/palette-rain";
import { loadRainbowPalette } from "@tsparticles/palette-rainbow";
import { loadRgbPrimariesPalette } from "@tsparticles/palette-rgb-primaries";
import { loadRisingBubblesPalette } from "@tsparticles/palette-rising-bubbles";
import { loadRockAndGravelPalette } from "@tsparticles/palette-rock-and-gravel";
import { loadRustAndCorrosionPalette } from "@tsparticles/palette-rust-and-corrosion";
import { loadShockwavePalette } from "@tsparticles/palette-shockwave";
import { loadShockwaveBlastPalette } from "@tsparticles/palette-shockwave-blast";
import { loadSkinAndOrganicPalette } from "@tsparticles/palette-skin-and-organic";
import { loadSmokeColdPalette } from "@tsparticles/palette-smoke-cold";
import { loadSmokeWarmPalette } from "@tsparticles/palette-smoke-warm";
import { loadSnowfallPalette } from "@tsparticles/palette-snowfall";
import { loadSolarWindPalette } from "@tsparticles/palette-solar-wind";
import { loadSplatterDarkPalette } from "@tsparticles/palette-splatter-dark";
import { loadSpringBloomPalette } from "@tsparticles/palette-spring-bloom";
import { loadSunriseGoldPalette } from "@tsparticles/palette-sunrise-gold";
import { loadSunsetBinaryPalette } from "@tsparticles/palette-sunset-binary";
import { loadSupernovaPalette } from "@tsparticles/palette-supernova";
import { loadThermalMapPalette } from "@tsparticles/palette-thermal-map";
import { loadThunderstormPalette } from "@tsparticles/palette-thunderstorm";
import { loadVaporwavePalette } from "@tsparticles/palette-vaporwave";
import { loadVibrantPalette } from "@tsparticles/palette-vibrant";
import { loadVibrantElectricPalette } from "@tsparticles/palette-vibrant-electric";
import { loadVibrantNeonPalette } from "@tsparticles/palette-vibrant-neon";
import { loadVibrantRetroPalette } from "@tsparticles/palette-vibrant-retro";
import { loadVibrantTropicalPalette } from "@tsparticles/palette-vibrant-tropical";
import { loadVolcanicAshPalette } from "@tsparticles/palette-volcanic-ash";
import { loadWaterPalette } from "@tsparticles/palette-water";
import { loadWaterSplashPalette } from "@tsparticles/palette-water-splash";
import { loadColoredSmokeAmberPalette } from "@tsparticles/palette-colored-smoke-amber";
import { loadColoredSmokeRedPalette } from "@tsparticles/palette-colored-smoke-red";
import { loadConfettiMonochromePurplePalette } from "@tsparticles/palette-confetti-monochrome-purple";
import { loadConfettiMonochromeRedPalette } from "@tsparticles/palette-confetti-monochrome-red";
import { loadFireworksRainbowPalette } from "@tsparticles/palette-fireworks-rainbow";
import { loadLagoonPalette } from "@tsparticles/palette-lagoon";
import { loadMonochromeSilverPalette } from "@tsparticles/palette-monochrome-silver";
import { loadNebulaPalette } from "@tsparticles/palette-nebula";

import { loadApplePalette } from "@tsparticles/palette-apple";
import { loadAppleGreenPalette } from "@tsparticles/palette-apple-green";
import { loadAppleRedPalette } from "@tsparticles/palette-apple-red";
import { loadAvocadoPalette } from "@tsparticles/palette-avocado";
import { loadBellPeppersPalette } from "@tsparticles/palette-bell-peppers";
import { loadBerriesPalette } from "@tsparticles/palette-berries";
import { loadCherryPalette } from "@tsparticles/palette-cherry";
import { loadCitrusTwistPalette } from "@tsparticles/palette-citrus-twist";
import { loadGingerbreadHousePalette } from "@tsparticles/palette-gingerbread-house";
import { loadGrapesPalette } from "@tsparticles/palette-grapes";
import { loadIrisPalette } from "@tsparticles/palette-iris";
import { loadMacaronPalette } from "@tsparticles/palette-macaron";
import { loadMelonPalette } from "@tsparticles/palette-melon";
import { loadMermaidPalette } from "@tsparticles/palette-mermaid";
import { loadMinecraftPalette } from "@tsparticles/palette-minecraft";
import { loadPacmanPalette } from "@tsparticles/palette-pacman";
import { loadSuperMarioBrosPalette } from "@tsparticles/palette-super-mario-bros";
import { loadTetrisPalette } from "@tsparticles/palette-tetris";
import { loadPineapplePalette } from "@tsparticles/palette-pineapple";
import { loadPizzaPalette } from "@tsparticles/palette-pizza";
import { loadSakuraPalette } from "@tsparticles/palette-sakura";
import { loadSaladPalette } from "@tsparticles/palette-salad";
import { loadSpiceRackPalette } from "@tsparticles/palette-spice-rack";
import { loadSteakPalette } from "@tsparticles/palette-steak";
import { loadSushiPalette } from "@tsparticles/palette-sushi";
import { loadTropicalFruitsPalette } from "@tsparticles/palette-tropical-fruits";
import { loadUnicornPalette } from "@tsparticles/palette-unicorn";
import { loadWatermelonPalette } from "@tsparticles/palette-watermelon";

type PlaygroundInitState = {
  error?: unknown;
  initialized: boolean;
  initializing: boolean;
};

let playgroundInitialized = false;
let playgroundInitializing = false;
let playgroundInitError: unknown;
let playgroundInitPromise: Promise<void> | undefined;

const presetLoaders: readonly ((engine: Engine) => Promise<void>)[] = [
  loadAmbientPreset,
  loadBigCirclesPreset,
  loadBubblesPreset,
  loadConfettiPreset,
  loadConfettiCannonPreset,
  loadConfettiExplosionsPreset,
  loadConfettiFallingPreset,
  loadConfettiParadePreset,
  loadFirePreset,
  loadFireflyPreset,
  loadFireworksPreset,
  loadFountainPreset,
  loadHyperspacePreset,
  loadLinksPreset,
  loadMatrixPreset,
  loadSeaAnemonePreset,
  loadSnowPreset,
  loadSquaresPreset,
  loadStarsPreset,
  loadTrianglesPreset,
];

const paletteLoaders: readonly ((engine: Engine) => Promise<void>)[] = [
  loadAcidPairPalette,
  loadAuroraBorealisPalette,
  loadAutumnLeavesPalette,
  loadBioluminescencePalette,
  loadBloodAndGorePalette,
  loadBokehColdPalette,
  loadBokehGoldPalette,
  loadBokehPastelPalette,
  loadBulletHitPalette,
  loadCandlelightPalette,
  loadCausticsPalette,
  loadCherryBlossomPalette,
  loadCmySecondariesPalette,
  loadColoredSmokeBluePalette,
  loadColoredSmokeGreenPalette,
  loadColoredSmokeMagentaPalette,
  loadColoredSmokeOrangePalette,
  loadColoredSmokePurplePalette,
  loadColoredSmokeRainbowPalette,
  loadColoredSmokeTealPalette,
  loadConfettiPalette,
  loadConfettiGoldPalette,
  loadConfettiMonochromeBluePalette,
  loadConfettiMonochromeGreenPalette,
  loadConfettiMonochromePinkPalette,
  loadConfettiNeonPalette,
  loadConfettiPastelPalette,
  loadConfettiPatrioticPalette,
  loadConfettiRainbowPalette,
  loadConfettiWinterPalette,
  loadCosmicRadiationPalette,
  loadCrtPhosphorPalette,
  loadDandelionSeedsPalette,
  loadDarkMatterPalette,
  loadDeepOceanPalette,
  loadDesertSandPalette,
  loadDualityBlueYellowPalette,
  loadDualityGreenMagentaPalette,
  loadDualityRedCyanPalette,
  loadDustHazePalette,
  loadEarthyNaturePalette,
  loadEmbersAndAshPalette,
  loadExplosionDebrisPalette,
  loadFairyDustPalette,
  loadFirePalette,
  loadFireSeedPalette,
  loadFirefliesPalette,
  loadFireworksBluePalette,
  loadFireworksBlueStrokePalette,
  loadFireworksCopperPalette,
  loadFireworksCopperStrokePalette,
  loadFireworksGoldPalette,
  loadFireworksGoldStrokePalette,
  loadFireworksGreenPalette,
  loadFireworksGreenStrokePalette,
  loadFireworksIcePalette,
  loadFireworksIceStrokePalette,
  loadFireworksMulticolorPalette,
  loadFireworksMulticolorStrokePalette,
  loadFireworksNeonPalette,
  loadFireworksNeonStrokePalette,
  loadFireworksPastelPalette,
  loadFireworksPastelStrokePalette,
  loadFireworksPurplePalette,
  loadFireworksPurpleStrokePalette,
  loadFireworksRainbowStrokePalette,
  loadFireworksRedPalette,
  loadFireworksRedStrokePalette,
  loadFireworksSilverPalette,
  loadFireworksSilverStrokePalette,
  loadFoamAndBubblesPalette,
  loadFogCoastalPalette,
  loadFogMorningPalette,
  loadForestCanopyPalette,
  loadFullFireGradientPalette,
  loadFullSpectrumPalette,
  loadGalaxyDustPalette,
  loadGlassBurstPalette,
  loadGlitchPalette,
  loadHeatDualityPalette,
  loadHeatHazePalette,
  loadHologramPalette,
  loadHolographicShimmerPalette,
  loadHolyLightPalette,
  loadIceMagicPalette,
  loadIceTriadPalette,
  loadInkInWaterPalette,
  loadJellyfishGlowPalette,
  loadLaserScatterPalette,
  loadLavaLampPalette,
  loadLensFlareDustPalette,
  loadLightningPalette,
  loadLofiWarmPalette,
  loadMatrixRainPalette,
  loadMetalSparksPalette,
  loadMeteorImpactPalette,
  loadMoltenMetalPalette,
  loadMonochromeBluesPalette,
  loadMonochromeBrownPalette,
  loadMonochromeCyanPalette,
  loadMonochromeGoldPalette,
  loadMonochromeGreensPalette,
  loadMonochromeNoirPalette,
  loadMonochromeOrangesPalette,
  loadMonochromePinksPalette,
  loadMonochromePurplesPalette,
  loadMonochromeRedsPalette,
  loadMonochromeTealPalette,
  loadMonochromeWhitePalette,
  loadMonochromeYellowsPalette,
  loadMudAndDirtPalette,
  loadNeonCityPalette,
  loadNetworkNodesPalette,
  loadNuclearGlowPalette,
  loadOilSlickPalette,
  loadOkabeItoAccessiblePalette,
  loadPastelCoolPalette,
  loadPastelDreamPalette,
  loadPastelMintPalette,
  loadPastelSunsetPalette,
  loadPastelWarmPalette,
  loadPlasmaArcPalette,
  loadPoisonAndVenomPalette,
  loadPollenAndSporesPalette,
  loadPortalPalette,
  loadPrismScatterPalette,
  loadPrismSpectrumPalette,
  loadPulsarPalette,
  loadRainPalette,
  loadRainbowPalette,
  loadRgbPrimariesPalette,
  loadRisingBubblesPalette,
  loadRockAndGravelPalette,
  loadRustAndCorrosionPalette,
  loadShockwavePalette,
  loadShockwaveBlastPalette,
  loadSkinAndOrganicPalette,
  loadSmokeColdPalette,
  loadSmokeWarmPalette,
  loadSnowfallPalette,
  loadSolarWindPalette,
  loadSplatterDarkPalette,
  loadSpringBloomPalette,
  loadSunriseGoldPalette,
  loadSunsetBinaryPalette,
  loadSupernovaPalette,
  loadThermalMapPalette,
  loadThunderstormPalette,
  loadVaporwavePalette,
  loadVibrantPalette,
  loadVibrantElectricPalette,
  loadVibrantNeonPalette,
  loadVibrantRetroPalette,
  loadVibrantTropicalPalette,
  loadVolcanicAshPalette,
  loadWaterPalette,
  loadWaterSplashPalette,
  loadColoredSmokeAmberPalette,
  loadColoredSmokeRedPalette,
  loadConfettiMonochromePurplePalette,
  loadConfettiMonochromeRedPalette,
  loadFireworksRainbowPalette,
  loadLagoonPalette,
  loadMonochromeSilverPalette,
  loadNebulaPalette,
  loadApplePalette,
  loadAppleGreenPalette,
  loadAppleRedPalette,
  loadAvocadoPalette,
  loadBellPeppersPalette,
  loadBerriesPalette,
  loadCherryPalette,
  loadCitrusTwistPalette,
  loadGingerbreadHousePalette,
  loadGrapesPalette,
  loadIrisPalette,
  loadMacaronPalette,
  loadMelonPalette,
  loadMermaidPalette,
  loadMinecraftPalette,
  loadPacmanPalette,
  loadSuperMarioBrosPalette,
  loadTetrisPalette,
  loadPineapplePalette,
  loadPizzaPalette,
  loadSakuraPalette,
  loadSaladPalette,
  loadSpiceRackPalette,
  loadSteakPalette,
  loadSushiPalette,
  loadTropicalFruitsPalette,
  loadUnicornPalette,
  loadWatermelonPalette,
];

async function runLoaders(engine: Engine, loaders: readonly ((engine: Engine) => Promise<void>)[]): Promise<void> {
  for (const loader of loaders) {
    await loader(engine);
  }
}

export async function preloadPlaygroundFeatures(engine: Engine): Promise<void> {
  await loadAll(engine);
  await Promise.all([confetti.init(), fireworks.init(), particles.init(), ribbons.init()]);
  await runLoaders(engine, presetLoaders);
  await runLoaders(engine, paletteLoaders);
}

export function getPlaygroundFeaturesInitState(): PlaygroundInitState {
  return {
    error: playgroundInitError,
    initialized: playgroundInitialized,
    initializing: playgroundInitializing,
  };
}

export function initPlaygroundFeaturesOnce(engine?: Engine): Promise<void> {
  if (playgroundInitialized) {
    return Promise.resolve();
  }

  if (playgroundInitPromise !== undefined) {
    return playgroundInitPromise;
  }

  playgroundInitializing = true;
  playgroundInitError = undefined;

  playgroundInitPromise = (async () => {
    const resolvedEngine = engine ?? tsParticles;

    await preloadPlaygroundFeatures(resolvedEngine);

    playgroundInitialized = true;
  })()
    .catch((error) => {
      playgroundInitError = error;
      playgroundInitPromise = undefined;
      throw error;
    })
    .finally(() => {
      playgroundInitializing = false;
    });

  return playgroundInitPromise;
}

export const playgroundFeaturesInfo = {
  paletteCount: paletteLoaders.length,
  presetCount: presetLoaders.length,
};
