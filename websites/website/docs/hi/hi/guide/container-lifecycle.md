# कंटेनर जीवनचक्र

`Container` `tsParticles.load(...)` द्वारा लौटाया गया रनटाइम इंस्टेंस है।

## बुनियादी जीवनचक्र

```ts
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

container = await tsParticles.load({ id: "tsparticles", options });
container.pause();
container.play();
container.destroy();
```

## अनुशंसित पैटर्न

- `start`: मौजूदा विकल्पों के साथ कंटेनर बनाएं/पुनः बनाएं।
- `stop`: `pause()` जब दिखाई न दे या आवश्यकता न हो।
- `resume`: `play()` जब उपयोगकर्ता एनीमेशन वापस चाहता है।
- `destroy`: रूट/घटक टियरडाउन पर निःशुल्क संसाधन।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Container.md>
