import {API_BASE} from '../config';
import Resource from './resource';

export default Resource('stocks/:storeId', {
  updateQuantity: {
    url: `${API_BASE}/stocks/:storeId/products/:productId`,
    method: 'PUT'
  },

  shortage: {
    url: `${API_BASE}/stocks/:storeId/shortage`,
    isArray: true
  }
});
