# WordPress Demo Notes

This repository does not include a runnable `demo/wordpress` application like the other framework demos.

The WordPress wrapper is distributed as a WordPress plugin (`@tsparticles/wordpress`) and must run inside a WordPress installation.

## Why there is no standalone demo

- The wrapper depends on the WordPress block editor/runtime.
- It cannot be executed as a plain Vite/React/vanilla app from this monorepo.

## How to test it locally

From the repository root:

```bash
pnpm i
pnpm run build
pnpm --filter @tsparticles/wordpress run build
```

Then load the plugin in a local WordPress instance from:

- `wrappers/wordpress/`

Useful wrapper files:

- Plugin entry: `wrappers/wordpress/wordpress-particles.php`
- WordPress readme: `wrappers/wordpress/readme.txt`

## Related docs

- tsParticles docs: <https://particles.js.org/docs/>
- Wrapper package: `wrappers/wordpress/package.json`
