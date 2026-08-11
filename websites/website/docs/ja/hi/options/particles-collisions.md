# कणों का टकराव

`particles.collisions` कण-से-कण टकराव व्यवहार को नियंत्रित करता है।

## उदाहरण

```ts
particles: {
  collisions: {
    enable: true,
    mode: "bounce",
  },
}
```

- `enable`: टकराव सक्रिय करता है।
- `mode`: टकराव व्यवहार (`bounce` सबसे आम है)।

## प्रदर्शन युक्ति

उच्च कण गणना पर टकराव महंगा हो सकता है। पहले `particles.number` के साथ ट्यून करें।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Collisions.md>
