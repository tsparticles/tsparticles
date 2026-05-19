# v3.x से माइग्रेट करें

`v3.x` से माइग्रेशन में मुख्य जोखिम **options compatibility** और **package changes** हैं।

## प्राथमिक बदलाव

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## पैकेज का नाम बदलना

कुछ `v3.x` पैकेजों का नाम बदल दिया गया है या पुनर्गठित किया गया है:

| v3 पैकेज                            | वर्तमान पैकेज                       | नोट                                                                         |
| ----------------------------------- | ----------------------------------- | --------------------------------------------------------------------------- |
| `@tsparticles/move-base`            | `@tsparticles/plugin-move`          | एकल प्लगइन में विलय                                                         |
| `@tsparticles/move-parallax`        | `@tsparticles/plugin-move`          | एकल प्लगइन में विलय                                                         |
| `@tsparticles/updater-color`        | `@tsparticles/updater-paint`        | paint सिस्टम से बदला गया                                                    |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint`        | paint सिस्टम से बदला गया                                                    |
| `@tsparticles/plugin-hsv-color`     | `@tsparticles/plugin-hsv-color`     | `plugins/colors/hsv/` में स्थानांतरित, same name                            |
| (v3 में आवश्यक नहीं - अंतर्निर्मित) | `@tsparticles/plugin-interactivity` | सभी इंटरैक्शन प्लगइन (grab, bubble, repulse, आदि) के काम करने के लिए आवश्यक |

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
4. यदि आप इंटरैक्शन प्लगइन (grab, bubble, repulse, आदि) का उपयोग करते हैं, तो `@tsparticles/plugin-interactivity` इंस्टॉल करें और किसी भी इंटरैक्शन प्लगइन को लोड करने से पहले इसे `await loadInteractivityPlugin(tsParticles)` से लोड करें।
5. सुनिश्चित करें कि custom plugins/shapes `tsParticles.load(...)` से पहले लोड हों।
6. इंटरैक्शन और performance-sensitive scenes को दोबारा जांचें।

## ग्रैन्युलर लोडर फ़ंक्शन

कुछ पैकेज केवल आवश्यक भागों को लोड करने के लिए अलग-अलग लोडर फ़ंक्शन प्रदान करते हैं, जिससे बंडल का आकार कम होता है।

### प्लगइन

- **`@tsparticles/plugin-absorbers`**: `loadAbsorbersPluginSimple` (केवल अब्ज़ॉर्बर जीवनचक्र और ड्राइंग), `loadAbsorbersInteraction` (केवल क्लिक/होवर इंटरैक्शन), या `loadAbsorbersPlugin` (दोनों)।
- **`@tsparticles/plugin-emitters`**: `loadEmittersPluginSimple` (केवल एमिटर जीवनचक्र और ड्राइंग), `loadEmittersInteraction` (केवल क्लिक/होवर इंटरैक्शन), या `loadEmittersPlugin` (दोनों)।

### आकार

- **`@tsparticles/shape-polygon`**: `loadGenericPolygonShape` (बहुभुज) या `loadTriangleShape` (त्रिकोण) अलग-अलग, या `loadPolygonShape` दोनों के लिए।
- **`@tsparticles/shape-cards`**: `loadClubsSuitShape`, `loadDiamondsSuitShape`, `loadHeartsSuitShape`, `loadSpadesSuitShape` (अलग-अलग सूट), `loadCardSuitsShape` (सभी सूट), `loadFullCardsShape` (कार्ड छवियाँ), या `loadCardsShape` (सभी)।

अन्य सभी आकार पैकेज (arrow, circle, cog, emoji, heart, image, infinity, line, matrix, path, rounded-polygon, rounded-rect, spiral, square, squircle, star, text) सीधे एकल `load*Shape` फ़ंक्शन निर्यात करते हैं।

## Resources

- Option rename matrix: [`/migrations/option-rename-matrix`](/hi/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/hi/options/particles-paint)
