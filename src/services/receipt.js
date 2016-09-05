function Receipt() {
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

    removeAll() {
      localStorage.setItem('receipts', '[]');
    }
  };
}

Receipt.$inject = [];

export default Receipt;
