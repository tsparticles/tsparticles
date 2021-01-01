export function getUrlParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function switchDemoImages(environment) {
  if (environment === "development") {
    const targets = document.querySelectorAll("[data-demo-src]");
    const bgTargets = document.querySelectorAll("[data-demo-background]");

    if (typeof targets != "undefined" && targets != null) {
      for (var i = 0, len = targets.length; i < len; i++) {
        let demoUrl = targets[i].getAttribute("data-demo-src");
        targets[i].setAttribute("src", demoUrl);
      }
    }

    if (typeof bgTargets != "undefined" && bgTargets != null) {
      for (var i = 0, len = bgTargets.length; i < len; i++) {
        let demoBgUrl = bgTargets[i].getAttribute("data-demo-background");
        bgTargets[i].setAttribute("data-background", demoBgUrl);
      }
    }
  }
}

export function insertBgImages() {
  const targets = document.querySelectorAll("[data-background]");

  if (typeof targets != "undefined" && targets != null) {
    for (var i = 0, len = targets.length; i < len; i++) {
      let bgUrl = targets[i].getAttribute("data-background");
      targets[i].style.backgroundSize = "cover";
      targets[i].style.backgroundRepeat = "no-repeat";
      targets[i].style.backgroundImage = `url(${bgUrl})`;
    }
  }
}
