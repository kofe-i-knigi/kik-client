import {cloneDeep, sum, find} from 'lodash';

const defaultReceipt = {
  items: [],
  total: 0,
  type: 'cash',
  cash: 0
};

export default class CashCtrl {
  constructor(Receipt) {
    this.Receipt = Receipt;

    this.receipts = this.Receipt.query();
    console.log(this.receipts);
    this.receipt = cloneDeep(defaultReceipt);
  }

  addItem(item) {
    let receiptItem = find(this.receipt.items, {id: item.id});
    if (receiptItem) {
      receiptItem.quantity += 1;
    } else {
      let newItem = cloneDeep(item);
      newItem.quantity = 1;
      this.receipt.items.push(newItem);
    }

    this.recalc();
  }

  removeItem(index) {
    let receiptItem = this.receipt.items[index];

    if (receiptItem.quantity > 1) {
      receiptItem.quantity -= 1;
    } else {
      this.receipt.items.splice(index, 1);
    }

    this.recalc();
  }

  checkout() {
    this.receipt.createdAt = new Date();
    this.Receipt.save(this.receipt);
    this.receipts.push(this.receipt);

    this.receipt = cloneDeep(defaultReceipt);
  }

  recalc() {
    this.receipt.total = sum(this.receipt.items.map(item => {
      return +item.price * item.quantity;
    }));

    if (this.receipt.cash > this.receipt.total) {
      this.receipt.change = this.receipt.cash - this.receipt.total;
    } else {
      this.receipt.change = 0;
    }
  }
}

CashCtrl.$inject = ['Receipt'];
