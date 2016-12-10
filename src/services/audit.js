import {API_BASE} from '../config';

export default function Audit($resource) {
  return $resource(`${API_BASE}/audits/:auditId`);
}

Audit.$inject = ['$resource'];
