import {cloneDeep, sum, find} from 'lodash';

const defaultReceipt = {
  items: [],
  total: 0,
  cash: 0,
  discount: 0
};

export default class CashCtrl {
  constructor($state, apiCached, Auth, Receipt, shiftCashbox, categories) {
    this.Receipt = Receipt;
    this.shiftCashbox = shiftCashbox;
    this.$state = $state;

    this.user = Auth.myUser();
    if (!this.user) {
      return $state.go('login');
    }

    this.receipts = this.Receipt.query();
    this.receipt = cloneDeep(defaultReceipt);
    this.categories = categories;

    this._refreshTotalCash();

    this.shift = shiftCashbox.get();

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

  processShift() {
    if (!confirm('Вы уверены?')) {
      return;
    }

    this.shift = this.shiftCashbox.process(this.payment);
    this.receipts = [];

    this.$state.go('barista.cashbox.shiftReport');
  }

  recalc() {
    if (this.receipt.selfPaid) {
      this.receipt.discount = 0;
      this.receipt.total = sum(this.receipt.items.map(item => {
        return +item.costPrice * item.quantity;
      }));
    } else {
      this.receipt.total = sum(this.receipt.items.map(item => {
        var price = +item.price;
        if (item.hasDiscount) {
          price -= price * this.receipt.discount;
        }

        return price * item.quantity;
      }));
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

  _refreshTotalCash() {
    this.totalCash = sum(this.receipts.map(receipt => receipt.total));
  }

  _refreshPayment() {
    const todayBonus = sum(this.receipts.map(receipt => {
      if (receipt.selfPaid) {
        return 0;
      } else {
        return sum(receipt.items.map((item) => {
          const markup = Math.max(+item.price - item.costPrice, 0);
          var bonus = markup / 100 * this.settings.bonusPercent * item.quantity;
          if (item.hasDiscount) {
            bonus -= bonus * receipt.discount;
          }

          return Math.ceil(bonus);
        }));
      }
    }));

    this.payment = this.settings.basePayment + todayBonus;
  }
}

CashCtrl.$inject = [
  '$state',
  'apiCached',
  'Auth',
  'Receipt',
  'shiftCashbox',
  'categories'
];
