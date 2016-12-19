import {API_BASE} from '../config';

export default function Delivery($resource) {
  return $resource(`${API_BASE}/deliveries/:deliveryId`, {}, {
    save: {
      method: 'POST',
      url: `${API_BASE}/stocks/:storeId/deliveries`
    }
  });
}

Delivery.$inject = ['$resource'];
