import CrudCtrl from './crud';

export default class ProductListCtrl extends CrudCtrl {
  constructor(Product, ngTableParams) {
    super(Product, ngTableParams);
    this.states=['cola','sugar']

  }
  addIngredient() {
    this.states.push(this.selected)
  }
}

ProductListCtrl.$inject = ['Product', 'ngTableParams'];
