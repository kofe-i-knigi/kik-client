var API_BASE = 'http://localhost/api';
//var API_BASE = 'http://kofe-knigi.tk/api';

if (process.env.NODE_ENV === 'production') {
  API_BASE = 'http://kofe-knigi.ru/api';
}

export {API_BASE};
