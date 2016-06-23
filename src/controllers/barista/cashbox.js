import {cloneDeep, sum} from 'lodash';

const defaultReceipt = {
  items: [],
  total: 0
};

function countTotal(items) {
  return sum(items.map(item => {
    return +item.price;
  }));
}

export default class CashCtrl {
  constructor(Receipt) {
    this.Receipt = Receipt;

    this.receipt = cloneDeep(defaultReceipt);
  }

  addItem(item) {
    this.receipt.items.push(cloneDeep(item));
    this.receipt.total = countTotal(this.receipt.items);
  }

  removeItem(index) {
    this.receipt.items.splice(index, 1);
    this.receipt.total = countTotal(this.receipt.items);
  }

  checkout() {
    this.receipt.createdAt = new Date();
    this.Receipt.save(this.receipt);

    this.receipt = cloneDeep(defaultReceipt);
  }
}

CashCtrl.$inject = ['Receipt'];
