import {map} from 'lodash';

export default class DeliveryCtrl {
  constructor($state, $stateParams, Delivery, Product) {
    this.Delivery = Delivery;
    this.Product = Product;
    this.$stateParams = $stateParams;
    this.$state = $state;

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
    if (!(this.newProduct
          && this.newProduct.quantity
          && this.newProduct.newCostPrice)) {
      return;
    }

    this.newDelivery.products.push(this.newProduct);

    delete this.newProduct;
  }

  removeProduct(index) {
    this.newDelivery.products.splice(index, 1);
  }

  createDelivery() {
    if (this.newDelivery.products < 1) {
      return;
    }

    this.Delivery.save({
      storeId: this.$stateParams.storeId
    }, this.newDelivery).$promise.then(() => {
      this.$state.go('admin.stock.remains');
    });
  }
}

DeliveryCtrl.$inject = ['$state', '$stateParams', 'Delivery', 'Product'];
