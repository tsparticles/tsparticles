import '../styles/globals.css'
import { ParticlesProvider } from '@tsparticles/react'
import { loadBigCirclesPreset } from '@tsparticles/preset-big-circles'

const registerParticles = async (engine) => {
  await loadBigCirclesPreset(engine)
}

function MyApp({ Component, pageProps }) {
  return (
    <ParticlesProvider init={registerParticles}>
      <Component {...pageProps} />
    </ParticlesProvider>
  )
}

export default MyApp
