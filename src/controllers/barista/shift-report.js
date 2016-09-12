export default class ShiftClosedCtrl {
  constructor($state, shiftCashbox) {
    this.shiftCashbox = shiftCashbox;
    this.$state = $state;

    this.shift = shiftCashbox.get();
    if (this.shift.isClosed) {
      return $state.go('barista.cashbox.shiftClosed');
    } else if (!this.shift.isProcessing) {
      return $state.go('barista.cashbox.defaultMenu');
    }

    this.cash = 0;
    this.cashless = 0;
  }

  closeShift() {
    if ((+this.cash).isNaN || (+this.cashless).isNaN) {
      return;
    }

    this.sending = true;

    this.shiftCashbox.close(
      +this.cash,
      +this.cashless
    ).then(() => {
      this.$state.go('barista.cashbox.shiftClosed');
    });
  }
}

ShiftClosedCtrl.$inject = ['$state', 'shiftCashbox'];
