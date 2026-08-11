# शेप कैटलॉग

यह कैटलॉग `particles.shape.type` के सबसे सामान्य मान दिखाता है और बताता है कि कब `particles.shape.options` शेप-विशिष्ट नियंत्रण जोड़ता है।

स्रोत फोल्डर:

- <https://github.com/tsparticles/tsparticles/tree/main/shapes>
- शेप विकल्प संदर्भ: [`/options/particles-shape`](/hi/options/particles-shape)

## सामान्य शेप प्रकार

- `circle` (डिफॉल्ट, कोई अतिरिक्त शेप विकल्प नहीं)
- `square` / `edge` (कोई अतिरिक्त शेप विकल्प नहीं)
- `triangle` (कोई अतिरिक्त शेप विकल्प नहीं)
- `line` (कोई अतिरिक्त शेप विकल्प नहीं)
- `polygon` (`options.polygon.sides`)
- `star` (`options.star.sides`, `options.star.inset`)
- `text` (`options.text.value`, `font`, `weight`, `style`, `close`)
- `emoji` (`options.emoji.value`)
- `image` / `images` (`options.image.src`, `name`, `width`, `height`, `gif`, `replaceColor`, `close`)

## एलियास और बंडल नोट्स

- `square` और `edge` एक ही शेप के एलियास हैं।
- `character` और `char` एक ही विकल्प समूह के एलियास हैं।
- `image` और `images` एक ही विकल्प ऑब्जेक्ट का उपयोग करते हैं।
- अधिकांश उन्नत शेप के लिए `@tsparticles/slim` (या `@tsparticles/all`) या समर्पित शेप पैकेज चाहिए।

Start/Pause कंट्रोल और संपादन योग्य JSON के साथ इन्हें जल्दी जांचने के लिए [`/playground/shapes`](/hi/playground/shapes) का उपयोग करें।
