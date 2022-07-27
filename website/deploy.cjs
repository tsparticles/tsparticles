const fs = require("fs-extra");
const ghpages = require("gh-pages");

if (!fs.pathExists("./dist")) {
  fs.mkdirSync("./dist");
}

fs.copySync("./audio", "./dist/audio");
fs.copySync("./configs", "./dist/configs");
fs.copySync("./css", "./dist/css");
fs.copySync("../engine/docs", "./dist/docs");
fs.copySync("./fonts", "./dist/fonts");
fs.copySync("./images", "./dist/images");
fs.copySync("./js", "./dist/js");
fs.copySync("./presets", "./dist/presets");
fs.copySync("./samples", "./dist/samples");
fs.copySync("./schema", "./dist/schema");
fs.copySync("./videos", "./dist/videos");
fs.copyFileSync("./.nojekyll", "./dist/.nojekyll");
fs.copyFileSync("./404.html", "./dist/404.html");
fs.copyFileSync("./ads.txt", "./dist/ads.txt");
fs.copyFileSync("./CNAME", "./dist/CNAME");
fs.copyFileSync("./favicon.ico", "./dist/favicon.ico");
fs.copyFileSync("./index.html", "./dist/index.html");
fs.copyFileSync("./privacy.html", "./dist/privacy.html");
fs.copyFileSync("./sitemap.xml", "./dist/sitemap.xml");
fs.copyFileSync("./tsParticles-64.png", "./dist/tsParticles-64.png");
fs.copyFileSync("./video.html", "./dist/video.html");

ghpages.publish(
  "./dist",
  {
    dotfiles: true,
    message: "build: gh pages updated",
    history: false,
    user: {
      name: "Matteo Bruni",
      email: "176620+matteobruni@users.noreply.github.com",
    },
  },
  function (publishErr) {
    if (!publishErr) {
      console.log("Website published successfully");
    } else {
      console.log(`Error publishing website: ${publishErr}`);
    }

    fs.rmSync("./dist", { recursive: true });
  }
);
