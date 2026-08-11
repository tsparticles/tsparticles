# अन्तरक्रियाशीलता

`interactivity` विकल्प परिभाषित करते हैं कि कण होवर/क्लिक पर कैसे प्रतिक्रिया करते हैं।

केंद्रित संदर्भों के लिए:

- [`Interactivity Click`](/hi/options/interactivity-click)
- [`Interactivity Hover`](/hi/options/interactivity-hover)
- [`Interactivity Div`](/hi/options/interactivity-div)
- [`Interactivity Events`](/hi/options/interactivity-events)
- [`Interactivity Modes`](/hi/options/interactivity-modes)

## आधार संरचना

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"]
    },
    onClick: {
      enable: true,
      mode: ["push", "repulse"]
    }
  },
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45
      }
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2
    },
    push: {
      quantity: 6
    },
    repulse: {
      distance: 130,
      duration: 0.35
    }
  }
}
```

## सर्वाधिक उपयोग की जाने वाली घटनाएँ

- `onHover`: उपयोगकर्ताओं के लिए तत्काल प्रतिक्रिया।
- `onClick`: विस्फोट या लक्षित कार्रवाई।
- `resize`: विंडो आकार बदलने पर कैनवास व्यवहार को सुसंगत रखता है।
- `onDiv`: विशिष्ट तत्वों पर लक्षित इंटरैक्शन।

## सर्वोत्तम अभ्यास

- लो-एंड डिवाइस पर एक साथ बहुत सारे मोड सक्षम करने से बचें।
- प्रदर्शन में उछाल से बचने के लिए `distance` को मध्यम रखें।
- यदि प्रभाव भारी है, तो `Start/Pause` के साथ मैन्युअल नियंत्रण का उपयोग करें।

## विस्तृत संदर्भ

- क्लिक करें: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- होवर: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- प्रभाग: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
