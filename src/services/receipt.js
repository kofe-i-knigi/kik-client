// import {API_BASE} from '../config';

function Receipt($http) {
  if (!localStorage.getItem('receipts')) {
    localStorage.setItem('receipts', '[]');
  }

  return {
    save(receipt) {
      let receipts = JSON.parse(localStorage.getItem('receipts'));

      receipts.push(receipt);

      localStorage.setItem('receipts', JSON.stringify(receipts));
    },

    query() {
      return JSON.parse(localStorage.getItem('receipts'));
    }
  };
}

Receipt.$inject = ['$http'];

export default Receipt;
