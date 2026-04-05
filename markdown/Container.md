# Particles Container

The {@link Container} class is the runtime manager of a single tsParticles instance.

You usually get a container from:

- {@link Engine.load | tsParticles.load}
- {@link Engine.loadJSON | tsParticles.loadJSON} (`then(container => ...)`)

You can also access loaded instances with:

- {@link Engine.items | tsParticles.items}
- {@link Engine.item | tsParticles.item(index)}

## Quick runtime example

```json
{
  "id": "tsparticles",
  "options": {
    "particles": {
      "move": {
        "enable": true
      }
    }
  }
}
```

After loading this configuration, you can control the container with `pause()` and `play()`.

## Main properties

- {@link Container.id}: container id, usually matching the target DOM element id
- {@link Container.options}: current live options
- {@link Container.sourceOptions}: original options used during construction
- {@link Container.particles}: particles manager (add/remove and runtime operations)

If you mutate `container.options` at runtime, call {@link Container.refresh | refresh()} to apply changes consistently.

## Main methods

- {@link Container.play | play()}: resume animation
- {@link Container.pause | pause()}: pause animation
- {@link Container.start | start()}: (re)start container with full initialization
- {@link Container.stop | stop()}: stop and cleanup runtime resources
- {@link Container.refresh | refresh()}: shortcut for `stop()` + `start()`
- {@link Container.destroy | destroy()}: destroy instance and release resources

## Export methods

- {@link Container.exportImage | exportImage(callback, type?, quality?)}: export the canvas image (without configured background)
- {@link Container.exportConfiguration | exportConfiguration()}: export current config as JSON string

## Themes

- {@link Container.loadTheme | loadTheme(name)}: apply a theme and reload options
- If `name` is `undefined`, the default theme is used (if configured)

## Related docs

- Options reference map: [Options](./Options.md)
- Color formats: [Color](./Color.md)
