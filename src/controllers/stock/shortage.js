export default class RemainsCtrl {
  constructor($stateParams, Stock) {
    this.products = Stock.shortage({storeId: $stateParams.storeId});
  }
}

RemainsCtrl.$inject = ['$stateParams', 'Stock'];
