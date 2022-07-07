export function initPageLoader() {
  window.addEventListener("load", () => {
    const pageloader = document.getElementById("pageloader");
    const infraloader = document.getElementById("infraloader");
    pageloader.classList.toggle("is-active");
    var pageloaderTimeout = setTimeout(function () {
      infraloader.classList.remove("is-active");
      pageloader.classList.toggle("is-active");
      clearTimeout(pageloaderTimeout);
    }, 1200);
  });
}
