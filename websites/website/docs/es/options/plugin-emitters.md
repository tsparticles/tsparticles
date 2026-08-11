# Plugin Option: Emitters

`emitters` spawns particles dynamically and is plugin-driven.

## Example

```ts
emitters: {
  position: {
    x: 50,
    y: 50,
  },
  rate: {
    quantity: 5,
    delay: 0.2,
  },
}
```

## Notes

- Great for burst effects and dynamic particle generation.
- Keep emission rates balanced to avoid performance spikes.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Emitters.md>
