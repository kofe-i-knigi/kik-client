var API_BASE = 'http://localhost/api';

if (process.env.NODE_ENV === 'production') {
  API_BASE = 'http://kofe-knigi.tk/api';
}

export {API_BASE};
