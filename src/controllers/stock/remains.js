import {extend} from 'lodash';

export default class RemainsCtrl {
  constructor($stateParams, Stock, NgTableParams) {
    this.storeId = $stateParams.storeId;
    this.filters = {};
    this.Stock = Stock;
    this.tableParams = new NgTableParams({
      page: 1,
      count: 15,
      sorting: {},
      filter: this.filters,
      filterDelay: 1000
    }, {
      getData(params) {
        const query = extend(params.url(), {
          storeId: $stateParams.storeId
        });

        return Stock.query(query).$promise.then((data) => {
          params.total(data.$total || data.length);

          return data;
        });
      }
    });
  }

  updateQuantity(product) {
    this.Stock.updateQuantity({
      storeId: product.stock[0].storeId,
      productId: product.id
    }, {
      quantity: product.stock[0].quantity
    });
  }
}

RemainsCtrl.$inject = ['$stateParams', 'Stock', 'NgTableParams'];
