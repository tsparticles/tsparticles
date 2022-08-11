import { confettyTypes, updateShapesState } from "./state.js";

export const initShapes = () => {
  const btnCircle = document.getElementById("btnCircleConfetti");
  const btnSquare = document.getElementById("btnSquareConfetti");
  const btnTriangle = document.getElementById("btnTriangleConfetti");
  const btnPolygon = document.getElementById("btnPolygonConfetti");
  const btnChar = document.getElementById("btnFontConfetti");
  const btnImage = document.getElementById("btnImageConfetti");

  const updateCircleBtn = () => {
    if (confettyTypes.circle) {
      btnCircle.classList.add("active");
    } else {
      btnCircle.classList.remove("active");
    }
  };

  const updateSquareBtn = () => {
    if (confettyTypes.square) {
      btnSquare.classList.add("active");
    } else {
      btnSquare.classList.remove("active");
    }
  };

  const updateTriangleBtn = () => {
    if (confettyTypes.triangle) {
      btnTriangle.classList.add("active");
    } else {
      btnTriangle.classList.remove("active");
    }
  };

  const updatePolygonBtn = () => {
    if (confettyTypes.polygon.enable) {
      btnPolygon.classList.add("active");
    } else {
      btnPolygon.classList.remove("active");
    }
  };

  const updateCharBtn = () => {
    if (confettyTypes.character.enable) {
      btnChar.classList.add("active");
    } else {
      btnChar.classList.remove("active");
    }
  };

  const updateImageBtn = () => {
    if (confettyTypes.image.enable) {
      btnImage.classList.add("active");
    } else {
      btnImage.classList.remove("active");
    }
  };

  btnCircle.addEventListener("click", () => {
    updateShapesState({
      circle: !confettyTypes.circle,
    });

    updateCircleBtn();
  });

  btnSquare.addEventListener("click", () => {
    updateShapesState({
      square: !confettyTypes.square,
    });

    updateSquareBtn();
  });

  btnTriangle.addEventListener("click", () => {
    updateShapesState({
      triangle: !confettyTypes.triangle,
    });

    updateTriangleBtn();
  });

  btnPolygon.addEventListener("click", () => {
    updateShapesState({
      polygon: {
        enable: !confettyTypes.polygon.enable,
      },
    });

    updatePolygonBtn();
  });

  btnChar.addEventListener("click", () => {
    updateShapesState({
      character: {
        enable: !confettyTypes.character.enable,
      },
    });

    updateCharBtn();
  });

  btnImage.addEventListener("click", () => {
    updateShapesState({
      image: {
        enable: !confettyTypes.image.enable,
      },
    });

    updateImageBtn();
  });

  updateCircleBtn();
  updateSquareBtn();
  updateTriangleBtn();
  updatePolygonBtn();
  updateCharBtn();
  updateImageBtn();
};
