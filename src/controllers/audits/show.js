import _ from 'lodash';

export default class AuditShowCtrl {
  constructor($stateParams, NgTableParams, Audit, store) {
    this.store = store;
    this.items = [];

    Audit.get({
      auditId: $stateParams.auditId
    }).$promise.then((data) => {
      this.audit = data;
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

AuditShowCtrl.$inject = ['$stateParams', 'NgTableParams', 'Audit', 'store'];
