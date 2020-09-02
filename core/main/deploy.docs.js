const ghpages = require("gh-pages");

ghpages.publish('docs', {
    dotfiles: true,
    message: "build: gh pages updated",
    history: false
}, function (err) {
    console.log(err);
});
