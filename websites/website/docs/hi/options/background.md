# पृष्ठभूमि और कैनवास

यह अनुभाग कैनवास परत और पूर्ण-स्क्रीन व्यवहार को नियंत्रित करता है।

## परत क्रम (पीछे से सामने)

1. **CSS पृष्ठभूमि** (`color`, `image`, `position`, `repeat`, `size`) — DOM कैनवास शैली के रूप में लागू
2. **`clear()`** — प्रति फ्रेम कैनवास पिक्सेल साफ़ करना
3. **`background.element` ऑटो-ड्रा** — यदि सेट है, `ctx.drawImage(element, ...)` बाहरी तत्व को सम्मिलित करता है
4. **`background.draw` कॉलबैक** — यदि सेट है, मुख्य रेंडरिंग कॉन्टेक्स्ट + डेल्टा के साथ कॉल किया जाता है
5. **कण** — ऊपर ड्रा होते हैं

`element` और `draw` **स्वतंत्र परतें** हैं। दोनों वैकल्पिक हैं और एक साथ या अलग-अलग उपयोग किए जा सकते हैं।

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

| कुंजी      | प्रकार                                                                                       | विवरण                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `color`    | `string` / `object`                                                                          | कैनवास पृष्ठभूमि रंग।                                                                                       |
| `opacity`  | `number`                                                                                     | पृष्ठभूमि रंग के लिए अल्फा चैनल, `0` से `1` तक।                                                             |
| `image`    | `string`                                                                                     | CSS `background-image` मान (जैसे `url('...')`).                                                             |
| `position` | `string`                                                                                     | CSS `background-position` मान।                                                                              |
| `repeat`   | `string`                                                                                     | CSS `background-repeat` मान।                                                                                |
| `size`     | `string`                                                                                     | CSS `background-size` मान।                                                                                  |
| `element`  | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | बाहरी तत्व जो प्रति फ्रेम `drawImage` के माध्यम से स्वचालित रूप से ड्रा होता है। इंजन द्वारा प्रबंधित नहीं। |
| `draw`     | `(context, delta) => void`                                                                   | मुख्य कैनवास संदर्भ पर कस्टम पृष्ठभूमि ड्राइंग के लिए प्रति-फ्रेम कॉलबैक।                                   |

### `element`

जब `element` सेट होता है, तत्व की वर्तमान दृश्य सामग्री प्रति फ्रेम `ctx.drawImage()` के माध्यम से मुख्य कैनवास पर ड्रा की जाती है। तत्व **इंजन द्वारा प्रबंधित नहीं है** — बाहरी कोड इसकी रेंडरिंग संभालता है।

समर्थित तत्व प्रकार:

- `HTMLCanvasElement` / `OffscreenCanvas`
- `HTMLVideoElement` (वर्तमान फ्रेम ड्रा करता है)
- `HTMLImageElement`
- CSS चयनकर्ता स्ट्रिंग जो DOM में उपरोक्त में से किसी से मेल खाता हो

```json
{
  "background": {
    "element": "#my-bg-canvas"
  }
}
```

```ts
// बाहरी <video> तत्व को पृष्ठभूमि के रूप में स्वचालित रूप से ड्रा करें
tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-video",
    },
  },
});
```

### `draw`

कस्टम पृष्ठभूमि रेंडरिंग के लिए प्रति-फ्रेम कॉलबैक। हमेशा **मुख्य कैनवास संदर्भ** (`OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`) प्राप्त करता है, तत्व का संदर्भ कभी नहीं।

```json
{
  "background": {
    "draw": "(ctx, delta) => { ctx.fillStyle = 'blue'; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); }"
  }
}
```

(TypeScript एक फंक्शन रेफरेंस का उपयोग करता है, स्ट्रिंग का नहीं।)

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

const drawBackground = (ctx: BackgroundDrawContext, delta: IDelta): void => {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
```

### संयुक्त Element + Draw

दोनों परतें प्रत्येक फ्रेम में स्वतंत्र रूप से चलती हैं। तत्व पहले ड्रा होता है, फिर draw कॉलबैक:

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-canvas",
      draw: (ctx: BackgroundDrawContext, delta: IDelta) => {
        ctx.fillStyle = `rgba(0,0,0,${0.05 * delta.factor})`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      },
    },
  },
});
```

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
