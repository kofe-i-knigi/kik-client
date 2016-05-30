import Resource from './resource';
import {API_BASE} from '../config';

export default Resource('menuitems', {
  addIngridient: {
    url: `${API_BASE}/menuitems/:id/products`,
    method: 'POST'
  },

  removeIngridient: {
    url: `${API_BASE}/menuitems/:id/products/:productId`,
    method: 'DELETE'
  },

  updateIngridient: {
    url: `${API_BASE}/menuitems/:id/products/:productId`,
    method: 'PUT'
  }
});
