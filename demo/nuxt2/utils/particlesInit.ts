import type { Engine } from '@tsparticles/engine'

export async function registerParticles(engine: Engine): Promise<void> {
  const { loadFull } = await import('tsparticles')

  await loadFull(engine)
}
