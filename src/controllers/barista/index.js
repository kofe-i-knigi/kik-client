export default class BaristaCtrl {
  constructor(MenuItem) {
    this.products = MenuItem.query();
  }
}

BaristaCtrl.$inject = ['MenuItem'];
