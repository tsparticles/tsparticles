const ghpages = require("gh-pages");
const path = require("path");

const ghToken = process.env.GITHUB_TOKEN, gitUser = ghToken ? {
    name: "github-actions-bot", email: "support+actions@github.com",
} : {
    name: "Matteo Bruni", email: "176620+matteobruni@users.noreply.github.com",
};

ghpages.publish(path.resolve("."), {
    src: "docs.json",
    repo: ghToken ? `https://git:${ghToken}@github.com/tsparticles/tsparticles.git` : `https://github.com/tsparticles/tsparticles.git`,
    branch: "docs-gen",
    dotfiles: true,
    history: false,
    message: "build: docs-gen updated",
    user: gitUser,
}, function(publishErr) {
    if (!publishErr) {
        console.log("Docs JSON published successfully");
    } else {
        console.log(`Error publishing Docs JSON: ${publishErr}`);
    }
});
