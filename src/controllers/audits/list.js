import {extend} from 'lodash';

export default class CategoryCtrl {
  constructor($stateParams, Audit, NgTableParams, store) {
    this.Audit = Audit;
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

        return Audit.query(query).$promise.then((data) => {
          params.total(data.$total || data.length);

          return data;
        });
      }
    });
  }
}

CategoryCtrl.$inject = ['$stateParams', 'Audit', 'NgTableParams', 'store'];
