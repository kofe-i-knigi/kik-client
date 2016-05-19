export default class CrudCtrl {
  constructor(Resource, ngTableParams) {
    this.Resource = Resource;
    this.newEntity = new Resource();
    this.filters = {}
    this.tableParams = new ngTableParams({
      page: 1,
      count: 20,
      sorting: {},
      filter : {},
      // filter: this.filters,
      filterDelay: 1000
    }, {
      getData(params) {
        return Resource.query(params.url()).$promise.then((data) => {
          params.total(data.length);

          return data;
        });
      }
    });
  }
  openCreateForm() {
    this.createFormOpened = true;    
  }

  createEntity() {
    this.Resource.save(this.newEntity).$promise
    .then(() => {
      this.tableParams.reload();
      this.createFormOpened = false;
      this.newEntity = new this.Resource;
      this.createForm.$setPristine();
    });
  }

  removeEntity(entity) {
    this.Resource.delete({id: entity.id}).$promise
    .then(() => this.tableParams.reload());
  }

  updateEntity(entity) {
    console.log(entity);
    this.Resource.update({id: entity.id}, entity);
  }
}
