import {API_BASE} from '../config';

export default function shiftCashbox($http, Receipt) {
  return {
    get() {
      const shift = JSON.parse(localStorage.getItem('shift'));

      if (shift) {
        return shift;
      } else {
        return this.open();
      }
    },

    process(salary) {
      return this.save({
        salary,
        isClosed: false,
        isProcessing: true
      });
    },

    close(cash, cashless) {
      const shift = this.get();
      const {salary} = shift;

      let receipts = Receipt.query();

      return $http.post(`${API_BASE}/shift`, {
        receipts,
        salary,
        cash,
        cashless
      })
      .then(() => {
        Receipt.removeAll();

        this.save({
          isClosed: true,
          isProcessing: false
        });
      });
    },

    open() {
      return this.save({
        isClosed: false,
        isProcessing: false
      }, true);
    },

    save(data, wipe) {
      if (wipe) {
        localStorage.removeItem('shift');
      }

      var shift = JSON.parse(localStorage.getItem('shift')) || {};

      shift = Object.assign(shift, data);

      localStorage.setItem('shift', JSON.stringify(shift));

      return shift;
    }
  };
}

shiftCashbox.$inject = ['$http', 'Receipt'];
