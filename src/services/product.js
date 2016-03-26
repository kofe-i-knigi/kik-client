import {API_BASE} from '../config';

export default function Product($resource) {
  return $resource(`${API_BASE}/products/:id`, {}, {
    update: {
      method: 'PUT'
    }
  });
}

Product.$inject = ['$resource'];
