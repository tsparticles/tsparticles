# v3.x से माइग्रेट करें

`v3.x` से माइग्रेशन में मुख्य जोखिम **options compatibility** और **package changes** हैं।

## प्राथमिक बदलाव

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## पैकेज का नाम बदलना

कुछ `v3.x` पैकेजों का नाम बदल दिया गया है या पुनर्गठित किया गया है:

| v3 पैकेज | वर्तमान पैकेज | नोट |
|---|---|---|
| `@tsparticles/move-base` | `@tsparticles/plugin-move` | एकल प्लगइन में विलय |
| `@tsparticles/move-parallax` | `@tsparticles/plugin-move` | एकल प्लगइन में विलय |
| `@tsparticles/updater-color` | `@tsparticles/updater-paint` | paint सिस्टम से बदला गया |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint` | paint सिस्टम से बदला गया |
| `@tsparticles/plugin-hsv-color` | `@tsparticles/plugin-hsv-color` | `plugins/colors/hsv/` में स्थानांतरित, same name |

## ऑप्शन मैपिंग उदाहरण

पहले (`v3.x` स्टाइल):

```ts
const options = {
  particles: {
    color: {
      value: "#ff0000",
    },
    stroke: {
      width: 2,
      color: "#000000",
    },
  },
};
```

अब (वर्तमान):

```ts
const options = {
  particles: {
    paint: {
      fill: {
        value: "#ff0000",
      },
      stroke: {
        width: 2,
        color: "#000000",
      },
    },
  },
};
```

## Load API migration

पहले (legacy positional):

```ts
await tsParticles.load("tsparticles", options);
```

अब (object params):

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## अनुशंसित कदम

1. सभी `@tsparticles/*` पैकेजों को नवीनतम संस्करण पर लाएं।
2. deprecated option keys (`particles.color`, `particles.stroke`) को `particles.paint.*` से बदलें।
3. नाम बदले गए पैकेजों को `package.json` में अपडेट करें (ऊपर तालिका देखें)।
4. सुनिश्चित करें कि custom plugins/shapes `tsParticles.load(...)` से पहले लोड हों।
5. इंटरैक्शन और performance-sensitive scenes को दोबारा जांचें।

## Resources

- Option rename matrix: [`/migrations/option-rename-matrix`](/hi/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/hi/options/particles-paint)
