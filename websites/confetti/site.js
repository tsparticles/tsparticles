const toggleBottomConfetti = (status) => {
  if (status) {
    tsParticles.domItem(0).destroy();
  } else {
    tsParticles.loadJSON("tsparticles", "configs/bottom.json");
  }

  return !status;
};

const toggleConfettiExplosions = (status) => {
  if (status) {
    tsParticles.domItem(0).destroy();
  } else {
    tsParticles.loadJSON("tsparticles", "configs/explosions.json");
  }

  return !status;
};

const toggleSideConfetti = (status) => {
  if (status) {
    tsParticles.domItem(0).destroy();
  } else {
    tsParticles.loadJSON("tsparticles", "configs/side.json");
  }

  return !status;
};

const toggleFallingConfetti = (status) => {
  if (status) {
    tsParticles.domItem(0).destroy();
  } else {
    tsParticles.loadJSON("tsparticles", "configs/falling.json");
  }

  return !status;
};

const toggleSingleConfetti = (status) => {
  if (status) {
    tsParticles.domItem(0).destroy();
  } else {
    tsParticles.loadJSON("tsparticles", "configs/single.json");
  }

  return !status;
};

document.addEventListener("DOMContentLoaded", () => {
  let bottom = false,
    explosions = false,
    side = false,
    falling = false,
    singleExplosion = false,
    singleTimeout;

  const updateBottom = () => {
    bottom = toggleBottomConfetti(bottom);

    if (bottom) {
      btnBottomConfetti.classList.add("active");
    } else {
      btnBottomConfetti.classList.remove("active");
    }

    explosions = false;

    btnConfettiExplosions.classList.remove("active");

    side = false;

    btnSideConfetti.classList.remove("active");

    falling = false;

    btnFallingConfetti.classList.remove("active");

    singleExplosion = false;

    btnSingleConfetti.classList.remove("active");
  };

  const updateExplosions = () => {
    bottom = false;

    btnBottomConfetti.classList.remove("active");

    explosions = toggleConfettiExplosions(explosions);

    if (explosions) {
      btnConfettiExplosions.classList.add("active");
    } else {
      btnConfettiExplosions.classList.remove("active");
    }

    side = false;

    btnSideConfetti.classList.remove("active");

    falling = false;

    btnFallingConfetti.classList.remove("active");

    singleExplosion = false;

    btnSingleConfetti.classList.remove("active");
  };

  const updateSide = () => {
    bottom = false;

    btnBottomConfetti.classList.remove("active");

    explosions = false;

    btnConfettiExplosions.classList.remove("active");

    side = toggleSideConfetti(explosions);

    if (side) {
      btnSideConfetti.classList.add("active");
    } else {
      btnSideConfetti.classList.remove("active");
    }

    falling = false;

    btnFallingConfetti.classList.remove("active");

    singleExplosion = false;

    btnSingleConfetti.classList.remove("active");
  };

  const updateFalling = () => {
    bottom = false;

    btnBottomConfetti.classList.remove("active");

    explosions = false;

    btnConfettiExplosions.classList.remove("active");

    side = false;

    btnSideConfetti.classList.remove("active");

    falling = toggleFallingConfetti(falling);

    if (falling) {
      btnFallingConfetti.classList.add("active");
    } else {
      btnFallingConfetti.classList.remove("active");
    }

    singleExplosion = false;

    btnSingleConfetti.classList.remove("active");
  };

  const updateSingle = (status) => {
    bottom = false;

    btnBottomConfetti.classList.remove("active");

    explosions = false;

    btnConfettiExplosions.classList.remove("active");

    side = false;

    btnSideConfetti.classList.remove("active");

    falling = false;

    btnFallingConfetti.classList.remove("active");

    singleExplosion = toggleSingleConfetti(status);

    if (singleExplosion) {
      btnSingleConfetti.classList.add("active");
    } else {
      btnSingleConfetti.classList.remove("active");
    }

    if (singleTimeout) {
      clearTimeout(singleTimeout);
    }

    singleTimeout = setTimeout(() => {
      updateSingle(true);
    }, 5000);
  };

  const btnBottomConfetti = document.getElementById("btnBottomConfetti"),
    btnConfettiExplosions = document.getElementById("btnConfettiExplosions"),
    btnSideConfetti = document.getElementById("btnSideConfetti"),
    btnFallingConfetti = document.getElementById("btnFallingConfetti"),
    btnSingleConfetti = document.getElementById("btnSingleConfetti");

  btnBottomConfetti.addEventListener("click", () => {
    updateBottom();
  });

  btnConfettiExplosions.addEventListener("click", () => {
    updateExplosions();
  });

  btnSideConfetti.addEventListener("click", () => {
    updateSide();
  });

  btnFallingConfetti.addEventListener("click", () => {
    updateFalling();
  });

  btnSingleConfetti.addEventListener("click", () => {
    updateSingle(false);
  });

  updateBottom();
});
