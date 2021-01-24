# Plugins/Customizations

tsParticles now supports some customizations 🥳.

**NOW YOU CAN CREATE YOUR OWN SHAPES OR PRESETS**

## Creating a custom shape

You can now create a script with your own shape to use in your website or for distributing it to others. All you have to do is a drawing function, give it a name and use it in the config.

Publish your shapes with `tsparticles-shape` tag on `NPM` so everyone can find it.

You'll find a sample below.

### Spiral sample

_spiral.js_ - The custom shape script, you can distribute it or reuse in all your websites.

```javascript
// call this method before initializing tsParticles, this shape will be available in all of your tsParticles instances
// parameters: shape name, drawing method
// opacity is just for shapes that needs a differenc opacity handling like images
tsParticles.addShape("spiral", function (context, particle, radius, opacity) {
  const shapeData = particle.shapeData;
  const realWidth = (radius - shapeData.innerRadius) / shapeData.lineSpacing;

  for (let i = 0; i < realWidth * 10; i++) {
    const angle = 0.1 * i;
    const x =
      (shapeData.innerRadius + shapeData.lineSpacing * angle) * Math.cos(angle);
    const y =
      (shapeData.innerRadius + shapeData.lineSpacing * angle) * Math.sin(angle);

    context.lineTo(x, y);
  }
});
```

If you prefer using classes you can, {@link IShapeDrawer} interface can be implemented in your code or at least a class with four method {@link IShapeDrawer.draw |draw(context, particle, radius, opacity, delta)}, {@link IShapeDrawer.init | init(container)}, {@link IShapeDrawer.afterEffect | afterEffect(context, particle, radius, opacity, delta)}, {@link IShapeDrawer.destroy | destroy(container)} in it. You can find a sample below.

```javascript
class SpiralDrawer {
  draw(context, particle, radius, opacity, delta) {
    const shapeData = particle.shapeData;
    const realWidth = (radius - shapeData.innerRadius) / shapeData.lineSpacing;

    for (let i = 0; i < realWidth * 10; i++) {
      const angle = 0.1 * i;
      const x =
        (shapeData.innerRadius + shapeData.lineSpacing * angle) *
        Math.cos(angle);
      const y =
        (shapeData.innerRadius + shapeData.lineSpacing * angle) *
        Math.sin(angle);

      context.lineTo(x, y);
    }
  }
}

// call this method before initializing tsParticles, this shape will be available in all of your tsParticles instances
// parameters: shape name, drawer class
tsParticles.addShape("spiral", new SpiralDrawer());
```

#### Bubble Sample (with after effect)

_bubble.js_ - The custom shape script

```javascript
tsParticles.addShape(
    "bubble",
    function (context, particle, radius) { // drawing function
        context.arc(0, 0, radius, 0, Math.PI * 2, false);
    },
    undefined, // init function is not required
    function (context, particle, radius) { // after effect function
        context.save();
        context.beginPath();
        context.arc(radius / 3, -radius / 3, radius / 3, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = "#fff9";
        context.fill();
        context.restore();
    }
);
```

### Config

_config.json_ - The config section to add to your config or in your plugin readme to teach others on how to use it.

```javascript
{
  // [... omitted for brevity]
  "particles": {
    // [... omitted for brevity]
    "shape": {
      "type": "spiral", // this must match the name above, the type works as always, you can use an array with your custom shape inside
      "custom": {
        // this must match the name above, these are the values set in particle.shapeData (the first line of the method above)
        // you can use array as value here too, the values will be random picked, like in standard shapes
        "spiral": {
          "innerRadius": 1,
          "lineSpacing": 1,
          "close": false, // this value is used by tsParticles to close the path, if you don't want to close it set this value to false
          "fill": false // this value is used by tsParticles to fill the shape with the particles color, if you want only the stroke set this value to false
        }
      }
      // [... omitted for brevity]
    }
    // [... omitted for brevity]
  }
  // [... omitted for brevity]
}
```

## Creating a custom preset

You can now create a script with your own preset to use in your website or for distributing it to others. All you have to do is give it a name and set all the options you need it to load correctly. Remember to not import all config, properties not needed can be omitted.

Publish your preset with `tsparticles-preset` tag on `NPM` so everyone can find it.

You'll find a sample below.

### Fire preset sample

_fire.preset.js_ - The custom preset script, you can distribute it or reuse in all your websites.

```javascript
// call this method before initializing tsParticles, this preset will be available in all of your tsParticles instances
// parameters: preset name, preset partial options
tsParticles.addPreset("fire", {
  fpsLimit: 40,
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
    },
    opacity: {
      value: 0.5,
      random: true,
    },
    size: {
      value: 3,
      random: true,
    },
    move: {
      enable: true,
      speed: 6,
      random: false,
    },
  },
  interactivity: {
    events: {
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
  },
  background: {
    image: "radial-gradient(#4a0000, #000)",
  },
});
```

_config.json_ - The config section to add to your config or in your plugin readme to teach others on how to use it.

```javascript
{
  "preset": "fire" // this should match the name above, it can be used in array values too, it will be loaded in order like everyone else
}
```
