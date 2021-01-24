const ghpages = require("gh-pages");

ghpages.publish('docs', {
    dotfiles: true,
    message: "build: gh pages updated",
    history: false
}, function (err) {
    if (!err) {
        console.log("Docs published successfully");
    } else {
        console.log(`Error publishing docs: ${err}`);
    }
});
