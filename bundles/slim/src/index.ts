import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadEasingQuadPlugin } from "@tsparticles/plugin-easing-quad";
import { loadEmojiShape } from "@tsparticles/shape-emoji";
import { loadExternalAttractInteraction } from "@tsparticles/interaction-external-attract";
import { loadExternalBounceInteraction } from "@tsparticles/interaction-external-bounce";
import { loadExternalBubbleInteraction } from "@tsparticles/interaction-external-bubble";
import { loadExternalConnectInteraction } from "@tsparticles/interaction-external-connect";
import { loadExternalDestroyInteraction } from "@tsparticles/interaction-external-destroy";
import { loadExternalGrabInteraction } from "@tsparticles/interaction-external-grab";
import { loadExternalParallaxInteraction } from "@tsparticles/interaction-external-parallax";
import { loadExternalPauseInteraction } from "@tsparticles/interaction-external-pause";
import { loadExternalPushInteraction } from "@tsparticles/interaction-external-push";
import { loadExternalRemoveInteraction } from "@tsparticles/interaction-external-remove";
import { loadExternalRepulseInteraction } from "@tsparticles/interaction-external-repulse";
import { loadExternalSlowInteraction } from "@tsparticles/interaction-external-slow";
import { loadImageShape } from "@tsparticles/shape-image";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadLifeUpdater } from "@tsparticles/updater-life";
import { loadLineShape } from "@tsparticles/shape-line";
import { loadPaintUpdater } from "@tsparticles/updater-paint";
import { loadParticlesAttractInteraction } from "@tsparticles/interaction-particles-attract";
import { loadParticlesCollisionsInteraction } from "@tsparticles/interaction-particles-collisions";
import { loadParticlesLinksInteraction } from "@tsparticles/interaction-particles-links";
import { loadPolygonShape } from "@tsparticles/shape-polygon";
import { loadRotateUpdater } from "@tsparticles/updater-rotate";
import { loadSquareShape } from "@tsparticles/shape-square";
import { loadStarShape } from "@tsparticles/shape-star";

declare const __VERSION__: string;

/**
 * Loads the slime bundle with all plugins needed for running the tsParticles Slim package.
 * This function must be called to make tsParticles Slim work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the \@tsparticles/slim package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 */
export async function loadSlim(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const loadInteractivityForSlim = async (e: Engine): Promise<void> => {
      await loadInteractivityPlugin(e);

      await Promise.all([
        loadExternalParallaxInteraction(e),
        loadExternalAttractInteraction(e),
        loadExternalBounceInteraction(e),
        loadExternalBubbleInteraction(e),
        loadExternalConnectInteraction(e),
        loadExternalDestroyInteraction(e),
        loadExternalGrabInteraction(e),
        loadExternalPauseInteraction(e),
        loadExternalPushInteraction(e),
        loadExternalRemoveInteraction(e),
        loadExternalRepulseInteraction(e),
        loadExternalSlowInteraction(e),

        loadParticlesAttractInteraction(e),
        loadParticlesCollisionsInteraction(e),
        loadParticlesLinksInteraction(e),
      ]);
    };

    await Promise.all([
      loadBasic(e),

      loadInteractivityForSlim(e),

      loadEasingQuadPlugin(e),

      loadEmojiShape(e),
      loadImageShape(e),
      loadLineShape(e),
      loadPolygonShape(e),
      loadSquareShape(e),
      loadStarShape(e),

      loadLifeUpdater(e),
      loadPaintUpdater(e),
      loadRotateUpdater(e),
    ]);
  });
}
