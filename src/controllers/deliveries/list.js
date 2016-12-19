import {extend} from 'lodash';

export default class DeliveryListCtrl {
  constructor($stateParams, Delivery, NgTableParams, store) {
    this.Delivery = Delivery;
    this.store = store;
    this.newEntityDefault = {};
    this.filters = {};

    const {storeId} = $stateParams;

    this.tableParams = new NgTableParams({
      page: 1,
      count: 20,
      sorting: {},
      filter: this.filters,
      filterDelay: 1000
    }, {
      getData(params) {
        const query = extend(params.url(), {storeId});

        return Delivery.query(query).$promise.then((data) => {
          params.total(data.$total || data.length);

          return data;
        });
      }
    });
  }
}

DeliveryListCtrl.$inject = ['$stateParams', 'Delivery', 'NgTableParams', 'store'];
