export default class MenuCtrl {
  constructor($stateParams, apiCached) {
    this.apiCached = apiCached;

    apiCached(`/menu/${$stateParams.categoryId}`).then(menuItems => {
      this.menuItems = menuItems;
    });
  }

  refresh() {
    this.apiCached('/menuitems', true).then(menuItems => {
      this.menuItems = menuItems;
    });
  }
}

MenuCtrl.$inject = ['$stateParams', 'apiCached'];
