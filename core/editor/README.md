# tsParticles editor

tsParticles editor

## Usage

```javascript
tsParticles
  .load("tsparticles", {
    /* your options here */
  })
  .then((container) => {
    createEditor(container);
  });
```

or

```javascript
tsParticles.loadJSON("tsparticles", "particles.json").then((container) => {
  createEditor(container);
});
```
