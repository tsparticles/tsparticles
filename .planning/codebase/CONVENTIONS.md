Coding conventions and style

## General conventions

- TypeScript is the primary language for library code; follow `tsconfig.json` and project lint rules
- Files under `src/` typically use camelCase for variables and PascalCase for exported classes/types

Linting and format

- ESLint config found at `presets/hyperspace/eslint.config.js`; root may rely on standard TypeScript lint rules
- No dedicated Prettier config found at root (search the repo if necessary)

Error handling patterns

- Presets are small and typically return configuration objects; error handling is minimal and usually handled at build/runtime in demos

Naming conventions

- Packages: kebab-case directories under `presets/` (e.g., `presets/hyperspace`)
- Source files: `index.ts`, `options.ts` used consistently in presets

Documentation and docstrings

- Typedoc configs present (`typedoc.json`), but inline JSDoc/TSDoc usage varies by package

Recommendations

- Standardize linting across packages by moving ESLint config to root
- Add a Prettier or formatting configuration to avoid style drift
