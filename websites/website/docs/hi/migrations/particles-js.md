# माइग्रेशन और संगतता

यदि आप `particles.js` से माइग्रेट कर रहे हैं, तो इस आदेश का उपयोग करें:

1. पुरानी स्क्रिप्ट/पैकेज को `@tsparticles/engine` + बंडल (`@tsparticles/slim`) से बदलें
2. अपने पुराने कॉन्फ़िगरेशन को स्थानांतरित करें और असमर्थित फ़ील्ड को क्रमिक रूप से मैप करें
3. एक-एक करके इंटरैक्शन (होवर/क्लिक/लिंक) का परीक्षण करें

## कैनोनिकल माइग्रेशन नोट्स

- आधिकारिक माइग्रेशन गाइड स्रोत: [`tsparticles/markdown/pjsMigration.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/pjsMigration.md)
- लीगेसी संगतता उदाहरण डेमो फ़ोल्डर्स में उपलब्ध हैं।

## अनुकूलता पैकेज

यदि आपको लीगेसी कॉन्फ़िगरेशन को स्थानांतरित करते समय ब्रिज लेयर की आवश्यकता है:

- एनपीएम: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>

आगे पढ़ना:

- माइग्रेशन लेख: <https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m>
- स्विच करने के 5 कारण: <https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe>

## सामान्य मानचित्रण युक्तियाँ

- पुराना `particlesJS(...)` init `tsParticles.load({ id, options })` बन जाता है।
- कई विरासत मूल्यों में अभी भी `particles`, `interactivity`, और `detectRetina` के अंतर्गत प्रत्यक्ष समकक्ष हैं।
- नए प्लगइन-संचालित आर्किटेक्चर का मतलब है कि कुछ उन्नत सुविधाओं के लिए स्पष्ट पैकेज लोडिंग की आवश्यकता होती है।

## उत्पादन के लिए माइग्रेशन चेकलिस्ट

- डेस्कटॉप और मोबाइल में दृश्य समानता सत्यापित करें।
- निम्न-स्तरीय उपकरणों पर सीपीयू/जीपीयू प्रभाव को सत्यापित करें।
- सत्यापित करें कि कोई भी विकल्प कुंजी चुपचाप नजरअंदाज नहीं की जाती है।
- रिलीज़ सप्ताह से पहले सटीक पैकेज संस्करण पिन करें।

## कैनवास-कंफ़ेटी से `@tsparticles/confetti` पर स्थानांतरण

यदि आप `canvas-confetti` से माइग्रेट कर रहे हैं, तो सबसे आसान स्विच अनिवार्य कॉल को `@tsparticles/confetti` API कॉल से बदलना है।

## विशिष्ट मानचित्रण

- `confetti({...})` -> `await confetti({...})`
- कस्टम कैनवास -> `const local = await confetti.create(canvas, defaults)` फिर `await local({...})`
- बार-बार शॉट -> अपने मौजूदा टाइमर/लूप रखें, उन कॉलबैक में `await confetti(...)` पर कॉल करें

## उदाहरण रूपांतरण

पहले (`canvas-confetti` शैली):

```ts
import confetti from "canvas-confetti";

confetti({
  particleCount: 90,
  spread: 70,
  origin: { x: 0.5, y: 0.6 },
});
```

(`@tsparticles/confetti`) के बाद:

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 90,
  spread: 70,
  position: { x: 50, y: 60 },
});
```

## विकल्प नाम नोट्स

- `particleCount` -> `count`
- `origin.x`/`origin.y` `0..1` में -> `position.x`/`position.y` `0..100` में
- `startVelocity`, `spread`, `angle`, और `colors` समान शब्दार्थ रखते हैं

संपूर्ण एपीआई और सहायकों के लिए, देखें: <https://github.com/tsparticles/tsparticles/tree/main/bundles/confetti#readme>
