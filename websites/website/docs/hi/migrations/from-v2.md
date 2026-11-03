# v2.x से माइग्रेट करें

`v2.x` से वर्तमान संस्करण में जाने पर आम तौर पर दो मुख्य breaking areas होते हैं:

1. `tsParticles.load(...)` signature का माइग्रेशन।
2. Option keys का माइग्रेशन (विशेषकर color और stroke).

## Load API माइग्रेशन (महत्वपूर्ण)

आधुनिक संस्करणों में `load` **एक ही params object** स्वीकार करता है।

पहले (`v2.x` positional शैली):

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 80,
    },
  },
});
```

बाद में (एकल object):

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: {
        value: 80,
      },
    },
  },
});
```

आप उसी object में `element`, `url` और `index` भी पास कर सकते हैं।

```ts
await tsParticles.load({
  element: document.getElementById("tsparticles") as HTMLElement,
  url: "/particles.json",
  index: 0,
});
```

## मुख्य option माइग्रेशन

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

पहले:

```ts
particles: {
  color: { value: "#00ffcc" },
  stroke: { width: 1, color: "#003344" }
}
```

बाद में:

```ts
particles: {
  paint: {
    fill: { color: { value: "#00ffcc" } },
    stroke: { width: 1, color: "#003344" }
  }
}
```

## अनुशंसित चरण

1. सभी `@tsparticles/*` packages एक साथ अपडेट करें।
2. जाँचें कि wrappers (React/Vue/Angular आदि) की versions उसी major line पर हैं।
3. सभी पुराने `tsParticles.load(id, options)` कॉल को object params में बदलें।
4. ज्ञात keys (`color`, `stroke`) को `paint.fill`/`paint.stroke` में माइग्रेट करें।
5. सबसे जटिल configurations पर visual regression चलाएँ।

## चेकलिस्ट

- सुनिश्चित करें कि lockfile में मिश्रित major versions नहीं हैं।
- जाँचें कि चुना गया bundle (`basic`, `slim`, `all`) अभी भी सक्षम features से मेल खाता है।
- canvas lifecycle hooks (`loaded`, `particlesLoaded`, cleanup paths) फिर से टेस्ट करें।

## उपयोगी विकल्प दस्तावेज़

- रीनेम मैट्रिक्स: [`/migrations/option-rename-matrix`](/hi/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/hi/options/particles-paint)
- `particles.color` माइग्रेशन नोट: [`/options/particles-color`](/hi/options/particles-color)
- `particles.stroke` माइग्रेशन नोट: [`/options/particles-stroke`](/hi/options/particles-stroke)

## संदर्भ

- Version alignment नियम: [`/migrations/releases`](/hi/migrations/releases)
- Repository releases: <https://github.com/tsparticles/tsparticles/releases>
