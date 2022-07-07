export function initSidebar() {
  return {
    closeSidebar() {
      this.$store.app.isSiderbarOpen = false;
    },

    openedMenu: "",
    openSidebarMenu(e) {
      const target = e.target.getAttribute("data-menu");
      if (this.openedMenu === target) {
        this.openedMenu = "";
      } else {
        this.openedMenu = target;
      }
    },
  };
}
