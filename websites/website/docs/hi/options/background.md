# पृष्ठभूमि और कैनवास

यह अनुभाग कैनवास परत और पूर्ण-स्क्रीन व्यवहार को नियंत्रित करता है।

## मुख्य गुण

- `background.color`
- `background.opacity`
- `background.image`
- `background.position`
- `background.repeat`
- `background.size`

## `background`

```ts
background: {
  color: "#0b1020",
  image: "",
  position: "50% 50%",
  repeat: "no-repeat",
  size: "cover"
}
```

- `color`: कैनवास पृष्ठभूमि रंग।
- `opacity`: पृष्ठभूमि परत के लिए अल्फा चैनल।
- `image`: वैकल्पिक पृष्ठभूमि छवि।
- `position`, `repeat`, `size`: CSS जैसा व्यवहार।
- `element`: कस्टम draw कॉलबैक के लिए वैकल्पिक CSS सेलेक्टर, `HTMLCanvasElement` या `OffscreenCanvas`। छोड़े जाने पर कण कैनवास का उपयोग होता है।
- `draw`: कस्टम पृष्ठभूमि रेंडरिंग के लिए वैकल्पिक प्रति-फ्रेम कॉलबैक `(context, delta) => void`।

## `fullScreen`

```ts
fullScreen: {
  enable: true,
  zIndex: -1
}
```

- `enable`: कैनवास को पूर्ण व्यूपोर्ट बनाता है।
- `zIndex`: आपकी सामग्री के पीछे कण रखने के लिए उपयोगी।

एम्बेडेड खेल के मैदानों और इनलाइन दस्तावेज़ पूर्वावलोकन के लिए, सेट करें:

```ts
fullScreen: {
  enable: false,
}
```

## `detectRetina`

```ts
detectRetina: true;
```

HiDPI स्क्रीन पर रेंडरिंग में सुधार करता है, लेकिन GPU/CPU लोड बढ़ाता है।

## व्यावहारिक नोट्स

- लैंडिंग पृष्ठों के लिए, `zIndex: -1` के साथ `fullScreen.enable: true` का उपयोग करें।
- यदि आप मोबाइल पर धीमापन देखते हैं, तो `detectRetina: false` आज़माएं।
- यदि कोई कॉन्फिगरेशन फुलस्क्रीन के लिए डिज़ाइन किया गया है, तो उसे बाउंडेड सेक्शन में एम्बेड करने से पहले `fullScreen` को अक्षम करें।
