export default class RemainsCtrl {
  constructor(Stock, ngTableParams) {
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
        return Stock.query(params.url()).$promise.then((data) => {
          params.total(data.$total || data.length);

          return data;
        });
      }
    });
  }
}
