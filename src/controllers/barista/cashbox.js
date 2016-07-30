import {cloneDeep, sum, find, partial} from 'lodash';

const defaultReceipt = {
  items: [],
  total: 0,
  cash: 0,
  discount: 0
};

function receiptItemBonus(bonusPercent, item) {
  const markup = Math.max(+item.price - item.costPrice, 0);
  const bonus = markup / 100 * bonusPercent * item.quantity;
  return Math.ceil(bonus);
}

export default class CashCtrl {
  constructor($state, apiCached, Receipt, categories) {
    this.Receipt = Receipt;
    this.$state = $state;

    this.receipts = this.Receipt.query();
    this.receipt = cloneDeep(defaultReceipt);
    this.categories = categories;

    this._refreshTotalCash();

    apiCached('/settings').then(settings => {
      this.settings = settings;

      this._refreshPayment();
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

    this._refreshPayment();
    this._refreshTotalCash();
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
    if (this.receipt.selfPaid) {
      this.receipt.discount = 0;
      this.receipt.total = -sum(this.receipt.items.map(item => {
        return +item.costPrice * item.quantity;
      }));
    } else {
      this.receipt.total = sum(this.receipt.items.map(item => {
        return +item.price * item.quantity;
      }));

      this.receipt.total -= this.receipt.total * this.receipt.discount / 100;
    }

    if (this.receipt.cash > this.receipt.total) {
      this.receipt.change = this.receipt.cash - this.receipt.total;
    } else {
      this.receipt.change = 0;
    }
  }

  syncWithBackend() {
    localStorage.removeItem('/menu');
    localStorage.removeItem('/settings');

    this.categories.forEach(category => {
      localStorage.removeItem(`/menu/${category.id}`);
    });

    this.$state.go(this.$state.current, {}, {reload: true});
  }

  // private
  _refreshTotalCash() {
    this.totalCash = sum(this.receipts.map(receipt => {
      return receipt.selfPaid ? -receipt.total : receipt.total
    }));
  }

  _refreshPayment() {
    const todayBonus = sum(this.receipts.map(receipt => {
      if (receipt.selfPaid) {
        return receipt.total;
      } else {
        const bonuses = receipt.items.map(partial(
          receiptItemBonus,
          this.settings.bonusPercent));
        const totalBonus = sum(bonuses);

        return totalBonus - totalBonus * (receipt.discount || 0) / 100;
      }
    }));

    this.payment = this.settings.basePayment + todayBonus;
  }
}

CashCtrl.$inject = ['$state', 'apiCached', 'Receipt', 'categories'];
