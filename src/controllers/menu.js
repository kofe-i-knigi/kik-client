import {extend, cloneDeep} from 'lodash';
import CrudCtrl from './crud';

export default class MenuCtrl extends CrudCtrl {
  constructor(MenuItem, Product, ngTableParams) {
    super(MenuItem, ngTableParams);

    this.Product = Product;

    extend(this.newEntityDefault, {
      price: 0,
      isComposite: false,
      products: []
    });

    this.newEntity = cloneDeep(this.newEntityDefault);
  }

  searchSimpleProducts(query) {
    return this.Product.query({
      'filter[name]': query,
      'filter[isIngridient]': false
    }).$promise;
  }

  searchIngridientProducts(query) {
    return this.Product.query({
      'filter[name]': query,
      'filter[isIngridient]': true
    }).$promise;
  }

  updateProductName() {
    if(!(this.newEntity.products && this.newEntity.products[0])) {
      return;
    }

    this.newEntity.name = this.newEntity.products[0].name
  }

  addIngridient() {
    if (!(this.newIngridient && this.newIngridient.quantity)) {
      return;
    }

    this.newEntity.products.push(this.newIngridient);

    delete this.newIngridient;
  }
}

MenuCtrl.$inject = ['MenuItem', 'Product', 'ngTableParams'];
