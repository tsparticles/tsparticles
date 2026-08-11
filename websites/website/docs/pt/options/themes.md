# Themes

`themes` lets you define named option sets (for example light and dark) and switch at runtime.

## Example

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

## Practical guidance

- Keep a stable base options object.
- Override only what differs per theme.
- Pair with app-level dark mode state.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Themes.md>
