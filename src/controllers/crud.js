import {clone} from 'lodash';

export default class CrudCtrl {
  constructor(Resource, ngTableParams) {
    this.Resource = Resource;
    this.newEntityDefault = new Resource();
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
          params.total(data.$total || data.length);

          return data;
        });
      }
    });
  }

  openCreateForm() {
    this.createFormOpened = true;
  }

  createEntity() {
    if (this.createForm.$invalid) {
      return;
    }

    this.Resource.save(this.newEntity).$promise
    .then(() => {
      this.tableParams.reload();
      this.createFormOpened = false;
      this.newEntity = clone(this.newEntityDefault);
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
