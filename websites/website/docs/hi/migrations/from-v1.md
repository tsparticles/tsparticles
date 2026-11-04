# v1.x से माइग्रेट करें

`v1.x` से वर्तमान संस्करण में माइग्रेट करने के लिए आम तौर पर पूरी dependencies अपडेट करनी होती हैं और configuration सत्यापित करनी होती है।

मुख्य व्यावहारिक बाधाएँ:

1. पुराने package और import पैटर्न।
2. `tsParticles.load(...)` कॉल का रूप।
3. आधुनिक schemas में अपडेटेड option keys।

## Load API माइग्रेशन

आधुनिक `load` एक ही params object स्वीकार करता है।

पहले (legacy positional शैली):

```ts
await tsParticles.load("tsparticles", oldOptions);
```

बाद में:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

अगर JSON से लोड करते हैं:

```ts
await tsParticles.load({
  id: "tsparticles",
  url: "/particles.json",
});
```

## मुख्य option माइग्रेशन

अपनी configurations में इन keys को खोजकर शुरू करें:

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

रीराइट उदाहरण:

```ts
// पहले
particles: {
  color: { value: ["#ff6b6b", "#4ecdc4"] },
  stroke: { width: 0 }
}

// बाद में
particles: {
  paint: {
    fill: { color: { value: ["#ff6b6b", "#4ecdc4"] } },
    stroke: { width: 0 }
  }
}
```

## अनुशंसित चरण

1. पुराने package नामों को वर्तमान `@tsparticles/*` packages से बदलें।
2. `@tsparticles/engine` + `@tsparticles/slim` से शुरू करें, फिर आवश्यक plugins जोड़ें।
3. पुराने `load` कॉल को object-आधारित `load({ ... })` signature में बदलें।
4. वर्तमान docs के अनुसार option keys सत्यापित करें और renamed/removed fields ठीक करें।
5. desktop और mobile पर visual और performance जाँच चलाएँ।

## चेकलिस्ट

- पुराने package structure के obsolete imports हटाएँ।
- पुष्टि करें कि interactions, links और custom shapes अपेक्षित रूप से काम करते हैं।
- `particles.js` शैली की configurations के लिए compatibility layer पर विचार करें।

## उपयोगी विकल्प दस्तावेज़

- रीनेम मैट्रिक्स: [`/migrations/option-rename-matrix`](/hi/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/hi/options/particles-paint)
- `particles.color` माइग्रेशन नोट: [`/options/particles-color`](/hi/options/particles-color)
- `particles.stroke` माइग्रेशन नोट: [`/options/particles-stroke`](/hi/options/particles-stroke)

## संदर्भ

- Legacy compatibility और particles.js bridge: [`/migrations/particles-js`](/hi/migrations/particles-js)
- Installation matrix: [`/guide/installation`](/hi/guide/installation)
- Repository releases: <https://github.com/tsparticles/tsparticles/releases>
