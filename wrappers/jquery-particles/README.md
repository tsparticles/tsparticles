# tsParticles - jQuery wrapper ![Node.js CI](https://github.com/matteobruni/jquery-particles/workflows/Node.js%20CI/badge.svg)

jQuery plugin for [tsParticles](https://github.com/matteobruni/tsparticles)

## Installation

```shell script
npm install jquery-particles
```

or from jsDelivr

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/jquery-particles/badge)](https://www.jsdelivr.com/package/npm/jquery-particles)

```html
<!-- first include tsParticles -->
<script src="https://cdn.jsdelivr.net/npm/tsparticles@1.12.7/dist/tsparticles.min.js"></script>
<!-- then include jquery wrapper -->
<script src="https://cdn.jsdelivr.net/npm/jquery-particles@1.12.7/dist/jquery.particles.min.js"></script>
```

## How to use

HTML

```html
<div id="tsparticles"></div>
```

```javascript
$("#tsparticles")
  .particles()
  .init(
    {
      /* params */
    },
    function (container) {
      // container is the particles container where you can play/pause or stop/start.
      // the container is already started, you don't need to start it manually.
    }
  );

// or

$("#tsparticles")
  .particles()
  .ajax("particles.json", function (container) {
    // container is the particles container where you can play/pause or stop/start.
    // the container is already started, you don't need to start it manually.
  });
```

\*For all options you can checkout the readme [here](https://github.com/matteobruni/tsparticles/blob/master/README.md).

## Need More Help?

[![Slack](https://cdn.matteobruni.it/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI)
