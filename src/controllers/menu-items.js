import {extend, cloneDeep, clone, map} from 'lodash';
import CrudCtrl from './crud';

export default class MenuCtrl extends CrudCtrl {
  constructor(MenuItem, Product, Category, NgTableParams) {
    super(MenuItem, NgTableParams);

    this.searchIncludeIngridients = false;
    this.MenuItem = MenuItem;
    this.Product = Product;

    this.categories = Category.getAll();

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
      'filter[isIngridient]': this.searchIncludeIngridients
    }).$promise;
  }

  searchIngridientProducts(query, products) {
    let idsToExclude;
    if (products) {
      idsToExclude = map(products, 'id').join(',');
    }

    return this.Product.query({
      'filter[name]': query,
      'filter[isIngridient]': true,
      'filter[exclude]': idsToExclude
    }).$promise;
  }

  updateProductName() {
    if(!(this.newEntity.products && this.newEntity.products[0])) {
      return;
    }

    this.newEntity.name = this.newEntity.products[0].name;
  }

  addIngridient() {
    if (!(this.newIngridient && this.newIngridient.quantity)) {
      return;
    }

    this.newEntity.products.push(this.newIngridient);

    delete this.newIngridient;
  }

  removeIngridient(product) {
    const index = this.newEntity.products.indexOf(product);

    this.newEntity.products.splice(index, 1);
  }

  addIngridientExisting(menuItem, newIngridient) {
    if (!newIngridient || !newIngridient.MenuItemProduct) {
      return;
    }

    this.MenuItem.addIngridient({
      id: menuItem.id
    }, newIngridient).$promise.then(() => {
      menuItem.products.push(clone(newIngridient));

      Object.keys(newIngridient).forEach(key => {
        delete newIngridient[key];
      });
    });
  }

  removeIngridientExisting(menuItem, product) {
    this.MenuItem.removeIngridient({
      id: menuItem.id,
      productId: product.id
    }).$promise.then(() => {
      const index = menuItem.products.indexOf(product);
      menuItem.products.splice(index, 1);
    });
  }

  updateIngridientExistsing(menuItem, product) {
    this.MenuItem.updateIngridient({
      id: menuItem.id,
      productId: product.id
    }, product);
  }
}

MenuCtrl.$inject = ['MenuItem', 'Product', 'Category', 'NgTableParams'];
