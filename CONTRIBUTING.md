*This file is still Work in Progress*

# Start development

Before you can start making changes, it's mandatory to run a `lerna bootstrap` for installing all the dependencies.

After that, you can start coding. Here is the folder layout

- `components` is where all the third party components are present (React, Vue, etc.)
- `demo` is where all the demo apps are present.
- `editor` is the source of the GUI editor.
- `engine` is the main source folder.
- `interactions` contains some additional interaction plugins.
- `paths` contains some additional path plugins.
- `plugins` contains some additional plugins (for now, just infection, but more will be coming).
- `presets` contains some option presets with their bundle, ready to be used.
- `shapes` contains some additional shape plugins.
- `updaters` contains some additional updater plugins.
- `website` contains the website source.

The `components` folder contains all the javascript frameworks & components built around tsParticles: Angular, jQuery, Preact, React, Vue.

The `plugins` folder contains all external presets and shapes.

Once done editing, you can check if everything builds running `lerna run build`.

The difference is, the first does not create the docs folder, and it might be unnecessary while coding.

For building the first time:

Unix

```shell
yarn && npx lerna bootstrap && npx lerna run build
```

Windows

```shell
yarn
npx lerna bootstrap
npx lerna run build
```

For building local packages it's possible to run only `yarn build` in every folder with a package.json file

For running demos

```shell
yarn start
```

or

```shell
yarn serve
```

where the start commands returns an error (this could be another improvement)

## Testing

The `components` and `plugins` all plugins, components and engines have a demo app or page.

A demo folder has been created with all the demo apps needed.

---

# Pull Requests

**Before opening any pull request, check that `lerna run build` completes**

*The build task will be performed automatically by the CI\CD, but a first local check should be done*

If you want to contribute to the project, please use *v1* or *dev* as the base branch, *v1* is the current release, *dev* is what is coming in *v2*.

Use *main* branch **ONLY** for critical bug fixes.

Once done, create the **Pull Request** to *v1* or *dev* branch. If it's a critical bug fix, use *main*.

## Branches

### *v1*

This branch is the main version 1 development branch, it's going to be deprecated once the version 2 will be released officially.

### *dev*
This branch is the main development branch, and it has the lowest priority branch under CI.

This branch should always build. Sometimes it can be necessary to break this rule. This is why it is **should** and not **must**.
 
### *next*
This branch is for testing the version 2 before being released officially.

This branch is the one used to make PR to *main*, so this branch **MUST** build.

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

Feel free to join the Slack community to talk about the project. It's easier to share ideas if we can talk directly.

[![Slack](https://cdn.brandfolder.io/5H442O3W/as/pl546j-7le8zk-5guop3/Slack_RGB.auto?width=94&height=38)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI)

---

Happy coding to everyone!
