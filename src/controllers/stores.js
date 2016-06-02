export default class StoreListCtrl {
  constructor(Store) {
    this.stores = Store.query();
  }
}

StoreListCtrl.$inject = ['Store'];
