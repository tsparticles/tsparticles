# Ribbons बंडल

`bundles/ribbons` कार्यक्षेत्र से आधिकारिक बंडल।

## इंस्टॉल करें

```bash
pnpm add @tsparticles/engine @tsparticles/ribbons
```

## उपयोग के लिए तैयार (पूरा पेज)

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 5,
  spread: 0,
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
