import CrudCtrl from './crud';

export default class ProductListCtrl extends CrudCtrl {
  constructor(Product, ngTableParams) {
    super(Product, ngTableParams);
  }
}

ProductListCtrl.$inject = ['Product', 'ngTableParams'];
