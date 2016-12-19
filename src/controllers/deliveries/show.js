import _ from 'lodash';

export default class DeliveryShowCtrl {
  constructor($stateParams, NgTableParams, Delivery, store) {
    this.store = store;
    this.items = [];

    Delivery.get({
      deliveryId: $stateParams.deliveryId
    }).$promise.then((data) => {
      this.delivery = data;
      this.items = data.items;

      this.tableParams.total(this.items.length);
      this.tableParams.reload();
    });

    this.tableParams = new NgTableParams({
      page: 1,
      count: 15,
      sorting: {},
      filter: this.filters,
      filterDelay: 1000
    }, {
      getData: (params) => {
        return _(this.items)
        .drop(params.count() * (params.page() - 1))
        .take(params.count())
        .value();
      }
    });
  }
}

DeliveryShowCtrl.$inject = ['$stateParams', 'NgTableParams', 'Delivery', 'store'];
