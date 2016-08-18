import CrudCtrl from './crud';
import {sumBy} from 'lodash';

export default class CategoryCtrl extends CrudCtrl {
  constructor(Shift, User, NgTableParams, ngTableEventsChannel) {
    super(Shift, NgTableParams);

    this.users = User.query();
    this.filters.$gt = new Date(Date.now() - 1000*60*60*24*30);
    this.filters.$lt = new Date();

    ngTableEventsChannel.onAfterReloadData(({data}) => {
      this.totalCash = sumBy(data, 'total');
      this.totalSalary = sumBy(data, 'salary');
      this.totalFullSalary = sumBy(data, 'fullSalary');
    });
  }

  resetUser() {
    delete this.filters.userId;

    this.tableParams.reload();
  }
}

CategoryCtrl.$inject = ['Shift', 'User', 'NgTableParams', 'ngTableEventsChannel'];
