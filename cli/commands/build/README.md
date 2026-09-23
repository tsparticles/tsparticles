[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles CLI

## Installation

### NPM

```bash
npm install -g @tsparticles/cli-build
```

### Yarn

```bash
yarn global add @tsparticles/cli-build
```

### PNPM

```bash
pnpm global add @tsparticles/cli-build
```

## Usage

### Help

```bash
npx @tsparticles/cli-build --help
```

or

```bash
tsparticles-build --help
```

### Build

```bash
npx @tsparticles/cli-build
```

or

```bash
tsparticles-build
```

### Build options

```bash
tsparticles-build
tsparticles-build --clean --lint --tsc
tsparticles-build --bundle-webpack
tsparticles-build --bundle-rollup
tsparticles-build --bundle-rolldown
```

### Verify in this workspace

From the `cli` root, these commands validate the Nx integration end-to-end:

```bash
pnpm nx show project @tsparticles/cli-command-build --json
pnpm nx run @tsparticles/cli-command-build:tsc
pnpm nx run @tsparticles/cli-command-build:test
pnpm run build
```
