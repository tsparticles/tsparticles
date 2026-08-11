# कण पैलेट

`particles.palette` एक नामित पैलेट आयात करता है और कण रंग डिफ़ॉल्ट लागू करता है।

## उदाहरण

```ts
particles: {
  palette: "sunset",
  shape: {
    type: "circle",
  },
}
```

## यह क्या बदलता है

- पैलेट कॉन्फ़िगरेशन के आधार पर `particles.paint.fill` या `particles.paint.stroke` सेट करता है।
- यदि पैलेट में कई रंग वेरिएंट हैं, तो `particles.paint` को वेरिएंट की एक श्रृंखला के रूप में आयात किया जाता है।
- पैलेट ब्लेंड मोड के साथ `particles.blend` सक्षम करता है।
- रंग सेट का पुन: उपयोग करते समय आपकी कॉन्फ़िगरेशन को कॉम्पैक्ट रखता है।

## नया पैलेट प्रारूप (कस्टम पैलेट के लिए)

```ts
const palette = {
  name: "My Palette",
  background: "#0b1020",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: ["#6ee7ff", "#8b5cf6", "#f472b6"],
    },
  },
};
```

`colors` या तो हो सकता है:

- एक एकल वैरिएंट ऑब्जेक्ट (`{ fill?, stroke? }`)
- विभिन्न वस्तुओं की एक सरणी (प्रत्येक संस्करण `fill`, `stroke`, या दोनों को परिभाषित कर सकता है)

## नोट्स

- अज्ञात पैलेट आईडी को नजरअंदाज कर दिया जाता है।
- स्पष्ट `particles.paint.fill`, `particles.paint.stroke`, या `particles.blend` मान आयातित डिफ़ॉल्ट को ओवरराइड करते हैं।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Palette.md>
