# Plugin Option: Responsive

`responsive` lets you define configuration overrides that apply when the canvas or screen width is below a threshold.

## Example

```ts
responsive: [
  {
    maxWidth: 600,
    mode: "canvas",
    options: {
      particles: {
        number: { value: 30 },
      },
    },
  },
];
```

## Notes

- `maxWidth` is compared against canvas or screen width depending on `mode`.
- Multiple responsive rules can be stacked for different breakpoints.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Responsive.md>
