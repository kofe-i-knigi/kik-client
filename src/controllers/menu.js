import CrudCtrl from './crud';

export default class MenuCtrl extends CrudCtrl {
 constructor(Product, ngTableParams) {
   super(Product, ngTableParams);
    this.states=['a','b'];
       
       
  }
   
}

MenuCtrl.$inject = ['Product', 'ngTableParams'];
