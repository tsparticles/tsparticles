# थीम्स

`themes` आपको नामित विकल्प सेट (उदाहरण के लिए प्रकाश और अंधेरा) परिभाषित करने और रनटाइम पर स्विच करने की सुविधा देता है।

## उदाहरण

```ts
themes: [
  {
    name: "dark",
    default: {
      value: true,
      mode: "dark",
    },
    options: {
      background: {
        color: "#000000",
      },
    },
  },
  {
    name: "light",
    default: {
      value: true,
      mode: "light",
    },
    options: {
      background: {
        color: "#ffffff",
      },
    },
  },
];
```

## व्यावहारिक मार्गदर्शन

- एक स्थिर आधार विकल्प वस्तु रखें।
- केवल वही ओवरराइड करें जो प्रति थीम भिन्न हो।
- ऐप-स्तरीय डार्क मोड स्थिति के साथ युग्मित करें।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Themes.md>
