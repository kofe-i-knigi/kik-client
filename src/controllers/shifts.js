import CrudCtrl from './crud';

export default class CategoryCtrl extends CrudCtrl {
  constructor(Shift, NgTableParams) {
    super(Shift, NgTableParams);

  }
}

CategoryCtrl.$inject = ['Shift', 'NgTableParams'];
