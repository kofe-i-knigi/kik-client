import {API_BASE} from '../config';

export default function User($resource) {
  return $resource(`${API_BASE}/stores/:id`, {}, {
    update: {
      method: 'PUT'
    }
  });
}

User.$inject = ['$resource'];
