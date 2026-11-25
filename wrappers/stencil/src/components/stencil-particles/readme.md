# stencil-particles

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute      | Description                                                                                       | Type                                        | Default     |
| --------------------- | -------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------- | ----------- |
| `containerId`         | `container-id` |                                                                                                   | `string`                                    | `undefined` |
| `engine` _(required)_ | --             | Required engine instance used to create the container. This is a property, not an HTML attribute. | `Engine`                                    | `undefined` |
| `init`                | --             |                                                                                                   | `(engine: Engine) => void \| Promise<void>` | `undefined` |
| `options`             | --             |                                                                                                   | `IOptions`                                  | `undefined` |
| `theme`               | `theme`        |                                                                                                   | `string`                                    | `undefined` |
| `url`                 | `url`          |                                                                                                   | `string`                                    | `undefined` |

## Events

| Event             | Description                                                       | Type                                  |
| ----------------- | ----------------------------------------------------------------- | ------------------------------------- |
| `particlesLoaded` | Emitted after `engine.load()` completes; detail may be undefined. | `CustomEvent<Container \| undefined>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
