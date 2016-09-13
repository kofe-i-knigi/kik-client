import AdminCtrl from './controllers/admin';
import LoginCtrl from './controllers/login';
import RegisterCtrl from './controllers/register';
import UserListCtrl from './controllers/users';
import ProductListCtrl from './controllers/products';
import MenuItemCtrl from './controllers/menu-items';
import CategoryCtrl from './controllers/categories';
import ShiftCtrl from './controllers/shifts';
import StoreListCtrl from './controllers/stores';
import StockCtrl from './controllers/stock/remains';
import StockShortageCtrl from './controllers/stock/shortage';
import StockAuditCtrl from './controllers/stock/audit';
import DeliveryCreateCtrl from './controllers/stock/create-delivery';
import DashboardCtrl from './controllers/dashboard';
import CashboxCtrl from './controllers/barista/cashbox';
import BaristaMenuCtrl from './controllers/barista/menu';
import BaristaShiftClosedCtrl from './controllers/barista/shift-closed';
import BaristaShiftReportCtrl from './controllers/barista/shift-report';

export default function($stateProvider) {
  $stateProvider
    .state('barista', {
      url: '/',
      abstract: true,
      template: '<ui-view>'
    })

    .state('barista.cashbox', {
      url: '',
      abstract: true,
      templateUrl: '/templates/barista/index.html',
      controller: CashboxCtrl,
      controllerAs: 'cashbox',
      resolve: {
        categories: ['apiCached', (apiCached) => {
          return apiCached('/menu');
        }]
      }
    })

    .state('barista.cashbox.defaultMenu', {
      url: '',
      controller: ['$state', 'categories', 'Auth', 'shiftCashbox',
      ($state, categories, Auth, shiftCashbox) => {
        if (!Auth.myUser()) { return $state.go('login'); }
        if (shiftCashbox.get().isClosed) {
          return $state.go('barista.cashbox.shiftClosed');
        } else if (shiftCashbox.get().isProcessing) {
          return $state.go('barista.cashbox.shiftReport');
        }
        if (categories[0] && categories[0].id) {
          $state.go('barista.cashbox.menu', {
            categoryId: categories[0].id
          });
        }
      }]
    })

    .state('barista.cashbox.menu', {
      url: 'menu/:categoryId',
      templateUrl: '/templates/barista/menu.html',
      controller: BaristaMenuCtrl,
      controllerAs: 'vm'
    })

    .state('barista.cashbox.preview', {
      url: 'preview',
      templateUrl: '/templates/barista/preview.html',
      controllerAs: 'vm'
    })

    .state('barista.cashbox.shiftReport', {
      url: 'shiftreport',
      templateUrl: '/templates/barista/shift-report.html',
      controller: BaristaShiftReportCtrl,
      controllerAs: 'vm'
    })

    .state('barista.cashbox.shiftClosed', {
      url: 'shiftclosed',
      templateUrl: '/templates/barista/shift-closed.html',
      controller: BaristaShiftClosedCtrl,
      controllerAs: 'vm'
    })

    .state('admin', {
      url: '/admin',
      abstract: true,
      templateUrl: '/templates/admin/index.html',
      controller: AdminCtrl,
      controllerAs: 'adminCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: LoginCtrl,
      controllerAs: 'vm'
    })

    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: RegisterCtrl,
      controllerAs: 'vm'
    })

    .state('admin.dashboard', {
      url: '',
      templateUrl: '/templates/admin/dashboard.html',
      controller: DashboardCtrl,
      controllerAs: 'vm'
    })

    .state('admin.users', {
      url: '/users',
      templateUrl: '/templates/admin/users.html',
      controller: UserListCtrl,
      controllerAs: 'vm'
    })

    .state('admin.stores', {
      url: '/stores',
      templateUrl: '/templates/admin/stores.html',
      controller: StoreListCtrl,
      controllerAs: 'vm'
    })

    .state('admin.stock', {
      url: '/stock/:storeId',
      abstract: true,
      template: '<ui-view>'
    })

    .state('admin.stock.remains', {
      url: '',
      templateUrl: '/templates/admin/stock/index.html',
      controller: StockCtrl,
      controllerAs: 'vm'
    })

    .state('admin.stock.shortageReport', {
      url: '/shortage',
      templateUrl: '/templates/admin/stock/shortage.html',
      controller: StockShortageCtrl,
      controllerAs: 'vm'
    })

    .state('admin.stock.audit', {
      url: '/audit',
      templateUrl: '/templates/admin/stock/audit.html',
      controller: StockAuditCtrl,
      controllerAs: 'vm'
    })

    .state('admin.stock.createDelivery', {
      url: '/deliveries/new',
      templateUrl: '/templates/admin/stock/create-delivery.html',
      controller: DeliveryCreateCtrl,
      controllerAs: 'vm'
    })

    .state('admin.products', {
      url: '/products',
      templateUrl: '/templates/admin/products.html',
      controller: ProductListCtrl,
      controllerAs: 'vm'
    })

    .state('admin.menuItems', {
      url: '/menuitems',
      templateUrl: '/templates/admin/menu-items.html',
      controller: MenuItemCtrl,
      controllerAs: 'vm'
    })

    .state('admin.categories', {
      url: '/categories',
      templateUrl: '/templates/admin/categories.html',
      controller: CategoryCtrl,
      controllerAs: 'vm'
    })

    .state('admin.shifts', {
      url: '/shifts',
      templateUrl: '/templates/admin/shifts.html',
      controller: ShiftCtrl,
      controllerAs: 'vm'
    });
}
