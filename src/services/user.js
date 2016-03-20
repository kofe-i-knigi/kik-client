export default function User($resource) {
  return $resource('/api/admin/users/:userId');
}

User.$inject = ['$resource'];
