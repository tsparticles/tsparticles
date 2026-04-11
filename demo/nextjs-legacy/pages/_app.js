import "../styles/globals.css";
import { NextParticlesProvider } from "@tsparticles/nextjs";

const registerParticles = async engine => {
  const [{ loadSlim }, { loadThemesPlugin }] = await Promise.all([
    import("@tsparticles/slim"),
    import("@tsparticles/plugin-themes"),
  ]);

  await Promise.all([loadSlim(engine), loadThemesPlugin(engine)]);
};

function MyApp({ Component, pageProps }) {
  return (
    <NextParticlesProvider init={registerParticles}>
      <Component {...pageProps} />
    </NextParticlesProvider>
  );
}

export default MyApp;
