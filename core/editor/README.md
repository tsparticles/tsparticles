# tsParticles options GUI editor

tsParticles options GUI editor made with [Object GUI](https://github.com/matteobruni/object-gui)

## Usage

```javascript
tsParticles
  .load("tsparticles", {
    /* your options here */
  })
  .then((container) => {
    showEditor(container).top().right().theme("dark");
  });
```

or

```javascript
tsParticles.loadJSON("tsparticles", "particles.json").then((container) => {
  showEditor(container).top().right().theme("dark");
});
```
