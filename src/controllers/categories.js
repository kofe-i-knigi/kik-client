import CrudCtrl from './crud';

export default class CategoryCtrl extends CrudCtrl {
  constructor(Category, NgTableParams) {
    super(Category, NgTableParams);

  }
}

CategoryCtrl.$inject = ['Category', 'NgTableParams'];
