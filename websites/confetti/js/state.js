export const state = {
  bottom: false,
  explosions: false,
  side: false,
  falling: false,
  singleExplosion: false,
  singleTimeout: null,
};

export const stateButtons = [];

export const updateState = (newState) => {
  Object.assign(state, newState);

  console.log(state);

  if (Object.values(state).every((t) => (typeof t === "boolean" ? !t : true))) {
    const container = tsParticles.domItem(0);

    if (container) {
      container.destroy();
    }
  }

  for (const stateButton of stateButtons) {
    stateButton.toggle(stateButton.status());

    if (stateButton.status()) {
      stateButton.button.classList.add("active");
    } else {
      stateButton.button.classList.remove("active");
    }
  }

  if (state.singleTimeout) {
    clearTimeout(state.singleTimeout);

    state.singleTimeout = null;
  }

  if (state.singleExplosion) {
    state.singleTimeout = setTimeout(() => {
      updateState({
        bottom: false,
        explosions: false,
        side: false,
        falling: false,
        singleExplosion: false,
      });
    }, 5000);
  }
};
