import {sumBy} from 'lodash';

export default class ShiftShowCtrl {
  constructor($stateParams, Shift) {
    this.shift = Shift.get({id: $stateParams.id}, () => {
      this.total = sumBy(this.shift.receipts, 'total');
    });
  }
}

ShiftShowCtrl.$inject = ['$stateParams', 'Shift'];
