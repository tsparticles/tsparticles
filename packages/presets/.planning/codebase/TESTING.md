Testing and test structure

## Overview

This repository does not appear to have a centralized test suite in the root. Search for test directories or `jest`, `vitest`, or `mocha` references if tests exist.

What to look for

- Search `package.json` scripts for `test` commands
- Look for `test`, `__tests__`, or `spec` directories under packages

CI integration

- GitHub Actions workflows (`.github/workflows/nodejs.yml`) may run tests if configured

Current status

- No obvious centralized unit test framework present in the scanned files

Recommendations

- Add a lightweight test framework (Vitest or Jest) at root and enable package-level tests
- Add a `test` script in the root `package.json` that runs workspace tests
