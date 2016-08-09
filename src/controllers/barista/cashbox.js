import {cloneDeep, sum, find} from 'lodash';

const defaultReceipt = {
  items: [],
  total: 0,
  cash: 0,
  discount: 0
};

export default class CashCtrl {
  constructor($state, apiCached, Auth, Receipt, categories) {
    this.Receipt = Receipt;
    this.$state = $state;

    this.user = Auth.myUser();
    if (!this.user) {
      return $state.go('login');
    }

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

    this.Receipt.closeShift(this.payment).then(() => {
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
        var price = +item.price;
        if (this._hasDiscount(item)) {
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

  _hasDiscount(item) {
    const category = find(this.categories, {id: item.categoryId});

    return category && category.hasDiscount;
  }

  _refreshTotalCash() {
    this.totalCash = sum(this.receipts.map(receipt => {
      return receipt.selfPaid ? -receipt.total : receipt.total;
    }));
  }

  _refreshPayment() {
    const todayBonus = sum(this.receipts.map(receipt => {
      if (receipt.selfPaid) {
        return receipt.total;
      } else {
        return sum(receipt.items.map((item) => {
          const markup = Math.max(+item.price - item.costPrice, 0);
          var bonus = markup / 100 * this.settings.bonusPercent * item.quantity;
          if (this._hasDiscount(item)) {
            bonus -= bonus * receipt.discount;
          }

          return Math.ceil(bonus);
        }));
      }
    }));

    this.payment = this.settings.basePayment + todayBonus;
  }
}

CashCtrl.$inject = ['$state', 'apiCached', 'Auth', 'Receipt', 'categories'];
