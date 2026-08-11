# कण

`particles` के अंदर के विकल्प कण की उपस्थिति और गति को नियंत्रित करते हैं।

## सर्वाधिक उपयोग किये जाने वाले समूह

- `particles.number`
- `particles.move`
- `particles.links`
- `particles.palette`
- `particles.paint`
- `particles.shape`
- `particles.size`
- `particles.opacity`

विस्तृत पृष्ठ देखें:

- [`Particles Number`](/hi/options/particles-number)
- [`Particles Move`](/hi/options/particles-move)
- [`Particles Links`](/hi/options/particles-links)
- [`Particles Palette`](/hi/options/particles-palette)
- [`Particles Paint`](/hi/options/particles-paint)
- [`Particles Shape`](/hi/options/particles-shape)

## `particles.number`

```ts
particles: {
  number: {
    value: 70,
    density: {
      enable: true,
      area: 800
    }
  }
}
```

- `value`: आधार कण गणना।
- `density.enable`: कंटेनर के आकार के अनुसार गिनती को अनुकूलित करता है।

## `particles.move`

```ts
move: {
  enable: true,
  speed: 1.6,
  direction: "none",
  outModes: {
    default: "out"
  }
}
```

- `speed`: अनुमानित गति गति।
- `outModes.default`: किनारे का व्यवहार (`out`, `bounce`, ...)।

## `particles.links`

```ts
links: {
  enable: true,
  distance: 140,
  opacity: 0.28,
  color: "#7aa0ff"
}
```

कणों के बीच लिंक सक्षम करता है, जो "नेटवर्क" हीरो अनुभागों के लिए उपयोगी है।

## `particles.palette`

```ts
palette: "sunset";
```

- एक पंजीकृत पैलेट आईडी से रंग और मिश्रण डिफ़ॉल्ट आयात करता है।
- पैलेट के आधार पर `paint.fill` या `paint.stroke` स्वचालित रूप से पॉप्युलेट होता है।
- मल्टी-वेरिएंट पैलेट के साथ, `paint` को वेरिएंट की एक सरणी के रूप में लोड किया जाता है।
- जब आप जल्दी से रंग मूड बदलना चाहते हैं तो प्रीसेट और डेमो के साथ उपयोगी।

## `particles.shape`, `size`, `opacity`

```ts
shape: {
  type: ["circle", "square"]
},
size: {
  value: {
    min: 1,
    max: 5
  }
},
opacity: {
  value: 0.7
}
```

- `shape.type`: एकल प्रकार या प्रकारों की सूची।
- `size.value`: प्राकृतिक भिन्नता के लिए अनुशंसित सीमा।
- `opacity.value`: औसत पारदर्शिता।

## उन्नत समूह आगे की जाँच करने के लिए

- `particles.collisions`
- `particles.life`
- `particles.orbit`
- `particles.roll`
- `particles.rotate`
- `particles.tilt`
- `particles.twinkle`
- `particles.wobble`

विस्तृत पृष्ठ:

- [`Particles Bounce`](/hi/options/particles-bounce)
- [`Particles Paint`](/hi/options/particles-paint)
- [`Particles Destroy`](/hi/options/particles-destroy)
- [`Particles Group`](/hi/options/particles-group)
- [`Particles Collisions`](/hi/options/particles-collisions)
- [`Particles Life`](/hi/options/particles-life)
- [`Particles Palette`](/hi/options/particles-palette)
- [`Particles Opacity`](/hi/options/particles-opacity)
- [`Particles Orbit`](/hi/options/particles-orbit)
- [`Particles Repulse`](/hi/options/particles-repulse)
- [`Particles Roll`](/hi/options/particles-roll)
- [`Particles Rotate`](/hi/options/particles-rotate)
- [`Particles Shadow`](/hi/options/particles-shadow)
- [`Particles Size`](/hi/options/particles-size)
- [`Particles Tilt`](/hi/options/particles-tilt)
- [`Particles Twinkle`](/hi/options/particles-twinkle)
- [`Particles Wobble`](/hi/options/particles-wobble)
- [`Particles ZIndex`](/hi/options/particles-zindex)
- [`Particles Move`](/hi/options/particles-move)
- [`Particles Number`](/hi/options/particles-number)
- [`Particles Links`](/hi/options/particles-links)
- [`Particles Shape`](/hi/options/particles-shape)

स्रोत पृष्ठ: <https://github.com/tsparticles/tsparticles/tree/main/markdown/Options/Particles>
