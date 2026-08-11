# कण जीवन

`particles.life` प्रति कण जीवनचक्र गणना और अवधि को नियंत्रित करता है।

## उदाहरण

```ts
particles: {
  life: {
    count: 2,
    duration: {
      value: {
        min: 2,
        max: 5,
      },
    },
  },
}
```

- `count`: प्रत्येक कण में कितने जीवन चक्र होते हैं।
- `duration`: प्रत्येक चक्र कितने समय तक चलता है।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Life.md>
