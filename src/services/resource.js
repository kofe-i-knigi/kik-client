import {extend} from 'lodash';
import {API_BASE} from '../config';

export default function Resource(name, newActions) {
  const Resource = function($resource) {
    const actions = {
      query: {
        isArray: true,

        interceptor: {
          response(response) {
            let rangeHeader = response.headers()['content-range'];

            if (rangeHeader) {
              response.resource.$total = +rangeHeader.split('/')[1];
            }

            return response.resource;
          }
        }
      },

      update: {
        method: 'PUT'
      }
    };

    if (newActions) {
      extend(actions, newActions);
    }

    return $resource(`${API_BASE}/${name}/:id`, {}, actions);
  };

  Resource.$inject = ['$resource'];

  return Resource;
}
