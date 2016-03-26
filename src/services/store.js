import {API_BASE} from '../config';

export default function Store($resource) {
  return $resource(`${API_BASE}/stores/:id`, {}, {
    update: {
      method: 'PUT'
    }
  });
}

Store.$inject = ['$resource'];
