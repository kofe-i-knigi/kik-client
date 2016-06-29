import {API_BASE} from '../config';

function Receipt($http) {
  if (!localStorage.getItem('receipts')) {
    localStorage.setItem('receipts', '[]');
  }

  return {
    save(receipt) {
      receipt.date = new Date();

      let receipts = JSON.parse(localStorage.getItem('receipts'));

      receipts.push(receipt);

      localStorage.setItem('receipts', JSON.stringify(receipts));

      return receipt;
    },

    query() {
      return JSON.parse(localStorage.getItem('receipts'));
    },

    closeShift() {
      let receipts = JSON.parse(localStorage.getItem('receipts'));

      return $http.post(`${API_BASE}/shift`, receipts)
      .then(() => {
        localStorage.setItem('receipts', '[]');
      });
    }
  };
}

Receipt.$inject = ['$http'];

export default Receipt;
