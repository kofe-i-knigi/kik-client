import {map} from 'lodash';

export default class DeliveryCtrl {
  constructor(Delivery, Product) {
    this.Delivery = Delivery;
    this.Product = Product;

    this.newDelivery = {
      products: []
    };
  }

  searchProducts(query, products) {
    let idsToExclude;
    if (products) {
      idsToExclude = map(products, 'id').join(',');
    }

    return this.Product.query({
      'filter[name]': query,
      'filter[exclude]': idsToExclude
    }).$promise;
  }

  addProduct() {
    if (!(this.newProduct && this.newProduct.quantity)) {
      return;
    }

    this.newDelivery.products.push(this.newProduct);

    delete this.newProduct;
  }

  removeProduct(index) {
    this.newDelivery.products.splice(index, 1);
  }
}

DeliveryCtrl.$inject = ['Delivery', 'Product'];
