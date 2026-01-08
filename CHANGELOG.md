# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.0.0-alpha.2](https://github.com/tsparticles/tsparticles/compare/v4.0.0-alpha.1...v4.0.0-alpha.2) (2026-01-08)

### Bug Fixes

- fixed install script, now it's a module ([7a80a88](https://github.com/tsparticles/tsparticles/commit/7a80a880fe3a649199fa912dbea31e4ee45e9689))

# [4.0.0-alpha.1](https://github.com/tsparticles/tsparticles/compare/v4.0.0-alpha.0...v4.0.0-alpha.1) (2026-01-08)

**Note:** Version bump only for package @tsparticles/workspace

# [4.0.0-alpha.0](https://github.com/tsparticles/tsparticles/compare/v3.9.1...v4.0.0-alpha.0) (2026-01-07)

### Bug Fixes

- fix 5524 ([4459f09](https://github.com/tsparticles/tsparticles/commit/4459f09de1393d2f478612e3ff1089cb10f6e76a))
- fixed issue [#5539](https://github.com/tsparticles/tsparticles/issues/5539), now shapes know when a fill function or a stroke function is needed ([cb616d3](https://github.com/tsparticles/tsparticles/commit/cb616d3d489ba65304d1f1b657d556807674567a))
- fixed issue with groups and density calculation ([eb2e20a](https://github.com/tsparticles/tsparticles/commit/eb2e20a28ae1a87d02cfbcffd3454a11f73ef2c4))
- fixed issue with the refactoring ([dd1fa73](https://github.com/tsparticles/tsparticles/commit/dd1fa7392ad3146f2ad9277da4dcf632ae0d8c6e))
- fixed rotation movement when angle was 0 ([6d02bfb](https://github.com/tsparticles/tsparticles/commit/6d02bfb69b03c111d21af7d1727338ba46272829))

### Features

- added hdr feature full implementation, colors are now hdr ready ([aee509f](https://github.com/tsparticles/tsparticles/commit/aee509fec97eed1a84c6809f73ce6a42ad19da6a))
- added hdr option, with fallback if not supported by the screen ([f42dc31](https://github.com/tsparticles/tsparticles/commit/f42dc31b8ba4e82eb04a465ebcf2bf77f041a5e0))
- added new falling confetti to demo configs ([a43767b](https://github.com/tsparticles/tsparticles/commit/a43767b71f9a4213080f35d31fe70a8f0b420f52))
- improved fireworks demo configs ([71473ec](https://github.com/tsparticles/tsparticles/commit/71473ecb48e454613d01598709dac303ae017ef9))
- improved hdr management, improved also big particles config ([92af429](https://github.com/tsparticles/tsparticles/commit/92af429a2c18976267579cc732492dbb7cb3f67a))
- using p3 (hdr) images in configs (except gifs) ([3989373](https://github.com/tsparticles/tsparticles/commit/39893734cb9fa86e0631a2516ec50e66a43012f6))

## [3.9.1](https://github.com/tsparticles/tsparticles/compare/v3.9.0...v3.9.1) (2025-08-03)

**Note:** Version bump only for package @tsparticles/workspace

# [3.9.0](https://github.com/tsparticles/tsparticles/compare/v3.8.1...v3.9.0) (2025-08-01)

### Bug Fixes

- fixed issue [#5497](https://github.com/tsparticles/tsparticles/issues/5497) ([e838665](https://github.com/tsparticles/tsparticles/commit/e8386659c6926b8b4abc951f292c358776dce530))
- fixed motion plugin ([00278a1](https://github.com/tsparticles/tsparticles/commit/00278a129374d17ad33ede2dd701cc9344b83d50))
- fixed motion plugin ([643266c](https://github.com/tsparticles/tsparticles/commit/643266ce16c716fcf265997eff33f57f8c9f2f16))
- fixed motion plugin, and its implementations in other plugins ([aa6edc9](https://github.com/tsparticles/tsparticles/commit/aa6edc94efee6cf2372f893bb20887c423693c3a))
- fixed some issues in groups, some things are still not working ([75fb526](https://github.com/tsparticles/tsparticles/commit/75fb526bcf5e264735c73eab618a0a6727b24adc))
- updated pnpm in actions ([e9e5f9d](https://github.com/tsparticles/tsparticles/commit/e9e5f9df4946adac650c1e2ff5e317cd4b77dd8a))
- updated pnpm in actions ([321fe7c](https://github.com/tsparticles/tsparticles/commit/321fe7cc5d7405f2a360ba8f579d4560dac97a33))

### Features

- added new fractal noise path, fractal and smooth value noise libs ([6cc1b6a](https://github.com/tsparticles/tsparticles/commit/6cc1b6affb3bc713257d5729d05321821c06046c))
- updated fractal noise path with 4d noise ([8c22552](https://github.com/tsparticles/tsparticles/commit/8c225529e9094d8d575abf9cf8d7e2755d11fc05))

## [3.8.1](https://github.com/tsparticles/tsparticles/compare/v3.8.0...v3.8.1) (2025-01-31)

### Bug Fixes

- fixed z-index style when fullScreen is active, closes [#5458](https://github.com/tsparticles/tsparticles/issues/5458) ([5e94ca4](https://github.com/tsparticles/tsparticles/commit/5e94ca41565c388bed275cd7d70d894d32ba506e))

# [3.8.0](https://github.com/tsparticles/tsparticles/compare/v3.7.3...v3.8.0) (2025-01-23)

### Bug Fixes

- fixed clone style, closes [#5443](https://github.com/tsparticles/tsparticles/issues/5443) ([2127236](https://github.com/tsparticles/tsparticles/commit/21272366d002d78ba801ff17262f46b474381e1d))
- fixed imports and constants ([caaf603](https://github.com/tsparticles/tsparticles/commit/caaf603932fb64de5c34bc075e0bbf2fb7821818))
- fixed style reparation and full screen toggle issues ([3e4a03a](https://github.com/tsparticles/tsparticles/commit/3e4a03a0c6662873088787502e9c1ee98c8473ca))
- improved spin initial positioning ([43edbbf](https://github.com/tsparticles/tsparticles/commit/43edbbf7e1f58137c3996be2dfbfbc3c5a930ba8))
- improved style duplication ([55a8425](https://github.com/tsparticles/tsparticles/commit/55a84255b013ca6b08b77ef38ba2a1d4a19a0fca))

## [3.7.3](https://github.com/tsparticles/tsparticles/compare/v3.7.2...v3.7.3) (2024-12-13)

### Bug Fixes

- fixed some configs ([b421f4c](https://github.com/tsparticles/tsparticles/commit/b421f4c6a6f3fa42970a3a043e391075788c4b86))

## [3.7.2](https://github.com/tsparticles/tsparticles/compare/v3.7.1...v3.7.2) (2024-11-26)

### Bug Fixes

- fixed light preset ([b621cce](https://github.com/tsparticles/tsparticles/commit/b621cce7d9409676152fa3a4e697137d17420703))

## [3.7.1](https://github.com/tsparticles/tsparticles/compare/v3.7.0...v3.7.1) (2024-11-24)

### Bug Fixes

- fix resize issues introduced in 3.7.0 with the new size variable ([41b507f](https://github.com/tsparticles/tsparticles/commit/41b507f6fc638a4ce77614621d9300ed7099ebce))
- fixed resize issue in canvas ([e7c816c](https://github.com/tsparticles/tsparticles/commit/e7c816ced7d99c0cb84c79675a0771cd4b833705))

# [3.7.0](https://github.com/tsparticles/tsparticles/compare/v3.6.0...v3.7.0) (2024-11-24)

### Bug Fixes

- fixed issue in Firefox that caused the canvas to expand each frame ([628a05d](https://github.com/tsparticles/tsparticles/commit/628a05d59786240e5f9a796262847b6f8a27681e))

### Features

- added new named color plugin, and hex color in the engine ([c4db774](https://github.com/tsparticles/tsparticles/commit/c4db7745f54fe808e20af2bdf4c0469c1aa40755))

# [3.6.0](https://github.com/tsparticles/tsparticles/compare/v3.6.0-beta.1...v3.6.0) (2024-11-18)

### Bug Fixes

- fixed color syntaxes, fixes [#5409](https://github.com/tsparticles/tsparticles/issues/5409) ([f3c976f](https://github.com/tsparticles/tsparticles/commit/f3c976f451c5bc6a37338cba0cc1ce80c4e9b137))

### Features

- added isNull function, more secure checks ([891e2a2](https://github.com/tsparticles/tsparticles/commit/891e2a25fb64b7f89ce0c75dbe49bd0b28d9a72d))
- first try of oklch color, fixes [#5409](https://github.com/tsparticles/tsparticles/issues/5409) ([5822e72](https://github.com/tsparticles/tsparticles/commit/5822e72cdf0a74de6b4bdaa90f3f4a8527dc4d6b))
- fixed oklch color, added lch color too, fixes [#5409](https://github.com/tsparticles/tsparticles/issues/5409) ([d604691](https://github.com/tsparticles/tsparticles/commit/d604691d3bb175e8c615fe1523e73487a036d7ae))

# [3.6.0-beta.1](https://github.com/tsparticles/tsparticles/compare/v3.6.0-beta.0...v3.6.0-beta.1) (2024-10-13)

### Bug Fixes

- fixed fireworks new method, was missing a thing ([3e693e7](https://github.com/tsparticles/tsparticles/commit/3e693e7c8e733392b1ab9e3ffa53cf169876b967))
- fixed fireworks new method, was missing a thing, updated docs too ([28333fa](https://github.com/tsparticles/tsparticles/commit/28333faeac507334071279bee9706730f57adc1e))

### Features

- added .create function to fireworks library, like confetti, to use a custom canvas ([d4e072e](https://github.com/tsparticles/tsparticles/commit/d4e072efdeaebc585d8248d59620534f56b222ad))

# [3.6.0-beta.0](https://github.com/tsparticles/tsparticles/compare/v3.5.0...v3.6.0-beta.0) (2024-10-07)

### Bug Fixes

- fixed issue with out modes ([85ba20f](https://github.com/tsparticles/tsparticles/commit/85ba20f4004eed3ceb84bcf5333025c8fec5d81f))
- fixed issue with removing particles when group is active, fixes [#5352](https://github.com/tsparticles/tsparticles/issues/5352) ([af57352](https://github.com/tsparticles/tsparticles/commit/af57352b3c8e5646fa2c8e784b78698c7e2c9186))

### Features

- added padding options to emoji shape, fixes [#5402](https://github.com/tsparticles/tsparticles/issues/5402) ([2a2638f](https://github.com/tsparticles/tsparticles/commit/2a2638f575cb142311927997a8ebffb25d3049ea))

# [3.6.0](https://github.com/tsparticles/tsparticles/compare/v3.5.0...v3.6.0) (2024-10-07)

### Bug Fixes

- fixed issue with out modes ([85ba20f](https://github.com/tsparticles/tsparticles/commit/85ba20f4004eed3ceb84bcf5333025c8fec5d81f))
- fixed issue with removing particles when group is active, fixes [#5352](https://github.com/tsparticles/tsparticles/issues/5352) ([af57352](https://github.com/tsparticles/tsparticles/commit/af57352b3c8e5646fa2c8e784b78698c7e2c9186))

### Features

- added padding options to emoji shape, fixes [#5402](https://github.com/tsparticles/tsparticles/issues/5402) ([2a2638f](https://github.com/tsparticles/tsparticles/commit/2a2638f575cb142311927997a8ebffb25d3049ea))

# [3.5.0](https://github.com/tsparticles/tsparticles/compare/v3.4.0...v3.5.0) (2024-07-01)

### Features

- added customization for animation loop, fixes [#5355](https://github.com/tsparticles/tsparticles/issues/5355) ([76d9dfd](https://github.com/tsparticles/tsparticles/commit/76d9dfd56b51c05a82d60bce13157f020df547c9))

# [3.4.0](https://github.com/tsparticles/tsparticles/compare/v3.3.0...v3.4.0) (2024-05-12)

### Bug Fixes

- fixed issue [#5338](https://github.com/tsparticles/tsparticles/issues/5338) ([1929d9a](https://github.com/tsparticles/tsparticles/commit/1929d9a3e86fff5b93178a1c11ec01bd9a52ca8b))
- fixed tests ([c88a3f4](https://github.com/tsparticles/tsparticles/commit/c88a3f4d2b7142f9f8a747a3d572affd86721024))
- improved trail effect and tilt ([2892549](https://github.com/tsparticles/tsparticles/commit/2892549d3f1cde8192e641c9221afc551afd5d06))

### Features

- added infinity shape ([935368b](https://github.com/tsparticles/tsparticles/commit/935368b88ad77495b3b17477ab7093e130623844))
- changed bundles loading method, no more preloading plugins ([13b00a0](https://github.com/tsparticles/tsparticles/commit/13b00a03b327fd547014a99f8cbc8ced228f31c8))

# [3.3.0](https://github.com/tsparticles/tsparticles/compare/v3.2.2...v3.3.0) (2024-02-27)

### Bug Fixes

- fixed issues in Chrome with async rAF function, reduced async methods for vite builds ([2600f6f](https://github.com/tsparticles/tsparticles/commit/2600f6f69917895ab80f9a55b1f5168d587adac6))

## [3.2.2](https://github.com/tsparticles/tsparticles/compare/v3.2.1...v3.2.2) (2024-02-20)

### Bug Fixes

- fixed circular deps detection and other issues with dynamic imports ([b6ed5d3](https://github.com/tsparticles/tsparticles/commit/b6ed5d3eaa41e0ad50c55807e1ec6439eeacd0c1))

## [3.2.1](https://github.com/tsparticles/tsparticles/compare/v3.2.0...v3.2.1) (2024-01-31)

**Note:** Version bump only for package @tsparticles/workspace

# [3.2.0](https://github.com/tsparticles/tsparticles/compare/v3.1.0...v3.2.0) (2024-01-31)

### Bug Fixes

- fixed gif images ([24d92fa](https://github.com/tsparticles/tsparticles/commit/24d92fab5d2e7df3a30bc0f621c046017bdf67a3))

### Features

- added background mask image support ([0b30b1c](https://github.com/tsparticles/tsparticles/commit/0b30b1c122bc9546727fd66d1e9393c1e05b643e))
- added new particle external interaction ([f51ce7f](https://github.com/tsparticles/tsparticles/commit/f51ce7f104fa930fc68a257b64bbe8cf65fb9794))
- added some dynamic imports, plugins will be loaded only if used ([6dab9e9](https://github.com/tsparticles/tsparticles/commit/6dab9e9b059739144c542cee22849327894c0340))
- improving dynamic imports ([bb4bc91](https://github.com/tsparticles/tsparticles/commit/bb4bc916052cf206b6e1deacac1f99d2fb160355))
- improving dynamic imports ([5a89f53](https://github.com/tsparticles/tsparticles/commit/5a89f53b93e7ba81e0773f553edca586afea4cd4))
- improving dynamic imports ([f05c2ee](https://github.com/tsparticles/tsparticles/commit/f05c2ee643978b6ed4abe8c4a54d0c3cc29727a8))
- improving dynamic imports ([f9f450d](https://github.com/tsparticles/tsparticles/commit/f9f450d438d0cc3e5710ec5c1977516fb94c6f21))
- improving dynamic imports ([c592b29](https://github.com/tsparticles/tsparticles/commit/c592b2995a3cdf6864dcc331402023373c79107d))
- improving dynamic imports ([0224706](https://github.com/tsparticles/tsparticles/commit/022470681ca6325f3d8085361e1cb47e1d58639c))
- improving dynamic imports ([f01a44b](https://github.com/tsparticles/tsparticles/commit/f01a44b22240ece1575cc431da8ca5902268fd2f))
- improving dynamic imports ([7674ee3](https://github.com/tsparticles/tsparticles/commit/7674ee37c0db306afd1338ae0bcba764cc11d5f5))

# [3.1.0](https://github.com/tsparticles/tsparticles/compare/v3.0.3...v3.1.0) (2024-01-13)

### Bug Fixes

- fixed memory allocation of emoji shape ([3d84380](https://github.com/tsparticles/tsparticles/commit/3d84380b45cbbc3f01d39deb069d37ce54268c68))
- fixed sounds in fireworks bundle ([ed77e79](https://github.com/tsparticles/tsparticles/commit/ed77e79521a73dc30ce5a7517ea8cf54b72f1f78))
- improved support for element id ([54a1683](https://github.com/tsparticles/tsparticles/commit/54a1683cfe05b8809f5ee7941f920cc1e9a13f07))

### Features

- added mute/unmute functions to sound plugin for an easier control of the volume ([b2169ef](https://github.com/tsparticles/tsparticles/commit/b2169ef5b24ab38295294ea77dd5e2549f9558df))
- added new options for sounds plugin, autoPlay and icons.enable ([cfc6ab8](https://github.com/tsparticles/tsparticles/commit/cfc6ab89799a71c5957fb478d63b0b6d69207a78))
- added new zig-zag path ([48bc5d1](https://github.com/tsparticles/tsparticles/commit/48bc5d16324989faab1830976b968c054c2003eb))
- added poisson disc plugin for better particles initial positions ([405f1df](https://github.com/tsparticles/tsparticles/commit/405f1dff34c380f576b2676cab8296e25b5d4e1f))
- improved first pointerdown/touchstart event listener for better autoplay ([34db125](https://github.com/tsparticles/tsparticles/commit/34db1258641242afee229ab9cdbd90ad1f620f43))

## [3.0.3](https://github.com/tsparticles/tsparticles/compare/v3.0.2...v3.0.3) (2023-12-26)

### Bug Fixes

- used element id when present and fixed emoji memory management ([1990bbc](https://github.com/tsparticles/tsparticles/commit/1990bbcd9079366db7ec3dedf4477ba43d2c47cf))

## [3.0.2](https://github.com/tsparticles/tsparticles/compare/v3.0.1...v3.0.2) (2023-12-06)

### Bug Fixes

- fixed trails config ([a20546e](https://github.com/tsparticles/tsparticles/commit/a20546e6968f2746788422c07a40683850568221))

## [3.0.1](https://github.com/tsparticles/tsparticles/compare/v3.0.0...v3.0.1) (2023-12-06)

### Bug Fixes

- fixed bug when using particles groups ([d8b840d](https://github.com/tsparticles/tsparticles/commit/d8b840d30a591a6febc65fbfeb74b8588f7af9c2))

# [3.0.0](https://github.com/tsparticles/tsparticles/compare/v3.0.0-beta.5...v3.0.0) (2023-12-04)

### Bug Fixes

- fixed new trail with rotated or tilted particles ([a43f809](https://github.com/tsparticles/tsparticles/commit/a43f8093204e46b2f22404960459aa0a114708c8))

### Features

- added clear flag, enabled by default, if disabled, the canvas won't be cleared ([299784c](https://github.com/tsparticles/tsparticles/commit/299784c0fc8b346646e5c6466a101c5b1b3cca89))
- added fade to trail effect ([17750ea](https://github.com/tsparticles/tsparticles/commit/17750eacdf86de208b2e723decc2ffb65521474b))

# [3.0.0-beta.5](https://github.com/tsparticles/tsparticles/compare/v3.0.0-beta.4...v3.0.0-beta.5) (2023-12-03)

### Features

- added new emoji shape, better performance than text shape ([868ee4d](https://github.com/tsparticles/tsparticles/commit/868ee4d8034e3ceb1402a5d67151b1e911e7409f))

# [3.0.0-beta.4](https://github.com/tsparticles/tsparticles/compare/v3.0.0-beta.3...v3.0.0-beta.4) (2023-11-16)

### Bug Fixes

- fixed color animation issue, regression introduced with a previous commit ([b6a423d](https://github.com/tsparticles/tsparticles/commit/b6a423d562430fced5d3b1ca0b7a21a5cbea1569))
- fixed emitters canvas shape ([863f8ab](https://github.com/tsparticles/tsparticles/commit/863f8ab91eb8f0423eaa731864fa3862af558e52))

### Features

- add more options for customizing noises values ([cbc620c](https://github.com/tsparticles/tsparticles/commit/cbc620c99a4ed30794c6ed8906ff292675089bc8))
- added curl noise path plugin ([3d40e98](https://github.com/tsparticles/tsparticles/commit/3d40e98d4d830c4b813ca3b2f8f57095e8f73ff2))
- added flat options to tsparticles-confetti options ([dff6c75](https://github.com/tsparticles/tsparticles/commit/dff6c7590c5a844e34547513637c8ad0f13a3d66))
- added trail effect plugin ([af69e9f](https://github.com/tsparticles/tsparticles/commit/af69e9f810d7c33f10902c2386fbbc6f3df2331e))
- removed multiline text shape, implemented in standard text shape ([d48d911](https://github.com/tsparticles/tsparticles/commit/d48d9116f910da987075d64e31cd3b8eecd46fe0))

# [3.0.0-beta.3](https://github.com/tsparticles/tsparticles/compare/v3.0.0-beta.2...v3.0.0-beta.3) (2023-09-20)

**Note:** Version bump only for package @tsparticles/workspace

# [3.0.0-beta.2](https://github.com/tsparticles/tsparticles/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2023-09-11)

### Bug Fixes

- fixed issue with particle destroy ([86d2f8f](https://github.com/tsparticles/tsparticles/commit/86d2f8f14c7b05b04018cb68b5e40c0547deccf4))

# [3.0.0-beta.1](https://github.com/tsparticles/tsparticles/compare/v3.0.0-beta.0...v3.0.0-beta.1) (2023-08-25)

### Features

- supporting the npm exports option correctly ([bdfaca8](https://github.com/tsparticles/tsparticles/commit/bdfaca8077b8a3a4b1f482cc2ae5766914dcfaf7))

# [3.0.0-beta.0](https://github.com/tsparticles/tsparticles/compare/v2.12.0...v3.0.0-beta.0) (2023-08-24)

### Bug Fixes

- **deps:** update dependency eslint-config-prettier to v9 ([e6e2ba7](https://github.com/tsparticles/tsparticles/commit/e6e2ba7309db151c6d0fc6c01a4f01116ecf24b8))

# [2.12.0](https://github.com/tsparticles/tsparticles/compare/v2.11.1...v2.12.0) (2023-08-03)

### Bug Fixes

- fix issue with change theme when an existing canvas is used ([2c4c7cd](https://github.com/tsparticles/tsparticles/commit/2c4c7cd713bd2728b4821563e9d919fd33c23bf5))
- fix issue with change theme when an existing canvas is used ([a349b97](https://github.com/tsparticles/tsparticles/commit/a349b973b63c849ec552eca72bcce391223c3d61))
- fixed issue with some plugins that were drawn before the canvas clear ([4cff7e6](https://github.com/tsparticles/tsparticles/commit/4cff7e6817b12d3a3bcaa033eab9f9099afb53ea))
- fixed light interaction, particle shadow wasn't calculated correctly ([da86a37](https://github.com/tsparticles/tsparticles/commit/da86a379faea661db8d161b28c30b36e5bd3580b))
- fixed memory leak in destroyed particles by updaters, the z array wasn't filtered ([272bb47](https://github.com/tsparticles/tsparticles/commit/272bb4720961bab2db8b5ee5d3dc7e6f5b1bbf38)), closes [#5101](https://github.com/tsparticles/tsparticles/issues/5101)
- fixed out mode bounce ([aafaa08](https://github.com/tsparticles/tsparticles/commit/aafaa083090d7941d159273cce513427572b866a))
- fixed out modes, bounce was not checking the direction of the update request ([e2b2c94](https://github.com/tsparticles/tsparticles/commit/e2b2c94da9ba4ffd264442ab6bfed4923fac7d25))
- fixed pool on particles destroyed by updaters ([1f62e29](https://github.com/tsparticles/tsparticles/commit/1f62e299de7893145c64d006fcc2f6fb8c8540cf))

### Features

- added range values to life duration and delay of emitters ([18bc70d](https://github.com/tsparticles/tsparticles/commit/18bc70dec174387f1b49f7c49fdc587c6554a38f))
- added two new bundles: basic and all ([489f591](https://github.com/tsparticles/tsparticles/commit/489f5916a1b8b8b6c710ac16fbc691a0e591ab19))

## [2.11.1](https://github.com/tsparticles/tsparticles/compare/v2.11.0...v2.11.1) (2023-07-24)

### Bug Fixes

- fixed various plugins issues for a misplaced canvas clear ([dd98147](https://github.com/tsparticles/tsparticles/commit/dd981478fb010206f47612f009215591f35c63e1))

# [2.11.0](https://github.com/tsparticles/tsparticles/compare/v2.10.1...v2.11.0) (2023-07-12)

### Bug Fixes

- fixed calc position function ([adb0444](https://github.com/tsparticles/tsparticles/commit/adb044454ce9aacd84ed077ab2bd41541995c0b1))
- fixed getPositionOrSize function ([3e07525](https://github.com/tsparticles/tsparticles/commit/3e07525becdfe08d10c3ffc8dc00bbe0e6acf53f))
- fixed issue with emitters ([39c7d75](https://github.com/tsparticles/tsparticles/commit/39c7d758410b1f13567e4ea97bc334ba864d62c4))
- fixed video export plugin ([a3b371c](https://github.com/tsparticles/tsparticles/commit/a3b371cfad36a5d45015f5182f23aaa1ba2147d8))
- removed console log, closes [#5003](https://github.com/tsparticles/tsparticles/issues/5003) ([f5f2706](https://github.com/tsparticles/tsparticles/commit/f5f2706c027a6fa66fdcb8a243aecbffdf94f70a))

### Features

- added animated gif support to image drawer ([c65f451](https://github.com/tsparticles/tsparticles/commit/c65f451cc4edf3a5e01e436d9a14922388c01a38))
- added refresh flag for loading plugins, this will prevent multiple refresh of the instance ([9d999d6](https://github.com/tsparticles/tsparticles/commit/9d999d6fa2f0c0a45a551aab45b467a8f3b682c5))
- added setLogger and getLogger functions, this will prevent console.log mistakenly left ([38de76c](https://github.com/tsparticles/tsparticles/commit/38de76ceecc1305f416e23fdc9da223adbb8a6c1))
- added tree shaking ([86806a6](https://github.com/tsparticles/tsparticles/commit/86806a6054d89b050567599daab20da3b643b788))
- added video export plugin ([527eb6f](https://github.com/tsparticles/tsparticles/commit/527eb6f3db294f673b635e37a97be160fc420fed))
- adding export plugins ([4c1b5a6](https://github.com/tsparticles/tsparticles/commit/4c1b5a649eba2cb7d8382c2177b90515864a7402))
- created rounded polygon shape ([abee4dc](https://github.com/tsparticles/tsparticles/commit/abee4dc3258e1dcc7ab097a66313e89dde19a0b4))
- export plugins completed, image and json ([149b77d](https://github.com/tsparticles/tsparticles/commit/149b77d2995f213f6bf5fcca55c083b267eb4206))
- fixed export plugins ([775e7bd](https://github.com/tsparticles/tsparticles/commit/775e7bd53b9615fe471660d106c5747bf0cfda3b))
- improved new export function, using blob as output for all functions ([df1c862](https://github.com/tsparticles/tsparticles/commit/df1c8620e4cbeb3267423cb1aee4edc8e29253d8))
- improved new export function, using blob as output for all functions ([3521561](https://github.com/tsparticles/tsparticles/commit/3521561264540c1e3e92ec6b07d4a7e8b0b2ad79))

## [2.10.1](https://github.com/tsparticles/tsparticles/compare/v2.10.0...v2.10.1) (2023-06-04)

**Note:** Version bump only for package tsparticles-workspace

# [2.10.0](https://github.com/tsparticles/tsparticles/compare/v2.0.0-alpha.0...v2.10.0) (2023-06-03)

### Bug Fixes

- absobers and emitters plugin now will add some custom methods to Container ([e9effc8](https://github.com/tsparticles/tsparticles/commit/e9effc8e98ef739b04292891fb55ef046bb1645b))
- absorbers and emitters can have partial positions, the other coordinate will be randomized ([7525481](https://github.com/tsparticles/tsparticles/commit/75254814c3607b3179091b37ac5db042cf65d78a))
- added browserslist to fix some issues with older browsers ([24d8f52](https://github.com/tsparticles/tsparticles/commit/24d8f520ee6934bd967d63612c828705e1dc09e2))
- added missing export ([a2ce9df](https://github.com/tsparticles/tsparticles/commit/a2ce9df6793a5f3b9e061c920b486ba2974a664a))
- added missing shapes to confetti bundle ([b299012](https://github.com/tsparticles/tsparticles/commit/b2990122b280e09dc56418e0f454dd299f3ad0a1)), closes [#4905](https://github.com/tsparticles/tsparticles/issues/4905)
- added pixel ratio to shape drawers and fixed particle stroke width ([2245dd0](https://github.com/tsparticles/tsparticles/commit/2245dd0b716501d27b5b0abdaf071ec126471f31))
- added try catch in pathseg polyfill, fixes [#2264](https://github.com/tsparticles/tsparticles/issues/2264) ([6b849f2](https://github.com/tsparticles/tsparticles/commit/6b849f2455371946ab6949385de5b3b6699cae70))
- added valid string values to option enum properties, fixes [#508](https://github.com/tsparticles/tsparticles/issues/508) ([b6328cf](https://github.com/tsparticles/tsparticles/commit/b6328cf97a50e8cee736db0ac641f742cd09b38d))
- adds set method to main tsParticles instance. Closes [#515](https://github.com/tsparticles/tsparticles/issues/515) ([669ad24](https://github.com/tsparticles/tsparticles/commit/669ad24dac2661b780c41a43fc6052f007886167))
- angular demo improved ([1c1ec4b](https://github.com/tsparticles/tsparticles/commit/1c1ec4b8b849989cd3a730526cb5e0149d096cae))
- autostart feature fixed ([bed7824](https://github.com/tsparticles/tsparticles/commit/bed78248c941d57ad4cc20a455147e186e97c7a1))
- background mask opacity ([efac691](https://github.com/tsparticles/tsparticles/commit/efac691e428f9fe030c4d429bb707e3732865d1d))
- brought v2 changes to absorbers ([cbad5c2](https://github.com/tsparticles/tsparticles/commit/cbad5c2651058eeac7bda0fc79e498e3b4126232))
- changed click handler, now moved to Container class but kept compatibility ([c89e571](https://github.com/tsparticles/tsparticles/commit/c89e571161b1c3a8a00c37c05e510a037c6d633c))
- changed pauseOnOutsideViewport to be false by default ([8a6f79d](https://github.com/tsparticles/tsparticles/commit/8a6f79d27ae4570a1f8be31c1a7bad8c638bee39))
- check if all triangles vertices have link triangles enabled ([9956660](https://github.com/tsparticles/tsparticles/commit/9956660883e7334f9c9522fb43471dd458a760bb))
- confetti fixed oval rotation ([6cb99a3](https://github.com/tsparticles/tsparticles/commit/6cb99a33185f6177306beee1a7f2c6f794f32294))
- correct links to docs from readme ([47c32c8](https://github.com/tsparticles/tsparticles/commit/47c32c882e3b67313f220ac61524d0fa4d49546a))
- debounce window resize, check if [#1587](https://github.com/tsparticles/tsparticles/issues/1587) is fixed ([0045346](https://github.com/tsparticles/tsparticles/commit/00453469de5708312197e6bc9afe0f7565c1e7d3))
- **deps:** pin dependencies ([23be870](https://github.com/tsparticles/tsparticles/commit/23be8708d698e1e37a18f2ed292cbccffb0f1e47))
- **deps:** pin dependencies ([3dac0d0](https://github.com/tsparticles/tsparticles/commit/3dac0d0a594092707ddd31a70b09cdb7238d5eba))
- **deps:** update all ([d9f0ff2](https://github.com/tsparticles/tsparticles/commit/d9f0ff2f8c4ac269aaad5077492746e3da8fb422))
- **deps:** update angular monorepo to ~13.1.0 ([1f80f2b](https://github.com/tsparticles/tsparticles/commit/1f80f2b467d440ed3f2d4b4a4bd08eb561cef76f))
- **deps:** update angular monorepo to ~13.2.0 ([9467d48](https://github.com/tsparticles/tsparticles/commit/9467d483c54916099d822afef05e811dc2d6aace))
- **deps:** update angular monorepo to ~13.2.0 ([fa858b8](https://github.com/tsparticles/tsparticles/commit/fa858b8bad73331485a63d2a31124369c8cb8168))
- **deps:** update angular monorepo to ~13.3.0 ([6aa9b81](https://github.com/tsparticles/tsparticles/commit/6aa9b814962c0460949452e7ee5c84617330ffd4))
- **deps:** update angular monorepo to ~13.3.0 ([71e7a23](https://github.com/tsparticles/tsparticles/commit/71e7a2388d7871a26b4b25d691c061cacf8e08eb))
- **deps:** update angular monorepo to ~14.1.0 ([284f4fc](https://github.com/tsparticles/tsparticles/commit/284f4fcff996381a784b1eed9271fab33c23613d))
- **deps:** update angular monorepo to ~14.2.0 ([a95f5e4](https://github.com/tsparticles/tsparticles/commit/a95f5e4a70bdff2c99bd0bf0c726a3c0b61b8886))
- **deps:** update angular monorepo to v12.2.2 ([e4b6928](https://github.com/tsparticles/tsparticles/commit/e4b6928c5f35d5d2f8ed9609fcff8a53427f7a77))
- **deps:** update angular monorepo to v14 ([c620315](https://github.com/tsparticles/tsparticles/commit/c620315e06a16e0129acef06a4dac6505b4ce456))
- **deps:** update angular monorepo to v15 ([7f07d5c](https://github.com/tsparticles/tsparticles/commit/7f07d5c529ec79fc4d23209ecac28e8540b1dfbf))
- **deps:** update capacitor monorepo ([57a478c](https://github.com/tsparticles/tsparticles/commit/57a478c0ea1459ce310070a57dd9cbe95df69446))
- **deps:** update capacitor monorepo ([405fb46](https://github.com/tsparticles/tsparticles/commit/405fb46102a790fb686f05651c6b414876a0900f))
- **deps:** update capacitor monorepo ([eaeea3b](https://github.com/tsparticles/tsparticles/commit/eaeea3b5cc7a0589d2883d371aa756104c1bace8))
- **deps:** update capacitor monorepo ([f501b7e](https://github.com/tsparticles/tsparticles/commit/f501b7e93bb14fd04dfabea7e54948dca9e5219a))
- **deps:** update capacitor monorepo ([5bf40c2](https://github.com/tsparticles/tsparticles/commit/5bf40c2b300f67244341589dd5cb8671005f6921))
- **deps:** update capacitor monorepo ([628db0f](https://github.com/tsparticles/tsparticles/commit/628db0f31e93f6e035b8bf0a96ef48c391afefc9))
- **deps:** update capacitor monorepo to v4 ([a63d3a0](https://github.com/tsparticles/tsparticles/commit/a63d3a005ff47dd38ca7924b29267f4796ffebdb))
- **deps:** update dependency @capacitor/app to v1.1.1 ([0c14c5f](https://github.com/tsparticles/tsparticles/commit/0c14c5ff2e395de95e4345b5842927a73652082b))
- **deps:** update dependency @capacitor/app to v1.1.1 ([97901cd](https://github.com/tsparticles/tsparticles/commit/97901cd59e3dd5830d9d3e864eab187980f50d8e))
- **deps:** update dependency @capacitor/app to v1.1.1 ([bd69e38](https://github.com/tsparticles/tsparticles/commit/bd69e38aaf9ab0f405e33ba98132195ec5e98559))
- **deps:** update dependency @capacitor/core to v3.4.2 ([aa44c98](https://github.com/tsparticles/tsparticles/commit/aa44c9855cd819c90d6676a7c547ddd1b3de727c))
- **deps:** update dependency @capacitor/core to v3.4.2 ([b488e20](https://github.com/tsparticles/tsparticles/commit/b488e20ac54a48883bf7388ce33d6d71833cdec9))
- **deps:** update dependency @capacitor/core to v3.4.3 ([392a949](https://github.com/tsparticles/tsparticles/commit/392a949121753f9fee42a2d709b7cfca1c20b834))
- **deps:** update dependency @capacitor/core to v3.5.0 ([581bb7e](https://github.com/tsparticles/tsparticles/commit/581bb7e2f4f6aceb3535daf9223954a80f2daa81))
- **deps:** update dependency @ionic/angular to v6 ([b20503f](https://github.com/tsparticles/tsparticles/commit/b20503ff2a29f6c8617f42c764c8a868fc334c5f))
- **deps:** update dependency fs-extra to v11 ([e82352a](https://github.com/tsparticles/tsparticles/commit/e82352a685960603a58fb222f91d157ee65967de))
- **deps:** update dependency gh-pages to v4 ([cf6e957](https://github.com/tsparticles/tsparticles/commit/cf6e9577132afcec26410f7321fcf5ffcfb05930))
- **deps:** update dependency inferno to v8 ([f4f0419](https://github.com/tsparticles/tsparticles/commit/f4f04197f966a4d512f5be0c37097e963889336e))
- **deps:** update dependency jsdom to v21 ([85a816a](https://github.com/tsparticles/tsparticles/commit/85a816a2f5389afffc3a75b9e6c3bbd754a48db1))
- **deps:** update dependency jsdom to v22 ([5f8737a](https://github.com/tsparticles/tsparticles/commit/5f8737a5d3635947da822127d395a971d8feee4d))
- **deps:** update dependency minify to v10 ([eb16db3](https://github.com/tsparticles/tsparticles/commit/eb16db3e709b42517ee1ae524feaa473a9ff7590))
- **deps:** update dependency minify to v8 ([e2ffbec](https://github.com/tsparticles/tsparticles/commit/e2ffbec6b4c83a847450c1edc8b8f114f45c0eff))
- **deps:** update dependency minify to v8 ([3b7d7d0](https://github.com/tsparticles/tsparticles/commit/3b7d7d0fd7d71d014d0f6aa87453beba4f048d0f))
- **deps:** update dependency minify to v9 ([a12fb3e](https://github.com/tsparticles/tsparticles/commit/a12fb3e6f2a94677b4be32ebc69a17b085d2f3d2))
- **deps:** update dependency next to v12.2.4 [security] ([8ac6931](https://github.com/tsparticles/tsparticles/commit/8ac6931121a264d986f96e0a59db517ccb404451))
- **deps:** update dependency preact-router to v4 ([c80c3a3](https://github.com/tsparticles/tsparticles/commit/c80c3a39d7dcc44d6c173e360c7a9a07d4f60efb))
- **deps:** update dependency preact-router to v4 ([46d8edb](https://github.com/tsparticles/tsparticles/commit/46d8edb1a0d5d1047ddcf4258d895756a8f9cf7a))
- **deps:** update dependency rimraf to v4.4.1 ([370d1ca](https://github.com/tsparticles/tsparticles/commit/370d1ca4d3bb0ea8bfe5fb3e0f5e1d74f45f4de6))
- **deps:** update dependency rimraf to v5 ([c29cbc4](https://github.com/tsparticles/tsparticles/commit/c29cbc43ed0d3522b718e7236a48eae9b91cde43))
- **deps:** update dependency rimraf to v5.0.1 ([6627473](https://github.com/tsparticles/tsparticles/commit/66274734c70b5759c59f7e949c8fcb2c8529bdf2))
- **deps:** update dependency riot to v7 ([116fa3f](https://github.com/tsparticles/tsparticles/commit/116fa3f0808bb8e1e3df767513ebcb82c2f9e0e5))
- **deps:** update dependency rxjs to ~7.4.0 ([048238b](https://github.com/tsparticles/tsparticles/commit/048238b7b14b1ee49356afa47e5c7aa0ab4ac1f0))
- **deps:** update dependency rxjs to ~7.5.0 ([f2d0505](https://github.com/tsparticles/tsparticles/commit/f2d0505863dafba475f8d6275d6474a54970a814))
- **deps:** update dependency rxjs to ~7.6.0 ([250ef9c](https://github.com/tsparticles/tsparticles/commit/250ef9c3ff73fbde55abc05aa7183e280fd7f297))
- **deps:** update dependency rxjs to ~7.8.0 ([0345e0b](https://github.com/tsparticles/tsparticles/commit/0345e0becfd68e7e785e3a47007b9ea362934b49))
- **deps:** update dependency rxjs to v7 ([0b09194](https://github.com/tsparticles/tsparticles/commit/0b0919449fff69eec029e00dbab9f1d683f84682))
- **deps:** update dependency sirv-cli to v2 ([176dc1d](https://github.com/tsparticles/tsparticles/commit/176dc1dc15c080032ad2f2addc59be6efce6248d))
- **deps:** update dependency zone.js to ~0.12.0 ([eb78579](https://github.com/tsparticles/tsparticles/commit/eb7857971c8919d4c7b009c10790ece14d79cfe4))
- **deps:** update react monorepo to v18 ([3f6aa46](https://github.com/tsparticles/tsparticles/commit/3f6aa46e399d0092ae13ba494db86256c0d05c40))
- **deps:** update react monorepo to v18 ([79e531d](https://github.com/tsparticles/tsparticles/commit/79e531dc77dd73c9493e30e9eb23f5620a860ea9))
- **deps:** update react monorepo to v18 ([4a434e6](https://github.com/tsparticles/tsparticles/commit/4a434e6217f7b65291da2a053af8f2ded70c879c))
- **deps:** update react monorepo to v18.1.0 ([6b45793](https://github.com/tsparticles/tsparticles/commit/6b457937c41d7681a2135dfcb6ff220e578f22bb))
- do not load particles on the Node.js side and make its loading cancellable ([6711708](https://github.com/tsparticles/tsparticles/commit/67117085c3e2da281216a18933f53d3f9b731136))
- editor fixed with new color refactoring ([b09a5c8](https://github.com/tsparticles/tsparticles/commit/b09a5c849317cef93469203c67381ab8d5877cae))
- emitter duration fixed ([0a3b0cb](https://github.com/tsparticles/tsparticles/commit/0a3b0cb389bd3f5e0bd417bc6e232e0aad7ae108))
- emitter play/pause were not working fine from container ([f7faf7b](https://github.com/tsparticles/tsparticles/commit/f7faf7b69887f386375551d0290e4fea477fdc06))
- emitters uses the main loop, so they pause/play with the same particles logic ([a58c4de](https://github.com/tsparticles/tsparticles/commit/a58c4deb9cd1f00082212830bad16aa04880cf2c))
- fix an import and a return ([22a5a98](https://github.com/tsparticles/tsparticles/commit/22a5a983f46becc83384bed858ca4b43cc98b155))
- fix linker plugin issue ([b9505e2](https://github.com/tsparticles/tsparticles/commit/b9505e2453e893a0a30fd483595de412c70dda3c))
- fix linker plugin issue ([54ed421](https://github.com/tsparticles/tsparticles/commit/54ed42199d555162dc2c4e496f6ce5a8d53bb1e8))
- fix options loading issue in absorbers and emitters ([6afaf3e](https://github.com/tsparticles/tsparticles/commit/6afaf3e4abd31fc63746358ccea1e21bfb754142))
- fix preact component update ([1c023d7](https://github.com/tsparticles/tsparticles/commit/1c023d7a26ba51dc1c599c004354675bbde70385))
- fix responsive screen size ([6d5cdd7](https://github.com/tsparticles/tsparticles/commit/6d5cdd70ac72fea5db4c8412d2c057903ed8b1b2))
- fixed [#1587](https://github.com/tsparticles/tsparticles/issues/1587) ([1b8e75b](https://github.com/tsparticles/tsparticles/commit/1b8e75b509e4d410711c2ab0d3771ec3b5634e95))
- fixed [#1683](https://github.com/tsparticles/tsparticles/issues/1683) ([36d2073](https://github.com/tsparticles/tsparticles/commit/36d2073ea559b60173e6e74fb00aa4e1658ef24d)), closes [#1682](https://github.com/tsparticles/tsparticles/issues/1682)
- fixed [#618](https://github.com/tsparticles/tsparticles/issues/618) ([aa6fe99](https://github.com/tsparticles/tsparticles/commit/aa6fe9935b289178ec84b93dcd31160ed3107369))
- fixed angular demo ([16a219b](https://github.com/tsparticles/tsparticles/commit/16a219bffecd38b7e30d6a008dba0c0d0f0cf6eb))
- fixed angular readme, closes [#2297](https://github.com/tsparticles/tsparticles/issues/2297) ([5f51b87](https://github.com/tsparticles/tsparticles/commit/5f51b87a6fca58ee88ae51a17dbd5e0d1911b3c6))
- fixed backcolor when undefined ([d237d30](https://github.com/tsparticles/tsparticles/commit/d237d30397606fe2fcd8fc313d025b8dee653028))
- fixed background mode canvas reset ([f78252a](https://github.com/tsparticles/tsparticles/commit/f78252afee4363311c039da79216c848647da51e))
- fixed bigCircle info ([4a7b9e3](https://github.com/tsparticles/tsparticles/commit/4a7b9e3d37a078c904b24c100f34f2e53bc90dc9))
- fixed bounce for [#739](https://github.com/tsparticles/tsparticles/issues/739) ([738a16f](https://github.com/tsparticles/tsparticles/commit/738a16f1d50780c961d7c258e97b40d94762057e))
- fixed bounce on rectangular divs ([593c021](https://github.com/tsparticles/tsparticles/commit/593c0212feef94a81578d46c032c458dafa6819a))
- fixed broken movement in 1.31 ([6787035](https://github.com/tsparticles/tsparticles/commit/6787035c746bdc11055d00ca83869ed837258ec8))
- fixed bug [#748](https://github.com/tsparticles/tsparticles/issues/748) and a rotate path issue ([a8dad54](https://github.com/tsparticles/tsparticles/commit/a8dad540d4f98d77c5add63358021f245841670b))
- fixed bug for non existing interactivity object on mouse finish ([7ebb73d](https://github.com/tsparticles/tsparticles/commit/7ebb73d9a640e6d8a3474748c8ec297771a1a071))
- fixed bug for particles with radius <= 0 ([b0481ab](https://github.com/tsparticles/tsparticles/commit/b0481abc86e162bc200f19d3bc872d16fc7ab117))
- fixed canvas mask plugin size output with new multiline support ([9b00acc](https://github.com/tsparticles/tsparticles/commit/9b00acced4f670da880a045a6b963a19a38b4e3b))
- fixed class attributes on solid component ([639680a](https://github.com/tsparticles/tsparticles/commit/639680a663d865eb71b1986607f11e20fd7a24ca))
- fixed click handler with touch events ([ad4bf8a](https://github.com/tsparticles/tsparticles/commit/ad4bf8a56cb7e110114c8ec25dab1151c440f212))
- fixed click handler, it wasn't working fine ([fd9873b](https://github.com/tsparticles/tsparticles/commit/fd9873b250d236b196cc7ff952d237f2768fb26b))
- fixed click handler, it wasn't working fine ([f0a8170](https://github.com/tsparticles/tsparticles/commit/f0a81705f0f7a0ef51fc21344a7d35a02b11ad22))
- fixed code duplication in links plugin ([cb384cf](https://github.com/tsparticles/tsparticles/commit/cb384cf893d89d823d4ca439851c3ce7dc7b65b8))
- fixed confetti preset ([e3ff29f](https://github.com/tsparticles/tsparticles/commit/e3ff29f63b7df15f69dee5188a811fe122aaf00b))
- fixed confetti preset ([408c35e](https://github.com/tsparticles/tsparticles/commit/408c35ea153622e9c6bc7c69983a2e2e3c15a4b9))
- fixed confetti preset, added roll options ([d49b572](https://github.com/tsparticles/tsparticles/commit/d49b572f62def708eed29d28cb8a63622733862f))
- fixed confetti shape ([a6fbc72](https://github.com/tsparticles/tsparticles/commit/a6fbc72ebc05646d366ae199c8c55fbfe69510dc))
- fixed connect links options ([5eb3186](https://github.com/tsparticles/tsparticles/commit/5eb31866b3a9fe1328969c254f2fff0be995b1f5))
- fixed container duration, using it as seconds instead of milliseconds ([ba05eec](https://github.com/tsparticles/tsparticles/commit/ba05eec31ae30dffff6871669a34360547663605))
- fixed container refresh ([9e0c71e](https://github.com/tsparticles/tsparticles/commit/9e0c71ea8f73562f53027bb08c13603dd90157c8))
- fixed correctly both [#4031](https://github.com/tsparticles/tsparticles/issues/4031) and [#4385](https://github.com/tsparticles/tsparticles/issues/4385) ([6b57b69](https://github.com/tsparticles/tsparticles/commit/6b57b69585f931478118bd466dcdce9bbc90fa79))
- fixed deletion when surpassing limit and z index is enabled ([80cb9ce](https://github.com/tsparticles/tsparticles/commit/80cb9ce0b498db45d516da6f024d3f422f9a0cab))
- fixed demos ([ac11cab](https://github.com/tsparticles/tsparticles/commit/ac11cab60705a1cfc2b50453349389bfc9c31bf6))
- fixed double mouse events on mobile using pointer events, closes [#4622](https://github.com/tsparticles/tsparticles/issues/4622) ([1019fa4](https://github.com/tsparticles/tsparticles/commit/1019fa431f8a43cbd45d6adeb5adf94433e6e04b))
- fixed editor ([d78892e](https://github.com/tsparticles/tsparticles/commit/d78892ea1af4ad47f677af0bbbae2272eea5e5b4))
- fixed editor for v2.2 ([ae41163](https://github.com/tsparticles/tsparticles/commit/ae41163473095aba0083478a47c70d1cc44bf250))
- fixed editor issue with particles bounce factors ([093080d](https://github.com/tsparticles/tsparticles/commit/093080d0d10c1d9bce3092356f0e04e1a1bfd174))
- fixed editor issue with particles bounce factors ([202890d](https://github.com/tsparticles/tsparticles/commit/202890d274c305af83390851912d307e5cf82a95))
- fixed editor issue with particles bounce factors ([e809e7d](https://github.com/tsparticles/tsparticles/commit/e809e7ddef8267f075758aad46032d303da4f71a))
- fixed editor issue with particles bounce factors ([c14f41c](https://github.com/tsparticles/tsparticles/commit/c14f41cf7097d034f99ec3d271fb2e7fdde73152))
- fixed editor issues ([ff3fdd3](https://github.com/tsparticles/tsparticles/commit/ff3fdd318f2c503b1e201afaa0b77e4337c2fd81))
- fixed editor properties, missing themes for now ([8598460](https://github.com/tsparticles/tsparticles/commit/85984607f96f0207ebb9ed4ecce55f63929dfd53))
- fixed emitter issue on first start, closes [#3074](https://github.com/tsparticles/tsparticles/issues/3074) ([79fe654](https://github.com/tsparticles/tsparticles/commit/79fe654b0c4707337d3ceea7509cf115feddaa05))
- fixed emitters after 1.24.0 ([5693fdb](https://github.com/tsparticles/tsparticles/commit/5693fdbdab397aed482466945949a0eb6ecb88cc))
- fixed emitters issues ([c9d9a51](https://github.com/tsparticles/tsparticles/commit/c9d9a51e41fdc77a9bf544a09d979d8c2f6b10d5))
- fixed export configuration method of container ([f7c3c7f](https://github.com/tsparticles/tsparticles/commit/f7c3c7f210017e91ac3fa5a54a911d714d207ca5))
- fixed exports of engine ([f8a676b](https://github.com/tsparticles/tsparticles/commit/f8a676be85be237098712cb94387677a5ff0cf4d))
- fixed fire preset using the new density values ([94c1648](https://github.com/tsparticles/tsparticles/commit/94c1648dd85afb447c309f04f7cea8041aebf895))
- fixed fireworks presets ([3402e46](https://github.com/tsparticles/tsparticles/commit/3402e46c7a6c945c481b563fa633fd6095f9b377))
- fixed flashing issue with background mask, closes [#3514](https://github.com/tsparticles/tsparticles/issues/3514) ([6f74bf1](https://github.com/tsparticles/tsparticles/commit/6f74bf1ab62587c7f2352bfe6f72ea29bb0a31fc))
- fixed flashing issue with resize ([4e44c8e](https://github.com/tsparticles/tsparticles/commit/4e44c8e368561195441c7cd153e811e7e410e7a4))
- fixed frozen frames (more than 1 seconds), this will fix the issue with pause on blur ([5a933c1](https://github.com/tsparticles/tsparticles/commit/5a933c130d85593e9d0772bb9eb2b7a61f643712))
- fixed gravity on retina displays and an issue with inverse gravity ([54c28d1](https://github.com/tsparticles/tsparticles/commit/54c28d197918614367a2cf81a4e78f7330b23181))
- fixed ICoordinates types ([3d6fa2d](https://github.com/tsparticles/tsparticles/commit/3d6fa2d9654c4e6e3eb3f076356c02de76219de5))
- fixed image drawer when refreshing the container ([8625dd1](https://github.com/tsparticles/tsparticles/commit/8625dd12f1d8059ba89299f9141d40e00c4ad028))
- fixed images shape options ([8964fe6](https://github.com/tsparticles/tsparticles/commit/8964fe6dd3b2556de47ba307fe87306764672bcc))
- fixed infection plugin ([901b9ce](https://github.com/tsparticles/tsparticles/commit/901b9cef9f3f6df333200d52d712057b7c7fe59c))
- fixed install script for Node 8.x, fixes [#966](https://github.com/tsparticles/tsparticles/issues/966) ([3870cea](https://github.com/tsparticles/tsparticles/commit/3870ceaaa10af54257de21458c060552fb1b53d5))
- fixed issue [#1594](https://github.com/tsparticles/tsparticles/issues/1594) ([7ce7081](https://github.com/tsparticles/tsparticles/commit/7ce7081832cad7d86dd054eefbd88667799c92e3))
- fixed issue on container guard check, fixes [#4679](https://github.com/tsparticles/tsparticles/issues/4679) ([953767d](https://github.com/tsparticles/tsparticles/commit/953767d8f1d616aa58759efc8b63730cb0f94811))
- fixed issue with 0 positions on x and y with emitters ([63e8a11](https://github.com/tsparticles/tsparticles/commit/63e8a115614ca106375fdae7f77cd73181ede96a))
- fixed issue with animation random size, multiplying again the pixel ratio ([3e89c7b](https://github.com/tsparticles/tsparticles/commit/3e89c7bbc3380defd333253cc7a0cb36ab6d1592))
- fixed issue with canvas resize ([4c72a96](https://github.com/tsparticles/tsparticles/commit/4c72a96c707266da6cb1b5081bc7b504c5cfb3de))
- fixed issue with collisions, fixes [#2586](https://github.com/tsparticles/tsparticles/issues/2586), fixes [#2380](https://github.com/tsparticles/tsparticles/issues/2380) ([204cb8d](https://github.com/tsparticles/tsparticles/commit/204cb8dc188cf2c37d746652d4ea3effde2a5b9b))
- fixed issue with destroyed containers, fixes [#4385](https://github.com/tsparticles/tsparticles/issues/4385), fixes [#4413](https://github.com/tsparticles/tsparticles/issues/4413), fixes [#4534](https://github.com/tsparticles/tsparticles/issues/4534) ([4d22425](https://github.com/tsparticles/tsparticles/commit/4d22425210f64b937a5d1b7bf825624b3ed5f2b6)), closes [#4532](https://github.com/tsparticles/tsparticles/issues/4532)
- fixed issue with detectsOn with non "window" values, fixes [#4606](https://github.com/tsparticles/tsparticles/issues/4606) ([91f7890](https://github.com/tsparticles/tsparticles/commit/91f78904474b9b021c783342c5968e3debe035c4))
- fixed issue with dynamic imports and async loading ([b7f444b](https://github.com/tsparticles/tsparticles/commit/b7f444b1ef279083572e3a52f341d39091c885e6))
- fixed issue with emitters and themes, they weren't applied correctly ([3a9dcae](https://github.com/tsparticles/tsparticles/commit/3a9dcaebed687277db76f7f1016e3835284b0d48))
- fixed issue with initial window resize ([f863bdc](https://github.com/tsparticles/tsparticles/commit/f863bdcf144e15b9b24f9edbcfbd9137b92e93c5))
- fixed issue with match media query, fixed [#84](https://github.com/tsparticles/tsparticles/issues/84) (again) ([7784898](https://github.com/tsparticles/tsparticles/commit/7784898e703dc04ae5b7cf7d69a9fb18baece16c))
- fixed issue with new bounce active conditions ([9be2b73](https://github.com/tsparticles/tsparticles/commit/9be2b730ebbfe4c6ddbea91423aeb791e1d7de02))
- fixed issue with new resize checks ([0cce40c](https://github.com/tsparticles/tsparticles/commit/0cce40cf3faeff00c3ef5f5ffab3575e38aca5a0))
- fixed issue with non-generated canvas elements, closes [#4228](https://github.com/tsparticles/tsparticles/issues/4228) ([297e974](https://github.com/tsparticles/tsparticles/commit/297e9740580e11cf2c8b98a5a9e88736fdf855e4))
- fixed issue with opacity and svg with color replaced, closes [#4532](https://github.com/tsparticles/tsparticles/issues/4532) ([9119b61](https://github.com/tsparticles/tsparticles/commit/9119b61cd6f5cc4a7bcc756f08dd700a77713666))
- fixed issue with particles rotated randomically without a rotate config ([fe1b0f7](https://github.com/tsparticles/tsparticles/commit/fe1b0f7a363382603645671587df15c48f42b22e))
- fixed issue with path generators ([29644fc](https://github.com/tsparticles/tsparticles/commit/29644fc7a281fae1c438dee74e43dd611ec7af07))
- fixed issue with polygon mask bounce on edges ([3d9f1f5](https://github.com/tsparticles/tsparticles/commit/3d9f1f54fe54303efd548d5515abe1f63dbf151b))
- fixed issue with reduce duplicates flag, fixes [#4805](https://github.com/tsparticles/tsparticles/issues/4805) ([1d3fe78](https://github.com/tsparticles/tsparticles/commit/1d3fe78d63bf7fa27dc6f9eb97249ed0b6029b2e))
- fixed issue with rgb(), hsl() and hsv() values ([de63545](https://github.com/tsparticles/tsparticles/commit/de635453b874cff34bc5bef6d0bdbe6cb83350bf))
- fixed issue with size and opacity range ([84e9c16](https://github.com/tsparticles/tsparticles/commit/84e9c16ce0e0ea194cb82bdd1c62839809ee621b))
- fixed issue with size and opacity updaters ([f81e228](https://github.com/tsparticles/tsparticles/commit/f81e2280e3cff3942bdd8037df658b169d07ed30))
- fixed issue with stroke options loading ([9633356](https://github.com/tsparticles/tsparticles/commit/9633356a62e3654c3a5c11508bfefe7b255c6f32))
- fixed issue with themes/responsive options and canvas background ([c43fc96](https://github.com/tsparticles/tsparticles/commit/c43fc96e1120ae8026099b454e106ac7b09da185))
- fixed issues with absorbers and emitters plugins Container extension methods ([ce196be](https://github.com/tsparticles/tsparticles/commit/ce196bebd035281c08b5c77c5301ba1ebd7e734f))
- fixed issues with links colors and themes, fixes [#4841](https://github.com/tsparticles/tsparticles/issues/4841) ([34b570d](https://github.com/tsparticles/tsparticles/commit/34b570d780aa305d6e731a8c0b66375d65d40835))
- fixed issues with moveSpeed 0 ([6c9dd6e](https://github.com/tsparticles/tsparticles/commit/6c9dd6e1490e8d6f49188e1b2d4cff92d7a9c610))
- fixed issues with svelte 3.41.0 ([113c1c9](https://github.com/tsparticles/tsparticles/commit/113c1c9675eb365dedbedbc8ea39a8116ef66da8))
- fixed jquery component ([c1b01fd](https://github.com/tsparticles/tsparticles/commit/c1b01fd5395d203e48ca84cc8c8fa22e4061fffa))
- fixed life duration/delay sync options ([2db867c](https://github.com/tsparticles/tsparticles/commit/2db867cf52c9f26c431a6d88fabace0ca3f9b200))
- fixed line shape ([5c1c612](https://github.com/tsparticles/tsparticles/commit/5c1c6120af7e10abf26252c3c1be632675bfd3a5))
- fixed links broken with a previous commit, updated object-gui ([24b2872](https://github.com/tsparticles/tsparticles/commit/24b2872ef736efd5e03b529a94e3f695c4504e86))
- fixed missing plugins in wordpress component ([093460b](https://github.com/tsparticles/tsparticles/commit/093460b7716276644ec72666af7fcaf1efe0bddd))
- fixed more enum typings ([cc5e52d](https://github.com/tsparticles/tsparticles/commit/cc5e52d9f271c16125432e285503e7e7bd7bc71e))
- fixed more enum typings ([eed6c1f](https://github.com/tsparticles/tsparticles/commit/eed6c1f2237d78aae68beabc0c055e60770fe557))
- fixed more enum typings ([ae6501c](https://github.com/tsparticles/tsparticles/commit/ae6501c4c8ab3cbcc4d3eeb01dfe54599df88c47))
- fixed move decay type, it should be ranged ([113b6c0](https://github.com/tsparticles/tsparticles/commit/113b6c089ffda8b34188386332161f384e709a4a))
- fixed movement with broken values, fixes [#1477](https://github.com/tsparticles/tsparticles/issues/1477) ([59bb585](https://github.com/tsparticles/tsparticles/commit/59bb5856a0e70a6c4eb0d3e959b835c4f0ea42d1))
- fixed multiline text shape and relative demo ([18ebe89](https://github.com/tsparticles/tsparticles/commit/18ebe89bfcbd94d3d3865d3bfd08381c4c0c0cf2))
- fixed new multiple particles feature and particle destroy method ([aee6eff](https://github.com/tsparticles/tsparticles/commit/aee6effe57407c354c2648f2f3661981ed38a995))
- fixed older typescript version ([8665193](https://github.com/tsparticles/tsparticles/commit/8665193d54f49c85a42f17d7c2de34371cf91e38))
- fixed other animations with reduced motion ([4ba8dfd](https://github.com/tsparticles/tsparticles/commit/4ba8dfd6213261ea35b0c4426dffd7e93e1eecb9))
- fixed other shapes, multiline text had the same text bug ([3b6e7fc](https://github.com/tsparticles/tsparticles/commit/3b6e7fc86d300cf28d4bb0a178427d1b9aff21ac))
- fixed out mode when particles are moved outside the canvas bounds, closes [#4247](https://github.com/tsparticles/tsparticles/issues/4247) ([c54e2c6](https://github.com/tsparticles/tsparticles/commit/c54e2c6da7b79782e231efd7384285fd9771a9eb))
- fixed out of canvas out mode ([1f17c60](https://github.com/tsparticles/tsparticles/commit/1f17c60587c81ca8a556dcd6eb6168da32f15371))
- fixed out of canvas/bounce code mess ([28d16c0](https://github.com/tsparticles/tsparticles/commit/28d16c0bd8d81590b7d9cc1671aa034365ff9604))
- fixed overlapping issues ([442777c](https://github.com/tsparticles/tsparticles/commit/442777cac2428168e099bb2c95cd8c580206ee50))
- fixed package.json typos ([5c0cb15](https://github.com/tsparticles/tsparticles/commit/5c0cb15e21efa547b5253a57d4497686eecfbe61))
- fixed package.json, the wrong ts version was specified ([b88c6c0](https://github.com/tsparticles/tsparticles/commit/b88c6c0289242a2378055f28b96cbcc861f6151a))
- fixed parent interactivity mode ([38a37f2](https://github.com/tsparticles/tsparticles/commit/38a37f2508043f2a7c0f0a0e5bf570aa1d3317fc))
- fixed particle options override without shape type ([26e5fec](https://github.com/tsparticles/tsparticles/commit/26e5fecbd40b08974f0ca6a81b9318c48b7f4b82))
- fixed particles attract mode ([180148d](https://github.com/tsparticles/tsparticles/commit/180148d8cfc12d1250624b5cdde0d35acfebe5a4))
- fixed particles for latest changes ([2491c10](https://github.com/tsparticles/tsparticles/commit/2491c108cd5f91c8e0527f5272c260c66b7bb167))
- fixed particles number limit ([7708f92](https://github.com/tsparticles/tsparticles/commit/7708f920c62e7b77dd27e481863601f138fdde1f))
- fixed path rotation with noise setting, path rotation now ignores rotate animation ([554fef1](https://github.com/tsparticles/tsparticles/commit/554fef1058f5795c2fa8ae5294e0038e6703f53e))
- fixed pause on blur ([a7bd28f](https://github.com/tsparticles/tsparticles/commit/a7bd28f547a02434c188cdee4aa035424996559e))
- fixed plugin loading for absorbers and emitters ([5c5a9f5](https://github.com/tsparticles/tsparticles/commit/5c5a9f5e25bc1544909a4af8f4df8aa1e6383207))
- fixed polygon path generator ([146afb6](https://github.com/tsparticles/tsparticles/commit/146afb67dd0ced634f6c54d21c86d3b3372e87b6))
- fixed polygon path options ([4eac27c](https://github.com/tsparticles/tsparticles/commit/4eac27c11f6d5ece392b2a75368e57a0186a57ff))
- fixed preact build ([c636136](https://github.com/tsparticles/tsparticles/commit/c6361361d09a2a9552597003c5191189c8546b7e))
- fixed preact definitions to fix [#1003](https://github.com/tsparticles/tsparticles/issues/1003) ([778f556](https://github.com/tsparticles/tsparticles/commit/778f55602659b100837a6639cf5e4deb63b5065e))
- fixed prefers reduced motion query ([6a39ff4](https://github.com/tsparticles/tsparticles/commit/6a39ff4429bcc5158767e135b32b5c8ba8c473c5))
- fixed priority on canvas styles ([3cc3d97](https://github.com/tsparticles/tsparticles/commit/3cc3d97bb01ee9ae265b33fdba636dde9c696355))
- fixed random color ([a9ff25a](https://github.com/tsparticles/tsparticles/commit/a9ff25aa47dd9095c117844b6c0c6d9601851948))
- fixed react-tsparticles typescript template ([04a4d10](https://github.com/tsparticles/tsparticles/commit/04a4d100b97bd5828d7346c7277c5b47bd8f9208))
- fixed React/Preact/Inferno component properties/state definition, closes [#922](https://github.com/tsparticles/tsparticles/issues/922) ([6da46b2](https://github.com/tsparticles/tsparticles/commit/6da46b239ec8a87cac96b50a39cb1e999f022998))
- fixed replace svg color after new changes ([15e452f](https://github.com/tsparticles/tsparticles/commit/15e452fca158e2c0730aab806983d1857e69a8e9))
- fixed restoring canvas when not generated after full screen set, closes [#4291](https://github.com/tsparticles/tsparticles/issues/4291) ([28acc87](https://github.com/tsparticles/tsparticles/commit/28acc876335ed062fa14cfaa296dfaee0cdee8c9))
- fixed roll and tilt updaters ([d4a7df3](https://github.com/tsparticles/tsparticles/commit/d4a7df3c982dc0332890d16244d7df320cd5fd11))
- fixed rotate following path ([cd7ed78](https://github.com/tsparticles/tsparticles/commit/cd7ed789545bd38f68369407af08e4c96d6a1230))
- fixed rotation animation issues ([3641ff4](https://github.com/tsparticles/tsparticles/commit/3641ff467bb2c7737c1c5c73bc094b408bcec8c7))
- fixed rounded rect shape ([a5b844a](https://github.com/tsparticles/tsparticles/commit/a5b844a6f2f104bf08e1f8ae4946a01e081f4a1e))
- fixed some components init functions, they must be async ([0541dfa](https://github.com/tsparticles/tsparticles/commit/0541dfa82fb04264e2cd01ffd25e458b72847fdb))
- fixed some exports and comments ([389d82c](https://github.com/tsparticles/tsparticles/commit/389d82c7cf2786f2d32f54683779bd6bda96a877))
- fixed some plugins, they weren't loading correctly the options ([00053b4](https://github.com/tsparticles/tsparticles/commit/00053b4ea90fcc4385637b6a1aad955643a712b1))
- fixed some readmes ([93f371a](https://github.com/tsparticles/tsparticles/commit/93f371ab82a5074d34ec7632ade41edc3dbf0ec7))
- fixed some regex, added support for rgba/hsla/hsva string values with alpha % ([84b31fe](https://github.com/tsparticles/tsparticles/commit/84b31fefe25a7bec93f8942036d1af51e4749bbc))
- fixed spiral shape using pixel ratio ([e651ed0](https://github.com/tsparticles/tsparticles/commit/e651ed0665e87e9702494405a539210d0a92f9f7))
- fixed start types for size and opacity ([0696018](https://github.com/tsparticles/tsparticles/commit/06960183db42cba1b1f1a8077660ba8c801c9e18))
- fixed start value for size and opacity, previous fix wasn't good enough ([fce05fb](https://github.com/tsparticles/tsparticles/commit/fce05fb496432b0d80c047f839383e54c70e0ca8))
- fixed svelte component, reverted to an older svelte version for now, closes [#1924](https://github.com/tsparticles/tsparticles/issues/1924) ([80a88be](https://github.com/tsparticles/tsparticles/commit/80a88beaeb8a11b83c3f602234da0ec2cfadc10e))
- fixed svelte componente, it was having issues with TypeScript syntax inside ([1a4b01d](https://github.com/tsparticles/tsparticles/commit/1a4b01d2efaff7ed848c1606fb3e53628b6ffd94))
- fixed svelte typings, closes [#4131](https://github.com/tsparticles/tsparticles/issues/4131) ([27f1bdb](https://github.com/tsparticles/tsparticles/commit/27f1bdba71ea22f116bc882c0de86f18ed1f0573))
- fixed text drawer particle init ([8092a39](https://github.com/tsparticles/tsparticles/commit/8092a39e9171372aa2f4f56d2285c1b2177225a3))
- fixed themes ([95d5596](https://github.com/tsparticles/tsparticles/commit/95d55969536b8e30f6caf03f86aef7400129389d))
- fixed tilt back/front colors ([657585f](https://github.com/tsparticles/tsparticles/commit/657585f22d7fefa95df1cde16d6c68522fcfb34b))
- fixed type of particlesLoaded in particles.vue3, thanks to [#3129](https://github.com/tsparticles/tsparticles/issues/3129) by [@zzhenryquezz](https://github.com/zzhenryquezz) ([0ad7b70](https://github.com/tsparticles/tsparticles/commit/0ad7b70129ee11cae27b02475ae9f6e03a5a800c))
- fixed typings for tsParticles load methods ([847bbbe](https://github.com/tsparticles/tsparticles/commit/847bbbef680d72c50db6dc6ef4d3b297c9b82355))
- fixed typings in onDiv configuration, the DivType accepts also valid string values now ([164da18](https://github.com/tsparticles/tsparticles/commit/164da18be5f3feabbc7c367469446e3446cbb5f4))
- fixed typings in onDiv configuration, the DivType accepts also valid string values now ([a4aa0a3](https://github.com/tsparticles/tsparticles/commit/a4aa0a3d8a249143489052ad474e4cf5b03a6bbb))
- fixed typo in fireworks bundle exported types ([bf5b88a](https://github.com/tsparticles/tsparticles/commit/bf5b88a0243b268cad8327c70006229dbf1bc49a))
- fixed volume images position ([54c1b7d](https://github.com/tsparticles/tsparticles/commit/54c1b7d9555f486e44a9216cb479ba8879b7f688))
- fixed window resize fired during the initialization ([ffdc255](https://github.com/tsparticles/tsparticles/commit/ffdc255007f47d2161f56f865968b09bc5c5a53b))
- fixed wobble updater ([cd13fca](https://github.com/tsparticles/tsparticles/commit/cd13fca6bad6611926e5f01a43ba6412b79fb608))
- fixed wordpress plugin ([73118cc](https://github.com/tsparticles/tsparticles/commit/73118cc6563453300c99818eb6efd768b9e553d0))
- fixes [#2241](https://github.com/tsparticles/tsparticles/issues/2241) ([b5802df](https://github.com/tsparticles/tsparticles/commit/b5802dfcbf61f7d236cecc60e141ddd77d4a3d06))
- fixes [#2329](https://github.com/tsparticles/tsparticles/issues/2329) ([1982442](https://github.com/tsparticles/tsparticles/commit/1982442b6084f15ce40559c9391f097563728ff2))
- fixes [#508](https://github.com/tsparticles/tsparticles/issues/508), some values were excluded ([f0cb970](https://github.com/tsparticles/tsparticles/commit/f0cb97015ff39c3a3db5ce5cdb8301b316cc8405))
- fixes [#700](https://github.com/tsparticles/tsparticles/issues/700) ([3383b2b](https://github.com/tsparticles/tsparticles/commit/3383b2bf872709cccaf7562fc09262efb889ed43))
- fixes [#831](https://github.com/tsparticles/tsparticles/issues/831) ([3d17b4a](https://github.com/tsparticles/tsparticles/commit/3d17b4a10c33c2a736be74f076b8661c4a9ab1e5))
- fixes [#837](https://github.com/tsparticles/tsparticles/issues/837) ([9baf5b4](https://github.com/tsparticles/tsparticles/commit/9baf5b4b60d79e24156b5830b67d26ee925e6def))
- fixes [#996](https://github.com/tsparticles/tsparticles/issues/996) ([b886cd6](https://github.com/tsparticles/tsparticles/commit/b886cd669eede2c6f771937469662d98339beb21)), closes [#947](https://github.com/tsparticles/tsparticles/issues/947)
- fixes build scripts, closes [#3909](https://github.com/tsparticles/tsparticles/issues/3909), closes [#3911](https://github.com/tsparticles/tsparticles/issues/3911) ([d2c3fb3](https://github.com/tsparticles/tsparticles/commit/d2c3fb33ff9c9d529f2609f89c63cb6e1e61ecda))
- fixes issue with responsive not refreshing when changing options ([f54cefa](https://github.com/tsparticles/tsparticles/commit/f54cefac475599e7717c125490e81e2b17e89c3f))
- fixes some dynamic import issues ([8ba2415](https://github.com/tsparticles/tsparticles/commit/8ba2415d52384fd4ce722110cda02c8c0db92674))
- fixes triangles issues described in [#930](https://github.com/tsparticles/tsparticles/issues/930), still not implemented the color animation ([18f82d5](https://github.com/tsparticles/tsparticles/commit/18f82d5c7317ac002edd14335de41ce750fc3820))
- handling "mid" value in links colors ([0698d04](https://github.com/tsparticles/tsparticles/commit/0698d0461d8d2f882f219e6e08b1aa7076264462))
- image shape fixed ([cdfbd35](https://github.com/tsparticles/tsparticles/commit/cdfbd355d24501badff0cc408b3f2341f2b0e730))
- improved angular component id management ([2d8c67b](https://github.com/tsparticles/tsparticles/commit/2d8c67b514fefad3530beec2b5b83502b9659097))
- improved component and updated README ([9cf98cc](https://github.com/tsparticles/tsparticles/commit/9cf98ccf97d266aba19a42db454ca569b9fd205b))
- improved container guard check before doing stuff ([ebca38e](https://github.com/tsparticles/tsparticles/commit/ebca38ed5e208b6f1ab507fa7cd1221cdbd7cbc5))
- improved container reset ([e4996d0](https://github.com/tsparticles/tsparticles/commit/e4996d0348301a79347826511d404b3b9fc4f520))
- improved image mask plugin code, making it reusable for text or generic canvas ([579e8d8](https://github.com/tsparticles/tsparticles/commit/579e8d83f5785a033e578b351fb6629cc9ab0565))
- improved images loading ([2690f4a](https://github.com/tsparticles/tsparticles/commit/2690f4a33eeb5950af13ded2cd3be18ecae66984))
- improved new methods without id ([9b7a106](https://github.com/tsparticles/tsparticles/commit/9b7a106acd4c3225aa001f12ab25e4c2b89dde66))
- improved out modes and spin movement ([1c811cf](https://github.com/tsparticles/tsparticles/commit/1c811cfefe0b004857b3174e766a34d9bf614361))
- improved shapes with full delta object ([04430ba](https://github.com/tsparticles/tsparticles/commit/04430ba5d553373e544e46237de758b03a36453f))
- improved snow preset, added a small wobble effect ([7802f55](https://github.com/tsparticles/tsparticles/commit/7802f55d8f51ba0f1ccf41ba3741713b67bc4b4f))
- improved some linker updater code ([e29de1a](https://github.com/tsparticles/tsparticles/commit/e29de1a03f5c7625dfe495817ec63bbf9ce9f352))
- improved svg replace color ([eb45226](https://github.com/tsparticles/tsparticles/commit/eb4522653eba3fad812f4cdab035bfe4144a77fa))
- improving container destruction ([c4ebce6](https://github.com/tsparticles/tsparticles/commit/c4ebce6ba3b6e6b5b68a1fa6b342d41fee31837b))
- jquery plugin improvements ([fd89b64](https://github.com/tsparticles/tsparticles/commit/fd89b648ddf1fae2a565d3635152cc58b8bd0ead))
- jquery plugin improvements ([25024e1](https://github.com/tsparticles/tsparticles/commit/25024e1779b13d2823215072e2290c397ccb0e39))
- links fixed ([4656901](https://github.com/tsparticles/tsparticles/commit/4656901dbb88d5935a40250a7e016a529f05832e))
- links won't link non-existing particles ([078c7f9](https://github.com/tsparticles/tsparticles/commit/078c7f91a89816f1b1c4b3b4f8bb4f9a6ad6f63c))
- main demo, fixed spiral shape sample ([bb09062](https://github.com/tsparticles/tsparticles/commit/bb09062b7a3425f2b2c4df6054589b582f29bcb3))
- make it possible to use a canvas element ([cf5a667](https://github.com/tsparticles/tsparticles/commit/cf5a667741f826f61712a112f42ae0d2c0f94822))
- manual particles optional position, now they can be random positioned with custom options ([0f67407](https://github.com/tsparticles/tsparticles/commit/0f674072786c80dc45946bf904a3fc544f428901))
- mouse events works a lot better when interactivity element is not canvas ([b39ec4f](https://github.com/tsparticles/tsparticles/commit/b39ec4fc009e5c6cfd1dff04c4dad9ca8983eeaf))
- moved gradients classes to gradient updater, lighter engine ([e08d09f](https://github.com/tsparticles/tsparticles/commit/e08d09f7243c4fd790b990e1c3f75c832b9e3ef3))
- moved some specific code to the relative project, removing it from the generic engine ([09fe635](https://github.com/tsparticles/tsparticles/commit/09fe63568adc244d11b7eff009626b905d5b05e4))
- moving canvas.clear closer to drawn breaks grab links, and maybe other interactions ([9b70b78](https://github.com/tsparticles/tsparticles/commit/9b70b786bd93ba7c245b8e24113156f747dd6608))
- opacity and size clamped, this should fix [#1001](https://github.com/tsparticles/tsparticles/issues/1001) ([013039e](https://github.com/tsparticles/tsparticles/commit/013039e9aeab277d8caeba87d9609b4cf2ade5df))
- options interfaces don't have load function anymore ([62cfc82](https://github.com/tsparticles/tsparticles/commit/62cfc82a28b7fcadbe5ad3db816bd5d4614d1dc0))
- particles could result misplaced at the beginning, this is now fixed ([eae0937](https://github.com/tsparticles/tsparticles/commit/eae0937ab99d6fd5a6d3dba58062d0037ab36c78))
- **readme:** fix error 404 links ([21bd331](https://github.com/tsparticles/tsparticles/commit/21bd3315437050c6cbc48d7ad2ed8f522937385f))
- reduced and fixed some out of canvas duplicate code ([a6bfb7b](https://github.com/tsparticles/tsparticles/commit/a6bfb7b79cd85a33f581aab0bde45a5fae9b1ee7))
- reframed a sentence ([463173e](https://github.com/tsparticles/tsparticles/commit/463173ece6299dd00e4e15eaed8a4a83f05798ed))
- removed all browser flags in package.json, a lot of issues with it. closes [#3094](https://github.com/tsparticles/tsparticles/issues/3094) ([1415875](https://github.com/tsparticles/tsparticles/commit/14158755ec80ace4e0c520cef407b2d7f4078568))
- removed an old console.dir, fixes [#1412](https://github.com/tsparticles/tsparticles/issues/1412) ([0cb8708](https://github.com/tsparticles/tsparticles/commit/0cb8708f639aafd44f525f16a150a3cfd3ebb71d))
- removed bad check when retrieving color range value ([27a0778](https://github.com/tsparticles/tsparticles/commit/27a0778ae0fcb57fde4a9d660af603a994efb1ac))
- removed circular imports ([98b2d80](https://github.com/tsparticles/tsparticles/commit/98b2d802482ec8c7fe9e4f72b32b498b55736c26))
- removed console log ([7f7ad63](https://github.com/tsparticles/tsparticles/commit/7f7ad6354a77a3da1d3d3fdbb6cefced17312113))
- removed deprecated options ([fc1676d](https://github.com/tsparticles/tsparticles/commit/fc1676d94799326f2bd0285995f2b166647e6b6d))
- removed useless check ([edb272e](https://github.com/tsparticles/tsparticles/commit/edb272ec5683933ed6309d03dbdd109c76607a1e))
- removed useless console.log (debug purposes) ([93835e7](https://github.com/tsparticles/tsparticles/commit/93835e70dfaeedc9ac926f362a3ff1d4509e31fd))
- removed useless variable ([88d2927](https://github.com/tsparticles/tsparticles/commit/88d29276006f956703149f580710a360f96af1de))
- replaceColor on SVG images, refactor previous fix, fixes [#1519](https://github.com/tsparticles/tsparticles/issues/1519) ([f04af8e](https://github.com/tsparticles/tsparticles/commit/f04af8e9096dcc28fd3da411bc50e7a1eb2560aa))
- replaceColor option on image particle, fixes [#1519](https://github.com/tsparticles/tsparticles/issues/1519) ([4a19da9](https://github.com/tsparticles/tsparticles/commit/4a19da9a06cb56396c79e1131c46df8820cc1c9f))
- simplified confetti preset ([81db6ed](https://github.com/tsparticles/tsparticles/commit/81db6edc24bbc32962f9e0d5fd45783e3c72e879))
- small improvements to links interaction ([f722b22](https://github.com/tsparticles/tsparticles/commit/f722b22ebb5bd9b864bfc0639ef14ca5c836343f))
- small improvements to links interaction ([4ce54d2](https://github.com/tsparticles/tsparticles/commit/4ce54d2990b13bbf722112de78eb6c9af2526620))
- solved performance drop issue after refresh, closes [#2809](https://github.com/tsparticles/tsparticles/issues/2809), [#2815](https://github.com/tsparticles/tsparticles/issues/2815), [#2936](https://github.com/tsparticles/tsparticles/issues/2936) ([286c3e8](https://github.com/tsparticles/tsparticles/commit/286c3e867fab2fcf0660a40abda60d1e756b1fdb))
- svelte-particles updated, fixes [#621](https://github.com/tsparticles/tsparticles/issues/621) ([0bfe74c](https://github.com/tsparticles/tsparticles/commit/0bfe74cf719c8c24c2acd6b40b8c0ae9a927e05f))
- trying fixing issue [#4151](https://github.com/tsparticles/tsparticles/issues/4151) ([83e3e06](https://github.com/tsparticles/tsparticles/commit/83e3e0625743decef39c8496f8b30ed367803a4f))
- typo in readme for react-tsparticles ([478460c](https://github.com/tsparticles/tsparticles/commit/478460cef74761d4bba88d8c5c97d41b4e73708a))
- updated all mermaid charts in the readme files, closes [#4763](https://github.com/tsparticles/tsparticles/issues/4763) ([eac8139](https://github.com/tsparticles/tsparticles/commit/eac813939b0857902cda1be0585e35e23e541723))
- updated all plugins to use new build system, improves imports compatibility ([0d75d97](https://github.com/tsparticles/tsparticles/commit/0d75d97c02c8a8f55e1697e4e7f0fdcf4c24ae4a))
- updated property to params to options ([bb6b287](https://github.com/tsparticles/tsparticles/commit/bb6b287ad22f1bee384dd0e51e7a8f7850348bb8))
- upgrade @angular/common from 13.3.1 to 13.3.2 ([aa4ea55](https://github.com/tsparticles/tsparticles/commit/aa4ea55966bdb85dac6c3d147dfa5f993ea1ea3c))
- upgrade core-js from 3.16.2 to 3.20.3 ([ca703e5](https://github.com/tsparticles/tsparticles/commit/ca703e5dffeb92843c2da7605f6d9af5f54d15a2))
- upgrade core-js from 3.17.3 to 3.20.1 ([bb54ae4](https://github.com/tsparticles/tsparticles/commit/bb54ae4727875006def6ebacdec1d904707c7440))
- upgrade core-js from 3.21.0 to 3.21.1 ([c405f3b](https://github.com/tsparticles/tsparticles/commit/c405f3bb3992bb3a5aa25c5e3d6b92559fa12df9))
- upgrade fs-extra from 10.0.0 to 10.0.1 ([35e46c6](https://github.com/tsparticles/tsparticles/commit/35e46c6dc0f3a35a582ef62dd94cca9b7fbc9bd3))
- upgrade highlight.js from 11.2.0 to 11.4.0 ([112a342](https://github.com/tsparticles/tsparticles/commit/112a342be47511c7ae15a788cbf377ad151f74c4))
- upgrade highlight.js from 11.4.0 to 11.5.0 ([59243fe](https://github.com/tsparticles/tsparticles/commit/59243feac3117efd871ba30023e43c2f3cacdccf))
- upgrade inferno from 7.4.9 to 7.4.11 ([29f7229](https://github.com/tsparticles/tsparticles/commit/29f7229192fc522accb8258d2b5905c90e38e421))
- upgrade inferno from 8.0.0 to 8.0.1 ([a62c06a](https://github.com/tsparticles/tsparticles/commit/a62c06ac36516159d5e10ce84f37b1bce4596c08))
- upgrade minify from 8.0.3 to 8.0.4 ([f91828c](https://github.com/tsparticles/tsparticles/commit/f91828c8321505d8861bbf154794eb4e8f061d72))
- upgrade multiple dependencies with Snyk ([796d33c](https://github.com/tsparticles/tsparticles/commit/796d33c91553ea4cf99b06f18fbf1ccf446f8152))
- upgrade multiple dependencies with Snyk ([d0726ef](https://github.com/tsparticles/tsparticles/commit/d0726efc7a97dfb6d18f864d215d357d1005ca3e))
- upgrade multiple dependencies with Snyk ([0667f67](https://github.com/tsparticles/tsparticles/commit/0667f67e403d331684cf5fb85036a0a76fc426d5))
- upgrade multiple dependencies with Snyk ([997ba11](https://github.com/tsparticles/tsparticles/commit/997ba11c2b03508778ef8931c3a4b701dc44970b))
- upgrade preact from 10.5.14 to 10.6.4 ([0e83038](https://github.com/tsparticles/tsparticles/commit/0e830385d790f8f84b875aefc7fdbcda19f01b12))
- upgrade preact from 10.6.5 to 10.6.6 ([525d1b7](https://github.com/tsparticles/tsparticles/commit/525d1b7e6145bcbbd205235982c2478796c882d2))
- upgrade preact from 10.8.1 to 10.8.2 ([b66330b](https://github.com/tsparticles/tsparticles/commit/b66330bd3af1cb14ea47abc6d1b62f6a0e8854e2))
- upgrade preact-render-to-string from 5.1.19 to 5.1.20 ([1b85be0](https://github.com/tsparticles/tsparticles/commit/1b85be0123f24a9cf23e54e70ba2c0dbabe0c0f1))
- upgrade preact-render-to-string from 5.1.20 to 5.1.21 ([f2fc2b9](https://github.com/tsparticles/tsparticles/commit/f2fc2b9d4cb454dfbae3e13f747b0392f135d537))
- upgrade preact-router from 4.0.0 to 4.0.1 ([c8740e1](https://github.com/tsparticles/tsparticles/commit/c8740e13db83fb95cdbd980f0b531e6ac1e09ff9))
- upgrade riot from 6.0.4 to 6.1.1 ([9e22dbd](https://github.com/tsparticles/tsparticles/commit/9e22dbda3869f16657266b5d4cc096947502c864))
- upgrade riot from 6.1.1 to 6.1.2 ([5eaa71c](https://github.com/tsparticles/tsparticles/commit/5eaa71c8d4af857a6829b2c1b371921e2d9f53e1))
- upgrade rxjs from 7.3.0 to 7.4.0 ([5579eff](https://github.com/tsparticles/tsparticles/commit/5579eff8393a8685f038a94de42f7bf057f73a79))
- upgrade rxjs from 7.3.0 to 7.5.2 ([ac52db7](https://github.com/tsparticles/tsparticles/commit/ac52db7274471a02caaf10e6aa0bcd587efdae3b))
- upgrade rxjs from 7.4.0 to 7.5.1 ([edf9c98](https://github.com/tsparticles/tsparticles/commit/edf9c98613fdf7c080275eecfcffac0c7048af46))
- upgrade rxjs from 7.5.4 to 7.5.5 ([866f8a8](https://github.com/tsparticles/tsparticles/commit/866f8a8ce102aeb04c66c4d21f26583643aa6aab))
- upgrade sass from 1.38.0 to 1.49.9 ([ff3f4fa](https://github.com/tsparticles/tsparticles/commit/ff3f4fadb6e3858985b810c14983258a8d8f16a3))
- upgrade sass from 1.51.0 to 1.52.0 ([854882b](https://github.com/tsparticles/tsparticles/commit/854882b4d490f9429f8f99a9098bfaf1f8e341d8))
- upgrade sass from 1.52.3 to 1.53.0 ([fb2ec98](https://github.com/tsparticles/tsparticles/commit/fb2ec98631e18673b008cd14e6b7c4cb4e40d94c))
- upgrade sirv-cli from 2.0.1 to 2.0.2 ([70f74fe](https://github.com/tsparticles/tsparticles/commit/70f74fed6693561fac9f259b3de6ea16a9c2fa32))
- upgrade stringify-object from 4.0.0 to 4.0.1 ([ffdcdff](https://github.com/tsparticles/tsparticles/commit/ffdcdff66691186cce6956df8ec41104dfd63594))
- upgrade vue from 3.2.29 to 3.2.30 ([5e13e9d](https://github.com/tsparticles/tsparticles/commit/5e13e9dad9efb691570369307eef39be9bc75d92))
- upgrade vue from 3.2.4 to 3.2.26 ([c9434b6](https://github.com/tsparticles/tsparticles/commit/c9434b67c361d96e537f27251f0dbd98a1dd215d))
- upgrade zone.js from 0.10.3 to 0.11.1 ([2f752ef](https://github.com/tsparticles/tsparticles/commit/2f752ef8cb9bda47e63c6c69486b80cafb32d2ed))
- used getRandom in canvas mask plugin for shuffling ([0161280](https://github.com/tsparticles/tsparticles/commit/0161280614b56461a87bfe06ed02c38982cda361))
- **website:** not loading font awesome script ([81b95a7](https://github.com/tsparticles/tsparticles/commit/81b95a793bf04b74f1cfceb91538e34bc0ff0c71))
- **website:** presets not scrollable in demos page ([4fae0ea](https://github.com/tsparticles/tsparticles/commit/4fae0ea70a13265ce1008543eabdbb158a0f1ad9))
- working on issues [#1269](https://github.com/tsparticles/tsparticles/issues/1269) and [#1256](https://github.com/tsparticles/tsparticles/issues/1256) ([2fd1c5c](https://github.com/tsparticles/tsparticles/commit/2fd1c5c3808db243edaa754d0a3fae314bc0722c))
- working on issues [#1269](https://github.com/tsparticles/tsparticles/issues/1269) and [#1256](https://github.com/tsparticles/tsparticles/issues/1256) ([ecd2170](https://github.com/tsparticles/tsparticles/commit/ecd2170404f2d796b0d3648dac76bbb5cfa54806))

### Code Refactoring

- **engine:** changed all enums to const, smaller output size ([9536087](https://github.com/tsparticles/tsparticles/commit/953608731be325c0c6b5f6811eb58f8898a1e353))

### Features

- add hsv color support ([39ad40a](https://github.com/tsparticles/tsparticles/commit/39ad40a0e67076985aa9cac684f337ea3e052a29))
- add multiline text shape ([c55a9d2](https://github.com/tsparticles/tsparticles/commit/c55a9d217967041e3d847b10a3f476a760bcc0bb))
- added a configs package, this will contains all the presets used in demos ([92fc41b](https://github.com/tsparticles/tsparticles/commit/92fc41b77a35295aee787b72952134d25899f251))
- added a first release of riot.js component ([1b373bd](https://github.com/tsparticles/tsparticles/commit/1b373bd976aed80ed106e685fc1fcbe557c2ba08))
- added all files for supporting the smaller engine, preparing for v2 incoming changes ([4d90c83](https://github.com/tsparticles/tsparticles/commit/4d90c83867b4801eeebd86651381ecf8e8ce5cec))
- added aria-hidden="true" to canvas element, fixes [#4785](https://github.com/tsparticles/tsparticles/issues/4785) ([8aaa038](https://github.com/tsparticles/tsparticles/commit/8aaa03862d2f23a51e0cbb997b853b4bd54bddda))
- added arrow shape ([09d962b](https://github.com/tsparticles/tsparticles/commit/09d962be91b721d4b93811e75d8b44912b1a6c45))
- added background mode to make the canvas acts like an animated background ([d911467](https://github.com/tsparticles/tsparticles/commit/d91146765581cc2d6ff42c6c68fd2726079638e0))
- added bounce to mouse hover event ([8bf39a2](https://github.com/tsparticles/tsparticles/commit/8bf39a2ef2a4a6649b99c394fe9e639c2c5997b1))
- added cards to wordpress plugin ([27ed9c3](https://github.com/tsparticles/tsparticles/commit/27ed9c344c26da592a83595837dea891b74d0b8b))
- added collisions to fountain preset ([3138f7f](https://github.com/tsparticles/tsparticles/commit/3138f7f4f50fbc467f5b3447fa0b1d1d8ca60709))
- added color and colorOffset options to split options ([74902b3](https://github.com/tsparticles/tsparticles/commit/74902b33cdd37839b48dbd694c2e070735f9956b))
- added compatibility to marc bruederlin's archived particles.js ([f4fa42b](https://github.com/tsparticles/tsparticles/commit/f4fa42b0424b4a67d9329047627ee1b86b5b6606))
- added confetti cannon preset ([625eeff](https://github.com/tsparticles/tsparticles/commit/625eeffa151b7d236f25414e8464628f166d0478))
- added cra-template-particles ([915f6bc](https://github.com/tsparticles/tsparticles/commit/915f6bcf809a070a073149e281622a3aca44c1f3))
- added cra-template-particles-typescript ([05b5417](https://github.com/tsparticles/tsparticles/commit/05b54170d009fa3243e9eafee662306c167a3eff))
- added custom events ([13fe1fe](https://github.com/tsparticles/tsparticles/commit/13fe1fe9d1a81db22a55c9a11adc706643a60d50))
- added decay options (not used yet) to animation objects ([141e1b2](https://github.com/tsparticles/tsparticles/commit/141e1b229e60fc8161d4060b8cfec111bfb60e0e))
- added decay to all animations ([954858e](https://github.com/tsparticles/tsparticles/commit/954858ec9ef85a7d9d676838399777e4a1a8b885))
- added delay to gradient animations ([0bbc1fc](https://github.com/tsparticles/tsparticles/commit/0bbc1fc0f528b6074726aff8833df94f7ecf7d9d))
- added delay to root options, fixes [#4766](https://github.com/tsparticles/tsparticles/issues/4766) ([8f0c377](https://github.com/tsparticles/tsparticles/commit/8f0c377601659ffaf9345c80f1aba3ed686b615f))
- added delta to path generators ([910eda1](https://github.com/tsparticles/tsparticles/commit/910eda1285663a5e340911fcb1adcf6ae768d9c7))
- added distance to move.attract options ([e5da4c6](https://github.com/tsparticles/tsparticles/commit/e5da4c648c876deccedf4e7ae605ef44142540bf))
- added divs selector on interactivity events ([831249f](https://github.com/tsparticles/tsparticles/commit/831249fde50fcfe888d4fd6c69691b4cbad48f5a))
- added domId property to Emitters options ([9408d14](https://github.com/tsparticles/tsparticles/commit/9408d148138e0bacea6d2e426c885a66c625e1a6))
- added drift (numeric or min/max object) ([87adda3](https://github.com/tsparticles/tsparticles/commit/87adda3451c46708dfcfd4431bc9fdf6ff25765f))
- added duration to options ([d4c0a8d](https://github.com/tsparticles/tsparticles/commit/d4c0a8ddb88d3699a1d3974db9bda38f4c47dd79))
- added easings to attract and repulse interactions ([071f515](https://github.com/tsparticles/tsparticles/commit/071f5157f28ec91948c07ee9f30e9bc0b15a01db))
- added element options to canvas mask, for using an external created canvas ([0770c13](https://github.com/tsparticles/tsparticles/commit/0770c13fa7e22e6ffd286c97f0854415f9cc450d))
- added error prefix to standardize error messages ([f735252](https://github.com/tsparticles/tsparticles/commit/f73525291139f45c1b5abda04b604813f9247d9f))
- added event handler for svelte component ([86a5e65](https://github.com/tsparticles/tsparticles/commit/86a5e6563e6485fb9ead75a88c9b23cfeee96871))
- added external presets to editor ([ef06afc](https://github.com/tsparticles/tsparticles/commit/ef06afc13ae42e3569a125ba92971408b15864a9))
- added feature from issue [#797](https://github.com/tsparticles/tsparticles/issues/797) ([79197c9](https://github.com/tsparticles/tsparticles/commit/79197c96a4ed55a9d9ba62232ae7c1ffe78c5890))
- added filter option to sounds event, it's a function that checks if an event can play a sound ([a0be41b](https://github.com/tsparticles/tsparticles/commit/a0be41b616d42217d8a57798a3ff3d3cafd6b6a0))
- added fireworks preset ([0615bc1](https://github.com/tsparticles/tsparticles/commit/0615bc177ce39b5127d70812df281757ec3e851e))
- added font options to text mask ([ddcfa6d](https://github.com/tsparticles/tsparticles/commit/ddcfa6d68e3b8030bbbf8085a2177b845b0d86df))
- added getEmitter and getAbsorber to plugin container ([24c9f97](https://github.com/tsparticles/tsparticles/commit/24c9f971627b2ea8bad921a7b619ca207f3b717d))
- added gradient angle animated rotation support ([de8f0a4](https://github.com/tsparticles/tsparticles/commit/de8f0a46436601aeb580651b1f87741fd9fc3c79))
- added gradient options for particles ([c8ecec7](https://github.com/tsparticles/tsparticles/commit/c8ecec7eeda3ecedcdda3bf21eb8fa71c2a276ef))
- added gravity and edge bounce customization ([cfdfe53](https://github.com/tsparticles/tsparticles/commit/cfdfe53de72a33686fb73ea345c08a7a27542ba0))
- added HSV support ([5083e08](https://github.com/tsparticles/tsparticles/commit/5083e089d55bf92eab2505d440be7b226b67d01a))
- added image preload ([b8072f6](https://github.com/tsparticles/tsparticles/commit/b8072f60863a5138d746621e69f4699c8b3b6366))
- added init state to react, preact and inferno components ([2fbc361](https://github.com/tsparticles/tsparticles/commit/2fbc361060d58db48faa6836b249e704e0b04e04))
- added languages folder and file to wordpress plugin, fixes [#4807](https://github.com/tsparticles/tsparticles/issues/4807) ([ab12d1d](https://github.com/tsparticles/tsparticles/commit/ab12d1d186ea83c01b8206c784a9915fde308d03))
- added localization support to wordpress plugin, fixes [#4807](https://github.com/tsparticles/tsparticles/issues/4807) ([8a93b8a](https://github.com/tsparticles/tsparticles/commit/8a93b8a3d6a1327903c745d7a3b04cb41e5249c8))
- added loop options to sounds audio values ([3f017b6](https://github.com/tsparticles/tsparticles/commit/3f017b6f93ac8e3a539184ab8d30b4f67db1b1f2))
- added mass to particle, this will improve collisions ([65779c9](https://github.com/tsparticles/tsparticles/commit/65779c936412a9ae6ee8eb7898bc4a5bb347de83))
- added max speed value to collisions options ([6708716](https://github.com/tsparticles/tsparticles/commit/670871683deb645fde69f781e7845648250efa2a))
- Added missing TypeDefinitions for TypeScript 4.4 ([99c31c8](https://github.com/tsparticles/tsparticles/commit/99c31c8755916a16123506606fdb408bc4b574f0))
- added mode to more coordinates options ([543cfab](https://github.com/tsparticles/tsparticles/commit/543cfabb07f2ba56d3a4394ffc74cf0f57489f41))
- added more absorber size limit options ([f2d0493](https://github.com/tsparticles/tsparticles/commit/f2d0493f34bc373846d8a8ae78e36dd56816308e))
- added more easing types ([5f8f1c4](https://github.com/tsparticles/tsparticles/commit/5f8f1c43503b022494b28dbff229337da9f45fd1))
- added more events to emitters and polygon mask ([cea5ed6](https://github.com/tsparticles/tsparticles/commit/cea5ed6cb778dfba07316673311a794585993760))
- added motion options to editor ([80a30a7](https://github.com/tsparticles/tsparticles/commit/80a30a783de4741032cc791bc5c36469e9ab2e6f))
- added motion options to handle prefers-reduced-motion media query, fixes [#888](https://github.com/tsparticles/tsparticles/issues/888) ([89a4ffb](https://github.com/tsparticles/tsparticles/commit/89a4ffb7f13b1c6585097c1e9e2a4a0c78074512))
- added movement speed affected by particles size ([3a3d893](https://github.com/tsparticles/tsparticles/commit/3a3d893c8091fe8d550c31e49d448f4969b00685))
- added multiple emitters supported, instead of single or randomized ([cf401aa](https://github.com/tsparticles/tsparticles/commit/cf401aac3be9d3baaa2f01fb4ddf97d437a4343f))
- added multiple melodies to melody for creating two handed melodies, für elise demo ([b2ed85f](https://github.com/tsparticles/tsparticles/commit/b2ed85f12961091280b4a98b528dc92f6846070e))
- added mutation observer to avoid style changes to the canvas when in fullscreen mode ([65b33e2](https://github.com/tsparticles/tsparticles/commit/65b33e2f6827c6822e0abf4332cabbffa945e8bf))
- added new cards shape, containing all 4 suits ([79c625e](https://github.com/tsparticles/tsparticles/commit/79c625ed818d42616bb8fbc0d5c098f5f8cf1a69))
- added new cog shape ([03a0d86](https://github.com/tsparticles/tsparticles/commit/03a0d86630ecaef396f1dd86904401c9370ceeee))
- added new external shape rounded-rect, closes [#1220](https://github.com/tsparticles/tsparticles/issues/1220) ([a403902](https://github.com/tsparticles/tsparticles/commit/a4039026f0bdd53abc0158502f0b16484192fd63))
- added new functions for loading options, this will be useful for removing all the classes ([89501c5](https://github.com/tsparticles/tsparticles/commit/89501c540596892109f7e9cf24bd69064a30a70d))
- added new methods to particle class ([5743453](https://github.com/tsparticles/tsparticles/commit/5743453906001569f262888aa54539ad4e1463ac))
- added new move direction: inside and outside, out modes needs more fixes ([32a70a6](https://github.com/tsparticles/tsparticles/commit/32a70a68a155db1ed796519addd7298e33a39094))
- added new opacity options to editor ([f8bb792](https://github.com/tsparticles/tsparticles/commit/f8bb792f3430df73e7467b9f849343c75787344c))
- added new preset ([f3c677a](https://github.com/tsparticles/tsparticles/commit/f3c677a2872bde43e4bce6e2886cc1d3f6d64297))
- added new resize object to interactivity options, can change the debounce delay, fixes [#4803](https://github.com/tsparticles/tsparticles/issues/4803) ([c79cccc](https://github.com/tsparticles/tsparticles/commit/c79ccccdc1f3be6c1a9fc2d471d5d7b5ab64d7a7))
- added new sections to editor ([a16e164](https://github.com/tsparticles/tsparticles/commit/a16e164bf71d063edb557ce481a218fb68fc437d))
- added new speed object for wobble effect ([a450513](https://github.com/tsparticles/tsparticles/commit/a450513b04dedb7f4c18ad98278ef23094f22016))
- added new split options to editor ([d115feb](https://github.com/tsparticles/tsparticles/commit/d115feb5e7c220ae986b89fb472579f82098c5d4))
- added new tspRandom function and setRandom for customizing all the random behaviors ([bd83a57](https://github.com/tsparticles/tsparticles/commit/bd83a57b2eb8b455450a5940ba4c4d5ff34834b2))
- added noise/path generator in plugins management ([7599d90](https://github.com/tsparticles/tsparticles/commit/7599d901120be8b4f6730df86addc8b9516754ab))
- added option to pause the animation while the element is outside the viewport ([e28a624](https://github.com/tsparticles/tsparticles/commit/e28a624e3ac9e7510d136390841b26fc030cde1b))
- added orbits as a plugin from v2, closes [#188](https://github.com/tsparticles/tsparticles/issues/188) ([a78aaac](https://github.com/tsparticles/tsparticles/commit/a78aaac436e14a196031c4a0fe3da16a65b91ad1)), closes [#609](https://github.com/tsparticles/tsparticles/issues/609)
- added outside and inside movement to out modes ([8d648e2](https://github.com/tsparticles/tsparticles/commit/8d648e2876249d8acd6b5e5a56455200ab03f117))
- added overlap options to collisions ([62d43b9](https://github.com/tsparticles/tsparticles/commit/62d43b9876c13c17398a65640081f6b3453c262d))
- added particle back color used in roll options ([497525a](https://github.com/tsparticles/tsparticles/commit/497525a1855cf87e35e9248337bb819c8777f2af))
- added particles loaded event to angular component ([81400e8](https://github.com/tsparticles/tsparticles/commit/81400e88c8451643828684e521c9900637165ca1))
- added particles options to trail interactivity options ([c814550](https://github.com/tsparticles/tsparticles/commit/c81455011e93971ea920f6f08ffe984ca8d4a207))
- added particles pool for reusing destroyed particles ([ee56851](https://github.com/tsparticles/tsparticles/commit/ee568519b343cfc234bd1de2d7da2d6b90e9a8fa))
- added pauseOnStop on trail hover mode ([14cd117](https://github.com/tsparticles/tsparticles/commit/14cd117b223706df57ecb9aaf0fa0f13fd347ef3))
- added polygon path plugin ([623b62d](https://github.com/tsparticles/tsparticles/commit/623b62d14636a50082fc3709f299bc4c7d5c44cb))
- added position options to canvas mask ([8759b84](https://github.com/tsparticles/tsparticles/commit/8759b84f7abbbfe374c0ba570d2ca27b69316896))
- added range colors to all color fields ([1b6f32a](https://github.com/tsparticles/tsparticles/commit/1b6f32ad50beb3dc4813187a6e1d03f3013f3ca9))
- added ranged values in stroke width and opacity properties ([5d3806d](https://github.com/tsparticles/tsparticles/commit/5d3806dd5d097f2913b0f7f480eaeaab512d0be1))
- added reset method to updaters ([ad7a960](https://github.com/tsparticles/tsparticles/commit/ad7a9601a7088c786ab6b04dd0a0381069ff2dc2))
- added reset to path generators, this fixes issues with sea anemone and polygon path plugins ([97830dc](https://github.com/tsparticles/tsparticles/commit/97830dc8dffbb0356c82449727ec85a8ac042391))
- added resize observer, this will replace window.resize if available ([4197f26](https://github.com/tsparticles/tsparticles/commit/4197f2654e8767039dbfd66eca34f261ee3d88c8))
- added roll editor ([4560212](https://github.com/tsparticles/tsparticles/commit/45602123f0b6462e63245397da63aabb8f75c68c))
- added roll options to particles, this is the latest missing feature to the confetti rework ([98d9428](https://github.com/tsparticles/tsparticles/commit/98d94285cb653a7d5fa1da4fe4d3bf0f73785e29))
- added shape options to circle, added range values to polygon and star shape options ([694e728](https://github.com/tsparticles/tsparticles/commit/694e728118ed42301dff6d310959cfcc1343c1d3))
- added shapes and fill options to emitters ([e8b32a3](https://github.com/tsparticles/tsparticles/commit/e8b32a372190511c3350f6ddb112d0ff8f736c27))
- added sides count to particle to improve the shadow for the light over ([d9110ef](https://github.com/tsparticles/tsparticles/commit/d9110efa8ebf049a876f0f001e858548921156f9))
- added sizeOffset option to destroy split section ([a6b9ba0](https://github.com/tsparticles/tsparticles/commit/a6b9ba0e207f7976c7a91fe1e2091e7fd40effb4))
- added smooth options, it ignores the fpsLimit trying to create a smoother animation\* ([5ad1a27](https://github.com/tsparticles/tsparticles/commit/5ad1a27dd7496377aa2f87e2c32b1b45b2c68ef7))
- added start count to emitters ([5403426](https://github.com/tsparticles/tsparticles/commit/540342630e67baf665f114f9667001638cf5dc3d))
- added style options ([12045cd](https://github.com/tsparticles/tsparticles/commit/12045cdfe3111e018258a7bc1c88974e28b6f31e))
- added support for multiline text in canvas mask text options ([eceacbe](https://github.com/tsparticles/tsparticles/commit/eceacbe1a66974518e6179bb9ea7199787bef220))
- added support for multiple shapes declared at once ([463d099](https://github.com/tsparticles/tsparticles/commit/463d099b9e50cfe99b494a49329f9431a5e1ced3))
- added support to text and generic canvas input to canvas mask plugin ([c576656](https://github.com/tsparticles/tsparticles/commit/c57665631903623b18832387a3e73e77841c0b69))
- added tilt effect to particles, this was called wobble in previous commit ([7eade2e](https://github.com/tsparticles/tsparticles/commit/7eade2e5558055cd14ec524cd323c76c81c29549))
- added triangles frequency, but needs some work to be completed, started working on [#691](https://github.com/tsparticles/tsparticles/issues/691) ([37e1c92](https://github.com/tsparticles/tsparticles/commit/37e1c926e647e5d450e998ff7f7bb3c45aa3d850))
- added triangles preset ([2a7aa6a](https://github.com/tsparticles/tsparticles/commit/2a7aa6a98666defea5ecc2bc42aed44d6257a70e))
- added v1 plugins to slim and full bundle, fixed some stuff in pjs plugin ([411ddce](https://github.com/tsparticles/tsparticles/commit/411ddcec5e47940546884bf3135800e06b267a21))
- added Vector class taken from v2, this will be used wisely ([14249aa](https://github.com/tsparticles/tsparticles/commit/14249aa08e71b2915636bc02ee87a40c310f0030))
- added version to engine ([9406873](https://github.com/tsparticles/tsparticles/commit/9406873c6551b59e64edbe3a0e4fe59ef2cde4c6))
- added volume buttons to sounds plugin ([3c914c1](https://github.com/tsparticles/tsparticles/commit/3c914c1c24ccda0bdda37ebe507ae0abb1ecf050))
- added vue plugin for simpler usage ([930a892](https://github.com/tsparticles/tsparticles/commit/930a892a65d6742c315a68eb63ee84b4c3736aa9))
- added web component ([d226304](https://github.com/tsparticles/tsparticles/commit/d2263046fbf215ac9a374a8afd92c1bf7e3ab520))
- added wobble effect to particles, bringing confetti animations to all particles ([4146eec](https://github.com/tsparticles/tsparticles/commit/4146eecf83ceb35a6f6455339f2c8649be433b57))
- adding new path plugin, using svg paths as a source ([72316ec](https://github.com/tsparticles/tsparticles/commit/72316ec38ee3556ad2db0af4e84a14529ddb1b9b))
- adding plugins to wordpress gutenberg block ([dd340be](https://github.com/tsparticles/tsparticles/commit/dd340be2a9f83dac1ce11c70ba97e8d1d75c6e27))
- adding SolidJS component ([96677e7](https://github.com/tsparticles/tsparticles/commit/96677e7d43474e4454843eb6fd6a2aec900f2f0b))
- animation loop count for opacity and size ([d38a0a3](https://github.com/tsparticles/tsparticles/commit/d38a0a32b20c26faab97691993079bd48e1cd5d6))
- async presets ([86f3038](https://github.com/tsparticles/tsparticles/commit/86f3038bfc336744e88bb3d6ab7dfd4a36ada4e6))
- attract interaction improvements ([a66769a](https://github.com/tsparticles/tsparticles/commit/a66769aa7a3650bf8ec9df1c5b702b25f7c24d34))
- auto themes ([d80b78c](https://github.com/tsparticles/tsparticles/commit/d80b78cb49ae04796473bd06f827d5d5a29a3e35))
- base attraction class, just repulse with opposite sign ([d39c20b](https://github.com/tsparticles/tsparticles/commit/d39c20bf68681f2482dcd4bbcf76dd24fb8da0cd))
- bounce mode for divs, working only on squared divs but it's something ([24aeb1e](https://github.com/tsparticles/tsparticles/commit/24aeb1e69c3a8847e52efd6c81b11fabbc1050bc))
- bounce mode is now working fine for circular divs too ([b92ef32](https://github.com/tsparticles/tsparticles/commit/b92ef321010904d84c4b365bd111bd0c6c5ef47b))
- bubble color can now be mixed with the original one to have a smoother effect ([df11d66](https://github.com/tsparticles/tsparticles/commit/df11d66ee94fb9594805a5dfb7d4c776a93c4532))
- by default motion is reduced when css motion reduction is enabled ([fe4d59d](https://github.com/tsparticles/tsparticles/commit/fe4d59d2f39b67efa6f8630c7417a86d6bdb2c06))
- changed angular and vue component name and syntax, changed version to 2.0.0 for breaking changes ([58d58f9](https://github.com/tsparticles/tsparticles/commit/58d58f9a37a116cab7ad656331f59ee9236ccf1b))
- changed collision absorb code, added absorb.speed option to collisions section ([346b5be](https://github.com/tsparticles/tsparticles/commit/346b5be40b5e7384f54378f3f4fcf67bd0af3488))
- changed despawn confetti action using opacity animation, was life duration, closes [#4978](https://github.com/tsparticles/tsparticles/issues/4978) ([6032aa9](https://github.com/tsparticles/tsparticles/commit/6032aa95f43d474adf6423e4b7e2c319500cd114))
- changed load interactivity options to load mode options and moved to external interactors only ([697a155](https://github.com/tsparticles/tsparticles/commit/697a155856c81ad2d4793404f9fc9e34ff78ed68))
- changed loadJSON with multiple configs and an optional index to select one of them ([bdba2ef](https://github.com/tsparticles/tsparticles/commit/bdba2ef691d272bc6b3d29f45dac25b4c8469c3e))
- changed particles move distance to an horizontal/vertical object, single number still valid ([a0b16ed](https://github.com/tsparticles/tsparticles/commit/a0b16ed6df01371d8f00f29047efc04aad10bdbe))
- changed particles.js compatibility with a new plugin ([4b7c90b](https://github.com/tsparticles/tsparticles/commit/4b7c90bfd5d4299f828bc855d08fb1c4781cbdf2))
- changed particlesInit on angular, is a property now and not an event ([38f6219](https://github.com/tsparticles/tsparticles/commit/38f62190549bb194e6ab542ba834ae2118f99ba6))
- collisions between particles have now the bounce factor customizable ([da68ce7](https://github.com/tsparticles/tsparticles/commit/da68ce7ca974206af7781b833203ea0b1a6b0966))
- completed [#691](https://github.com/tsparticles/tsparticles/issues/691), need to improve links and triangles performance ([9d82c2c](https://github.com/tsparticles/tsparticles/commit/9d82c2c888a9e93cd4b5c2523a055561e01af8de))
- completed HSV support ([0cf39d0](https://github.com/tsparticles/tsparticles/commit/0cf39d03cb5494965087d8dc4ee40ae3468aeafd))
- confetti animations are now splitted in two generic particles sections (tilt, wobble) ([b88afaf](https://github.com/tsparticles/tsparticles/commit/b88afaf6fbd59991e97e22560ccd2c61f00c0362))
- confetti shape, closes [#605](https://github.com/tsparticles/tsparticles/issues/605) ([ae0dbd4](https://github.com/tsparticles/tsparticles/commit/ae0dbd49cfc58972a93d29f10546b525476b1097))
- containers now can have more than one path generator, each particle will keep its own ([94f2985](https://github.com/tsparticles/tsparticles/commit/94f29855b6fd646a61bf2c7bd2df8ffe18990c77))
- created and implemented move plugins ([752483a](https://github.com/tsparticles/tsparticles/commit/752483aeeb94dd851dc27fe75e4c258fd87f0a90))
- created destroy updater, moved all particles destroy (split and similar) code from engine ([f8642fd](https://github.com/tsparticles/tsparticles/commit/f8642fda3f43688ae7a0df55f5b06bb2a45d9e80))
- created gradient updater library, only colors for now ([7d31c62](https://github.com/tsparticles/tsparticles/commit/7d31c62ecb8f023234514b5ef46f0de55f75c283))
- created inferno component ([ba2f150](https://github.com/tsparticles/tsparticles/commit/ba2f150bade64ec2e295267a8f8b5ae181747647))
- created motion plugin for handling motion sickness ([c8b5b09](https://github.com/tsparticles/tsparticles/commit/c8b5b090f5059219c8ab1578e7a52ebc1fac6e14))
- created path shape ([d46adbf](https://github.com/tsparticles/tsparticles/commit/d46adbfaabad01bd5487bb96a6849bba034f49b6))
- created sounds plugin, no sounds yet, added only mute/unmute icon ([5a5970d](https://github.com/tsparticles/tsparticles/commit/5a5970d31682c62197608757cfd66b4b9c876e06))
- created vue3 component, closes [#832](https://github.com/tsparticles/tsparticles/issues/832) ([e6430e9](https://github.com/tsparticles/tsparticles/commit/e6430e9162b6cb1ac72c38c02c70521d2e77d949))
- created wordpress plugin folder, working on it to create a tsParticles block ([ac6de31](https://github.com/tsparticles/tsparticles/commit/ac6de3168c4761af258bc5ec45cafca45eb9b3f2))
- creating confetti and fireworks bundles, easier use for these features ([6a7af46](https://github.com/tsparticles/tsparticles/commit/6a7af46f82b6ea70bbbba78b6f68e2529b6109a4))
- emitter rate delay and quantity are now RangeValues so they can be randomized ([2fb937a](https://github.com/tsparticles/tsparticles/commit/2fb937a1bd1790c9acc8ab2bb75089f274a61c38))
- emitters and absorbers now can have a name in options ([d2b731e](https://github.com/tsparticles/tsparticles/commit/d2b731e67ec47ea7d50d3d8d7cf3e9b1ab9d840b))
- emitters plugin adds play/pause emitters methods to container (closes [#1184](https://github.com/tsparticles/tsparticles/issues/1184)) ([80eeed2](https://github.com/tsparticles/tsparticles/commit/80eeed2f6ab414d8d292172d4e30b85d714e8978))
- emitters spawn color ([f37fa01](https://github.com/tsparticles/tsparticles/commit/f37fa010b2c945c02b0db951642eb3bbde9f8c1e))
- enabled full screen by default, window is now the default interacitivity target ([e205e4c](https://github.com/tsparticles/tsparticles/commit/e205e4c9811b73c53ece9bb53a8a541c88afc017))
- first attempt of repulse bounce back ([8379f9c](https://github.com/tsparticles/tsparticles/commit/8379f9ce912f310b0602b462dda03c61924fe9f3))
- first round of vector on particles done ([c76ce11](https://github.com/tsparticles/tsparticles/commit/c76ce114a4a0546d29efa909b321a8dfb04db1ff))
- first version of image mask plugin, needs refactoring but works ([fd8a142](https://github.com/tsparticles/tsparticles/commit/fd8a1425f47e480c5703b8b3e2fe48ccdba5c79c))
- fixed [#739](https://github.com/tsparticles/tsparticles/issues/739), added outModes instead of a single out mode, every edge now can be customized ([67194dc](https://github.com/tsparticles/tsparticles/commit/67194dcceb2a78d75c75d331e4940d3900557875))
- fixed firefly and fireworks presets ([ec952c9](https://github.com/tsparticles/tsparticles/commit/ec952c9ac0b42dc1c5350279a44a1255ca1f4fca))
- fixed fountain presets ([3b47867](https://github.com/tsparticles/tsparticles/commit/3b478673153181396446f510d7ca5ad09abfcd4f))
- fixed lazy loading ([0f774ef](https://github.com/tsparticles/tsparticles/commit/0f774ef3d837f41b872bf866c4f4a87e4bafed6e))
- fixed lazy loading ([60f9689](https://github.com/tsparticles/tsparticles/commit/60f96899bc564e547a49a5e17be4f40fe12288ba))
- fixed links and triangles presets ([fdd4d8b](https://github.com/tsparticles/tsparticles/commit/fdd4d8b13ae7c23a5bafd001d2f0169193804f12))
- fixed links presets ([9812393](https://github.com/tsparticles/tsparticles/commit/9812393eafea002d7d68dc5b302c5c56346e3319))
- fixed new wait life emitter option ([ae88774](https://github.com/tsparticles/tsparticles/commit/ae88774239060da6d7b9e98029bf1819511202d6))
- fixed sea anemone presets ([0df846d](https://github.com/tsparticles/tsparticles/commit/0df846d81b736b38f8e920b207ab973811695622))
- fixed snow preset ([38cba58](https://github.com/tsparticles/tsparticles/commit/38cba5884e01be5721395e5f084eb24ac15806de))
- fixed some editor outdated fields and added some new ([30b4ac9](https://github.com/tsparticles/tsparticles/commit/30b4ac9f59c2b09768fcb3432114bcbb027c8577))
- fixed stars preset ([04e7f4c](https://github.com/tsparticles/tsparticles/commit/04e7f4cd9bda078410940c561a20d57a5502f6e1))
- found a good solution with good performance to fix [#691](https://github.com/tsparticles/tsparticles/issues/691) ([08c37a5](https://github.com/tsparticles/tsparticles/commit/08c37a5e38221d100de5b538242169f37947e668))
- hsv color documentation ([c63423d](https://github.com/tsparticles/tsparticles/commit/c63423d6c77e5276c6956ed1a91080257291aed0))
- implemented decay options in opacity and size updaters ([aace4cc](https://github.com/tsparticles/tsparticles/commit/aace4ccfc5c855b94d7a9ec46eafc268321408ad))
- implemented delay options in opacity, size and colors updaters ([dfd4e9f](https://github.com/tsparticles/tsparticles/commit/dfd4e9f711a83ff5ef6e1bcf5f6fdf62d61dc157))
- improved density values, now is 1:1 with number on 1080 resolution with pixel ratio of 1 ([3ff8fbf](https://github.com/tsparticles/tsparticles/commit/3ff8fbfefb01f1d6fe8be836c3c2909b74630475))
- improved fireworks preset ([cd23778](https://github.com/tsparticles/tsparticles/commit/cd23778190327340272fb53f9de7c44a2ae23aa2))
- improved image loading, now if an image is missing it will be loaded at runtime ([5155bef](https://github.com/tsparticles/tsparticles/commit/5155bef24ef3e3fa5ba4654361aabaab074c9957))
- improved image mask plugin options ([af527bc](https://github.com/tsparticles/tsparticles/commit/af527bc648ad9e6aa85fc0f2a27e29b35520398c))
- improved move path generators ([9b67377](https://github.com/tsparticles/tsparticles/commit/9b67377f9208a005b122e312ad4ad3c95a50deb7))
- improving the path svg plugin ([94c8e94](https://github.com/tsparticles/tsparticles/commit/94c8e94af897aebc3043c8a98a95e37c09a8c6ba))
- improving the path svg plugin ([8a830a2](https://github.com/tsparticles/tsparticles/commit/8a830a2751c67a601efec1c2dddd50059ac1d843))
- interactivity options overrides in particles options, closes [#4120](https://github.com/tsparticles/tsparticles/issues/4120) ([309afb5](https://github.com/tsparticles/tsparticles/commit/309afb5749e40373648bf9173800334da4dbf965))
- loading updater options in updaters instead of in the engine, started from wobble ([85abd01](https://github.com/tsparticles/tsparticles/commit/85abd01a618efd3afd17f6fd605d46005cd842dd))
- loadJSON can accept also a string array and an optional index parameter ([2ecd9f9](https://github.com/tsparticles/tsparticles/commit/2ecd9f9322293a80ded07f70acc5be2f12aca8f0))
- manual particles, fixes [#839](https://github.com/tsparticles/tsparticles/issues/839) ([4531b4a](https://github.com/tsparticles/tsparticles/commit/4531b4a567db2b31715a3be59e9b50161a23ea9d))
- migrated to chunks ([58b69c1](https://github.com/tsparticles/tsparticles/commit/58b69c130d1e768c0dc0a1b61e904c23408e6ec5))
- more rangeable options ([a2598c0](https://github.com/tsparticles/tsparticles/commit/a2598c07e968ab383c0a1eb311e22c4a0f52d9b8))
- mouse acts like a light source, closes [#606](https://github.com/tsparticles/tsparticles/issues/606) ([84aad25](https://github.com/tsparticles/tsparticles/commit/84aad25f3dfd5da9e99818e87c9b3f6a30c6f590))
- mouse attract now have better speed values for click ([3f5cb8e](https://github.com/tsparticles/tsparticles/commit/3f5cb8eb7fc7a9a2540aa467fac313d589c856f6))
- mouse attract now have better speed values for hover ([8e10252](https://github.com/tsparticles/tsparticles/commit/8e102522321c5e048be2bdd4846db2bf6237e8d8))
- moved absorbers to an external plugin, breaking ([5e7223f](https://github.com/tsparticles/tsparticles/commit/5e7223fb6b505260eb72899ec1e9762d96a5c4d7))
- moved all easings to plugin packages, slim now depends on easing-quad since it's the default ([d4e4b8f](https://github.com/tsparticles/tsparticles/commit/d4e4b8f6685ab748e82322877bf1e9d2d23574d4))
- moved all interactions in external packages, breaking ([76c44df](https://github.com/tsparticles/tsparticles/commit/76c44dfa64cae994ddb1a004e7ff6cdbe3a4b5a9))
- moved all plugins to external packages, breaking ([a3edcec](https://github.com/tsparticles/tsparticles/commit/a3edcecd129009e7d9af138dd9a1285360e7003d))
- moved all shapes to external packages, breaking ([77e4113](https://github.com/tsparticles/tsparticles/commit/77e411338f65ab076fe85c0f143c13417147d4b5))
- moved emitter shapes to a plugin system, so they can be customized by users ([5bec360](https://github.com/tsparticles/tsparticles/commit/5bec36067804b425af12766275da74fbfe89d20c))
- moved gravity data from engine to base mover ([ead8f6e](https://github.com/tsparticles/tsparticles/commit/ead8f6e7d6e8fc579b6a5f45949b196b523c26f7))
- moved hsv color management to external plugin since it's not commonly used ([d2cf77b](https://github.com/tsparticles/tsparticles/commit/d2cf77b6b4a81c09ed46c137941e7d6eddf5ea43))
- moved life options to life updater ([ea85856](https://github.com/tsparticles/tsparticles/commit/ea85856de8246e09a01bdcd4d12fb86bc04631ee))
- moved links options out from engine ([3d1dd68](https://github.com/tsparticles/tsparticles/commit/3d1dd6884337f3d6c77d8348351d985364a1aae1))
- moved more code out from engine to specific plugins ([ea70ea2](https://github.com/tsparticles/tsparticles/commit/ea70ea22ebc03579b31d0b926bfac8bcfb9606c5))
- moved more code out from engine to specific plugins ([14d4887](https://github.com/tsparticles/tsparticles/commit/14d488756b759b7650e02886ed862f821a6e8ed1))
- moved more code out from engine to specific plugins ([e28e28d](https://github.com/tsparticles/tsparticles/commit/e28e28d7b1a2d3d49334024c012bd49c3b0a40a6))
- moved more code out from engine to specific plugins ([eea8fee](https://github.com/tsparticles/tsparticles/commit/eea8fee6512722fce084385f8ae36f9e99a44ab9))
- moved more code out from engine to specific plugins ([9e00627](https://github.com/tsparticles/tsparticles/commit/9e00627dc5e7c864b559f53e79bcd49a537c17a4))
- moved more code out from engine to specific plugins ([7cc8ee4](https://github.com/tsparticles/tsparticles/commit/7cc8ee41b80cd151ae71eb6551484ab473b04175))
- moved more code out from engine to specific plugins ([cf88d6e](https://github.com/tsparticles/tsparticles/commit/cf88d6e2529cafd15c82253ab0099ed082eb2456))
- moved more code out from engine to specific plugins ([336a940](https://github.com/tsparticles/tsparticles/commit/336a9404a6f88e53a0f318d847e48bc54a5b4c03))
- moved more code out from engine to specific plugins ([bdd916b](https://github.com/tsparticles/tsparticles/commit/bdd916b157de7edd96e6401a2366f4e60416ab72))
- moved more code out from engine to specific plugins ([9279a1b](https://github.com/tsparticles/tsparticles/commit/9279a1b962cd20cce6e99a9ca3f137e60a51fc30))
- moved more code out from engine to specific plugins ([b504a14](https://github.com/tsparticles/tsparticles/commit/b504a147d6664faccf4fbc990d32c5dc07ef3945))
- moved more code out from engine to specific plugins, added new method to interactors ([c3aab68](https://github.com/tsparticles/tsparticles/commit/c3aab68c6ce3317ece3f76e6cd8745db8a7dd6d7))
- moved orbit options to orbit updater package ([8542054](https://github.com/tsparticles/tsparticles/commit/8542054c3a71ed17341411efd88353a1dbb94072))
- moved out all the external interactors from the engine ([9d3c325](https://github.com/tsparticles/tsparticles/commit/9d3c32514c8682fa6ed466185751de80c4fe0baa))
- moved out click interactions to external packages, breaking ([466973d](https://github.com/tsparticles/tsparticles/commit/466973ddbcc382c27c03f7b3518dea99c5e1949c))
- moved particles.js compatibility to another package ([70404b7](https://github.com/tsparticles/tsparticles/commit/70404b74b26da4b9a28b5d6d646cd9ed6c0635f1))
- moved polygon mask to external plugin (breaking) ([abdfe37](https://github.com/tsparticles/tsparticles/commit/abdfe37f250a4f357f4491bb7ff0e54da6a7303e))
- moved roll options to orbit updater package ([e70e482](https://github.com/tsparticles/tsparticles/commit/e70e482f9d17969885da9c7b0c07edba0fb38447))
- moved roll options to orbit updater package ([521c784](https://github.com/tsparticles/tsparticles/commit/521c784ff71022af3b02cac181eb6942d36aa592))
- moved tilt options to orbit updater package ([735b4b4](https://github.com/tsparticles/tsparticles/commit/735b4b4c9747195296c435fa2e2c9c84423bd658))
- moved twinkle options to twinkle updater package ([d6389d4](https://github.com/tsparticles/tsparticles/commit/d6389d4750bdbd2945a1fe84a781671e618122d2))
- moving all updaters to external packages, breaking ([94bdde6](https://github.com/tsparticles/tsparticles/commit/94bdde67d0b546c22b7841ff8e969d15ddef3430))
- opacity animation options have now startValue and destroy like size animation options ([9512a27](https://github.com/tsparticles/tsparticles/commit/9512a27022b1edb4aea6c9718925d7a114cf2cbe))
- optmize demo of vue3 ([88664ef](https://github.com/tsparticles/tsparticles/commit/88664ef4dea5a9bd42c12a8cc2975b4fea78d4a4))
- optmize demo of vue3 ([6618f5d](https://github.com/tsparticles/tsparticles/commit/6618f5ddd384fa4b3ca3e984033e45691a1ed986))
- particle init on shape drawers ([5d31dc1](https://github.com/tsparticles/tsparticles/commit/5d31dc1a6baa668cb13c2970a820ac2f125ff022))
- particle when destroyed can be splitted, closes [#994](https://github.com/tsparticles/tsparticles/issues/994) ([f1522ec](https://github.com/tsparticles/tsparticles/commit/f1522ec4982f7848f356f283b87a91d6579751da))
- particle with move max distance are now good, closes [#740](https://github.com/tsparticles/tsparticles/issues/740) ([e1453c7](https://github.com/tsparticles/tsparticles/commit/e1453c735c2af23453f4f8e5efefb70c415496d3))
- prepared confetti preset ([d290ec1](https://github.com/tsparticles/tsparticles/commit/d290ec1cef191507a79a5950dd72a1810df22046))
- preparing attract mouse interaction mode ([94bc3b3](https://github.com/tsparticles/tsparticles/commit/94bc3b36c9fc06af3fe244437eda87a8ca4536d6))
- preparing react-particles and switching alternate packages ([49e749e](https://github.com/tsparticles/tsparticles/commit/49e749e90e076f0cb22eefe0f3399102f5b9fb35))
- preparing simpler options for confetti preset ([59d4963](https://github.com/tsparticles/tsparticles/commit/59d496345bb85b85c7cbd15b9e4d76c3c0cd5b4c))
- refactor click repulse, now it uses the same algorithm as the hover and div events ([b552869](https://github.com/tsparticles/tsparticles/commit/b55286956bbf8217af7338842528884abfdbdda4))
- refactored image mask plugin, closes [#4492](https://github.com/tsparticles/tsparticles/issues/4492) ([15c1191](https://github.com/tsparticles/tsparticles/commit/15c1191d0b1ca7985a9e2dfc4d5aa2f753dd7cab))
- removed active from slow mode, it was obsolete, small breaking change but smaller engine ([378bc65](https://github.com/tsparticles/tsparticles/commit/378bc65516dbbf8e6b80bbc026695145f7c9a867))
- removed all canvas context save/restore calls ([208722f](https://github.com/tsparticles/tsparticles/commit/208722f0a521246165b7cdc529dfbfbd7a3cf7eb))
- removed dynamic import of the pathseg polyfill, used the standard one ([c8ecc89](https://github.com/tsparticles/tsparticles/commit/c8ecc899b961cdf8888a347b11c1e29cdbe3a76d))
- removed some constants from engine that are relative only to polygon mask plugin ([2920980](https://github.com/tsparticles/tsparticles/commit/29209805481f2d6a7704ec73800bc416233b3362))
- removed support for very old browsers that don't support requestAnimationFrame ([edf5f9d](https://github.com/tsparticles/tsparticles/commit/edf5f9dc70ea7cd3c3ef278e88ed448fabbf688f))
- removing the id constraint, a random one will be generated ([3b6b48e](https://github.com/tsparticles/tsparticles/commit/3b6b48efd8962ccc11549339b38888808da2a657))
- responsive options ([f694555](https://github.com/tsparticles/tsparticles/commit/f694555d21082de95e31668280303d22286be8c3))
- restored options compatibility with v1 and pjs, it's easier to migrate to v2 this way ([78dd8cd](https://github.com/tsparticles/tsparticles/commit/78dd8cd49eb9d7a69d1cf2f26d727615c8cf1e15))
- restored particles.js compatibility ([88b9dfe](https://github.com/tsparticles/tsparticles/commit/88b9dfebef79d1f826215449ddc9197692f15a2a))
- reworked image shape, now supports multiple colors in svg replace color, random value too ([3173ebc](https://github.com/tsparticles/tsparticles/commit/3173ebc14716b241fbb84ae9f1a2cd3c5567f846))
- reworked move.trail options, created an object with color and image, closes [#4882](https://github.com/tsparticles/tsparticles/issues/4882) ([b26505b](https://github.com/tsparticles/tsparticles/commit/b26505b1235980120a98c05b1c5151838b562987))
- reworking image shape for supporting multiple colors in svg replace color ([c28bc85](https://github.com/tsparticles/tsparticles/commit/c28bc85fded04a54a3d4cb25dca1701f1f6b1f01))
- size, opacity and rotate particles options support now also min/max objects in value ([c33e447](https://github.com/tsparticles/tsparticles/commit/c33e4477f2667cd171aa3f5bf0a262e133d2fdbf))
- some options refactoring (breaking) ([eff3c17](https://github.com/tsparticles/tsparticles/commit/eff3c17a81344d76b677aa5134aff0705ba57410))
- speed decay ([1b7ec28](https://github.com/tsparticles/tsparticles/commit/1b7ec28ab1e8a9cc36819a2dc925d2384e92076d))
- spin movement enabled from v2 ([240a38f](https://github.com/tsparticles/tsparticles/commit/240a38f9a8c78e5b683d655d5f94476e396a5076))
- splitting engine from slim and full bundles (v2) ([268b78c](https://github.com/tsparticles/tsparticles/commit/268b78c12d6c54069893d27643cfe7a30f3be777))
- stroke color animation ([deabadd](https://github.com/tsparticles/tsparticles/commit/deabadd7fad1b78f76e5afeea64ae5d4ac87fd61))
- svelte component ([1d0a0d5](https://github.com/tsparticles/tsparticles/commit/1d0a0d575ebcd50debbae62d74e016da58055d5f))
- try adding particles options to trail interactivity options ([d9b442b](https://github.com/tsparticles/tsparticles/commit/d9b442b099ba9548828785269cb6997a1ba70b7a))
- unified mouse click/hover attract animation. closes [#504](https://github.com/tsparticles/tsparticles/issues/504) ([666c266](https://github.com/tsparticles/tsparticles/commit/666c266cb54e4358a308caf1de86b82730abb0d4))
- unified mouse click/hover attract animation. closes [#532](https://github.com/tsparticles/tsparticles/issues/532) ([043ddc3](https://github.com/tsparticles/tsparticles/commit/043ddc306f8d8e07bfb38f142549dfac65830113))
- updated fpsLimit default value to 120 build: updated all presets to have a fpsLimit of 120 ([d1eff05](https://github.com/tsparticles/tsparticles/commit/d1eff050224c4d65727c0abc3f100d70d3807eb8))
- updated ng-particles to Angular 13 ([802e290](https://github.com/tsparticles/tsparticles/commit/802e2904fcf01e713fe74bcdb4efb32979e27cc8))
- updated to angular 10.1 (rc) to support TS 4.0 ([429cf89](https://github.com/tsparticles/tsparticles/commit/429cf893fb364101aeaddc2d2248245b0926741f))
- updated wordpress plugins list ([e0e077a](https://github.com/tsparticles/tsparticles/commit/e0e077a80c8d746372f9e4dd33fb69597fd67c67))
- updating editor to Object GUI v2 ([12ea540](https://github.com/tsparticles/tsparticles/commit/12ea540a040aae301401e3941c0cd1ca18f4ed3e))
- upgraded components ([47060c2](https://github.com/tsparticles/tsparticles/commit/47060c2bafb0f7e21955e2e3ea736592ae189167))
- used particle id to reduce duplicates to to close [#437](https://github.com/tsparticles/tsparticles/issues/437) ([7a3aef1](https://github.com/tsparticles/tsparticles/commit/7a3aef16f494df8f6622eb35cb0eb5d08b2b6a58))
- working on issue [#1269](https://github.com/tsparticles/tsparticles/issues/1269) and [#1256](https://github.com/tsparticles/tsparticles/issues/1256) ([8eba78b](https://github.com/tsparticles/tsparticles/commit/8eba78b0a7be078cbc2903895084a311945bb7d1))
- zIndex, closes [#979](https://github.com/tsparticles/tsparticles/issues/979) ([09e4932](https://github.com/tsparticles/tsparticles/commit/09e4932222177dd9453759ff6a35b3a1cf5fd037))

### Reverts

- Revert "Update nodejs.yml" ([dd1486c](https://github.com/tsparticles/tsparticles/commit/dd1486c07a5315897b2f75d84cd479ad9621100c))
- links and triangles frequency are rolled back, I didn't like the performances ([4a6875c](https://github.com/tsparticles/tsparticles/commit/4a6875ca61e0fd6277e4af4b7931d9096d5ca071))

### BREAKING CHANGES

- **engine:** enums are not exported anymore, this could break javascript usages
