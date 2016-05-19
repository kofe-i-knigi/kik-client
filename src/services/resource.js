import {API_BASE} from '../config';

export default function Resource(name) {
  return function($resource) {
    return $resource(`${API_BASE}/${name}/:id`, {}, {
      query: {
        isArray: true,

        interceptor: {
          response(response) {
            let rangeHeader = response.headers()['content-range'];

            if (rangeHeader) {
              response.resource.$total = +rangeHeader.split('/')[1]
            }

            return response.resource;
          }
        }
      },

      update: {
        method: 'PUT'
      }
    });
  }
}

Resource.$inject = ['$resource'];
