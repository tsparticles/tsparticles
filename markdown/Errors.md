# Errors

**tsParticles** reports failures through stable error **codes** instead of embedding full message
strings in every delivered bundle.

- Errors raised by the engine and by browser-shipping feature packages go through
  `getErrorMessage()` with stable `TSP-xxxx` codes.
- **Non-minified / development builds** throw the full formatted message, e.g.
  `Invalid HDR "peakNits" value: expected a positive number, got "NaN"`.
- **Minified / production builds** throw a compact message plus a link to the reference page:
  `[tsParticles Error TSP-1203] https://particles.js.org/errors/#TSP-1203`.

The full catalog (engine, shapes, plugins, interactions) lives on the
[Errors reference page](https://particles.js.org/errors/). Codes are stable across releases; the
first digits identify the area (`TSP-100x` engine core, `TSP-200x` image shape, `TSP-300x`
polygon-mask plugin, and so on).

## Adding a new error code

Feature packages own a local `ErrorCodes.ts` + `ErrorMessages.ts` and register their catalog at load
time, right after `engine.checkVersion()`:

```ts
import { addErrorMessages } from "@tsparticles/engine";

addErrorMessages(ErrorMessages);
```

Keep the code unique and never reuse one after a release. Register from both `index.ts` and
`index.lazy.ts` entry points and update the reference page when the code ships.
