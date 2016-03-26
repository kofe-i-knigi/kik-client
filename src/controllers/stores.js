import CrudCtrl from './crud';

export default class StoreListCtrl extends CrudCtrl {
  constructor(Store, ngTableParams) {
    super(Store, ngTableParams);
  }
}

StoreListCtrl.$inject = ['Store', 'ngTableParams'];
