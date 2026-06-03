# Ribbons बंडल

`bundles/ribbons` कार्यक्षेत्र से आधिकारिक बंडल।

वेबसाइट: <https://ribbons.js.org>

## इंस्टॉल करें

```bash
pnpm add @tsparticles/engine @tsparticles/ribbons
```

## उपयोग के लिए तैयार (पूरा पेज)

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 5,
  colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF"],
});
```

## किसी विशिष्ट कैनवास तक सीमित

```ts
import { ribbons } from "@tsparticles/ribbons";
import type { Container } from "@tsparticles/engine";

const canvas = document.getElementById("ribbons-canvas") as HTMLCanvasElement;

const fire = await ribbons.create(canvas, {
  count: 5,
  colors: ["#FF0055", "#00D1FF", "#FFD23F"],
});

export function start(): Promise<Container | undefined> {
  return fire();
}

export function stop(): void {
  fire.pause();
}

export function resume(): void {
  fire.play();
}
```

सजावटी बहते पृष्ठभूमि, उत्सव कैस्केड और रंगीन एनिमेटेड ट्रेल्स के लिए एकदम सही।

## निश्चित स्थान (एकल बिंदु)

डिफ़ॉल्ट रूप से प्रत्येक रिबन कण पूरे कैनवास की चौड़ाई में यादृच्छिक x स्थान पर उत्पन्न होता है। स्पॉन क्षेत्र को नियंत्रित करने के लिए `emitterSize` का उपयोग करें — सभी रिबन को एक ही बिंदु से शुरू करने के लिए इसे `{ width: 0, height: 0 }` पर सेट करें:

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  position: { x: 50, y: 0 },
  emitterSize: { width: 0, height: 0 },
});
```

यह किसी बटन या आपके पेज के किसी विशिष्ट तत्व से रिबन ट्रिगर करने के लिए उपयोगी है।
