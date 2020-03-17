# jquery-particles

jQuery plugin for [tsParticles](https://github.com/matteobruni/tsparticles)

## Installation

```shell script
npm install jquery-particles
```

or from jsDelivr

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/jquery-particles/badge)](https://www.jsdelivr.com/package/npm/jquery-particles)

```html
<script src="https://cdn.jsdelivr.net/npm/jquery-particles@1.10.3/dist/jquery.particles.min.js"></script>
```

## How to use

HTML

```html
<div id="tsparticles"></div>
```

```javascript
$('#tsparticles').particles().init({ /* params */ }, function (container) {
    // container is the particles container where you can play/pause or stop/start.
    // the container is already started, you don't need to start it manually.
});

// or

$('#tsparticles').particles().ajax('particles.json', function (container) {
    // container is the particles container where you can play/pause or stop/start.
    // the container is already started, you don't need to start it manually.
});
```

*For all options you can checkout the readme [here](https://github.com/matteobruni/tsparticles/blob/master/README.md).