*This file is still Work in Progress*

# Start development

Before you can start making changes, it's mandatory to run a `lerna bootstrap` for installing all the dependencies.

After that, you can start coding. Here is the folder layout

- `demo` is where all the demo apps are present.
- `engine` is the main source folder.
- `interactions` contains some additional interaction plugins.
- `paths` contains some additional path plugins.
- `plugins` contains some additional plugins (for now, just infection, but more will be coming).
- `shapes` contains some additional shape plugins.
- `updaters` contains some additional updater plugins.

The `plugins` folder contains all external presets and shapes.

Once done editing, you can check if everything builds running `lerna run build`.

The difference is, the first does not create the docs folder, and it might be unnecessary while coding.

For building the first time:

Unix

```shell
pnpm i && npx lerna run build
```

Windows

```shell
pnpm i
npx lerna run build
```

For building local packages it's possible to run only `pnpm run build` in every folder with a package.json file

For running demos

```shell
pnpm run start
```

or

```shell
pnpm run serve
```

where the start commands returns an error (this could be another improvement)

## Testing

There's a `demo` folder where you can find some demo apps used for testing configurations.

---

# Pull Requests

**Before opening any pull request, check that `lerna run build` completes**

*The build task will be performed automatically by the CI\CD, but a first local check should be done*

If you want to contribute to the project, please use *v2* or *v3* as the base branch, *v2* is the current release, *v3* is what is coming in *v3*.

Use *main* branch **ONLY** for critical bug fixes.

Once done, create the **Pull Request** to *v2* or *v3* branch. If it's a critical bug fix, use *main*.

## Branches

### *v1*

This branch is the version 1 branch, it's not active, it's there only for historical purpose.

### *v2*

This branch is the version 2 branch, the actual release. It will be closed once version 3 will be released.

### *v3*

This branch is the main development branch, and it has the lowest priority branch under CI.

This branch should always build. Sometimes it can be necessary to break this rule. This is why it is **should** and not **must**.

### *main*
This is the production branch.

**This must be used for PR only for critical bug fixes** and always **MUST** build.

Changes to README.md or other markdown files are not priorities. So for these changes, use *dev* or *staging*, and they will be implemented in the next release.

### *every other branch* except *gh-pages*
You can create any branch you want to push & any kind of commits.

There are no rules in the CI for all the other branches.

Once ready, if you need to implement the product.**Follow the rules below.**

# Backward compatibility

Remember to keep the backward compatibility with previous versions. If a change breaks this rule **it must** be discussed.

You can mark them as obsolete old methods, but they **must** work too. **Deprecating is not breaking**.

---

# Community

Feel free to join the Discord community to talk about the project. It's easier to share ideas if we can talk directly.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme)

---

Happy coding to everyone!
