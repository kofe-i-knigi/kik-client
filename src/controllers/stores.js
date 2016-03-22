import CrudCtrl from './crud';

export default class UsersListCtrl extends CrudCtrl {
  constructor(Store, ngTableParams) {
    super(Store, ngTableParams);
  }
}

UsersListCtrl.$inject = ['Store', 'ngTableParams'];
