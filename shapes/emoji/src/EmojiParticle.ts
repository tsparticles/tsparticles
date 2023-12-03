import type { Particle } from "@tsparticles/engine";

export interface EmojiParticle extends Particle {
    emojiData?: ImageBitmap;
}
