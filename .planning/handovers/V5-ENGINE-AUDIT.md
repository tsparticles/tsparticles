# V5 engine audit

E0 inventory at `1944fa0f5c202b8af82841b5de9b2315f758a258`: 153 tracked source files.

Owner means the technical handover and execution stage; implementation owner is the current v5 executor. These are inventory rows, **not completed source reviews**. Exports/consumers, shared state and dependency cost require inspection by each owner. Evidence: tracked-file enumeration; baseline build recorded in V5-BUNDLE-REPORT.md. Add new files when introduced.

| File                                                                      | Responsibility / area                                       | Owner               | Exports, state, cost  | Decision / verification |
| ------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------- | --------------------- | ----------------------- |
| `engine/src/Core/CanvasManager.ts`                                        | Core / CanvasManager                                        | 05 / E5,E7          | Pending source review | Pending; inventory only |
| `engine/src/Core/Container.ts`                                            | Core / Container                                            | 04 / E4             | Pending source review | Pending; inventory only |
| `engine/src/Core/Engine.ts`                                               | Core / Engine                                               | 01 / E1             | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/Colors.ts`                                    | Core/Interfaces / Colors                                    | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/DataFromUrlParams.ts`                         | Core/Interfaces / DataFromUrlParams                         | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IBounds.ts`                                   | Core/Interfaces / IBounds                                   | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/ICircleBouncer.ts`                            | Core/Interfaces / ICircleBouncer                            | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IColorManager.ts`                             | Core/Interfaces / IColorManager                             | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IContainerPlugin.ts`                          | Core/Interfaces / IContainerPlugin                          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/ICoordinates.ts`                              | Core/Interfaces / ICoordinates                              | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IDelta.ts`                                    | Core/Interfaces / IDelta                                    | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IDimension.ts`                                | Core/Interfaces / IDimension                                | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IDistance.ts`                                 | Core/Interfaces / IDistance                                 | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IDrawParticleParams.ts`                       | Core/Interfaces / IDrawParticleParams                       | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IEffectDrawer.ts`                             | Core/Interfaces / IEffectDrawer                             | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/ILoadParams.ts`                               | Core/Interfaces / ILoadParams                               | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IPalette.ts`                                  | Core/Interfaces / IPalette                                  | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IParticleCanvasBounds.ts`                     | Core/Interfaces / IParticleCanvasBounds                     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IParticleColorStyle.ts`                       | Core/Interfaces / IParticleColorStyle                       | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IParticleHslAnimation.ts`                     | Core/Interfaces / IParticleHslAnimation                     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IParticleLife.ts`                             | Core/Interfaces / IParticleLife                             | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IParticleModifier.ts`                         | Core/Interfaces / IParticleModifier                         | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IParticleOpacityData.ts`                      | Core/Interfaces / IParticleOpacityData                      | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IParticleRetinaProps.ts`                      | Core/Interfaces / IParticleRetinaProps                      | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IParticleRoll.ts`                             | Core/Interfaces / IParticleRoll                             | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IParticleRotateData.ts`                       | Core/Interfaces / IParticleRotateData                       | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IParticleTransformValues.ts`                  | Core/Interfaces / IParticleTransformValues                  | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IParticleUpdater.ts`                          | Core/Interfaces / IParticleUpdater                          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IParticleValueAnimation.ts`                   | Core/Interfaces / IParticleValueAnimation                   | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IPlugin.ts`                                   | Core/Interfaces / IPlugin                                   | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IPositionFromSizeParams.ts`                   | Core/Interfaces / IPositionFromSizeParams                   | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IRangeValue.ts`                               | Core/Interfaces / IRangeValue                               | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IShapeDrawData.ts`                            | Core/Interfaces / IShapeDrawData                            | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IShapeDrawer.ts`                              | Core/Interfaces / IShapeDrawer                              | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Interfaces/IShapeValues.ts`                              | Core/Interfaces / IShapeValues                              | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Particle.ts`                                             | Core / Particle                                             | 07 / E5             | Pending source review | Pending; inventory only |
| `engine/src/Core/ParticlesManager.ts`                                     | Core / ParticlesManager                                     | 06 / E6             | Pending source review | Pending; inventory only |
| `engine/src/Core/RenderManager.ts`                                        | Core / RenderManager                                        | 05 / E5,E7          | Pending source review | Pending; inventory only |
| `engine/src/Core/Retina.ts`                                               | Core / Retina                                               | 07 / E5             | Pending source review | Pending; inventory only |
| `engine/src/Core/Utils/Constants.ts`                                      | Core/Utils / Constants                                      | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Core/Utils/EventListeners.ts`                                 | Core/Utils / EventListeners                                 | 04 / E4             | Pending source review | Pending; inventory only |
| `engine/src/Core/Utils/PluginManager.ts`                                  | Core/Utils / PluginManager                                  | 01 / E1             | Pending source review | Pending; inventory only |
| `engine/src/Core/Utils/Ranges.ts`                                         | Core/Utils / Ranges                                         | 06 / E6             | Pending source review | Pending; inventory only |
| `engine/src/Core/Utils/SpatialHashGrid.ts`                                | Core/Utils / SpatialHashGrid                                | 06 / E6             | Pending source review | Pending; inventory only |
| `engine/src/Core/Utils/Vectors.ts`                                        | Core/Utils / Vectors                                        | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/AnimationStatus.ts`                                     | Enums / AnimationStatus                                     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Directions/MoveDirection.ts`                            | Enums/Directions / MoveDirection                            | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Directions/OutModeDirection.ts`                         | Enums/Directions / OutModeDirection                         | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Directions/RotateDirection.ts`                          | Enums/Directions / RotateDirection                          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/DrawLayer.ts`                                           | Enums / DrawLayer                                           | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Modes/AnimationMode.ts`                                 | Enums/Modes / AnimationMode                                 | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Modes/HdrMode.ts`                                       | Enums/Modes / HdrMode                                       | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Modes/LimitMode.ts`                                     | Enums/Modes / LimitMode                                     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Modes/OutMode.ts`                                       | Enums/Modes / OutMode                                       | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Modes/PixelMode.ts`                                     | Enums/Modes / PixelMode                                     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/RangeType.ts`                                           | Enums / RangeType                                           | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Types/AlterType.ts`                                     | Enums/Types / AlterType                                     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Types/DestroyType.ts`                                   | Enums/Types / DestroyType                                   | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Types/EventType.ts`                                     | Enums/Types / EventType                                     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Types/GradientType.ts`                                  | Enums/Types / GradientType                                  | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Types/ParticleOutType.ts`                               | Enums/Types / ParticleOutType                               | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Enums/Types/StartValueType.ts`                                | Enums/Types / StartValueType                                | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/AnimatableColor.ts`                           | Options/Classes / AnimatableColor                           | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/AnimationOptions.ts`                          | Options/Classes / AnimationOptions                          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Background/Background.ts`                     | Options/Classes/Background / Background                     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/ColorAnimation.ts`                            | Options/Classes / ColorAnimation                            | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/FullScreen/FullScreen.ts`                     | Options/Classes/FullScreen / FullScreen                     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/HDROptions.ts`                                | Options/Classes / HDROptions                                | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/HslAnimation.ts`                              | Options/Classes / HslAnimation                              | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Options.ts`                                   | Options/Classes / Options                                   | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/OptionsColor.ts`                              | Options/Classes / OptionsColor                              | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Bounce/ParticlesBounce.ts`          | Options/Classes/Particles/Bounce / ParticlesBounce          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Bounce/ParticlesBounceFactor.ts`    | Options/Classes/Particles/Bounce / ParticlesBounceFactor    | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Effect/Effect.ts`                   | Options/Classes/Particles/Effect / Effect                   | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Fill.ts`                            | Options/Classes/Particles / Fill                            | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Move/Move.ts`                       | Options/Classes/Particles/Move / Move                       | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Move/MoveAngle.ts`                  | Options/Classes/Particles/Move / MoveAngle                  | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Move/MoveCenter.ts`                 | Options/Classes/Particles/Move / MoveCenter                 | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Move/MoveGravity.ts`                | Options/Classes/Particles/Move / MoveGravity                | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Move/OutModes.ts`                   | Options/Classes/Particles/Move / OutModes                   | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Move/Path/MovePath.ts`              | Options/Classes/Particles/Move/Path / MovePath              | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Move/Spin.ts`                       | Options/Classes/Particles/Move / Spin                       | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Number/ParticlesDensity.ts`         | Options/Classes/Particles/Number / ParticlesDensity         | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Number/ParticlesNumber.ts`          | Options/Classes/Particles/Number / ParticlesNumber          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Number/ParticlesNumberLimit.ts`     | Options/Classes/Particles/Number / ParticlesNumberLimit     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Paint.ts`                           | Options/Classes/Particles / Paint                           | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/ParticlesOptions.ts`                | Options/Classes/Particles / ParticlesOptions                | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Shape/Shape.ts`                     | Options/Classes/Particles/Shape / Shape                     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/Stroke.ts`                          | Options/Classes/Particles / Stroke                          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/Particles/ZIndex/ZIndex.ts`                   | Options/Classes/Particles/ZIndex / ZIndex                   | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/ResizeEvent.ts`                               | Options/Classes / ResizeEvent                               | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Classes/ValueWithRandom.ts`                           | Options/Classes / ValueWithRandom                           | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Background/IBackground.ts`                 | Options/Interfaces/Background / IBackground                 | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/FullScreen/IFullScreen.ts`                 | Options/Interfaces/FullScreen / IFullScreen                 | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/IAnimatable.ts`                            | Options/Interfaces / IAnimatable                            | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/IAnimatableColor.ts`                       | Options/Interfaces / IAnimatableColor                       | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/IAnimation.ts`                             | Options/Interfaces / IAnimation                             | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/IColorAnimation.ts`                        | Options/Interfaces / IColorAnimation                        | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/IHDROptions.ts`                            | Options/Interfaces / IHDROptions                            | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/IHslAnimation.ts`                          | Options/Interfaces / IHslAnimation                          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/IOptionLoader.ts`                          | Options/Interfaces / IOptionLoader                          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/IOptions.ts`                               | Options/Interfaces / IOptions                               | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/IOptionsColor.ts`                          | Options/Interfaces / IOptionsColor                          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/IResizeEvent.ts`                           | Options/Interfaces / IResizeEvent                           | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/IValueWithRandom.ts`                       | Options/Interfaces / IValueWithRandom                       | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/Bounce/IParticlesBounce.ts`      | Options/Interfaces/Particles/Bounce / IParticlesBounce      | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/Effect/IEffect.ts`               | Options/Interfaces/Particles/Effect / IEffect               | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/IFill.ts`                        | Options/Interfaces/Particles / IFill                        | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/IPaint.ts`                       | Options/Interfaces/Particles / IPaint                       | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/IParticlesOptions.ts`            | Options/Interfaces/Particles / IParticlesOptions            | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/IStroke.ts`                      | Options/Interfaces/Particles / IStroke                      | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/Move/IMove.ts`                   | Options/Interfaces/Particles/Move / IMove                   | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/Move/IMoveAngle.ts`              | Options/Interfaces/Particles/Move / IMoveAngle              | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/Move/IMoveCenter.ts`             | Options/Interfaces/Particles/Move / IMoveCenter             | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/Move/IMoveGravity.ts`            | Options/Interfaces/Particles/Move / IMoveGravity            | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/Move/IOutModes.ts`               | Options/Interfaces/Particles/Move / IOutModes               | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/Move/ISpin.ts`                   | Options/Interfaces/Particles/Move / ISpin                   | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/Move/Path/IMovePath.ts`          | Options/Interfaces/Particles/Move/Path / IMovePath          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/Number/IParticlesDensity.ts`     | Options/Interfaces/Particles/Number / IParticlesDensity     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/Number/IParticlesNumber.ts`      | Options/Interfaces/Particles/Number / IParticlesNumber      | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/Number/IParticlesNumberLimit.ts` | Options/Interfaces/Particles/Number / IParticlesNumberLimit | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/Shape/IShape.ts`                 | Options/Interfaces/Particles/Shape / IShape                 | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Options/Interfaces/Particles/ZIndex/IZIndex.ts`               | Options/Interfaces/Particles/ZIndex / IZIndex               | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Types/CustomEventArgs.ts`                                     | Types / CustomEventArgs                                     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Types/CustomEventListener.ts`                                 | Types / CustomEventListener                                 | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Types/EasingFunction.ts`                                      | Types / EasingFunction                                      | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Types/EngineInitializers.ts`                                  | Types / EngineInitializers                                  | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Types/ExportResult.ts`                                        | Types / ExportResult                                        | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Types/ISourceOptions.ts`                                      | Types / ISourceOptions                                      | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Types/ParticlesGroups.ts`                                     | Types / ParticlesGroups                                     | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Types/PathOptions.ts`                                         | Types / PathOptions                                         | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Types/RangeValue.ts`                                          | Types / RangeValue                                          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Types/RecursivePartial.ts`                                    | Types / RecursivePartial                                    | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Types/ShapeData.ts`                                           | Types / ShapeData                                           | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Types/SingleOrMultiple.ts`                                    | Types / SingleOrMultiple                                    | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Utils/ColorUtils.ts`                                          | Utils / ColorUtils                                          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Utils/ErrorCodes.ts`                                          | Utils / ErrorCodes                                          | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Utils/ErrorMessages.ts`                                       | Utils / ErrorMessages                                       | 02 / E2             | Pending source review | Pending; inventory only |
| `engine/src/Utils/ErrorUtils.ts`                                          | Utils / ErrorUtils                                          | 02 / E2             | Pending source review | Pending; inventory only |
| `engine/src/Utils/EventDispatcher.ts`                                     | Utils / EventDispatcher                                     | 04 / E4             | Pending source review | Pending; inventory only |
| `engine/src/Utils/LogUtils.ts`                                            | Utils / LogUtils                                            | 02 / E2             | Pending source review | Pending; inventory only |
| `engine/src/Utils/MathUtils.ts`                                           | Utils / MathUtils                                           | 02 / E2             | Pending source review | Pending; inventory only |
| `engine/src/Utils/OptionLoader.ts`                                        | Utils / OptionLoader                                        | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Utils/OptionsUtils.ts`                                        | Utils / OptionsUtils                                        | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Utils/ParticlesOptionsLoader.ts`                              | Utils / ParticlesOptionsLoader                              | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Utils/TypeUtils.ts`                                           | Utils / TypeUtils                                           | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/Utils/Utils.ts`                                               | Utils / Utils                                               | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/browser.ts`                                                   | . / browser                                                 | 01 / E1             | Pending source review | Pending; inventory only |
| `engine/src/export-types.ts`                                              | . / export-types                                            | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/exports.ts`                                                   | . / exports                                                 | 03 / E3 (color: E5) | Pending source review | Pending; inventory only |
| `engine/src/index.lazy.ts`                                                | . / index.lazy                                              | 01 / E1             | Pending source review | Pending; inventory only |
| `engine/src/index.ts`                                                     | . / index                                                   | 01 / E1             | Pending source review | Pending; inventory only |
| `engine/src/initEngine.ts`                                                | . / initEngine                                              | 01 / E1             | Pending source review | Pending; inventory only |

## Required cross-cutting coverage

| Review | Owners / stages       | Files and existing coverage                                                              | Missing verification                                                         |
| ------ | --------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| G1     | 01/02/08; E1–E2,E8    | Emitters ShapeManager; PluginManager; LoadOrdering.ts                                    | Same-name registration, reverse load, disposal, mutable-state classification |
| G2     | 03/04/08; E3–E4,E8    | NoiseFieldGenerator, move generator, motion, Poisson                                     | Listener/timeout ownership, refresh, worker cleanup                          |
| G3     | 01/04/07/08; E1,E4,E5 | Engine.load, ImageDrawer, video export; LoadOrdering/StartCancellation/ReviewRegressions | Pre-start rollback, late assets after reuse, promise settlement              |
| G4     | 02/03/04/07/08; E2–E5 | Container, Retina, move, Poisson; MoveTiming/ResizeLifecycle                             | Explicit clock and finite numeric domains                                    |
| G5     | 06/08; E6             | SpatialHashGrid, Ranges, fluid; SpatialHashGrid.ts                                       | Geometry fixtures and spatial mutation semantics                             |
| G6     | 02/07/08; E2,E5       | GridPathGenerator, canvasMask shuffle                                                    | Deterministic permutations, draw budgets                                     |
| G7     | 01/03/04; E1,E3,E4    | Engine/items, EventDispatcher, deepExtend; lifecycle/options tests                       | Lifetime, public mutation, external-resource preservation                    |

## E1 reviewed implementation surfaces

- `engine/src/createEngine.ts` replaces retired `initEngine.ts`: synchronous fresh
  instance, no ambient lookup or initialization; installed-condition probes pass.
- `engine/src/Core/Utils/CanvasOwnership.ts` is new: shared symbol definitions,
  no engine retained. HTML source and transferred render resources carry ownership.
- `Engine.load` and canvas acquisition reviewed for overlapping owners, same-ID
  isolation, failure cleanup and cross-copy canvas reuse. Covered by EngineInstances
  and real Chrome evidence. Remaining lifecycle, items mutability, services and
  full CanvasManager review stay assigned to E2–E7.
- Root/lazy/browser entrypoints and package browser conditions migrated. Six
  installed root/lazy import/require/browser probes pass.

These entries close only the E1 portions of those source reviews. The complete
engine audit and all other inventory rows remain open.
