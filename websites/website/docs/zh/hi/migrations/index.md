# Versioning & Migration

`tsParticles` के मुख्य वर्जनों के बीच नेविगेट करने, रिलीज़ ट्रैक करने और वर्जनिंग समझने के लिए इस सेक्शन का उपयोग करें।

## माइग्रेशन गाइड

- [`v3.x से माइग्रेट करें`](/hi/migrations/from-v3)
- [`v2.x से माइग्रेट करें`](/hi/migrations/from-v2)
- [`v1.x से माइग्रेट करें`](/hi/migrations/from-v1)

## त्वरित मार्ग

- `v3.x` से: [`/hi/migrations/from-v3`](/hi/migrations/from-v3) से शुरू करें (फोकस: option key changes + package renames)।
- `v2.x` से: [`/hi/migrations/from-v2`](/hi/migrations/from-v2) से शुरू करें (फोकस: `load(...)` API + options)।
- `v1.x` से: [`/hi/migrations/from-v1`](/hi/migrations/from-v1) से शुरू करें (फोकस: packages, loaders, options)।

## माइग्रेशन आमतौर पर कहाँ टूटता है

अधिकांश मेजर वर्जन माइग्रेशन दो जगहों पर टूटते हैं:

1. **Load API आकार** (पुराने positional params vs नए object params)।
2. **Options schema** (नाम बदले/स्थानांतरित keys)।

अगर आपकी app compile होती है लेकिन गलत render करती है, तो option mappings से शुरू करें।

## त्वरित खोज

- [Option Rename Matrix](/hi/migrations/option-rename-matrix) — legacy और current option keys का त्वरित मैपिंग।

## उपयोगी भी

- [Changelog](/hi/migrations/changelog) — नवीनतम रिलीज़ नोट्स।
- [Releases और Versioning](/hi/migrations/releases) — वर्जन अलाइनमेंट नियम और रिलीज़ चेकलिस्ट।
- [particles.js माइग्रेशन](/hi/migrations/particles-js) — legacy `particles.js` या `canvas-confetti` से माइग्रेट करना।
