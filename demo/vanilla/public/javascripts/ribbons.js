const end = Date.now() + 8 * 1000,
  colors = ["#ff0055", "#00d1ff", "#ffd23f", "#61ff7e", "#b284ff"];

function frame() {
  ribbons({
    count: 1,
    positionX: Math.floor(Math.random() * 100),
    colors,
  });

  if (Date.now() < end) {
    setTimeout(() => {
      frame();
    }, 260);
  }
}

frame();
