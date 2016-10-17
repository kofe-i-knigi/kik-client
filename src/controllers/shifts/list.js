import CrudCtrl from '../crud';
import {sumBy} from 'lodash';

export default class CategoryCtrl extends CrudCtrl {
  constructor(Shift, User, NgTableParams, ngTableEventsChannel) {
    super(Shift, NgTableParams);

    this.users = User.query();
    this.filters.$gt = new Date(Date.now() - 1000*60*60*24*30);
    this.filters.$lt = new Date();

    ngTableEventsChannel.onAfterReloadData(({data}) => {
      this.totalTotal = sumBy(data, 'total');
      this.totalSalary = sumBy(data, 'salary');
      this.totalFullSalary = sumBy(data, 'fullSalary');
      this.totalCash = sumBy(data, 'cash');
      this.totalCashless = sumBy(data, 'cashless');
      this.totalDifference = sumBy(data, 'difference');
    });
  }

  resetUser() {
    delete this.filters.userId;

    this.tableParams.reload();
  }
}

CategoryCtrl.$inject = ['Shift', 'User', 'NgTableParams', 'ngTableEventsChannel'];
