# निर्भरता ग्राफ

यह मुख्य `tsParticles` README में प्रदर्शित पैकेज लेयरिंग का एक व्यावहारिक मानचित्र है।

संपूर्ण, विस्तृत ग्राफ़ के लिए देखें:

- <https://github.com/tsparticles/tsparticles/blob/main/README.md#dependency-graph>

## उच्च स्तरीय पैकेज प्रवाह

```text
tsParticles Engine
`- tsParticles Basic
   |- tsParticles Particles
   |- tsParticles Confetti
   |- tsParticles Fireworks
   `- tsParticles Slim
      `- tsparticles
         `- tsParticles All
```

## इस मानचित्र का उपयोग कैसे करें

- अधिकांश उत्पादन ऐप्स के लिए `engine` + `slim` से प्रारंभ करें।
- यदि आपको अतिरिक्त अंतर्निर्मित इंटरैक्शन/प्लगइन की आवश्यकता है तो `tsparticles` पर जाएं।
- `all` पर तभी जाएं जब आपको संपूर्ण सुविधा सेट की आवश्यकता हो।
- केंद्रित प्रभावों के लिए समर्पित बंडलों (`confetti`, `fireworks`, `particles`) का उपयोग करें।

## संबंधित पृष्ठ

- [`/guide/getting-started`](/hi/guide/getting-started)
- [`/guide/installation`](/hi/guide/installation)
- [`/options/performance`](/hi/options/performance)
