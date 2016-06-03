import {extend} from 'lodash';

export default class RemainsCtrl {
  constructor($stateParams, Stock, ngTableParams) {
    this.filters = {};
    this.tableParams = new ngTableParams({
      page: 1,
      count: 20,
      sorting: {},
      filter : {},
      // filter: this.filters,
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
}

RemainsCtrl.$inject = ['$stateParams', 'Stock', 'ngTableParams'];
