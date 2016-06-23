export default class MenuCtrl {
  constructor(apiCached) {
    this.apiCached = apiCached;

    apiCached('/menuitems').then(menuItems => {
      this.menuItems = menuItems;
    });
  }

  refresh() {
    this.apiCached('/menuitems', true).then(menuItems => {
      this.menuItems = menuItems;
    });
  }
}

MenuCtrl.$inject = ['apiCached'];
