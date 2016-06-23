import CrudCtrl from './crud';

export default class ProductListCtrl extends CrudCtrl {
  constructor(Product, NgTableParams) {
    super(Product, NgTableParams);

  }
}

ProductListCtrl.$inject = ['Product', 'NgTableParams'];
