# Shape

The Shape section of Particles options has been reworked a lot but for now it's still compatible with all your old configurations.

If you want to customize more you particles you should use the new syntax

| key       | option type             | example                                                                                                                                                     | notes                                               |
| --------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `type`    | `string` <br /> `array` | `"circle"` <br /> `"line"` <br /> `"edge"` <br /> `"triangle"` <br /> `"polygon"` <br /> `"star"` <br /> `"image"` <br /> `["circle", "triangle", "image"]` |                                                     |
| `options` | `object`                |                                                                                                                                                             | This object is where new implementations are placed |

## Shape Options

Shape `options` is a dynamic object, is properties are the shape types, even the custom one you created (as you can read above) and the values are objects or arrays that will be used to draw the particles.

This will give us more customization, you can now specify a shape type with a `particles` property that lets you customize almost all the properties of the original object.

`shape` and `number` will be ignored for obvious reasons.

The shape types you find described above are the only implemented here, if you use an external custom shape ask the creator.

All the shapes have in common these properties

| key         | option type | example          | notes                                                                     |
| ----------- | ----------- | ---------------- | ------------------------------------------------------------------------- |
| `particles` | `object`    |                  | See Particles options [here](https://particles.js.org/docs/interfaces/_options_interfaces_ioptions_.ioptions.html-Particles)                                               |
| `fill`      | `boolean`   | `true` / `false` | Used to specify if its shape particles should be filled with color or not |
| `close`     | `boolean`   | `true` / `false` | Used to specify if its shape particles should have a closed shape         |

Below you'll find the options of some shape types that need additional properties, you can add to the object below the 3 properties above.

### Polygon

```javascript
polygon: {
  sides: 5 // the number of sides of the polygon
}
```

### Star

```javascript
star: {
  sides: 5, // the number of sides of the star
  inset: 2 // the inset length, 2 is the default and an acceptable value
}
```

### Character / Char

```javascript
character: {
    value: "*", // the text to use as particles, any string is valid, for escaping unicode char use the `\uXXXX` syntax
    font: "Verdana", // the font to use to draw the text. If the font needs an external css or javascript like FontAwesome you should include all the necessary files on your own
    style: "", // any additional css style to add to the text
    weight: "" // the css weight property, some fonts like font awesome have a specified weight, check the documentation if needed
}
```

### Image

```javascript
image: {
    src: "http://mywebsite.com/assets/img/image.png", // any path or url to your image that will be used as a particle
    width: 100, // the pixel width of the image, you can use any value, the image will be scaled
    height: 100 // the pixel height of the image, you can use any value, the image will be scaled
    replaceColor: false // if true and the image type is SVG, it will replace all the colors with the particle color
}
```
