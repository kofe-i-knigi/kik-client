import {API_BASE} from '../config';
import Resource from './resource';

export default Resource('stocks/:storeId', {
  audit: {
    url: `${API_BASE}/stocks/:storeId/audit`,
    method: 'PUT'
  },

  shortage: {
    url: `${API_BASE}/stocks/:storeId/shortage`,
    isArray: true
  }
});
