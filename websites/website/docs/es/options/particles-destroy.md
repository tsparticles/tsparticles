# Particles Destroy

`particles.destroy` controls what happens when particles are destroyed.

## Example

```ts
particles: {
  destroy: {
    mode: "split",
    split: {
      count: 2,
      factor: {
        value: 0.5,
      },
    },
  },
}
```

## Practical guidance

- Start with simple `mode` setups before complex split chains.
- Re-check performance when using large split counts.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Destroy.md>
