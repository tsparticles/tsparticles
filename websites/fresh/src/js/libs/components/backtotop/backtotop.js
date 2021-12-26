export function initBackToTop() {
  return {
    scrolled: false,
    height: 600,
    scroll(e) {
      const button = document.getElementById("backtotop");
      let scrollValue = window.scrollY;
      if (scrollValue >= this.height) {
        this.scrolled = true;
        button.classList.add("visible");
      } else {
        this.scrolled = false;
        button.classList.remove("visible");
      }
    },

    goTop(e) {
      let elementPosition = e.target.offsetTop;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    },
  };
}
