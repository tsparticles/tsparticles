/** Event types emitted by the engine */
export enum EventType {
  /** A configuration has been added */
  configAdded = "configAdded",
  /** A container has been initialized */
  containerInit = "containerInit",
  /** Particles have been set up */
  particlesSetup = "particlesSetup",
  /** A container has started */
  containerStarted = "containerStarted",
  /** A container has stopped */
  containerStopped = "containerStopped",
  /** A container has been destroyed */
  containerDestroyed = "containerDestroyed",
  /** A container has been paused */
  containerPaused = "containerPaused",
  /** A container has resumed playback */
  containerPlay = "containerPlay",
  /** A container has been built */
  containerBuilt = "containerBuilt",
  /** A particle has been added */
  particleAdded = "particleAdded",
  /** A particle has been destroyed */
  particleDestroyed = "particleDestroyed",
  /** A particle has been removed */
  particleRemoved = "particleRemoved",
}
