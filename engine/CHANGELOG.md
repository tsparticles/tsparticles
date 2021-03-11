# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-alpha.3](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.0-alpha.2...tsparticles-engine@2.0.0-alpha.3) (2021-02-07)


### Bug Fixes

* fixed gravity with new speed algorithm ([6dc837f](https://github.com/matteobruni/tsparticles/commit/6dc837f07a34426cdb81d3a6ebde983801cce68b))
* fixed split bounce ([5955d53](https://github.com/matteobruni/tsparticles/commit/5955d530e0f3db8725bc9b38e7c90a60809631ea))
* some changes to movement and gravity ([ed45f2b](https://github.com/matteobruni/tsparticles/commit/ed45f2ba4c9bfd5f0520a5f3e3d2c467a565ce37))


### Features

* working on add split particles, the new particle velocity needs improvements ([a05cc3e](https://github.com/matteobruni/tsparticles/commit/a05cc3ed9301b2862a474ff72a95aadca1d0bfe1))





# [2.0.0-alpha.2](https://github.com/matteobruni/tsparticles/compare/tsparticles-engine@2.0.0-alpha.1...tsparticles-engine@2.0.0-alpha.2) (2021-01-24)

**Note:** Version bump only for package tsparticles-engine





# 2.0.0-alpha.1 (2021-01-24)


### Bug Fixes

* fixed absorbers using new Vector class ([df9a6f9](https://github.com/matteobruni/tsparticles/commit/df9a6f9a97efb50a386d8e696360216afac69c92))





# 2.0.0-alpha.0 (2021-01-24)


### Bug Fixes

* fixed absorbers using new Vector class ([df9a6f9](https://github.com/matteobruni/tsparticles/commit/df9a6f9a97efb50a386d8e696360216afac69c92))





# [1.19.0-alpha.5](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.19.0-alpha.4...tsparticles@1.19.0-alpha.5) (2020-12-11)

**Note:** Version bump only for package tsparticles





# [1.19.0-alpha.4](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.19.0-alpha.3...tsparticles@1.19.0-alpha.4) (2020-12-08)


### Bug Fixes

* changed the move particle method reducing the speed to quarter instead of half ([e097a64](https://github.com/matteobruni/tsparticles/commit/e097a64a11dbc81a071448f95b0870fb9d243a14))
* fixed color animation loop ([bacaae4](https://github.com/matteobruni/tsparticles/commit/bacaae4d2998a12a37e4e8ae1b11a3de89625a57))
* fixed color animations ([b0d325f](https://github.com/matteobruni/tsparticles/commit/b0d325fac6001b70c5277c91e346490aa036b9d9))
* fixed particle initial position ([c8e467d](https://github.com/matteobruni/tsparticles/commit/c8e467dbc3aec4ad4c7bf129502f69e58b706bae))
* fixed previous sorting improvements ([1a5454a](https://github.com/matteobruni/tsparticles/commit/1a5454a154e77601930c63b1b05c30d70b2ea8e3))
* fixes undefined on TextDrawer, closes [#1087](https://github.com/matteobruni/tsparticles/issues/1087) ([e47a916](https://github.com/matteobruni/tsparticles/commit/e47a9165009c9525afb3dbd1657d0e3fd54a850c))


### Features

* starting to work with speed/angle instead of horizontal/vertical ([dff77bc](https://github.com/matteobruni/tsparticles/commit/dff77bc1428d83081584de7fcf3b256faab38e4a))





# [1.19.0-alpha.3](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.19.0-alpha.2...tsparticles@1.19.0-alpha.3) (2020-11-27)


### Bug Fixes

* fixed all hsl animations with the right offset value ([1d274eb](https://github.com/matteobruni/tsparticles/commit/1d274ebb4586f0ae5ea372da736dafcb19ed12d8))
* fixed initial position with new implementations made for [#1069](https://github.com/matteobruni/tsparticles/issues/1069) ([e62a3c5](https://github.com/matteobruni/tsparticles/commit/e62a3c531277bc695ba0865c2024835e2648514d))
* orbit color is now a string/color and not a hsl object ([fd5df21](https://github.com/matteobruni/tsparticles/commit/fd5df21d4a2ba785a4f256f54b9c351c8b6af02e))


### Features

* added core build, just the skeleton, no plugins added ([ee5e0a7](https://github.com/matteobruni/tsparticles/commit/ee5e0a7055fac6a810a86bee599a2d22e32f0c6a))
* all h/s/l values can now be animated ([7af9f26](https://github.com/matteobruni/tsparticles/commit/7af9f263bde519c7041f89e5d8db6509579ff444))
* particle initial overlap can be now configured (closes [#1069](https://github.com/matteobruni/tsparticles/issues/1069)) ([d7e81c1](https://github.com/matteobruni/tsparticles/commit/d7e81c1a763fe36f82870d1094e53aa88aace0ae))





# [1.19.0-alpha.2](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.19.0-alpha.1...tsparticles@1.19.0-alpha.2) (2020-11-23)


### Bug Fixes

* fixed background mask without a fill color ([b3429e2](https://github.com/matteobruni/tsparticles/commit/b3429e20e03c8d78e0c85c746b8dda1cd61fa384))
* fixed RecursivePartial type ([5c64fa2](https://github.com/matteobruni/tsparticles/commit/5c64fa2c55a15eb87ee9cb0b6a04166627ad5d0e))


### Features

* fixed window resize, particles are now moved to the right position. closes [#890](https://github.com/matteobruni/tsparticles/issues/890) ([8f29def](https://github.com/matteobruni/tsparticles/commit/8f29defa216343f22d39d022ff71f79a2f95b968))
* new out mode split added, it calls the destroy after bounce. fixes [#994](https://github.com/matteobruni/tsparticles/issues/994) ([b3e4ccc](https://github.com/matteobruni/tsparticles/commit/b3e4ccc61f30d10e2d9207aade18b37d87342f60))





# [1.19.0-alpha.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.19.0-alpha.0...tsparticles@1.19.0-alpha.1) (2020-11-18)


### Bug Fixes

* fixed absorber plugin ([9defe82](https://github.com/matteobruni/tsparticles/commit/9defe82dfc5eef824f9e9c96cec4ada98b105749))
* fixed manual particles with groups ([6bbb131](https://github.com/matteobruni/tsparticles/commit/6bbb131156b0e81867d9b1be2310397f4d4a6dac))
* **tests:** fixed tests ([66860d7](https://github.com/matteobruni/tsparticles/commit/66860d7125f7ed10280a79a12be5b940fa7de2d2))


### Features

* added noise generator management like shape drawers and plugins ([0ae5ac6](https://github.com/matteobruni/tsparticles/commit/0ae5ac620c43199557f56c76517efbc7c178bd29))
* added responsive options, closes [#1004](https://github.com/matteobruni/tsparticles/issues/1004) ([2248ade](https://github.com/matteobruni/tsparticles/commit/2248ade8b8423da9f86ee6e3f2ec9b1fb00b3194))
* destroy section in particles options, this can configure particle split on destroy fixes [#607](https://github.com/matteobruni/tsparticles/issues/607) ([6bae63a](https://github.com/matteobruni/tsparticles/commit/6bae63a328f2646469898d12a4996bddefab55b6))
* distance property in particles.move is now an object with horizontal and vertical properties ([a07c2fe](https://github.com/matteobruni/tsparticles/commit/a07c2fe275d408bd8216afedd479514418183803))
* improved particle spin behavior ([98cb031](https://github.com/matteobruni/tsparticles/commit/98cb031cdc95a406c9f4b990715c1d0d7d587b32))
* particles updater and interactors are now part of the plugin system ([186c9fe](https://github.com/matteobruni/tsparticles/commit/186c9fe878931d89e3b79f86c61c4e40402e0e2b))
* spin movement is now working, still needs improvements ([0958e58](https://github.com/matteobruni/tsparticles/commit/0958e580bb7eee9b47fe6f26879b76eef24d4cac))





# [1.19.0-alpha.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.11...tsparticles@1.19.0-alpha.0) (2020-11-09)


### Bug Fixes

* attract has its own distance and particle size affects it ([31a9c71](https://github.com/matteobruni/tsparticles/commit/31a9c715fbb2f4e5be5671df928d9ad3b7f3dd6b))
* camelcase variables, fix requested changes ([b34e499](https://github.com/matteobruni/tsparticles/commit/b34e49962bf4b95e5bd2e858ffdff4ec9ba4efb7))
* fix requested changes ([be1322f](https://github.com/matteobruni/tsparticles/commit/be1322f0847e36042eab873245aa8e143308d1f3))
* fixed attract mode ([8129228](https://github.com/matteobruni/tsparticles/commit/8129228f1177f93628531de3c764ab2197395495))
* fixed removeAt with groups ([f573438](https://github.com/matteobruni/tsparticles/commit/f5734389bcaa7da7239cbfbf39366e5bb406797a))
* improved mouse events handling ([a7b4a4f](https://github.com/matteobruni/tsparticles/commit/a7b4a4f9e6502d1137b9dd639d3ec0ffa7871c5e))
* links now won't link non-existent particles ([c1d636c](https://github.com/matteobruni/tsparticles/commit/c1d636c35d610bda616980daf036910cfb9ce745))
* makes particle repulsion work like mouse repulsion ([1444b55](https://github.com/matteobruni/tsparticles/commit/1444b55183549a12efeeb71318b6b2bdc7a541da))
* moves particle repulsion to interactions ([74c4407](https://github.com/matteobruni/tsparticles/commit/74c4407a3dc9f5f422accca3e4a9537487b0d520))
* orbit width radius rotation ([c72916f](https://github.com/matteobruni/tsparticles/commit/c72916fa0fa06cad571910301fd9b4bf048568e5))
* removes unnecessary definitions ([60ad310](https://github.com/matteobruni/tsparticles/commit/60ad3107b1058827ecfb8e6b35de52e157acd78a))
* size and opacity are now clamped, this should fix [#1001](https://github.com/matteobruni/tsparticles/issues/1001) ([bec1363](https://github.com/matteobruni/tsparticles/commit/bec13638b385cc821e3ca530795d1b4e036be1fa))


### Features

* add particle social distancing capabilities ([ba8efca](https://github.com/matteobruni/tsparticles/commit/ba8efcaea582a4556b1e960b47762b2e6da84abd))
* add static orbit ([cfe8519](https://github.com/matteobruni/tsparticles/commit/cfe85194d102f38327bfd6690d448b42b583f1b1))
* added groups support to push/remove click modes ([fc573fb](https://github.com/matteobruni/tsparticles/commit/fc573fbb57c9b242fbfdd52d0fc8dc4c032ce196))
* added oct-tree for 3d implementations ([39c3fcd](https://github.com/matteobruni/tsparticles/commit/39c3fcd4b3c97d7cae55173f9bc38ad3c5afb51c))
* added particles groups to override options, missing docs ([0d59ced](https://github.com/matteobruni/tsparticles/commit/0d59cedd526d65c331a4df42b98eb4a483e4d250))
* added sphere implementation to query 3d ranges ([bdec4f0](https://github.com/matteobruni/tsparticles/commit/bdec4f0c7bc74da3dce8cb9da68cb4f5c03e004a))
* adds options to z-index property ([d7162e8](https://github.com/matteobruni/tsparticles/commit/d7162e84532ec2f48fbb3dd497acbb1dc5b98a5b))
* animation, random for orbit angle and redrawn orbit ([95108b3](https://github.com/matteobruni/tsparticles/commit/95108b3368b15f7dc794d73611a429ee6db32163))
* caps z-index values at -9999 and 9999. Better scaling of other values depending on z-index ([f427f00](https://github.com/matteobruni/tsparticles/commit/f427f002aa67f61fc33c31ac3a399ee4d749029f))
* emitters now can have a spawn color that is also animatable ([f4f74db](https://github.com/matteobruni/tsparticles/commit/f4f74db68f08a30fc34c2072588f3c183a035d57))
* first working implementation of zIndex for particles ([0bb4d57](https://github.com/matteobruni/tsparticles/commit/0bb4d57afc202efd474d6cb0a28dbf57f3c9027d))
* improved zIndex ([16ab5e1](https://github.com/matteobruni/tsparticles/commit/16ab5e1a37cd10a0c0d2e8a82f10d26985ad74b8))
* mouse trail can now be stopped when mouse stops ([b3c1e77](https://github.com/matteobruni/tsparticles/commit/b3c1e77d27571798d74a198b76abd976c16704ad))
* prepared spin move options ([2c8d040](https://github.com/matteobruni/tsparticles/commit/2c8d040a15b2c3f5db1881bad6eb25cca9cf9c81))
* repulse without collision enabled ([c6c0bb1](https://github.com/matteobruni/tsparticles/commit/c6c0bb14b28b460c83cbf8e0086c68931465b8dc))





## [1.18.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0...tsparticles@1.18.1) (2020-10-06)


### Bug Fixes

* fixes triangles issues described in [#930](https://github.com/matteobruni/tsparticles/issues/930), still not implemented the color animation ([18f82d5](https://github.com/matteobruni/tsparticles/commit/18f82d5c7317ac002edd14335de41ce750fc3820))
* manual particles optional position, now they can be random positioned with custom options ([0f67407](https://github.com/matteobruni/tsparticles/commit/0f674072786c80dc45946bf904a3fc544f428901))





# [1.18.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-beta.5...tsparticles@1.18.0) (2020-10-05)

**Note:** Version bump only for package tsparticles





# [1.18.0-beta.5](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-beta.4...tsparticles@1.18.0-beta.5) (2020-10-04)

**Note:** Version bump only for package tsparticles





# [1.18.0-beta.4](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-beta.3...tsparticles@1.18.0-beta.4) (2020-10-04)


### Bug Fixes

* fixed bounce on rectangular divs ([593c021](https://github.com/matteobruni/tsparticles/commit/593c0212feef94a81578d46c032c458dafa6819a))





# [1.18.0-beta.3](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-beta.2...tsparticles@1.18.0-beta.3) (2020-10-03)


### Bug Fixes

* fixed rotation animation issues ([3641ff4](https://github.com/matteobruni/tsparticles/commit/3641ff467bb2c7737c1c5c73bc094b408bcec8c7))





# [1.18.0-beta.2](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-beta.1...tsparticles@1.18.0-beta.2) (2020-10-03)


### Bug Fixes

* fixed issue with new bounce active conditions ([9be2b73](https://github.com/matteobruni/tsparticles/commit/9be2b730ebbfe4c6ddbea91423aeb791e1d7de02))





# [1.18.0-beta.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-beta.0...tsparticles@1.18.0-beta.1) (2020-10-03)


### Features

* added bounce to mouse hover event ([8bf39a2](https://github.com/matteobruni/tsparticles/commit/8bf39a2ef2a4a6649b99c394fe9e639c2c5997b1))





# [1.18.0-beta.0](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.12...tsparticles@1.18.0-beta.0) (2020-10-02)


### Bug Fixes

* autostart feature fixed ([bed7824](https://github.com/matteobruni/tsparticles/commit/bed78248c941d57ad4cc20a455147e186e97c7a1))
* check if all triangles vertices have link triangles enabled ([9956660](https://github.com/matteobruni/tsparticles/commit/9956660883e7334f9c9522fb43471dd458a760bb))
* editor fixed with new color refactoring ([b09a5c8](https://github.com/matteobruni/tsparticles/commit/b09a5c849317cef93469203c67381ab8d5877cae))
* fixed [#618](https://github.com/matteobruni/tsparticles/issues/618) ([aa6fe99](https://github.com/matteobruni/tsparticles/commit/aa6fe9935b289178ec84b93dcd31160ed3107369))
* fixed background mode canvas reset ([f78252a](https://github.com/matteobruni/tsparticles/commit/f78252afee4363311c039da79216c848647da51e))
* fixed bounce for [#739](https://github.com/matteobruni/tsparticles/issues/739) ([738a16f](https://github.com/matteobruni/tsparticles/commit/738a16f1d50780c961d7c258e97b40d94762057e))
* fixed editor properties, missing themes for now ([8598460](https://github.com/matteobruni/tsparticles/commit/85984607f96f0207ebb9ed4ecce55f63929dfd53))
* fixed issue with initial window resize ([f863bdc](https://github.com/matteobruni/tsparticles/commit/f863bdcf144e15b9b24f9edbcfbd9137b92e93c5))
* fixed life duration/delay sync options ([2db867c](https://github.com/matteobruni/tsparticles/commit/2db867cf52c9f26c431a6d88fabace0ca3f9b200))
* fixed links broken with a previous commit, updated object-gui ([24b2872](https://github.com/matteobruni/tsparticles/commit/24b2872ef736efd5e03b529a94e3f695c4504e86))
* fixed other animations with reduced motion ([4ba8dfd](https://github.com/matteobruni/tsparticles/commit/4ba8dfd6213261ea35b0c4426dffd7e93e1eecb9))
* fixed prefers reduced motion query ([6a39ff4](https://github.com/matteobruni/tsparticles/commit/6a39ff4429bcc5158767e135b32b5c8ba8c473c5))
* fixed rotate following path ([cd7ed78](https://github.com/matteobruni/tsparticles/commit/cd7ed789545bd38f68369407af08e4c96d6a1230))


### Features

* add hsv color support ([39ad40a](https://github.com/matteobruni/tsparticles/commit/39ad40a0e67076985aa9cac684f337ea3e052a29))
* added background mode to make the canvas acts like an animated background ([d911467](https://github.com/matteobruni/tsparticles/commit/d91146765581cc2d6ff42c6c68fd2726079638e0))
* added feature from issue [#797](https://github.com/matteobruni/tsparticles/issues/797) ([79197c9](https://github.com/matteobruni/tsparticles/commit/79197c96a4ed55a9d9ba62232ae7c1ffe78c5890))
* added gravity and edge bounce customization ([cfdfe53](https://github.com/matteobruni/tsparticles/commit/cfdfe53de72a33686fb73ea345c08a7a27542ba0))
* added HSV support ([5083e08](https://github.com/matteobruni/tsparticles/commit/5083e089d55bf92eab2505d440be7b226b67d01a))
* added motion options to handle prefers-reduced-motion media query, fixes [#888](https://github.com/matteobruni/tsparticles/issues/888) ([89a4ffb](https://github.com/matteobruni/tsparticles/commit/89a4ffb7f13b1c6585097c1e9e2a4a0c78074512))
* added movement speed affected by particles size ([3a3d893](https://github.com/matteobruni/tsparticles/commit/3a3d893c8091fe8d550c31e49d448f4969b00685))
* added sides count to particle to improve the shadow for the light over ([d9110ef](https://github.com/matteobruni/tsparticles/commit/d9110efa8ebf049a876f0f001e858548921156f9))
* added triangles frequency, but needs some work to be completed, started working on [#691](https://github.com/matteobruni/tsparticles/issues/691) ([37e1c92](https://github.com/matteobruni/tsparticles/commit/37e1c926e647e5d450e998ff7f7bb3c45aa3d850))
* bounce mode for divs, working only on squared divs but it's something ([24aeb1e](https://github.com/matteobruni/tsparticles/commit/24aeb1e69c3a8847e52efd6c81b11fabbc1050bc))
* bounce mode is now working fine for circular divs too ([b92ef32](https://github.com/matteobruni/tsparticles/commit/b92ef321010904d84c4b365bd111bd0c6c5ef47b))
* changed loadJSON with multiple configs and an optional index to select one of them ([bdba2ef](https://github.com/matteobruni/tsparticles/commit/bdba2ef691d272bc6b3d29f45dac25b4c8469c3e))
* collisions between particles have now the bounce factor customizable ([da68ce7](https://github.com/matteobruni/tsparticles/commit/da68ce7ca974206af7781b833203ea0b1a6b0966))
* completed [#691](https://github.com/matteobruni/tsparticles/issues/691), need to improve links and triangles performance ([9d82c2c](https://github.com/matteobruni/tsparticles/commit/9d82c2c888a9e93cd4b5c2523a055561e01af8de))
* completed HSV support ([0cf39d0](https://github.com/matteobruni/tsparticles/commit/0cf39d03cb5494965087d8dc4ee40ae3468aeafd))
* fixed [#739](https://github.com/matteobruni/tsparticles/issues/739), added outModes instead of a single out mode, every edge now can be customized ([67194dc](https://github.com/matteobruni/tsparticles/commit/67194dcceb2a78d75c75d331e4940d3900557875))
* fixed some editor outdated fields and added some new ([30b4ac9](https://github.com/matteobruni/tsparticles/commit/30b4ac9f59c2b09768fcb3432114bcbb027c8577))
* found a good solution with good performance to fix [#691](https://github.com/matteobruni/tsparticles/issues/691) ([08c37a5](https://github.com/matteobruni/tsparticles/commit/08c37a5e38221d100de5b538242169f37947e668))
* hsv color documentation ([c63423d](https://github.com/matteobruni/tsparticles/commit/c63423d6c77e5276c6956ed1a91080257291aed0))
* loadJSON can accept also a string array and an optional index parameter ([2ecd9f9](https://github.com/matteobruni/tsparticles/commit/2ecd9f9322293a80ded07f70acc5be2f12aca8f0))
* manual particles, fixes [#839](https://github.com/matteobruni/tsparticles/issues/839) ([4531b4a](https://github.com/matteobruni/tsparticles/commit/4531b4a567db2b31715a3be59e9b50161a23ea9d))
* mouse acts like a light source, closes [#606](https://github.com/matteobruni/tsparticles/issues/606) ([84aad25](https://github.com/matteobruni/tsparticles/commit/84aad25f3dfd5da9e99818e87c9b3f6a30c6f590))
* particle with move max distance are now good, closes [#740](https://github.com/matteobruni/tsparticles/issues/740) ([e1453c7](https://github.com/matteobruni/tsparticles/commit/e1453c735c2af23453f4f8e5efefb70c415496d3))
* used particle id to reduce duplicates to to close [#437](https://github.com/matteobruni/tsparticles/issues/437) ([7a3aef1](https://github.com/matteobruni/tsparticles/commit/7a3aef16f494df8f6622eb35cb0eb5d08b2b6a58))


### Reverts

* links and triangles frequency are rolled back, I didn't like the performances ([4a6875c](https://github.com/matteobruni/tsparticles/commit/4a6875ca61e0fd6277e4af4b7931d9096d5ca071))





# [1.18.0-alpha.14](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.9...tsparticles@1.18.0-alpha.14) (2020-08-22)


### Bug Fixes

* autostart feature fixed ([bed7824](https://github.com/matteobruni/tsparticles/commit/bed78248c941d57ad4cc20a455147e186e97c7a1))
* check if all triangles vertices have link triangles enabled ([9956660](https://github.com/matteobruni/tsparticles/commit/9956660883e7334f9c9522fb43471dd458a760bb))
* fixed background mode canvas reset ([f78252a](https://github.com/matteobruni/tsparticles/commit/f78252afee4363311c039da79216c848647da51e))
* fixed links broken with a previous commit, updated object-gui ([24b2872](https://github.com/matteobruni/tsparticles/commit/24b2872ef736efd5e03b529a94e3f695c4504e86))


### Features

* added background mode to make the canvas acts like an animated background ([d911467](https://github.com/matteobruni/tsparticles/commit/d91146765581cc2d6ff42c6c68fd2726079638e0))
* added gravity and edge bounce customization ([cfdfe53](https://github.com/matteobruni/tsparticles/commit/cfdfe53de72a33686fb73ea345c08a7a27542ba0))
* mouse acts like a light source, closes [#606](https://github.com/matteobruni/tsparticles/issues/606) ([84aad25](https://github.com/matteobruni/tsparticles/commit/84aad25f3dfd5da9e99818e87c9b3f6a30c6f590))





# [1.18.0-alpha.13](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.12...tsparticles@1.18.0-alpha.13) (2020-08-17)


### Bug Fixes

* autostart feature fixed ([bed7824](https://github.com/matteobruni/tsparticles/commit/bed78248c941d57ad4cc20a455147e186e97c7a1))





# [1.18.0-alpha.12](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.8...tsparticles@1.18.0-alpha.12) (2020-08-16)


### Bug Fixes

* check if all triangles vertices have link triangles enabled ([9956660](https://github.com/matteobruni/tsparticles/commit/9956660883e7334f9c9522fb43471dd458a760bb))
* fixed background mode canvas reset ([f78252a](https://github.com/matteobruni/tsparticles/commit/f78252afee4363311c039da79216c848647da51e))
* fixed links broken with a previous commit, updated object-gui ([24b2872](https://github.com/matteobruni/tsparticles/commit/24b2872ef736efd5e03b529a94e3f695c4504e86))


### Features

* added background mode to make the canvas acts like an animated background ([d911467](https://github.com/matteobruni/tsparticles/commit/d91146765581cc2d6ff42c6c68fd2726079638e0))
* mouse acts like a light source, closes [#606](https://github.com/matteobruni/tsparticles/issues/606) ([84aad25](https://github.com/matteobruni/tsparticles/commit/84aad25f3dfd5da9e99818e87c9b3f6a30c6f590))





# [1.18.0-alpha.11](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.10...tsparticles@1.18.0-alpha.11) (2020-08-13)

**Note:** Version bump only for package tsparticles





# [1.18.0-alpha.10](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.9...tsparticles@1.18.0-alpha.10) (2020-08-13)


### Bug Fixes

* fixed background mode canvas reset ([f78252a](https://github.com/matteobruni/tsparticles/commit/f78252afee4363311c039da79216c848647da51e))





# [1.18.0-alpha.9](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.8...tsparticles@1.18.0-alpha.9) (2020-08-13)

**Note:** Version bump only for package tsparticles





# [1.18.0-alpha.8](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.18.0-alpha.7...tsparticles@1.18.0-alpha.8) (2020-08-13)


### Features

* added background mode to make the canvas acts like an animated background ([d911467](https://github.com/matteobruni/tsparticles/commit/d91146765581cc2d6ff42c6c68fd2726079638e0))





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

* mouse acts like a light source, closes [#606](https://github.com/matteobruni/tsparticles/issues/606) ([84aad25](https://github.com/matteobruni/tsparticles/commit/84aad25f3dfd5da9e99818e87c9b3f6a30c6f590))





# [1.18.0-alpha.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.7...tsparticles@1.18.0-alpha.1) (2020-08-08)

**Note:** Version bump only for package tsparticles





# [1.17.0-alpha.14](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.13...tsparticles@1.17.0-alpha.14) (2020-07-05)

**Note:** Version bump only for package tsparticles





# [1.17.0-alpha.13](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.12...tsparticles@1.17.0-alpha.13) (2020-07-05)

**Note:** Version bump only for package tsparticles





# [1.17.0-alpha.12](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.11...tsparticles@1.17.0-alpha.12) (2020-07-04)


### Bug Fixes

* added valid string values to option enum properties, fixes [#508](https://github.com/matteobruni/tsparticles/issues/508) ([b6328cf](https://github.com/matteobruni/tsparticles/commit/b6328cf97a50e8cee736db0ac641f742cd09b38d))
* fixed overlapping issues ([442777c](https://github.com/matteobruni/tsparticles/commit/442777cac2428168e099bb2c95cd8c580206ee50))
* fixed random color ([a9ff25a](https://github.com/matteobruni/tsparticles/commit/a9ff25aa47dd9095c117844b6c0c6d9601851948))
* fixes [#508](https://github.com/matteobruni/tsparticles/issues/508), some values were excluded ([f0cb970](https://github.com/matteobruni/tsparticles/commit/f0cb97015ff39c3a3db5ce5cdb8301b316cc8405))





# [1.17.0-alpha.11](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.16.2...tsparticles@1.17.0-alpha.11) (2020-07-02)


### Bug Fixes

* color un-sync animation start value ([40fed71](https://github.com/matteobruni/tsparticles/commit/40fed71eb560c1608e888e1c1b8344fd6b3e2abf))
* options interfaces don't have load function anymore ([62cfc82](https://github.com/matteobruni/tsparticles/commit/62cfc82a28b7fcadbe5ad3db816bd5d4614d1dc0))
* rectangle query fix ([b210390](https://github.com/matteobruni/tsparticles/commit/b21039091991aecc58498d66fbeb875851939469))


### Features

* stroke color animation ([deabadd](https://github.com/matteobruni/tsparticles/commit/deabadd7fad1b78f76e5afeea64ae5d4ac87fd61))





# [1.17.0-alpha.10](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.9...tsparticles@1.17.0-alpha.10) (2020-06-29)


### Bug Fixes

* rectangle query fix ([b210390](https://github.com/matteobruni/tsparticles/commit/b21039091991aecc58498d66fbeb875851939469))





# [1.17.0-alpha.9](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.8...tsparticles@1.17.0-alpha.9) (2020-06-29)


### Bug Fixes

* color un-sync animation start value ([40fed71](https://github.com/matteobruni/tsparticles/commit/40fed71eb560c1608e888e1c1b8344fd6b3e2abf))





# [1.17.0-alpha.8](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.7...tsparticles@1.17.0-alpha.8) (2020-06-26)


### Bug Fixes

* click handler with particle size gives better results, little fixes for absorber orbits ([e851049](https://github.com/matteobruni/tsparticles/commit/e851049b480a205813b9df786ad7c5761645de1c))





# [1.17.0-alpha.7](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.6...tsparticles@1.17.0-alpha.7) (2020-06-26)


### Bug Fixes

* text particles are now rendered correctly with more than 1 char ([a803508](https://github.com/matteobruni/tsparticles/commit/a8035087dc6754a0c95600f115f9dcfa92a1783d))


### Features

* improved setOnClickHandler with clicked/touched particles search, closes [#450](https://github.com/matteobruni/tsparticles/issues/450) ([35cf30f](https://github.com/matteobruni/tsparticles/commit/35cf30fed0710bbc1412f6d4bf1ae3421004cc47))





# [1.17.0-alpha.6](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.17.0-alpha.5...tsparticles@1.17.0-alpha.6) (2020-06-24)


### Features

* working on orbits for absorbers ([480c25b](https://github.com/matteobruni/tsparticles/commit/480c25b3da96ecc4df46f7a05e57eea9fdcf64c6))
* working on orbits for absorbers ([1f55430](https://github.com/matteobruni/tsparticles/commit/1f55430b51a108236940e6a8c3d2ae97c82583b2))





# [1.17.0-alpha.5](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.16.1...tsparticles@1.17.0-alpha.5) (2020-06-23)


### Bug Fixes

* added missing license in core project, updated README.md ([10ffe6d](https://github.com/matteobruni/tsparticles/commit/10ffe6d4c1d0252fa0701301b94b74d532ca0e40))
* fixed null check in EventListeners.ts ([01f13b5](https://github.com/matteobruni/tsparticles/commit/01f13b5a7cc67e6e0696ee9019dd7a0c1822f393))
* fixed window mouse leave event ([17b5ce6](https://github.com/matteobruni/tsparticles/commit/17b5ce64b4cb44c276913db7b909bb3c5ab14e15))
* improved performance of QTree fixing rectangle ([4a5468a](https://github.com/matteobruni/tsparticles/commit/4a5468ae178e861855ce8c0b1b8cfcb1d807570a))
* readme prettiefied ([2d5a39a](https://github.com/matteobruni/tsparticles/commit/2d5a39ad6b75592da530e021e09f2c109915d9de))
* removed console.log used for debug ([71365fa](https://github.com/matteobruni/tsparticles/commit/71365fa2c73afbce67fd66163f4ed367d880dd13))
* removed unused variable ([c8989b2](https://github.com/matteobruni/tsparticles/commit/c8989b2304b857416aaa763f27675c5694e7cc00))
* removed unused variable ([b3762dc](https://github.com/matteobruni/tsparticles/commit/b3762dcd7528d1cb20c93220dfe9662f7595d643))
* tests fixed ([df669ff](https://github.com/matteobruni/tsparticles/commit/df669ff8357c4e40bba01bd4d6c00aa06a11073c))


### Features

* added option for rotate following move direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([ee1dd85](https://github.com/matteobruni/tsparticles/commit/ee1dd850fafd1e00e750c9738f4f60543133c504))
* draggable option for absorbers ([3b42861](https://github.com/matteobruni/tsparticles/commit/3b4286126800c316768326f774f13aa2cda62198))
* mouse trail completed, closes [#401](https://github.com/matteobruni/tsparticles/issues/401) ([4b1bc1a](https://github.com/matteobruni/tsparticles/commit/4b1bc1a185860718e26904c6980f88621d4a99ce))
* options for issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([2dd055f](https://github.com/matteobruni/tsparticles/commit/2dd055f867852f2ce66637cc16c7ba318a968fcd))
* particles orientation based on their direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([f0ec58e](https://github.com/matteobruni/tsparticles/commit/f0ec58ebf463514805272871fb3c856e3d667aee))
* started working on issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([bdf5bb9](https://github.com/matteobruni/tsparticles/commit/bdf5bb91b5fcac8642a8bd7e01056295062f178a))





# [1.17.0-alpha.4](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.16.0...tsparticles@1.17.0-alpha.4) (2020-06-22)


### Bug Fixes

* added missing license in core project, updated README.md ([10ffe6d](https://github.com/matteobruni/tsparticles/commit/10ffe6d4c1d0252fa0701301b94b74d532ca0e40))
* fixed null check in EventListeners.ts ([01f13b5](https://github.com/matteobruni/tsparticles/commit/01f13b5a7cc67e6e0696ee9019dd7a0c1822f393))
* fixed window mouse leave event ([17b5ce6](https://github.com/matteobruni/tsparticles/commit/17b5ce64b4cb44c276913db7b909bb3c5ab14e15))
* improved performance of QTree fixing rectangle ([4a5468a](https://github.com/matteobruni/tsparticles/commit/4a5468ae178e861855ce8c0b1b8cfcb1d807570a))
* readme prettiefied ([2d5a39a](https://github.com/matteobruni/tsparticles/commit/2d5a39ad6b75592da530e021e09f2c109915d9de))
* removed console.log used for debug ([71365fa](https://github.com/matteobruni/tsparticles/commit/71365fa2c73afbce67fd66163f4ed367d880dd13))
* removed unused variable ([c8989b2](https://github.com/matteobruni/tsparticles/commit/c8989b2304b857416aaa763f27675c5694e7cc00))
* removed unused variable ([b3762dc](https://github.com/matteobruni/tsparticles/commit/b3762dcd7528d1cb20c93220dfe9662f7595d643))
* tests fixed ([df669ff](https://github.com/matteobruni/tsparticles/commit/df669ff8357c4e40bba01bd4d6c00aa06a11073c))


### Features

* added option for rotate following move direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([ee1dd85](https://github.com/matteobruni/tsparticles/commit/ee1dd850fafd1e00e750c9738f4f60543133c504))
* draggable option for absorbers ([3b42861](https://github.com/matteobruni/tsparticles/commit/3b4286126800c316768326f774f13aa2cda62198))
* mouse trail completed, closes [#401](https://github.com/matteobruni/tsparticles/issues/401) ([4b1bc1a](https://github.com/matteobruni/tsparticles/commit/4b1bc1a185860718e26904c6980f88621d4a99ce))
* options for issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([2dd055f](https://github.com/matteobruni/tsparticles/commit/2dd055f867852f2ce66637cc16c7ba318a968fcd))
* particles orientation based on their direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([f0ec58e](https://github.com/matteobruni/tsparticles/commit/f0ec58ebf463514805272871fb3c856e3d667aee))
* started working on issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([bdf5bb9](https://github.com/matteobruni/tsparticles/commit/bdf5bb91b5fcac8642a8bd7e01056295062f178a))





# [1.17.0-alpha.3](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.16.0...tsparticles@1.17.0-alpha.3) (2020-06-21)


### Bug Fixes

* added missing license in core project, updated README.md ([10ffe6d](https://github.com/matteobruni/tsparticles/commit/10ffe6d4c1d0252fa0701301b94b74d532ca0e40))
* fixed null check in EventListeners.ts ([01f13b5](https://github.com/matteobruni/tsparticles/commit/01f13b5a7cc67e6e0696ee9019dd7a0c1822f393))
* fixed window mouse leave event ([17b5ce6](https://github.com/matteobruni/tsparticles/commit/17b5ce64b4cb44c276913db7b909bb3c5ab14e15))
* readme prettiefied ([2d5a39a](https://github.com/matteobruni/tsparticles/commit/2d5a39ad6b75592da530e021e09f2c109915d9de))
* removed console.log used for debug ([71365fa](https://github.com/matteobruni/tsparticles/commit/71365fa2c73afbce67fd66163f4ed367d880dd13))
* tests fixed ([df669ff](https://github.com/matteobruni/tsparticles/commit/df669ff8357c4e40bba01bd4d6c00aa06a11073c))


### Features

* added option for rotate following move direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([ee1dd85](https://github.com/matteobruni/tsparticles/commit/ee1dd850fafd1e00e750c9738f4f60543133c504))
* mouse trail completed, closes [#401](https://github.com/matteobruni/tsparticles/issues/401) ([4b1bc1a](https://github.com/matteobruni/tsparticles/commit/4b1bc1a185860718e26904c6980f88621d4a99ce))
* options for issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([2dd055f](https://github.com/matteobruni/tsparticles/commit/2dd055f867852f2ce66637cc16c7ba318a968fcd))
* particles orientation based on their direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([f0ec58e](https://github.com/matteobruni/tsparticles/commit/f0ec58ebf463514805272871fb3c856e3d667aee))
* started working on issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([bdf5bb9](https://github.com/matteobruni/tsparticles/commit/bdf5bb91b5fcac8642a8bd7e01056295062f178a))





# [1.17.0-alpha.2](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.16.0...tsparticles@1.17.0-alpha.2) (2020-06-21)


### Bug Fixes

* added missing license in core project, updated README.md ([10ffe6d](https://github.com/matteobruni/tsparticles/commit/10ffe6d4c1d0252fa0701301b94b74d532ca0e40))
* fixed null check in EventListeners.ts ([01f13b5](https://github.com/matteobruni/tsparticles/commit/01f13b5a7cc67e6e0696ee9019dd7a0c1822f393))
* fixed window mouse leave event ([17b5ce6](https://github.com/matteobruni/tsparticles/commit/17b5ce64b4cb44c276913db7b909bb3c5ab14e15))
* readme prettiefied ([2d5a39a](https://github.com/matteobruni/tsparticles/commit/2d5a39ad6b75592da530e021e09f2c109915d9de))
* removed console.log used for debug ([71365fa](https://github.com/matteobruni/tsparticles/commit/71365fa2c73afbce67fd66163f4ed367d880dd13))
* tests fixed ([df669ff](https://github.com/matteobruni/tsparticles/commit/df669ff8357c4e40bba01bd4d6c00aa06a11073c))


### Features

* mouse trail completed, closes [#401](https://github.com/matteobruni/tsparticles/issues/401) ([4b1bc1a](https://github.com/matteobruni/tsparticles/commit/4b1bc1a185860718e26904c6980f88621d4a99ce))
* options for issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([2dd055f](https://github.com/matteobruni/tsparticles/commit/2dd055f867852f2ce66637cc16c7ba318a968fcd))
* particles orientation based on their direction, closes [#408](https://github.com/matteobruni/tsparticles/issues/408) ([f0ec58e](https://github.com/matteobruni/tsparticles/commit/f0ec58ebf463514805272871fb3c856e3d667aee))
* started working on issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([bdf5bb9](https://github.com/matteobruni/tsparticles/commit/bdf5bb91b5fcac8642a8bd7e01056295062f178a))





# [1.17.0-alpha.1](https://github.com/matteobruni/tsparticles/compare/tsparticles@1.16.0...tsparticles@1.17.0-alpha.1) (2020-06-20)


### Bug Fixes

* added missing license in core project, updated README.md ([10ffe6d](https://github.com/matteobruni/tsparticles/commit/10ffe6d4c1d0252fa0701301b94b74d532ca0e40))
* fixed null check in EventListeners.ts ([01f13b5](https://github.com/matteobruni/tsparticles/commit/01f13b5a7cc67e6e0696ee9019dd7a0c1822f393))
* fixed window mouse leave event ([17b5ce6](https://github.com/matteobruni/tsparticles/commit/17b5ce64b4cb44c276913db7b909bb3c5ab14e15))
* readme prettiefied ([2d5a39a](https://github.com/matteobruni/tsparticles/commit/2d5a39ad6b75592da530e021e09f2c109915d9de))
* removed console.log used for debug ([71365fa](https://github.com/matteobruni/tsparticles/commit/71365fa2c73afbce67fd66163f4ed367d880dd13))
* tests fixed ([df669ff](https://github.com/matteobruni/tsparticles/commit/df669ff8357c4e40bba01bd4d6c00aa06a11073c))


### Features

* mouse trail completed, closes [#401](https://github.com/matteobruni/tsparticles/issues/401) ([4b1bc1a](https://github.com/matteobruni/tsparticles/commit/4b1bc1a185860718e26904c6980f88621d4a99ce))
* options for issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([2dd055f](https://github.com/matteobruni/tsparticles/commit/2dd055f867852f2ce66637cc16c7ba318a968fcd))
* started working on issue [#401](https://github.com/matteobruni/tsparticles/issues/401) ([bdf5bb9](https://github.com/matteobruni/tsparticles/commit/bdf5bb91b5fcac8642a8bd7e01056295062f178a))
