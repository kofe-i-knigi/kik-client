import {cloneDeep, sum, find} from 'lodash';

const defaultReceipt = {
  items: [],
  total: 0,
  type: 'cash',
  cash: 0
};

export default class CashCtrl {
  constructor($state, apiCached, Receipt, categories) {
    this.Receipt = Receipt;
    this.$state = $state;

    this.receipts = this.Receipt.query();
    this.receipt = cloneDeep(defaultReceipt);
    this.categories = categories;

    apiCached('/settings').then(settings => {
      this.settings = settings;

      this.payment  = this.calcPayment();
    });
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
    const receipt = this.Receipt.save(this.receipt);
    this.receipts.push(receipt);

    this.receipt = cloneDeep(defaultReceipt);

    this.payment  = this.calcPayment();
  }

  closeShift() {
    if (!confirm('Вы уверены?')) {
      return;
    }

    this.Receipt.closeShift().then(() => {
      this.receipts = [];

      this.$state.go('barista.cashbox.shiftClosed');
    });
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

  calcPayment() {
    return this.settings.basePayment + sum(this.receipts.map(receipt => {
      return sum(receipt.items.map(item => {
        const markup = Math.max(+item.price - item.costPrice, 0);
        const bonus = markup / 100 * this.settings.bonusPercent * item.quantity;
        return Math.ceil(bonus);
      }));
    }));
  }

  syncWithBackend() {
    localStorage.removeItem('/menu');
    localStorage.removeItem('/settings');

    this.categories.forEach(category => {
      localStorage.removeItem(`/menu/${category.id}`);
    });

    this.$state.go(this.$state.current, {}, {reload: true});
  }
}

CashCtrl.$inject = ['$state', 'apiCached', 'Receipt', 'categories'];
