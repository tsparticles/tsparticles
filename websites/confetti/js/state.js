export const animationState = {
  bottom: false,
  explosions: false,
  side: false,
  falling: false,
  singleExplosion: false,
};

export const appState = {
  singleTimeout: null,
  code: false,
};

export const animationStateButtons = [];

export const updateAnimationState = (newAnimationState) => {
  Object.assign(animationState, newAnimationState);

  if (
    Object.values(animationState).every((t) =>
      typeof t === "boolean" ? !t : true
    )
  ) {
    const container = tsParticles.domItem(0);

    if (container) {
      container.destroy();
      updateCode("");
    }
  }

  for (const stateButton of animationStateButtons) {
    stateButton.toggle(stateButton.status());

    if (stateButton.status()) {
      stateButton.button.classList.add("active");
    } else {
      stateButton.button.classList.remove("active");
    }
  }

  if (appState.singleTimeout) {
    clearTimeout(appState.singleTimeout);

    appState.singleTimeout = null;
  }

  if (animationState.singleExplosion) {
    appState.singleTimeout = setTimeout(() => {
      updateAnimationState({
        bottom: false,
        explosions: false,
        side: false,
        falling: false,
        singleExplosion: false,
      });
    }, 5000);
  }
};

export const updateState = (newState) => {
  Object.assign(appState, newState);

  const codeEl = document.getElementById("code");

  if (appState.code) {
    codeEl.classList.remove("d-none");
  } else {
    codeEl.classList.add("d-none");
  }
};

export const updateCode = (newCode) => {
  const codeEl = document.getElementById("code-text");

  codeEl.innerText = newCode;
};
