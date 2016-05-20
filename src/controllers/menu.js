import CrudCtrl from './crud';

export default class MenuCtrl extends CrudCtrl {
 constructor(Product, ngTableParams) {
   super(Product, ngTableParams);
       const vm = this;
      
  }
}

MenuCtrl.$inject = ['Product', 'ngTableParams'];
