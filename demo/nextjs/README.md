# React Next.js Demo

Demo app for `@tsparticles/nextjs` using Next.js App Router.

## Scripts

```bash
pnpm run dev
pnpm run lint
pnpm run build
pnpm run start
```

## Notes

- `app/providers.tsx` mounts `NextParticlesProvider` and runs async init once.
- `app/particles.tsx` renders `NextParticles` with client-only safety.
- `pages/api/hello.ts` remains as API route sample.
