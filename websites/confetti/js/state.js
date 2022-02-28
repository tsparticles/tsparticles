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

export const confettyTypes = {
  circle: true,
  square: true,
  triangle: false,
  polygon: {
    enable: false,
    shapes: [
      {
        sides: 5,
      },
      {
        sides: 6,
      },
    ],
  },
  character: {
    enable: false,
    text: ["💩", "🤡", "🍀", "🍙", "🦄", "⭐️"],
  },
  image: {
    enable: false,
    sources: [
      {
        src: "https://particles.js.org/images/fruits/apple.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/avocado.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/banana.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/berries.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/cherry.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/grapes.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/lemon.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/orange.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/peach.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/pear.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/pepper.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/plum.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/star.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/strawberry.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/watermelon.png",
        width: 32,
        height: 32,
      },
      {
        src: "https://particles.js.org/images/fruits/watermelon_slice.png",
        width: 32,
        height: 32,
      },
    ],
  },
};

export const animationStateButtons = [];

export const updateAnimationState = (newAnimationState) => {
  _.merge(animationState, newAnimationState);

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
  _.merge(appState, newState);

  const codeEl = document.getElementById("code");

  if (appState.code) {
    codeEl.classList.remove("d-none");
  } else {
    codeEl.classList.add("d-none");
  }
};

export const updateCode = (newCode) => {
  const codeEl = document.getElementById("code-text");

  codeEl.innerHTML = newCode;
};

export const getParticlesShapes = () => {
  const type = [];
  const options = {};

  if (confettyTypes.circle) {
    type.push("circle");
  }

  if (confettyTypes.square) {
    type.push("square");
  }

  if (confettyTypes.triangle) {
    type.push("triangle");
  }

  if (confettyTypes.polygon.enable) {
    type.push("polygon");

    options.polygon = confettyTypes.polygon.shapes;
  }

  if (confettyTypes.character.enable) {
    type.push("character");

    if (!options.character) {
      options.character = {
        fill: true,
        font: "Verdana",
        style: "",
        weight: 400,
        particles: {
          size: {
            value: 8,
          },
        },
      };
    }

    options.character.value = confettyTypes.character.text;
  }

  if (confettyTypes.image.enable) {
    type.push("image");

    options.image = confettyTypes.image.sources.map((t) => {
      return {
        ...t,
        particles: {
          size: {
            value: Math.min(t.width, t.height) / 2,
          },
        },
      };
    });
  }

  return {
    type: type.length === 1 ? type[0] : type,
    options,
  };
};

export const updateShapesState = (newShapeState) => {
  _.merge(confettyTypes, newShapeState);

  updateAnimationState(appState);
};
