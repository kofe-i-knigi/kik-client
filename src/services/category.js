import {API_BASE} from '../config';
import Resource from './resource';

export default Resource('categories', {
  getAll: {
    isArray: true,
    url: `${API_BASE}/menu`
  }
});
