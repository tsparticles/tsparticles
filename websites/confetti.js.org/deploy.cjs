const ghpages = require("gh-pages");

ghpages.publish(
    "./",
    {
        dotfiles: true,
        history: false,
        message: "build: gh pages updated",
        repo: "https://github.com/matteobruni/confetti.git",
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
    }
);
