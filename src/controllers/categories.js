import CrudCtrl from './crud';

export default class CategoryCtrl extends CrudCtrl {
  constructor(Category, NgTableParams) {
    super(Category, NgTableParams);

    this.Category = Category;
  }

  toggleDiscount(category) {
    this.Category.toggleDiscount({id: category.id}, category);
  }
}

CategoryCtrl.$inject = ['Category', 'NgTableParams'];
