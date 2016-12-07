import _ from 'lodash';

export default class AuditCtrl {
  constructor($state, $stateParams, Stock, NgTableParams) {
    this.Stock = Stock;
    this.$state = $state;
    this.storeId = $stateParams.storeId;
    this.items = [];

    Stock.query({
      storeId: $stateParams.storeId
    }).$promise.then((data) => {
      this.tableParams.total(data.length);

      this.items = data;
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

  updateQuantity() {
    const storeId = this.storeId;

    const notFilled = this.items.some(item => {
      return !item.hasOwnProperty('auditQuantity');
    });

    if (
      notFilled &&
      !confirm('Вы заполнили не все поля. Хотите продолжить?')
    ) {
      return;
    }

    const items = this.items
    .filter(item => item.hasOwnProperty('auditQuantity'))
    .map((item) => {
      console.log(item);
      const {id, auditQuantity} = item;
      const {quantity} = item.stock[0];

      return {
        id,
        quantity: auditQuantity,
        oldQuantity: quantity
      };
    });

    this.Stock.audit({storeId}, {items})
    .$promise.then(() => {
      this.$state.go('admin.stock.remains');
    });
  }
}

AuditCtrl.$inject = ['$state', '$stateParams', 'Stock', 'NgTableParams'];
