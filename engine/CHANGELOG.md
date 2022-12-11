# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.6.0](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.5.2...tsparticles-engine@2.6.0) (2022-12-06)

### Bug Fixes

-   **deps:** update dependency fs-extra to v11 ([e82352a](https://github.com/matteobruni/tsparticles/commit/e82352a685960603a58fb222f91d157ee65967de))
-   updated all mermaid charts in the readme files, closes [#4763](https://github.com/matteobruni/tsparticles/issues/4763) ([eac8139](https://github.com/matteobruni/tsparticles/commit/eac813939b0857902cda1be0585e35e23e541723))

### Features

-   added localization support to wordpress plugin, fixes [#4807](https://github.com/matteobruni/tsparticles/issues/4807) ([8a93b8a](https://github.com/matteobruni/tsparticles/commit/8a93b8a3d6a1327903c745d7a3b04cb41e5249c8))
-   added new resize object to interactivity options, can change the debounce delay, fixes [#4803](https://github.com/matteobruni/tsparticles/issues/4803) ([c79cccc](https://github.com/matteobruni/tsparticles/commit/c79ccccdc1f3be6c1a9fc2d471d5d7b5ab64d7a7))
-   added reset to path generators, this fixes issues with sea anemone and polygon path plugins ([97830dc](https://github.com/matteobruni/tsparticles/commit/97830dc8dffbb0356c82449727ec85a8ac042391))

## [2.5.2](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.5.1...tsparticles-engine@2.5.2) (2022-11-07)

**Note:** Version bump only for package tsparticles-engine

## [2.5.1](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.5.0...tsparticles-engine@2.5.1) (2022-11-07)

### Bug Fixes

-   fixed issue with reduce duplicates flag, fixes [#4805](https://github.com/matteobruni/tsparticles/issues/4805) ([1d3fe78](https://github.com/matteobruni/tsparticles/commit/1d3fe78d63bf7fa27dc6f9eb97249ed0b6029b2e))

# [2.5.0](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.4.0...tsparticles-engine@2.5.0) (2022-11-02)

**Note:** Version bump only for package tsparticles-engine

# [2.4.0](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.3.3...tsparticles-engine@2.4.0) (2022-10-30)

### Bug Fixes

-   fixed infection plugin ([901b9ce](https://github.com/matteobruni/tsparticles/commit/901b9cef9f3f6df333200d52d712057b7c7fe59c))
-   fixed issue with rgb(), hsl() and hsv() values ([de63545](https://github.com/matteobruni/tsparticles/commit/de635453b874cff34bc5bef6d0bdbe6cb83350bf))

### Features

-   added aria-hidden="true" to canvas element, fixes [#4785](https://github.com/matteobruni/tsparticles/issues/4785) ([8aaa038](https://github.com/matteobruni/tsparticles/commit/8aaa03862d2f23a51e0cbb997b853b4bd54bddda))
-   added delay to root options, fixes [#4766](https://github.com/matteobruni/tsparticles/issues/4766) ([8f0c377](https://github.com/matteobruni/tsparticles/commit/8f0c377601659ffaf9345c80f1aba3ed686b615f))
-   added mutation observer to avoid style changes to the canvas when in fullscreen mode ([65b33e2](https://github.com/matteobruni/tsparticles/commit/65b33e2f6827c6822e0abf4332cabbffa945e8bf))
-   added particles pool for reusing destroyed particles ([ee56851](https://github.com/matteobruni/tsparticles/commit/ee568519b343cfc234bd1de2d7da2d6b90e9a8fa))
-   added reset method to updaters ([ad7a960](https://github.com/matteobruni/tsparticles/commit/ad7a9601a7088c786ab6b04dd0a0381069ff2dc2))
-   changed collision absorb code, added absorb.speed option to collisions section ([346b5be](https://github.com/matteobruni/tsparticles/commit/346b5be40b5e7384f54378f3f4fcf67bd0af3488))
-   created motion plugin for handling motion sickness ([c8b5b09](https://github.com/matteobruni/tsparticles/commit/c8b5b090f5059219c8ab1578e7a52ebc1fac6e14))
-   moved all easings to plugin packages, slim now depends on easing-quad since it's the default ([d4e4b8f](https://github.com/matteobruni/tsparticles/commit/d4e4b8f6685ab748e82322877bf1e9d2d23574d4))
-   removed all canvas context save/restore calls ([208722f](https://github.com/matteobruni/tsparticles/commit/208722f0a521246165b7cdc529dfbfbd7a3cf7eb))

## [2.3.3](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.3.2...tsparticles-engine@2.3.3) (2022-09-30)

### Bug Fixes

-   handling "mid" value in links colors ([0698d04](https://github.com/matteobruni/tsparticles/commit/0698d0461d8d2f882f219e6e08b1aa7076264462))

## [2.3.2](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.3.1...tsparticles-engine@2.3.2) (2022-09-21)

### Bug Fixes

-   fixed export configuration method of container ([f7c3c7f](https://github.com/matteobruni/tsparticles/commit/f7c3c7f210017e91ac3fa5a54a911d714d207ca5))

## [2.3.1](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.3.0...tsparticles-engine@2.3.1) (2022-09-13)

**Note:** Version bump only for package tsparticles-engine

# [2.3.0](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.2.4...tsparticles-engine@2.3.0) (2022-09-11)

### Bug Fixes

-   fixed container duration, using it as seconds instead of milliseconds ([ba05eec](https://github.com/matteobruni/tsparticles/commit/ba05eec31ae30dffff6871669a34360547663605))
-   fixed issue with stroke options loading ([9633356](https://github.com/matteobruni/tsparticles/commit/9633356a62e3654c3a5c11508bfefe7b255c6f32))

### Features

-   added more easing types ([5f8f1c4](https://github.com/matteobruni/tsparticles/commit/5f8f1c43503b022494b28dbff229337da9f45fd1))
-   added smooth options, it ignores the fpsLimit trying to create a smoother animation\* ([5ad1a27](https://github.com/matteobruni/tsparticles/commit/5ad1a27dd7496377aa2f87e2c32b1b45b2c68ef7))
-   created destroy updater, moved all particles destroy (split and similar) code from engine ([f8642fd](https://github.com/matteobruni/tsparticles/commit/f8642fda3f43688ae7a0df55f5b06bb2a45d9e80))
-   first attempt of repulse bounce back ([8379f9c](https://github.com/matteobruni/tsparticles/commit/8379f9ce912f310b0602b462dda03c61924fe9f3))
-   moved out all the external interactors from the engine ([9d3c325](https://github.com/matteobruni/tsparticles/commit/9d3c32514c8682fa6ed466185751de80c4fe0baa))
-   removed some constants from engine that are relative only to polygon mask plugin ([2920980](https://github.com/matteobruni/tsparticles/commit/29209805481f2d6a7704ec73800bc416233b3362))
-   removed support for very old browsers that don't support requestAnimationFrame ([edf5f9d](https://github.com/matteobruni/tsparticles/commit/edf5f9dc70ea7cd3c3ef278e88ed448fabbf688f))

## [2.2.4](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.2.2...tsparticles-engine@2.2.4) (2022-08-26)

### Bug Fixes

-   fixed issue on container guard check, fixes [#4679](https://github.com/matteobruni/tsparticles/issues/4679) ([953767d](https://github.com/matteobruni/tsparticles/commit/953767d8f1d616aa58759efc8b63730cb0f94811))
-   fixed issue with detectsOn with non "window" values, fixes [#4606](https://github.com/matteobruni/tsparticles/issues/4606) ([91f7890](https://github.com/matteobruni/tsparticles/commit/91f78904474b9b021c783342c5968e3debe035c4))

## [2.2.3](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.2.2...tsparticles-engine@2.2.3) (2022-08-21)

### Bug Fixes

-   fixed issue with detectsOn with non "window" values, fixes [#4606](https://github.com/matteobruni/tsparticles/issues/4606) ([ac97f83](https://github.com/matteobruni/tsparticles/commit/ac97f83d470efcb51a3b1942edd7536574c54bad))

## [2.2.2](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.2.1...tsparticles-engine@2.2.2) (2022-08-16)

### Bug Fixes

-   fixed double mouse events on mobile using pointer events, closes [#4622](https://github.com/matteobruni/tsparticles/issues/4622) ([1019fa4](https://github.com/matteobruni/tsparticles/commit/1019fa431f8a43cbd45d6adeb5adf94433e6e04b))

## [2.2.1](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.2.0...tsparticles-engine@2.2.1) (2022-08-12)

**Note:** Version bump only for package tsparticles-engine

# [2.2.0](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.1.4...tsparticles-engine@2.2.0) (2022-08-11)

### Bug Fixes

-   fix responsive screen size ([6d5cdd7](https://github.com/matteobruni/tsparticles/commit/6d5cdd70ac72fea5db4c8412d2c057903ed8b1b2))
-   fixed container refresh ([9e0c71e](https://github.com/matteobruni/tsparticles/commit/9e0c71ea8f73562f53027bb08c13603dd90157c8))
-   fixed correctly both [#4031](https://github.com/matteobruni/tsparticles/issues/4031) and [#4385](https://github.com/matteobruni/tsparticles/issues/4385) ([6b57b69](https://github.com/matteobruni/tsparticles/commit/6b57b69585f931478118bd466dcdce9bbc90fa79))
-   fixed some exports and comments ([389d82c](https://github.com/matteobruni/tsparticles/commit/389d82c7cf2786f2d32f54683779bd6bda96a877))
-   fixed some regex, added support for rgba/hsla/hsva string values with alpha % ([84b31fe](https://github.com/matteobruni/tsparticles/commit/84b31fefe25a7bec93f8942036d1af51e4749bbc))
-   improved container guard check before doing stuff ([ebca38e](https://github.com/matteobruni/tsparticles/commit/ebca38ed5e208b6f1ab507fa7cd1221cdbd7cbc5))
-   moved gradients classes to gradient updater, lighter engine ([e08d09f](https://github.com/matteobruni/tsparticles/commit/e08d09f7243c4fd790b990e1c3f75c832b9e3ef3))
-   **readme:** fix error 404 links ([21bd331](https://github.com/matteobruni/tsparticles/commit/21bd3315437050c6cbc48d7ad2ed8f522937385f))

### Features

-   added new tspRandom function and setRandom for customizing all the random behaviors ([bd83a57](https://github.com/matteobruni/tsparticles/commit/bd83a57b2eb8b455450a5940ba4c4d5ff34834b2))
-   changed load interactivity options to load mode options and moved to external interactors only ([697a155](https://github.com/matteobruni/tsparticles/commit/697a155856c81ad2d4793404f9fc9e34ff78ed68))
-   containers now can have more than one path generator, each particle will keep its own ([94f2985](https://github.com/matteobruni/tsparticles/commit/94f29855b6fd646a61bf2c7bd2df8ffe18990c77))
-   moved hsv color management to external plugin since it's not commonly used ([d2cf77b](https://github.com/matteobruni/tsparticles/commit/d2cf77b6b4a81c09ed46c137941e7d6eddf5ea43))
-   moved links options out from engine ([3d1dd68](https://github.com/matteobruni/tsparticles/commit/3d1dd6884337f3d6c77d8348351d985364a1aae1))
-   moved more code out from engine to specific plugins ([14d4887](https://github.com/matteobruni/tsparticles/commit/14d488756b759b7650e02886ed862f821a6e8ed1))
-   moved more code out from engine to specific plugins ([e28e28d](https://github.com/matteobruni/tsparticles/commit/e28e28d7b1a2d3d49334024c012bd49c3b0a40a6))
-   moved more code out from engine to specific plugins ([eea8fee](https://github.com/matteobruni/tsparticles/commit/eea8fee6512722fce084385f8ae36f9e99a44ab9))
-   moved more code out from engine to specific plugins ([9e00627](https://github.com/matteobruni/tsparticles/commit/9e00627dc5e7c864b559f53e79bcd49a537c17a4))
-   moved more code out from engine to specific plugins ([7cc8ee4](https://github.com/matteobruni/tsparticles/commit/7cc8ee41b80cd151ae71eb6551484ab473b04175))
-   moved more code out from engine to specific plugins ([cf88d6e](https://github.com/matteobruni/tsparticles/commit/cf88d6e2529cafd15c82253ab0099ed082eb2456))
-   moved more code out from engine to specific plugins ([336a940](https://github.com/matteobruni/tsparticles/commit/336a9404a6f88e53a0f318d847e48bc54a5b4c03))
-   moved more code out from engine to specific plugins ([bdd916b](https://github.com/matteobruni/tsparticles/commit/bdd916b157de7edd96e6401a2366f4e60416ab72))
-   moved more code out from engine to specific plugins ([9279a1b](https://github.com/matteobruni/tsparticles/commit/9279a1b962cd20cce6e99a9ca3f137e60a51fc30))
-   moved more code out from engine to specific plugins ([b504a14](https://github.com/matteobruni/tsparticles/commit/b504a147d6664faccf4fbc990d32c5dc07ef3945))
-   moved more code out from engine to specific plugins, added new method to interactors ([c3aab68](https://github.com/matteobruni/tsparticles/commit/c3aab68c6ce3317ece3f76e6cd8745db8a7dd6d7))
-   removed active from slow mode, it was obsolete, small breaking change but smaller engine ([378bc65](https://github.com/matteobruni/tsparticles/commit/378bc65516dbbf8e6b80bbc026695145f7c9a867))
-   reworked image shape, now supports multiple colors in svg replace color, random value too ([3173ebc](https://github.com/matteobruni/tsparticles/commit/3173ebc14716b241fbb84ae9f1a2cd3c5567f846))
-   reworking image shape for supporting multiple colors in svg replace color ([c28bc85](https://github.com/matteobruni/tsparticles/commit/c28bc85fded04a54a3d4cb25dca1701f1f6b1f01))

## [2.1.4](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.1.3...tsparticles-engine@2.1.4) (2022-07-28)

### Bug Fixes

-   fixed issue with destroyed containers, fixes [#4385](https://github.com/matteobruni/tsparticles/issues/4385), fixes [#4413](https://github.com/matteobruni/tsparticles/issues/4413), fixes [#4534](https://github.com/matteobruni/tsparticles/issues/4534) ([4d22425](https://github.com/matteobruni/tsparticles/commit/4d22425210f64b937a5d1b7bf825624b3ed5f2b6)), closes [#4532](https://github.com/matteobruni/tsparticles/issues/4532)

### Features

-   preparing react-particles and switching alternate packages ([49e749e](https://github.com/matteobruni/tsparticles/commit/49e749e90e076f0cb22eefe0f3399102f5b9fb35))

## [2.1.3](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.1.2...tsparticles-engine@2.1.3) (2022-07-01)

### Bug Fixes

-   fix linker plugin issue ([b9505e2](https://github.com/matteobruni/tsparticles/commit/b9505e2453e893a0a30fd483595de412c70dda3c))

## [2.1.2](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.1.1...tsparticles-engine@2.1.2) (2022-07-01)

**Note:** Version bump only for package tsparticles-engine

## [2.1.1](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.1.0...tsparticles-engine@2.1.1) (2022-07-01)

### Bug Fixes

-   fixed more enum typings ([cc5e52d](https://github.com/matteobruni/tsparticles/commit/cc5e52d9f271c16125432e285503e7e7bd7bc71e))
-   fixed more enum typings ([eed6c1f](https://github.com/matteobruni/tsparticles/commit/eed6c1f2237d78aae68beabc0c055e60770fe557))
-   fixed more enum typings ([ae6501c](https://github.com/matteobruni/tsparticles/commit/ae6501c4c8ab3cbcc4d3eeb01dfe54599df88c47))
-   fixed restoring canvas when not generated after full screen set, closes [#4291](https://github.com/matteobruni/tsparticles/issues/4291) ([28acc87](https://github.com/matteobruni/tsparticles/commit/28acc876335ed062fa14cfaa296dfaee0cdee8c9))
-   fixed typings in onDiv configuration, the DivType accepts also valid string values now ([164da18](https://github.com/matteobruni/tsparticles/commit/164da18be5f3feabbc7c367469446e3446cbb5f4))
-   fixed typings in onDiv configuration, the DivType accepts also valid string values now ([a4aa0a3](https://github.com/matteobruni/tsparticles/commit/a4aa0a3d8a249143489052ad474e4cf5b03a6bbb))

### Features

-   moved gravity data from engine to base mover ([ead8f6e](https://github.com/matteobruni/tsparticles/commit/ead8f6e7d6e8fc579b6a5f45949b196b523c26f7))

# [2.1.0](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.6...tsparticles-engine@2.1.0) (2022-06-18)

### Bug Fixes

-   fixed connect links options ([5eb3186](https://github.com/matteobruni/tsparticles/commit/5eb31866b3a9fe1328969c254f2fff0be995b1f5))
-   fixed issue with non-generated canvas elements, closes [#4228](https://github.com/matteobruni/tsparticles/issues/4228) ([297e974](https://github.com/matteobruni/tsparticles/commit/297e9740580e11cf2c8b98a5a9e88736fdf855e4))
-   fixed new multiple particles feature and particle destroy method ([aee6eff](https://github.com/matteobruni/tsparticles/commit/aee6effe57407c354c2648f2f3661981ed38a995))
-   improving container destruction ([c4ebce6](https://github.com/matteobruni/tsparticles/commit/c4ebce6ba3b6e6b5b68a1fa6b342d41fee31837b))
-   moved some specific code to the relative project, removing it from the generic engine ([09fe635](https://github.com/matteobruni/tsparticles/commit/09fe63568adc244d11b7eff009626b905d5b05e4))
-   removed bad check when retrieving color range value ([27a0778](https://github.com/matteobruni/tsparticles/commit/27a0778ae0fcb57fde4a9d660af603a994efb1ac))
-   trying fixing issue [#4151](https://github.com/matteobruni/tsparticles/issues/4151) ([83e3e06](https://github.com/matteobruni/tsparticles/commit/83e3e0625743decef39c8496f8b30ed367803a4f))

### Features

-   added decay to all animations ([954858e](https://github.com/matteobruni/tsparticles/commit/954858ec9ef85a7d9d676838399777e4a1a8b885))
-   added new speed object for wobble effect ([a450513](https://github.com/matteobruni/tsparticles/commit/a450513b04dedb7f4c18ad98278ef23094f22016))
-   added range colors to all color fields ([1b6f32a](https://github.com/matteobruni/tsparticles/commit/1b6f32ad50beb3dc4813187a6e1d03f3013f3ca9))
-   interactivity options overrides in particles options, closes [#4120](https://github.com/matteobruni/tsparticles/issues/4120) ([309afb5](https://github.com/matteobruni/tsparticles/commit/309afb5749e40373648bf9173800334da4dbf965))
-   loading updater options in updaters instead of in the engine, started from wobble ([85abd01](https://github.com/matteobruni/tsparticles/commit/85abd01a618efd3afd17f6fd605d46005cd842dd))
-   moved life options to life updater ([ea85856](https://github.com/matteobruni/tsparticles/commit/ea85856de8246e09a01bdcd4d12fb86bc04631ee))
-   moved orbit options to orbit updater package ([8542054](https://github.com/matteobruni/tsparticles/commit/8542054c3a71ed17341411efd88353a1dbb94072))
-   moved roll options to orbit updater package ([e70e482](https://github.com/matteobruni/tsparticles/commit/e70e482f9d17969885da9c7b0c07edba0fb38447))
-   moved roll options to orbit updater package ([521c784](https://github.com/matteobruni/tsparticles/commit/521c784ff71022af3b02cac181eb6942d36aa592))
-   moved tilt options to orbit updater package ([735b4b4](https://github.com/matteobruni/tsparticles/commit/735b4b4c9747195296c435fa2e2c9c84423bd658))
-   moved twinkle options to twinkle updater package ([d6389d4](https://github.com/matteobruni/tsparticles/commit/d6389d4750bdbd2945a1fe84a781671e618122d2))

## [2.0.6](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.5...tsparticles-engine@2.0.6) (2022-04-16)

**Note:** Version bump only for package tsparticles-engine

## [2.0.5](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.4...tsparticles-engine@2.0.5) (2022-04-14)

**Note:** Version bump only for package tsparticles-engine

## [2.0.4](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.3...tsparticles-engine@2.0.4) (2022-04-06)

### Bug Fixes

-   fixed flashing issue with background mask, closes [#3514](https://github.com/matteobruni/tsparticles/issues/3514) ([6f74bf1](https://github.com/matteobruni/tsparticles/commit/6f74bf1ab62587c7f2352bfe6f72ea29bb0a31fc))
-   fixed flashing issue with resize ([4e44c8e](https://github.com/matteobruni/tsparticles/commit/4e44c8e368561195441c7cd153e811e7e410e7a4))
-   fixed issue with new resize checks ([0cce40c](https://github.com/matteobruni/tsparticles/commit/0cce40cf3faeff00c3ef5f5ffab3575e38aca5a0))
-   moving canvas.clear closer to drawn breaks grab links, and maybe other interactions ([9b70b78](https://github.com/matteobruni/tsparticles/commit/9b70b786bd93ba7c245b8e24113156f747dd6608))

## [2.0.3](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.2...tsparticles-engine@2.0.3) (2022-03-11)

# [1.43.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.42.4...tsparticles@1.43.0) (2022-04-04)

**Note:** Version bump only for package tsparticles

## [1.42.4](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.42.3...tsparticles@1.42.4) (2022-03-20)

### Bug Fixes

-   moving canvas.clear closer to drawn breaks grab links, and maybe other interactions ([9b70b78](https://github.com/matteobruni/tsparticles/commit/9b70b786bd93ba7c245b8e24113156f747dd6608))

## [1.42.3](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.42.2...tsparticles@1.42.3) (2022-03-18)

### Bug Fixes

-   fixed flashing issue with resize ([4e44c8e](https://github.com/matteobruni/tsparticles/commit/4e44c8e368561195441c7cd153e811e7e410e7a4))
-   fixed issue with new resize checks ([0cce40c](https://github.com/matteobruni/tsparticles/commit/0cce40cf3faeff00c3ef5f5ffab3575e38aca5a0))

## [1.42.2](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.42.1...tsparticles@1.42.2) (2022-03-14)

### Bug Fixes

-   fixed emitters issues ([c9d9a51](https://github.com/matteobruni/tsparticles/commit/c9d9a51e41fdc77a9bf544a09d979d8c2f6b10d5))
-   fixed issue with 0 positions on x and y with emitters ([63e8a11](https://github.com/matteobruni/tsparticles/commit/63e8a115614ca106375fdae7f77cd73181ede96a))
-   fixed issue with canvas resize ([4c72a96](https://github.com/matteobruni/tsparticles/commit/4c72a96c707266da6cb1b5081bc7b504c5cfb3de))

### Features

-   more rangeable options ([a2598c0](https://github.com/matteobruni/tsparticles/commit/a2598c07e968ab383c0a1eb311e22c4a0f52d9b8))

## [2.0.2](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.1...tsparticles-engine@2.0.2) (2022-02-21)

-   fixed flashing issue with background mask, closes [#3514](https://github.com/matteobruni/tsparticles/issues/3514) ([6f74bf1](https://github.com/matteobruni/tsparticles/commit/6f74bf1ab62587c7f2352bfe6f72ea29bb0a31fc))

## [1.42.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.42.0...tsparticles@1.42.1) (2022-03-09)

### Bug Fixes

-   fixed issue with 0 positions on x and y with emitters ([63e8a11](https://github.com/matteobruni/tsparticles/commit/63e8a115614ca106375fdae7f77cd73181ede96a))

# [1.42.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.41.6...tsparticles@1.42.0) (2022-03-08)

### Features

-   more rangeable options ([a2598c0](https://github.com/matteobruni/tsparticles/commit/a2598c07e968ab383c0a1eb311e22c4a0f52d9b8))

## [1.41.6](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.41.5...tsparticles@1.41.6) (2022-03-03)

### Bug Fixes

-   fixed issue with canvas resize ([4c72a96](https://github.com/matteobruni/tsparticles/commit/4c72a96c707266da6cb1b5081bc7b504c5cfb3de))

## [1.41.5](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.41.4...tsparticles@1.41.5) (2022-02-24)

### Bug Fixes

-   fixed issue with size and opacity updaters ([f81e228](https://github.com/matteobruni/tsparticles/commit/f81e2280e3cff3942bdd8037df658b169d07ed30))
-   fixed tilt back/front colors ([657585f](https://github.com/matteobruni/tsparticles/commit/657585f22d7fefa95df1cde16d6c68522fcfb34b))
-   removed useless check ([edb272e](https://github.com/matteobruni/tsparticles/commit/edb272ec5683933ed6309d03dbdd109c76607a1e))
-   removed useless console.log (debug purposes) ([93835e7](https://github.com/matteobruni/tsparticles/commit/93835e70dfaeedc9ac926f362a3ff1d4509e31fd))
-   fixed emitters issues ([c9d9a51](https://github.com/matteobruni/tsparticles/commit/c9d9a51e41fdc77a9bf544a09d979d8c2f6b10d5))

## [2.0.1](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.0...tsparticles-engine@2.0.1) (2022-02-15)

### Features

-   restored options compatibility with v1 and pjs, it's easier to migrate to v2 this way ([78dd8cd](https://github.com/matteobruni/tsparticles/commit/78dd8cd49eb9d7a69d1cf2f26d727615c8cf1e15))

## [1.41.4](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.41.3...tsparticles@1.41.4) (2022-02-20)

### Bug Fixes

-   removed useless console.log (debug purposes) ([93835e7](https://github.com/matteobruni/tsparticles/commit/93835e70dfaeedc9ac926f362a3ff1d4509e31fd))

## [1.41.3](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.41.2...tsparticles@1.41.3) (2022-02-19)

### Bug Fixes

-   fixed issue with size and opacity updaters ([f81e228](https://github.com/matteobruni/tsparticles/commit/f81e2280e3cff3942bdd8037df658b169d07ed30))
-   removed useless check ([edb272e](https://github.com/matteobruni/tsparticles/commit/edb272ec5683933ed6309d03dbdd109c76607a1e))

# [2.0.0](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.0-beta.4...tsparticles-engine@2.0.0) (2022-02-15)

## [1.41.2](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.41.1...tsparticles@1.41.2) (2022-02-16)

### Bug Fixes

-   fixed emitter issue on first start, closes [#3074](https://github.com/matteobruni/tsparticles/issues/3074) ([79fe654](https://github.com/matteobruni/tsparticles/commit/79fe654b0c4707337d3ceea7509cf115feddaa05))
-   fixed issue with path generators ([29644fc](https://github.com/matteobruni/tsparticles/commit/29644fc7a281fae1c438dee74e43dd611ec7af07))
-   removed all browser flags in package.json, a lot of issues with it. closes [#3094](https://github.com/matteobruni/tsparticles/issues/3094) ([1415875](https://github.com/matteobruni/tsparticles/commit/14158755ec80ace4e0c520cef407b2d7f4078568))
-   solved performance drop issue after refresh, closes [#2809](https://github.com/matteobruni/tsparticles/issues/2809), [#2815](https://github.com/matteobruni/tsparticles/issues/2815), [#2936](https://github.com/matteobruni/tsparticles/issues/2936) ([286c3e8](https://github.com/matteobruni/tsparticles/commit/286c3e867fab2fcf0660a40abda60d1e756b1fdb))

### Features

-   added domId property to Emitters options ([9408d14](https://github.com/matteobruni/tsparticles/commit/9408d148138e0bacea6d2e426c885a66c625e1a6))
-   updated fpsLimit default value to 120 build: updated all presets to have a fpsLimit of 120 ([d1eff05](https://github.com/matteobruni/tsparticles/commit/d1eff050224c4d65727c0abc3f100d70d3807eb8))
-   fixed tilt back/front colors ([657585f](https://github.com/matteobruni/tsparticles/commit/657585f22d7fefa95df1cde16d6c68522fcfb34b))

# [2.0.0-beta.4](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.0-beta.3...tsparticles-engine@2.0.0-beta.4) (2022-01-30)

## [1.41.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.41.0...tsparticles@1.41.1) (2022-02-14)

**Note:** Version bump only for package tsparticles

# [1.41.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.40.2...tsparticles@1.41.0) (2022-02-10)

### Bug Fixes

-   fixed issue with path generators ([29644fc](https://github.com/matteobruni/tsparticles/commit/29644fc7a281fae1c438dee74e43dd611ec7af07))

## [1.40.2](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.40.1...tsparticles@1.40.2) (2022-02-07)

### Bug Fixes

-   removed all browser flags in package.json, a lot of issues with it. closes [#3094](https://github.com/matteobruni/tsparticles/issues/3094) ([1415875](https://github.com/matteobruni/tsparticles/commit/14158755ec80ace4e0c520cef407b2d7f4078568))

## [1.40.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.40.0...tsparticles@1.40.1) (2022-02-06)

**Note:** Version bump only for package tsparticles

# [1.40.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.39.3...tsparticles@1.40.0) (2022-02-04)

### Bug Fixes

-   fixed emitter issue on first start, closes [#3074](https://github.com/matteobruni/tsparticles/issues/3074) ([79fe654](https://github.com/matteobruni/tsparticles/commit/79fe654b0c4707337d3ceea7509cf115feddaa05))

### Features

-   added domId property to Emitters options ([9408d14](https://github.com/matteobruni/tsparticles/commit/9408d148138e0bacea6d2e426c885a66c625e1a6))

## [1.39.3](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.39.2...tsparticles@1.39.3) (2022-02-02)

### Bug Fixes

-   fixed issues with absorbers and emitters plugins Container extension methods ([ce196be](https://github.com/matteobruni/tsparticles/commit/ce196bebd035281c08b5c77c5301ba1ebd7e734f))
-   fixed priority on canvas styles ([3cc3d97](https://github.com/matteobruni/tsparticles/commit/3cc3d97bb01ee9ae265b33fdba636dde9c696355))
-   fixed some readmes ([93f371a](https://github.com/matteobruni/tsparticles/commit/93f371ab82a5074d34ec7632ade41edc3dbf0ec7))
-   removed deprecated options ([fc1676d](https://github.com/matteobruni/tsparticles/commit/fc1676d94799326f2bd0285995f2b166647e6b6d))

### Code Refactoring

-   **engine:** changed all enums to const, smaller output size ([9536087](https://github.com/matteobruni/tsparticles/commit/953608731be325c0c6b5f6811eb58f8898a1e353))
-   solved performance drop issue after refresh, closes [#2809](https://github.com/matteobruni/tsparticles/issues/2809), [#2815](https://github.com/matteobruni/tsparticles/issues/2815), [#2936](https://github.com/matteobruni/tsparticles/issues/2936) ([286c3e8](https://github.com/matteobruni/tsparticles/commit/286c3e867fab2fcf0660a40abda60d1e756b1fdb))

### Features

-   added all files for supporting the smaller engine, preparing for v2 incoming changes ([4d90c83](https://github.com/matteobruni/tsparticles/commit/4d90c83867b4801eeebd86651381ecf8e8ce5cec))
-   added new functions for loading options, this will be useful for removing all the classes ([89501c5](https://github.com/matteobruni/tsparticles/commit/89501c540596892109f7e9cf24bd69064a30a70d))
-   added style options ([12045cd](https://github.com/matteobruni/tsparticles/commit/12045cdfe3111e018258a7bc1c88974e28b6f31e))
-   created and implemented move plugins ([752483a](https://github.com/matteobruni/tsparticles/commit/752483aeeb94dd851dc27fe75e4c258fd87f0a90))
-   improved image loading, now if an image is missing it will be loaded at runtime ([5155bef](https://github.com/matteobruni/tsparticles/commit/5155bef24ef3e3fa5ba4654361aabaab074c9957))
-   some options refactoring (breaking) ([eff3c17](https://github.com/matteobruni/tsparticles/commit/eff3c17a81344d76b677aa5134aff0705ba57410))

### BREAKING CHANGES

-   **engine:** enums are not exported anymore, this could break javascript usages

-   updated fpsLimit default value to 120 build: updated all presets to have a fpsLimit of 120 ([d1eff05](https://github.com/matteobruni/tsparticles/commit/d1eff050224c4d65727c0abc3f100d70d3807eb8))

# [2.0.0-beta.3](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.0-beta.2...tsparticles-engine@2.0.0-beta.3) (2021-12-07)

**Note:** Version bump only for package tsparticles-engine

## [1.39.2](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.39.1...tsparticles@1.39.2) (2022-01-29)

**Note:** Version bump only for package tsparticles

## [1.39.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.39.0...tsparticles@1.39.1) (2022-01-26)

### Bug Fixes

-   fixed issues with absorbers and emitters plugins Container extension methods ([ce196be](https://github.com/matteobruni/tsparticles/commit/ce196bebd035281c08b5c77c5301ba1ebd7e734f))

# [1.39.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.38.0...tsparticles@1.39.0) (2022-01-08)

### Bug Fixes

-   fixed priority on canvas styles ([3cc3d97](https://github.com/matteobruni/tsparticles/commit/3cc3d97bb01ee9ae265b33fdba636dde9c696355))

### Code Refactoring

-   **engine:** changed all enums to const, smaller output size ([9536087](https://github.com/matteobruni/tsparticles/commit/953608731be325c0c6b5f6811eb58f8898a1e353))

### Features

-   added all files for supporting the smaller engine, preparing for v2 incoming changes ([4d90c83](https://github.com/matteobruni/tsparticles/commit/4d90c83867b4801eeebd86651381ecf8e8ce5cec))
-   improved image loading, now if an image is missing it will be loaded at runtime ([5155bef](https://github.com/matteobruni/tsparticles/commit/5155bef24ef3e3fa5ba4654361aabaab074c9957))

### BREAKING CHANGES

-   **engine:** enums are not exported anymore, this could break javascript usages

# [1.38.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.37.6...tsparticles@1.38.0) (2021-12-29)

### Features

-   added style options ([12045cd](https://github.com/matteobruni/tsparticles/commit/12045cdfe3111e018258a7bc1c88974e28b6f31e))

# [2.0.0-beta.2](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.0-beta.1...tsparticles-engine@2.0.0-beta.2) (2021-12-04)

## [1.37.6](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.37.5...tsparticles@1.37.6) (2021-12-24)

### Bug Fixes

-   added browserslist to fix some issues with older browsers ([24d8f52](https://github.com/matteobruni/tsparticles/commit/24d8f520ee6934bd967d63612c828705e1dc09e2))
-   fixed issue with collisions, fixes [#2586](https://github.com/matteobruni/tsparticles/issues/2586), fixes [#2380](https://github.com/matteobruni/tsparticles/issues/2380) ([204cb8d](https://github.com/matteobruni/tsparticles/commit/204cb8dc188cf2c37d746652d4ea3effde2a5b9b))
-   fixed issue with dynamic imports and async loading ([b7f444b](https://github.com/matteobruni/tsparticles/commit/b7f444b1ef279083572e3a52f341d39091c885e6))
-   fixes [#2329](https://github.com/matteobruni/tsparticles/issues/2329) ([1982442](https://github.com/matteobruni/tsparticles/commit/1982442b6084f15ce40559c9391f097563728ff2))
-   fixes issue with responsive not refreshing when changing options ([f54cefa](https://github.com/matteobruni/tsparticles/commit/f54cefac475599e7717c125490e81e2b17e89c3f))
-   fixes some dynamic import issues ([8ba2415](https://github.com/matteobruni/tsparticles/commit/8ba2415d52384fd4ce722110cda02c8c0db92674))

### Features

-   added custom events ([13fe1fe](https://github.com/matteobruni/tsparticles/commit/13fe1fe9d1a81db22a55c9a11adc706643a60d50))
-   added more absorber size limit options ([f2d0493](https://github.com/matteobruni/tsparticles/commit/f2d0493f34bc373846d8a8ae78e36dd56816308e))
-   added new move direction: inside and outside, out modes needs more fixes ([32a70a6](https://github.com/matteobruni/tsparticles/commit/32a70a68a155db1ed796519addd7298e33a39094))
-   enabled full screen by default, window is now the default interacitivity target ([e205e4c](https://github.com/matteobruni/tsparticles/commit/e205e4c9811b73c53ece9bb53a8a541c88afc017))
-   fixed lazy loading ([0f774ef](https://github.com/matteobruni/tsparticles/commit/0f774ef3d837f41b872bf866c4f4a87e4bafed6e))
-   fixed lazy loading ([60f9689](https://github.com/matteobruni/tsparticles/commit/60f96899bc564e547a49a5e17be4f40fe12288ba))
-   migrated to chunks ([58b69c1](https://github.com/matteobruni/tsparticles/commit/58b69c130d1e768c0dc0a1b61e904c23408e6ec5))
-   moved particles.js compatibility to another package ([70404b7](https://github.com/matteobruni/tsparticles/commit/70404b74b26da4b9a28b5d6d646cd9ed6c0635f1))

-   fixed some readmes ([93f371a](https://github.com/matteobruni/tsparticles/commit/93f371ab82a5074d34ec7632ade41edc3dbf0ec7))

# [2.0.0-beta.1](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.0-beta.0...tsparticles-engine@2.0.0-beta.1) (2021-10-06)

**Note:** Version bump only for package tsparticles-engine

## [1.37.5](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.37.4...tsparticles@1.37.5) (2021-11-28)

### Bug Fixes

-   fixed issue with collisions, fixes [#2586](https://github.com/matteobruni/tsparticles/issues/2586), fixes [#2380](https://github.com/matteobruni/tsparticles/issues/2380) ([204cb8d](https://github.com/matteobruni/tsparticles/commit/204cb8dc188cf2c37d746652d4ea3effde2a5b9b))

## [1.37.4](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.37.3...tsparticles@1.37.4) (2021-11-17)

**Note:** Version bump only for package tsparticles

# 2.0.0-beta.0 (2021-10-06)

### Bug Fixes

-   added try catch in pathseg polyfill, fixes [#2264](https://github.com/matteobruni/tsparticles/issues/2264) ([6b849f2](https://github.com/matteobruni/tsparticles/commit/6b849f2455371946ab6949385de5b3b6699cae70))
-   brought v2 changes to absorbers ([cbad5c2](https://github.com/matteobruni/tsparticles/commit/cbad5c2651058eeac7bda0fc79e498e3b4126232))
-   **deps:** pin dependencies ([23be870](https://github.com/matteobruni/tsparticles/commit/23be8708d698e1e37a18f2ed292cbccffb0f1e47))
-   **deps:** update all ([d9f0ff2](https://github.com/matteobruni/tsparticles/commit/d9f0ff2f8c4ac269aaad5077492746e3da8fb422))
-   fixed broken movement in 1.31 ([6787035](https://github.com/matteobruni/tsparticles/commit/6787035c746bdc11055d00ca83869ed837258ec8))
-   fixed click handler with touch events ([ad4bf8a](https://github.com/matteobruni/tsparticles/commit/ad4bf8a56cb7e110114c8ec25dab1151c440f212))
-   fixed click handler, it wasn't working fine ([fd9873b](https://github.com/matteobruni/tsparticles/commit/fd9873b250d236b196cc7ff952d237f2768fb26b))
-   fixed click handler, it wasn't working fine ([f0a8170](https://github.com/matteobruni/tsparticles/commit/f0a81705f0f7a0ef51fc21344a7d35a02b11ad22))
-   fixed frozen frames (more than 1 seconds), this will fix the issue with pause on blur ([5a933c1](https://github.com/matteobruni/tsparticles/commit/5a933c130d85593e9d0772bb9eb2b7a61f643712))
-   fixed images shape options ([8964fe6](https://github.com/matteobruni/tsparticles/commit/8964fe6dd3b2556de47ba307fe87306764672bcc))
-   fixed issue with emitters and themes, they weren't applied correctly ([3a9dcae](https://github.com/matteobruni/tsparticles/commit/3a9dcaebed687277db76f7f1016e3835284b0d48))
-   fixed issue with size and opacity range ([84e9c16](https://github.com/matteobruni/tsparticles/commit/84e9c16ce0e0ea194cb82bdd1c62839809ee621b))
-   fixed issues with moveSpeed 0 ([6c9dd6e](https://github.com/matteobruni/tsparticles/commit/6c9dd6e1490e8d6f49188e1b2d4cff92d7a9c610))
-   fixed line shape ([5c1c612](https://github.com/matteobruni/tsparticles/commit/5c1c6120af7e10abf26252c3c1be632675bfd3a5))
-   fixed out of canvas out mode ([1f17c60](https://github.com/matteobruni/tsparticles/commit/1f17c60587c81ca8a556dcd6eb6168da32f15371))
-   fixed pause on blur ([a7bd28f](https://github.com/matteobruni/tsparticles/commit/a7bd28f547a02434c188cdee4aa035424996559e))
-   fixed roll and tilt updaters ([d4a7df3](https://github.com/matteobruni/tsparticles/commit/d4a7df3c982dc0332890d16244d7df320cd5fd11))
-   fixed typings for tsParticles load methods ([847bbbe](https://github.com/matteobruni/tsparticles/commit/847bbbef680d72c50db6dc6ef4d3b297c9b82355))
-   fixed wobble updater ([cd13fca](https://github.com/matteobruni/tsparticles/commit/cd13fca6bad6611926e5f01a43ba6412b79fb608))
-   fixes [#2241](https://github.com/matteobruni/tsparticles/issues/2241) ([b5802df](https://github.com/matteobruni/tsparticles/commit/b5802dfcbf61f7d236cecc60e141ddd77d4a3d06))
-   improved images loading ([2690f4a](https://github.com/matteobruni/tsparticles/commit/2690f4a33eeb5950af13ded2cd3be18ecae66984))
-   improved new methods without id ([9b7a106](https://github.com/matteobruni/tsparticles/commit/9b7a106acd4c3225aa001f12ab25e4c2b89dde66))
-   improved out modes and spin movement ([1c811cf](https://github.com/matteobruni/tsparticles/commit/1c811cfefe0b004857b3174e766a34d9bf614361))

### Features

-   added duration to options ([d4c0a8d](https://github.com/matteobruni/tsparticles/commit/d4c0a8ddb88d3699a1d3974db9bda38f4c47dd79))
-   added gradient angle animated rotation support ([de8f0a4](https://github.com/matteobruni/tsparticles/commit/de8f0a46436601aeb580651b1f87741fd9fc3c79))
-   added gradient options for particles ([c8ecec7](https://github.com/matteobruni/tsparticles/commit/c8ecec7eeda3ecedcdda3bf21eb8fa71c2a276ef))
-   added new methods to particle class ([5743453](https://github.com/matteobruni/tsparticles/commit/5743453906001569f262888aa54539ad4e1463ac))
-   added orbits as a plugin from v2, closes [#188](https://github.com/matteobruni/tsparticles/issues/188) ([a78aaac](https://github.com/matteobruni/tsparticles/commit/a78aaac436e14a196031c4a0fe3da16a65b91ad1)), closes [#609](https://github.com/matteobruni/tsparticles/issues/609)
-   added resize observer, this will replace window.resize if available ([4197f26](https://github.com/matteobruni/tsparticles/commit/4197f2654e8767039dbfd66eca34f261ee3d88c8))
-   added shapes and fill options to emitters ([e8b32a3](https://github.com/matteobruni/tsparticles/commit/e8b32a372190511c3350f6ddb112d0ff8f736c27))
-   added start count to emitters ([5403426](https://github.com/matteobruni/tsparticles/commit/540342630e67baf665f114f9667001638cf5dc3d))
-   added triangles preset ([2a7aa6a](https://github.com/matteobruni/tsparticles/commit/2a7aa6a98666defea5ecc2bc42aed44d6257a70e))
-   auto themes ([d80b78c](https://github.com/matteobruni/tsparticles/commit/d80b78cb49ae04796473bd06f827d5d5a29a3e35))
-   bubble color can now be mixed with the original one to have a smoother effect ([df11d66](https://github.com/matteobruni/tsparticles/commit/df11d66ee94fb9594805a5dfb7d4c776a93c4532))
-   changed particles move distance to an horizontal/vertical object, single number still valid ([a0b16ed](https://github.com/matteobruni/tsparticles/commit/a0b16ed6df01371d8f00f29047efc04aad10bdbe))
-   created gradient updater library, only colors for now ([7d31c62](https://github.com/matteobruni/tsparticles/commit/7d31c62ecb8f023234514b5ef46f0de55f75c283))
-   fixed new wait life emitter option ([ae88774](https://github.com/matteobruni/tsparticles/commit/ae88774239060da6d7b9e98029bf1819511202d6))
-   improved move path generators ([9b67377](https://github.com/matteobruni/tsparticles/commit/9b67377f9208a005b122e312ad4ad3c95a50deb7))
-   moved absorbers to an external plugin, breaking ([5e7223f](https://github.com/matteobruni/tsparticles/commit/5e7223fb6b505260eb72899ec1e9762d96a5c4d7))
-   moved all interactions in external packages, breaking ([76c44df](https://github.com/matteobruni/tsparticles/commit/76c44dfa64cae994ddb1a004e7ff6cdbe3a4b5a9))
-   moved all plugins to external packages, breaking ([a3edcec](https://github.com/matteobruni/tsparticles/commit/a3edcecd129009e7d9af138dd9a1285360e7003d))
-   moved all shapes to external packages, breaking ([77e4113](https://github.com/matteobruni/tsparticles/commit/77e411338f65ab076fe85c0f143c13417147d4b5))
-   moved emitter shapes to a plugin system, so they can be customized by users ([5bec360](https://github.com/matteobruni/tsparticles/commit/5bec36067804b425af12766275da74fbfe89d20c))
-   moved out click interactions to external packages, breaking ([466973d](https://github.com/matteobruni/tsparticles/commit/466973ddbcc382c27c03f7b3518dea99c5e1949c))
-   moved polygon mask to external plugin (breaking) ([abdfe37](https://github.com/matteobruni/tsparticles/commit/abdfe37f250a4f357f4491bb7ff0e54da6a7303e))
-   moving all updaters to external packages, breaking ([94bdde6](https://github.com/matteobruni/tsparticles/commit/94bdde67d0b546c22b7841ff8e969d15ddef3430))
-   removing the id constraint, a random one will be generated ([3b6b48e](https://github.com/matteobruni/tsparticles/commit/3b6b48efd8962ccc11549339b38888808da2a657))
-   spin movement enabled from v2 ([240a38f](https://github.com/matteobruni/tsparticles/commit/240a38f9a8c78e5b683d655d5f94476e396a5076))
-   splitting engine from slim and full bundles (v2) ([268b78c](https://github.com/matteobruni/tsparticles/commit/268b78c12d6c54069893d27643cfe7a30f3be777))

## [1.37.3](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.37.2...tsparticles@1.37.3) (2021-11-05)

### Features

-   added more absorber size limit options ([f2d0493](https://github.com/matteobruni/tsparticles/commit/f2d0493f34bc373846d8a8ae78e36dd56816308e))

## [1.37.2](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.37.1...tsparticles@1.37.2) (2021-10-31)

### Bug Fixes

-   fixes some dynamic import issues ([8ba2415](https://github.com/matteobruni/tsparticles/commit/8ba2415d52384fd4ce722110cda02c8c0db92674))

## [1.37.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.37.0...tsparticles@1.37.1) (2021-10-30)

### Bug Fixes

-   added browserslist to fix some issues with older browsers ([24d8f52](https://github.com/matteobruni/tsparticles/commit/24d8f520ee6934bd967d63612c828705e1dc09e2))
-   fixed issue with dynamic imports and async loading ([b7f444b](https://github.com/matteobruni/tsparticles/commit/b7f444b1ef279083572e3a52f341d39091c885e6))

# [1.37.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.36.0...tsparticles@1.37.0) (2021-10-28)

### Features

-   enabled full screen by default, window is now the default interacitivity target ([e205e4c](https://github.com/matteobruni/tsparticles/commit/e205e4c9811b73c53ece9bb53a8a541c88afc017))

# [1.36.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.35.4...tsparticles@1.36.0) (2021-10-14)

### Bug Fixes

-   fixes [#2329](https://github.com/matteobruni/tsparticles/issues/2329) ([1982442](https://github.com/matteobruni/tsparticles/commit/1982442b6084f15ce40559c9391f097563728ff2))
-   fixes issue with responsive not refreshing when changing options ([f54cefa](https://github.com/matteobruni/tsparticles/commit/f54cefac475599e7717c125490e81e2b17e89c3f))

### Features

-   fixed lazy loading ([0f774ef](https://github.com/matteobruni/tsparticles/commit/0f774ef3d837f41b872bf866c4f4a87e4bafed6e))
-   fixed lazy loading ([60f9689](https://github.com/matteobruni/tsparticles/commit/60f96899bc564e547a49a5e17be4f40fe12288ba))
-   migrated to chunks ([58b69c1](https://github.com/matteobruni/tsparticles/commit/58b69c130d1e768c0dc0a1b61e904c23408e6ec5))

## [1.35.4](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.35.3...tsparticles@1.35.4) (2021-10-06)

**Note:** Version bump only for package tsparticles

## [1.35.3](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.35.2...tsparticles@1.35.3) (2021-10-03)

### Bug Fixes

-   fixed typings for tsParticles load methods ([847bbbe](https://github.com/matteobruni/tsparticles/commit/847bbbef680d72c50db6dc6ef4d3b297c9b82355))
-   improved new methods without id ([9b7a106](https://github.com/matteobruni/tsparticles/commit/9b7a106acd4c3225aa001f12ab25e4c2b89dde66))

### Features

-   removing the id constraint, a random one will be generated ([3b6b48e](https://github.com/matteobruni/tsparticles/commit/3b6b48efd8962ccc11549339b38888808da2a657))

## [1.35.2](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.35.1...tsparticles@1.35.2) (2021-09-27)

### Bug Fixes

-   added try catch in pathseg polyfill, fixes [#2264](https://github.com/matteobruni/tsparticles/issues/2264) ([6b849f2](https://github.com/matteobruni/tsparticles/commit/6b849f2455371946ab6949385de5b3b6699cae70))

## [1.35.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.35.0...tsparticles@1.35.1) (2021-09-20)

### Bug Fixes

-   fixes [#2241](https://github.com/matteobruni/tsparticles/issues/2241) ([b5802df](https://github.com/matteobruni/tsparticles/commit/b5802dfcbf61f7d236cecc60e141ddd77d4a3d06))

# [1.35.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.34.1...tsparticles@1.35.0) (2021-09-18)

### Bug Fixes

-   fixed issue with emitters and themes, they weren't applied correctly ([3a9dcae](https://github.com/matteobruni/tsparticles/commit/3a9dcaebed687277db76f7f1016e3835284b0d48))

### Features

-   auto themes ([d80b78c](https://github.com/matteobruni/tsparticles/commit/d80b78cb49ae04796473bd06f827d5d5a29a3e35))

## [1.34.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.34.0...tsparticles@1.34.1) (2021-09-15)

**Note:** Version bump only for package tsparticles

# [1.34.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.33.3...tsparticles@1.34.0) (2021-08-23)

### Bug Fixes

-   **deps:** pin dependencies ([23be870](https://github.com/matteobruni/tsparticles/commit/23be8708d698e1e37a18f2ed292cbccffb0f1e47))
-   **deps:** update all ([d9f0ff2](https://github.com/matteobruni/tsparticles/commit/d9f0ff2f8c4ac269aaad5077492746e3da8fb422))
-   fixed click handler, it wasn't working fine ([f0a8170](https://github.com/matteobruni/tsparticles/commit/f0a81705f0f7a0ef51fc21344a7d35a02b11ad22))
-   fixed issue with size and opacity range ([84e9c16](https://github.com/matteobruni/tsparticles/commit/84e9c16ce0e0ea194cb82bdd1c62839809ee621b))
-   fixed issues with moveSpeed 0 ([6c9dd6e](https://github.com/matteobruni/tsparticles/commit/6c9dd6e1490e8d6f49188e1b2d4cff92d7a9c610))
-   fixed roll and tilt updaters ([d4a7df3](https://github.com/matteobruni/tsparticles/commit/d4a7df3c982dc0332890d16244d7df320cd5fd11))
-   fixed wobble updater ([cd13fca](https://github.com/matteobruni/tsparticles/commit/cd13fca6bad6611926e5f01a43ba6412b79fb608))

### Features

-   added gradient angle animated rotation support ([de8f0a4](https://github.com/matteobruni/tsparticles/commit/de8f0a46436601aeb580651b1f87741fd9fc3c79))
-   added gradient options for particles ([c8ecec7](https://github.com/matteobruni/tsparticles/commit/c8ecec7eeda3ecedcdda3bf21eb8fa71c2a276ef))
-   added shapes and fill options to emitters ([e8b32a3](https://github.com/matteobruni/tsparticles/commit/e8b32a372190511c3350f6ddb112d0ff8f736c27))
-   added start count to emitters ([5403426](https://github.com/matteobruni/tsparticles/commit/540342630e67baf665f114f9667001638cf5dc3d))
-   added triangles preset ([2a7aa6a](https://github.com/matteobruni/tsparticles/commit/2a7aa6a98666defea5ecc2bc42aed44d6257a70e))
-   created gradient updater library, only colors for now ([7d31c62](https://github.com/matteobruni/tsparticles/commit/7d31c62ecb8f023234514b5ef46f0de55f75c283))
-   fixed new wait life emitter option ([ae88774](https://github.com/matteobruni/tsparticles/commit/ae88774239060da6d7b9e98029bf1819511202d6))
-   improved move path generators ([9b67377](https://github.com/matteobruni/tsparticles/commit/9b67377f9208a005b122e312ad4ad3c95a50deb7))
-   moved emitter shapes to a plugin system, so they can be customized by users ([5bec360](https://github.com/matteobruni/tsparticles/commit/5bec36067804b425af12766275da74fbfe89d20c))

## [1.33.3](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.33.2...tsparticles@1.33.3) (2021-08-10)

### Bug Fixes

-   fixed click handler with touch events ([ad4bf8a](https://github.com/matteobruni/tsparticles/commit/ad4bf8a56cb7e110114c8ec25dab1151c440f212))
-   fixed click handler, it wasn't working fine ([fd9873b](https://github.com/matteobruni/tsparticles/commit/fd9873b250d236b196cc7ff952d237f2768fb26b))
-   improved out modes and spin movement ([1c811cf](https://github.com/matteobruni/tsparticles/commit/1c811cfefe0b004857b3174e766a34d9bf614361))

### Features

-   added new methods to particle class ([5743453](https://github.com/matteobruni/tsparticles/commit/5743453906001569f262888aa54539ad4e1463ac))

## [1.33.2](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.33.1...tsparticles@1.33.2) (2021-07-31)

### Bug Fixes

-   brought v2 changes to absorbers ([cbad5c2](https://github.com/matteobruni/tsparticles/commit/cbad5c2651058eeac7bda0fc79e498e3b4126232))

## [1.33.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.33.0...tsparticles@1.33.1) (2021-07-29)

### Bug Fixes

-   fixed frozen frames (more than 1 seconds), this will fix the issue with pause on blur ([5a933c1](https://github.com/matteobruni/tsparticles/commit/5a933c130d85593e9d0772bb9eb2b7a61f643712))

# [1.33.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.32.0...tsparticles@1.33.0) (2021-07-29)

### Bug Fixes

-   fixed broken movement in 1.31 ([6787035](https://github.com/matteobruni/tsparticles/commit/6787035c746bdc11055d00ca83869ed837258ec8))
-   fixed images shape options ([8964fe6](https://github.com/matteobruni/tsparticles/commit/8964fe6dd3b2556de47ba307fe87306764672bcc))
-   fixed line shape ([5c1c612](https://github.com/matteobruni/tsparticles/commit/5c1c6120af7e10abf26252c3c1be632675bfd3a5))
-   fixed pause on blur ([a7bd28f](https://github.com/matteobruni/tsparticles/commit/a7bd28f547a02434c188cdee4aa035424996559e))

### Features

-   added resize observer, this will replace window.resize if available ([4197f26](https://github.com/matteobruni/tsparticles/commit/4197f2654e8767039dbfd66eca34f261ee3d88c8))
-   bubble color can now be mixed with the original one to have a smoother effect ([df11d66](https://github.com/matteobruni/tsparticles/commit/df11d66ee94fb9594805a5dfb7d4c776a93c4532))
-   spin movement enabled from v2 ([240a38f](https://github.com/matteobruni/tsparticles/commit/240a38f9a8c78e5b683d655d5f94476e396a5076))

## [1.18.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0...tsparticles@1.18.1) (2020-10-06)

### Bug Fixes

-   fixes triangles issues described in [#930](https://github.com/matteobruni/tsparticles/issues/930), still not implemented the color animation ([18f82d5](https://github.com/matteobruni/tsparticles/commit/18f82d5c7317ac002edd14335de41ce750fc3820))
-   manual particles optional position, now they can be random positioned with custom options ([0f67407](https://github.com/matteobruni/tsparticles/commit/0f674072786c80dc45946bf904a3fc544f428901))

# [1.18.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-beta.5...tsparticles@1.18.0) (2020-10-05)

**Note:** Version bump only for package tsparticles

# [1.18.0-beta.5](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-beta.4...tsparticles@1.18.0-beta.5) (2020-10-04)

**Note:** Version bump only for package tsparticles

# [1.18.0-beta.4](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-beta.3...tsparticles@1.18.0-beta.4) (2020-10-04)

### Bug Fixes

-   fixed bounce on rectangular divs ([593c021](https://github.com/matteobruni/tsparticles/commit/593c0212feef94a81578d46c032c458dafa6819a))

# [1.18.0-beta.3](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-beta.2...tsparticles@1.18.0-beta.3) (2020-10-03)

### Bug Fixes

-   fixed rotation animation issues ([3641ff4](https://github.com/matteobruni/tsparticles/commit/3641ff467bb2c7737c1c5c73bc094b408bcec8c7))

# [1.18.0-beta.2](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-beta.1...tsparticles@1.18.0-beta.2) (2020-10-03)

### Bug Fixes

-   fixed issue with new bounce active conditions ([9be2b73](https://github.com/matteobruni/tsparticles/commit/9be2b730ebbfe4c6ddbea91423aeb791e1d7de02))

# [1.18.0-beta.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-beta.0...tsparticles@1.18.0-beta.1) (2020-10-03)

### Features

-   added bounce to mouse hover event ([8bf39a2](https://github.com/matteobruni/tsparticles/commit/8bf39a2ef2a4a6649b99c394fe9e639c2c5997b1))

# [1.18.0-beta.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.12...tsparticles@1.18.0-beta.0) (2020-10-02)

### Bug Fixes

-   autostart feature fixed ([bed7824](https://github.com/matteobruni/tsparticles/commit/bed78248c941d57ad4cc20a455147e186e97c7a1))
-   check if all triangles vertices have link triangles enabled ([9956660](https://github.com/matteobruni/tsparticles/commit/9956660883e7334f9c9522fb43471dd458a760bb))
-   editor fixed with new color refactoring ([b09a5c8](https://github.com/matteobruni/tsparticles/commit/b09a5c849317cef93469203c67381ab8d5877cae))
-   fixed [#618](https://github.com/matteobruni/tsparticles/issues/618) ([aa6fe99](https://github.com/matteobruni/tsparticles/commit/aa6fe9935b289178ec84b93dcd31160ed3107369))
-   fixed background mode canvas reset ([f78252a](https://github.com/matteobruni/tsparticles/commit/f78252afee4363311c039da79216c848647da51e))
-   fixed bounce for [#739](https://github.com/matteobruni/tsparticles/issues/739) ([738a16f](https://github.com/matteobruni/tsparticles/commit/738a16f1d50780c961d7c258e97b40d94762057e))
-   fixed editor properties, missing themes for now ([8598460](https://github.com/matteobruni/tsparticles/commit/85984607f96f0207ebb9ed4ecce55f63929dfd53))
-   fixed issue with initial window resize ([f863bdc](https://github.com/matteobruni/tsparticles/commit/f863bdcf144e15b9b24f9edbcfbd9137b92e93c5))
-   fixed life duration/delay sync options ([2db867c](https://github.com/matteobruni/tsparticles/commit/2db867cf52c9f26c431a6d88fabace0ca3f9b200))
-   fixed links broken with a previous commit, updated object-gui ([24b2872](https://github.com/matteobruni/tsparticles/commit/24b2872ef736efd5e03b529a94e3f695c4504e86))
-   fixed other animations with reduced motion ([4ba8dfd](https://github.com/matteobruni/tsparticles/commit/4ba8dfd6213261ea35b0c4426dffd7e93e1eecb9))
-   fixed prefers reduced motion query ([6a39ff4](https://github.com/matteobruni/tsparticles/commit/6a39ff4429bcc5158767e135b32b5c8ba8c473c5))
-   fixed rotate following path ([cd7ed78](https://github.com/matteobruni/tsparticles/commit/cd7ed789545bd38f68369407af08e4c96d6a1230))

### Features

-   add hsv color support ([39ad40a](https://github.com/matteobruni/tsparticles/commit/39ad40a0e67076985aa9cac684f337ea3e052a29))
-   added background mode to make the canvas acts like an animated background ([d911467](https://github.com/matteobruni/tsparticles/commit/d91146765581cc2d6ff42c6c68fd2726079638e0))
-   added feature from issue [#797](https://github.com/matteobruni/tsparticles/issues/797) ([79197c9](https://github.com/matteobruni/tsparticles/commit/79197c96a4ed55a9d9ba62232ae7c1ffe78c5890))
-   added gravity and edge bounce customization ([cfdfe53](https://github.com/matteobruni/tsparticles/commit/cfdfe53de72a33686fb73ea345c08a7a27542ba0))
-   added HSV support ([5083e08](https://github.com/matteobruni/tsparticles/commit/5083e089d55bf92eab2505d440be7b226b67d01a))
-   added motion options to handle prefers-reduced-motion media query, fixes [#888](https://github.com/matteobruni/tsparticles/issues/888) ([89a4ffb](https://github.com/matteobruni/tsparticles/commit/89a4ffb7f13b1c6585097c1e9e2a4a0c78074512))
-   added movement speed affected by particles size ([3a3d893](https://github.com/matteobruni/tsparticles/commit/3a3d893c8091fe8d550c31e49d448f4969b00685))
-   added sides count to particle to improve the shadow for the light over ([d9110ef](https://github.com/matteobruni/tsparticles/commit/d9110efa8ebf049a876f0f001e858548921156f9))
-   added triangles frequency, but needs some work to be completed, started working on [#691](https://github.com/matteobruni/tsparticles/issues/691) ([37e1c92](https://github.com/matteobruni/tsparticles/commit/37e1c926e647e5d450e998ff7f7bb3c45aa3d850))
-   bounce mode for divs, working only on squared divs but it's something ([24aeb1e](https://github.com/matteobruni/tsparticles/commit/24aeb1e69c3a8847e52efd6c81b11fabbc1050bc))
-   bounce mode is now working fine for circular divs too ([b92ef32](https://github.com/matteobruni/tsparticles/commit/b92ef321010904d84c4b365bd111bd0c6c5ef47b))
-   changed loadJSON with multiple configs and an optional index to select one of them ([bdba2ef](https://github.com/matteobruni/tsparticles/commit/bdba2ef691d272bc6b3d29f45dac25b4c8469c3e))
-   collisions between particles have now the bounce factor customizable ([da68ce7](https://github.com/matteobruni/tsparticles/commit/da68ce7ca974206af7781b833203ea0b1a6b0966))
-   completed [#691](https://github.com/matteobruni/tsparticles/issues/691), need to improve links and triangles performance ([9d82c2c](https://github.com/matteobruni/tsparticles/commit/9d82c2c888a9e93cd4b5c2523a055561e01af8de))
-   completed HSV support ([0cf39d0](https://github.com/matteobruni/tsparticles/commit/0cf39d03cb5494965087d8dc4ee40ae3468aeafd))
-   fixed [#739](https://github.com/matteobruni/tsparticles/issues/739), added outModes instead of a single out mode, every edge now can be customized ([67194dc](https://github.com/matteobruni/tsparticles/commit/67194dcceb2a78d75c75d331e4940d3900557875))
-   fixed some editor outdated fields and added some new ([30b4ac9](https://github.com/matteobruni/tsparticles/commit/30b4ac9f59c2b09768fcb3432114bcbb027c8577))
-   found a good solution with good performance to fix [#691](https://github.com/matteobruni/tsparticles/issues/691) ([08c37a5](https://github.com/matteobruni/tsparticles/commit/08c37a5e38221d100de5b538242169f37947e668))
-   hsv color documentation ([c63423d](https://github.com/matteobruni/tsparticles/commit/c63423d6c77e5276c6956ed1a91080257291aed0))
-   loadJSON can accept also a string array and an optional index parameter ([2ecd9f9](https://github.com/matteobruni/tsparticles/commit/2ecd9f9322293a80ded07f70acc5be2f12aca8f0))
-   manual particles, fixes [#839](https://github.com/matteobruni/tsparticles/issues/839) ([4531b4a](https://github.com/matteobruni/tsparticles/commit/4531b4a567db2b31715a3be59e9b50161a23ea9d))
-   mouse acts like a light source, closes [#606](https://github.com/matteobruni/tsparticles/issues/606) ([84aad25](https://github.com/matteobruni/tsparticles/commit/84aad25f3dfd5da9e99818e87c9b3f6a30c6f590))
-   particle with move max distance are now good, closes [#740](https://github.com/matteobruni/tsparticles/issues/740) ([e1453c7](https://github.com/matteobruni/tsparticles/commit/e1453c735c2af23453f4f8e5efefb70c415496d3))
-   used particle id to reduce duplicates to to close [#437](https://github.com/matteobruni/tsparticles/issues/437) ([7a3aef1](https://github.com/matteobruni/tsparticles/commit/7a3aef16f494df8f6622eb35cb0eb5d08b2b6a58))

### Reverts

-   links and triangles frequency are rolled back, I didn't like the performances ([4a6875c](https://github.com/matteobruni/tsparticles/commit/4a6875ca61e0fd6277e4af4b7931d9096d5ca071))

# [1.18.0-alpha.14](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.9...tsparticles@1.18.0-alpha.14) (2020-08-22)

### Bug Fixes

-   autostart feature fixed ([bed7824](https://github.com/matteobruni/tsparticles/commit/bed78248c941d57ad4cc20a455147e186e97c7a1))
-   check if all triangles vertices have link triangles enabled ([9956660](https://github.com/matteobruni/tsparticles/commit/9956660883e7334f9c9522fb43471dd458a760bb))
-   fixed background mode canvas reset ([f78252a](https://github.com/matteobruni/tsparticles/commit/f78252afee4363311c039da79216c848647da51e))
-   fixed links broken with a previous commit, updated object-gui ([24b2872](https://github.com/matteobruni/tsparticles/commit/24b2872ef736efd5e03b529a94e3f695c4504e86))

### Features

-   added background mode to make the canvas acts like an animated background ([d911467](https://github.com/matteobruni/tsparticles/commit/d91146765581cc2d6ff42c6c68fd2726079638e0))
-   added gravity and edge bounce customization ([cfdfe53](https://github.com/matteobruni/tsparticles/commit/cfdfe53de72a33686fb73ea345c08a7a27542ba0))
-   mouse acts like a light source, closes [#606](https://github.com/matteobruni/tsparticles/issues/606) ([84aad25](https://github.com/matteobruni/tsparticles/commit/84aad25f3dfd5da9e99818e87c9b3f6a30c6f590))

# [1.18.0-alpha.13](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.12...tsparticles@1.18.0-alpha.13) (2020-08-17)

### Bug Fixes

-   autostart feature fixed ([bed7824](https://github.com/matteobruni/tsparticles/commit/bed78248c941d57ad4cc20a455147e186e97c7a1))

# [1.18.0-alpha.12](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.8...tsparticles@1.18.0-alpha.12) (2020-08-16)

### Bug Fixes

-   check if all triangles vertices have link triangles enabled ([9956660](https://github.com/matteobruni/tsparticles/commit/9956660883e7334f9c9522fb43471dd458a760bb))
-   fixed background mode canvas reset ([f78252a](https://github.com/matteobruni/tsparticles/commit/f78252afee4363311c039da79216c848647da51e))
-   fixed links broken with a previous commit, updated object-gui ([24b2872](https://github.com/matteobruni/tsparticles/commit/24b2872ef736efd5e03b529a94e3f695c4504e86))

### Features

-   added background mode to make the canvas acts like an animated background ([d911467](https://github.com/matteobruni/tsparticles/commit/d91146765581cc2d6ff42c6c68fd2726079638e0))
-   mouse acts like a light source, closes [#606](https://github.com/matteobruni/tsparticles/issues/606) ([84aad25](https://github.com/matteobruni/tsparticles/commit/84aad25f3dfd5da9e99818e87c9b3f6a30c6f590))

# [1.18.0-alpha.11](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.10...tsparticles@1.18.0-alpha.11) (2020-08-13)

**Note:** Version bump only for package tsparticles

# [1.18.0-alpha.10](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.9...tsparticles@1.18.0-alpha.10) (2020-08-13)

### Bug Fixes

-   fixed background mode canvas reset ([f78252a](https://github.com/matteobruni/tsparticles/commit/f78252afee4363311c039da79216c848647da51e))

# [1.18.0-alpha.9](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.8...tsparticles@1.18.0-alpha.9) (2020-08-13)

**Note:** Version bump only for package tsparticles

# [1.18.0-alpha.8](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.7...tsparticles@1.18.0-alpha.8) (2020-08-13)

### Features

-   added background mode to make the canvas acts like an animated background ([d911467](https://github.com/matteobruni/tsparticles/commit/d91146765581cc2d6ff42c6c68fd2726079638e0))

# [1.18.0-alpha.7](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.6...tsparticles@1.18.0-alpha.7) (2020-08-12)

**Note:** Version bump only for package tsparticles

# [1.18.0-alpha.6](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.5...tsparticles@1.18.0-alpha.6) (2020-08-11)

**Note:** Version bump only for package tsparticles

# [1.18.0-alpha.5](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.4...tsparticles@1.18.0-alpha.5) (2020-08-11)

**Note:** Version bump only for package tsparticles

# [1.18.0-alpha.4](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.3...tsparticles@1.18.0-alpha.4) (2020-08-11)

**Note:** Version bump only for package tsparticles

# [1.18.0-alpha.3](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.2...tsparticles@1.18.0-alpha.3) (2020-08-10)

**Note:** Version bump only for package tsparticles

# [1.18.0-alpha.2](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.1...tsparticles@1.18.0-alpha.2) (2020-08-09)

### Features

-   mouse acts like a light source, closes [#606](https://github.com/matteobruni/tsparticles/issues/606) ([84aad25](https://github.com/matteobruni/tsparticles/commit/84aad25f3dfd5da9e99818e87c9b3f6a30c6f590))

# [1.18.0-alpha.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.7...tsparticles@1.18.0-alpha.1) (2020-08-08)

**Note:** Version bump only for package tsparticles

# [1.17.0-alpha.14](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.13...tsparticles@1.17.0-alpha.14) (2020-07-05)

**Note:** Version bump only for package tsparticles

# [1.17.0-alpha.13](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.12...tsparticles@1.17.0-alpha.13) (2020-07-05)

**Note:** Version bump only for package tsparticles

# [1.17.0-alpha.12](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.11...tsparticles@1.17.0-alpha.12) (2020-07-04)

### Bug Fixes

-   added valid string values to option enum properties, fixes [#508](https://github.com/matteobruni/tsparticles/issues/508) ([b6328cf](https://github.com/matteobruni/tsparticles/commit/b6328cf97a50e8cee736db0ac641f742cd09b38d))
-   fixed overlapping issues ([442777c](https://github.com/matteobruni/tsparticles/commit/442777cac2428168e099bb2c95cd8c580206ee50))
-   fixed random color ([a9ff25a](https://github.com/matteobruni/tsparticles/commit/a9ff25aa47dd9095c117844b6c0c6d9601851948))
-   fixes [#508](https://github.com/matteobruni/tsparticles/issues/508), some values were excluded ([f0cb970](https://github.com/matteobruni/tsparticles/commit/f0cb97015ff39c3a3db5ce5cdb8301b316cc8405))

# [1.17.0-alpha.11](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.16.2...tsparticles@1.17.0-alpha.11) (2020-07-02)

### Bug Fixes

-   color un-sync animation start value ([40fed71](https://github.com/matteobruni/tsparticles/commit/40fed71eb560c1608e888e1c1b8344fd6b3e2abf))
-   options interfaces don't have load function anymore ([62cfc82](https://github.com/matteobruni/tsparticles/commit/62cfc82a28b7fcadbe5ad3db816bd5d4614d1dc0))
-   rectangle query fix ([b210390](https://github.com/matteobruni/tsparticles/commit/b21039091991aecc58498d66fbeb875851939469))

### Features

-   stroke color animation ([deabadd](https://github.com/matteobruni/tsparticles/commit/deabadd7fad1b78f76e5afeea64ae5d4ac87fd61))

# [1.17.0-alpha.10](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.9...tsparticles@1.17.0-alpha.10) (2020-06-29)

### Bug Fixes

-   rectangle query fix ([b210390](https://github.com/matteobruni/tsparticles/commit/b21039091991aecc58498d66fbeb875851939469))

# [1.17.0-alpha.9](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.8...tsparticles@1.17.0-alpha.9) (2020-06-29)

### Bug Fixes

-   color un-sync animation start value ([40fed71](https://github.com/matteobruni/tsparticles/commit/40fed71eb560c1608e888e1c1b8344fd6b3e2abf))

# [1.17.0-alpha.8](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.7...tsparticles@1.17.0-alpha.8) (2020-06-26)

### Bug Fixes

-   click handler with particle size gives better results, little fixes for absorber orbits ([e851049](https://github.com/matteobruni/tsparticles/commit/e851049b480a205813b9df786ad7c5761645de1c))

# [1.17.0-alpha.7](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.6...tsparticles@1.17.0-alpha.7) (2020-06-26)

### Bug Fixes

-   text particles are now rendered correctly with more than 1 char ([a803508](https://github.com/matteobruni/tsparticles/commit/a8035087dc6754a0c95600f115f9dcfa92a1783d))

### Features

-   improved setOnClickHandler with clicked/touched particles search, closes [#450](https://github.com/matteobruni/tsparticles/issues/450) ([35cf30f](https://github.com/matteobruni/tsparticles/commit/35cf30fed0710bbc1412f6d4bf1ae3421004cc47))

# [1.17.0-alpha.6](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.5...tsparticles@1.17.0-alpha.6) (2020-06-24)

### Features

-   working on orbits for absorbers ([480c25b](https://github.com/matteobruni/tsparticles/commit/480c25b3da96ecc4df46f7a05e57eea9fdcf64c6))
-   working on orbits for absorbers ([1f55430](https://github.com/matteobruni/tsparticles/commit/1f55430b51a108236940e6a8c3d2ae97c82583b2))

# [1.17.0-alpha.5](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.16.1...tsparticles@1.17.0-alpha.5) (2020-06-23)

### Bug Fixes

-   added missing license in core project, updated README.md ([10ffe6d](https://github.com/matteobruni/tsparticles/commit/10ffe6d4c1d0252fa0701301b94b74d532ca0e40))
-   fixed null check in EventListeners.ts ([01f13b5](https://github.com/matteobruni/tsparticles/commit/01f13b5a7cc67e6e0696ee9019dd7a0c1822f393))
-   fixed window mouse leave event ([17b5ce6](https://github.com/matteobruni/tsparticles/commit/17b5ce64b4cb44c276913db7b909bb3c5ab14e15))
-   improved performance of QTree fixing rectangle ([4a5468a](https://github.com/matteobruni/tsparticles/commit/4a5468ae178e861855ce8c0b1b8cfcb1d807570a))
-   readme prettiefied ([2d5a39a](https://github.com/matteobruni/tsparticles/commit/2d5a39ad6b75592da530e021e09f2c109915d9de))
-   removed console.log used for debug ([71365fa](https://github.com/matteobruni/tsparticles/commit/71365fa2c73afbce67fd66163f4ed367d880dd13))
-   removed unused variable ([c8989b2](https://github.com/matteobruni/tsparticles/commit/c8989b2304b857416aaa763f27675c5694e7cc00))
-   removed unused variable ([b3762dc](https://github.com/matteobruni/tsparticles/commit/b3762dcd7528d1cb20c93220dfe9662f7595d643))
-   tests fixed ([df669ff](https://github.com/matteobruni/tsparticles/commit/df669ff8357c4e40bba01bd4d6c00aa06a11073c))

### Features

-   added option for rotate following move direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([ee1dd85](https://github.com/matteobruni/tsparticles/commit/ee1dd850fafd1e00e750c9738f4f60543133c504))
-   draggable option for absorbers ([3b42861](https://github.com/matteobruni/tsparticles/commit/3b4286126800c316768326f774f13aa2cda62198))
-   mouse trail completed, closes [#401](https://github.com/matteobruni/tsparticles/issues/401) ([4b1bc1a](https://github.com/matteobruni/tsparticles/commit/4b1bc1a185860718e26904c6980f88621d4a99ce))
-   options for issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([2dd055f](https://github.com/matteobruni/tsparticles/commit/2dd055f867852f2ce66637cc16c7ba318a968fcd))
-   particles orientation based on their direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([f0ec58e](https://github.com/matteobruni/tsparticles/commit/f0ec58ebf463514805272871fb3c856e3d667aee))
-   started working on issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([bdf5bb9](https://github.com/matteobruni/tsparticles/commit/bdf5bb91b5fcac8642a8bd7e01056295062f178a))

# [1.17.0-alpha.4](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.16.0...tsparticles@1.17.0-alpha.4) (2020-06-22)

### Bug Fixes

-   added missing license in core project, updated README.md ([10ffe6d](https://github.com/matteobruni/tsparticles/commit/10ffe6d4c1d0252fa0701301b94b74d532ca0e40))
-   fixed null check in EventListeners.ts ([01f13b5](https://github.com/matteobruni/tsparticles/commit/01f13b5a7cc67e6e0696ee9019dd7a0c1822f393))
-   fixed window mouse leave event ([17b5ce6](https://github.com/matteobruni/tsparticles/commit/17b5ce64b4cb44c276913db7b909bb3c5ab14e15))
-   improved performance of QTree fixing rectangle ([4a5468a](https://github.com/matteobruni/tsparticles/commit/4a5468ae178e861855ce8c0b1b8cfcb1d807570a))
-   readme prettiefied ([2d5a39a](https://github.com/matteobruni/tsparticles/commit/2d5a39ad6b75592da530e021e09f2c109915d9de))
-   removed console.log used for debug ([71365fa](https://github.com/matteobruni/tsparticles/commit/71365fa2c73afbce67fd66163f4ed367d880dd13))
-   removed unused variable ([c8989b2](https://github.com/matteobruni/tsparticles/commit/c8989b2304b857416aaa763f27675c5694e7cc00))
-   removed unused variable ([b3762dc](https://github.com/matteobruni/tsparticles/commit/b3762dcd7528d1cb20c93220dfe9662f7595d643))
-   tests fixed ([df669ff](https://github.com/matteobruni/tsparticles/commit/df669ff8357c4e40bba01bd4d6c00aa06a11073c))

### Features

-   added option for rotate following move direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([ee1dd85](https://github.com/matteobruni/tsparticles/commit/ee1dd850fafd1e00e750c9738f4f60543133c504))
-   draggable option for absorbers ([3b42861](https://github.com/matteobruni/tsparticles/commit/3b4286126800c316768326f774f13aa2cda62198))
-   mouse trail completed, closes [#401](https://github.com/matteobruni/tsparticles/issues/401) ([4b1bc1a](https://github.com/matteobruni/tsparticles/commit/4b1bc1a185860718e26904c6980f88621d4a99ce))
-   options for issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([2dd055f](https://github.com/matteobruni/tsparticles/commit/2dd055f867852f2ce66637cc16c7ba318a968fcd))
-   particles orientation based on their direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([f0ec58e](https://github.com/matteobruni/tsparticles/commit/f0ec58ebf463514805272871fb3c856e3d667aee))
-   started working on issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([bdf5bb9](https://github.com/matteobruni/tsparticles/commit/bdf5bb91b5fcac8642a8bd7e01056295062f178a))

# [1.17.0-alpha.3](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.16.0...tsparticles@1.17.0-alpha.3) (2020-06-21)

### Bug Fixes

-   added missing license in core project, updated README.md ([10ffe6d](https://github.com/matteobruni/tsparticles/commit/10ffe6d4c1d0252fa0701301b94b74d532ca0e40))
-   fixed null check in EventListeners.ts ([01f13b5](https://github.com/matteobruni/tsparticles/commit/01f13b5a7cc67e6e0696ee9019dd7a0c1822f393))
-   fixed window mouse leave event ([17b5ce6](https://github.com/matteobruni/tsparticles/commit/17b5ce64b4cb44c276913db7b909bb3c5ab14e15))
-   readme prettiefied ([2d5a39a](https://github.com/matteobruni/tsparticles/commit/2d5a39ad6b75592da530e021e09f2c109915d9de))
-   removed console.log used for debug ([71365fa](https://github.com/matteobruni/tsparticles/commit/71365fa2c73afbce67fd66163f4ed367d880dd13))
-   tests fixed ([df669ff](https://github.com/matteobruni/tsparticles/commit/df669ff8357c4e40bba01bd4d6c00aa06a11073c))

### Features

-   added option for rotate following move direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([ee1dd85](https://github.com/matteobruni/tsparticles/commit/ee1dd850fafd1e00e750c9738f4f60543133c504))
-   mouse trail completed, closes [#401](https://github.com/matteobruni/tsparticles/issues/401) ([4b1bc1a](https://github.com/matteobruni/tsparticles/commit/4b1bc1a185860718e26904c6980f88621d4a99ce))
-   options for issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([2dd055f](https://github.com/matteobruni/tsparticles/commit/2dd055f867852f2ce66637cc16c7ba318a968fcd))
-   particles orientation based on their direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([f0ec58e](https://github.com/matteobruni/tsparticles/commit/f0ec58ebf463514805272871fb3c856e3d667aee))
-   started working on issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([bdf5bb9](https://github.com/matteobruni/tsparticles/commit/bdf5bb91b5fcac8642a8bd7e01056295062f178a))

# [1.17.0-alpha.2](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.16.0...tsparticles@1.17.0-alpha.2) (2020-06-21)

### Bug Fixes

-   added missing license in core project, updated README.md ([10ffe6d](https://github.com/matteobruni/tsparticles/commit/10ffe6d4c1d0252fa0701301b94b74d532ca0e40))
-   fixed null check in EventListeners.ts ([01f13b5](https://github.com/matteobruni/tsparticles/commit/01f13b5a7cc67e6e0696ee9019dd7a0c1822f393))
-   fixed window mouse leave event ([17b5ce6](https://github.com/matteobruni/tsparticles/commit/17b5ce64b4cb44c276913db7b909bb3c5ab14e15))
-   readme prettiefied ([2d5a39a](https://github.com/matteobruni/tsparticles/commit/2d5a39ad6b75592da530e021e09f2c109915d9de))
-   removed console.log used for debug ([71365fa](https://github.com/matteobruni/tsparticles/commit/71365fa2c73afbce67fd66163f4ed367d880dd13))
-   tests fixed ([df669ff](https://github.com/matteobruni/tsparticles/commit/df669ff8357c4e40bba01bd4d6c00aa06a11073c))

### Features

-   mouse trail completed, closes [#401](https://github.com/matteobruni/tsparticles/issues/401) ([4b1bc1a](https://github.com/matteobruni/tsparticles/commit/4b1bc1a185860718e26904c6980f88621d4a99ce))
-   options for issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([2dd055f](https://github.com/matteobruni/tsparticles/commit/2dd055f867852f2ce66637cc16c7ba318a968fcd))
-   particles orientation based on their direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([f0ec58e](https://github.com/matteobruni/tsparticles/commit/f0ec58ebf463514805272871fb3c856e3d667aee))
-   started working on issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([bdf5bb9](https://github.com/matteobruni/tsparticles/commit/bdf5bb91b5fcac8642a8bd7e01056295062f178a))

# [1.17.0-alpha.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.16.0...tsparticles@1.17.0-alpha.1) (2020-06-20)

### Bug Fixes

-   added missing license in core project, updated README.md ([10ffe6d](https://github.com/matteobruni/tsparticles/commit/10ffe6d4c1d0252fa0701301b94b74d532ca0e40))
-   fixed null check in EventListeners.ts ([01f13b5](https://github.com/matteobruni/tsparticles/commit/01f13b5a7cc67e6e0696ee9019dd7a0c1822f393))
-   fixed window mouse leave event ([17b5ce6](https://github.com/matteobruni/tsparticles/commit/17b5ce64b4cb44c276913db7b909bb3c5ab14e15))
-   readme prettiefied ([2d5a39a](https://github.com/matteobruni/tsparticles/commit/2d5a39ad6b75592da530e021e09f2c109915d9de))
-   removed console.log used for debug ([71365fa](https://github.com/matteobruni/tsparticles/commit/71365fa2c73afbce67fd66163f4ed367d880dd13))
-   tests fixed ([df669ff](https://github.com/matteobruni/tsparticles/commit/df669ff8357c4e40bba01bd4d6c00aa06a11073c))

### Features

-   mouse trail completed, closes [#401](https://github.com/matteobruni/tsparticles/issues/401) ([4b1bc1a](https://github.com/matteobruni/tsparticles/commit/4b1bc1a185860718e26904c6980f88621d4a99ce))
-   options for issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([2dd055f](https://github.com/matteobruni/tsparticles/commit/2dd055f867852f2ce66637cc16c7ba318a968fcd))
-   started working on issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([bdf5bb9](https://github.com/matteobruni/tsparticles/commit/bdf5bb91b5fcac8642a8bd7e01056295062f178a))
