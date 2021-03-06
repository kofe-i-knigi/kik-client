import {API_BASE} from '../config';

export default function User($resource) {
  return $resource(`${API_BASE}/admin/users/:id`);
}

User.$inject = ['$resource'];
