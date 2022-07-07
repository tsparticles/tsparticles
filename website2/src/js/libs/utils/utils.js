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

export function initModals() {
  let targets = document.querySelectorAll(".modal-trigger");
  if (typeof targets != "undefined" && targets != null) {
    for (var i = 0, len = targets.length; i < len; i++) {
      targets[i].addEventListener("click", function (event) {
        console.log("click modal");
        var modalID = this.getAttribute("data-modal");
        document.querySelector("#" + modalID).classList.add("is-active");
        const scrollY = document.documentElement.style.getPropertyValue(
          "--scroll-y"
        );
        const body = document.body;
        body.style.width = "100%";
        body.style.paddingRight  = "15px";
        body.style.position = "fixed";
        
        body.style.top = `-${scrollY}`;
      });
    }
  }

  targets = document.querySelectorAll(".modal-dismiss");
  if (typeof targets != "undefined" && targets != null) {
    for (var i = 0, len = targets.length; i < len; i++) {
      targets[i].addEventListener("click", function (event) {
        console.log("click modal close");
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = "";
        body.style.paddingRight  = "";
        body.style.width = "";
        body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
        this.closest(".modal").classList.remove("is-active");
      });
    }
  }

  window.addEventListener("scroll", () => {
    document.documentElement.style.setProperty(
      "--scroll-y",
      `${window.scrollY}px`
    );
  });
}