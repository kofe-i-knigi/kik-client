export default class MenuCtrl {
  constructor($state, $stateParams, apiCached, shiftCashbox) {
    this.apiCached = apiCached;

    if (shiftCashbox.get().isClosed) {
      return $state.go('barista.cashbox.shiftClosed');
    } else if (shiftCashbox.get().isProcessing) {
      return $state.go('barista.cashbox.shiftReport');
    }

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

MenuCtrl.$inject = ['$state', '$stateParams', 'apiCached', 'shiftCashbox'];
