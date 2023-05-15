import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(value: any): any {
    let arr = value.filter(this.isntZero);
    arr.sort((a: any, b: any) => {
      return a.order - b.order;
    });
    return arr.concat(value.filter(this.isZero));
  }

  private isntZero(element: any) {
    return element.order > 0;
  }
  private isZero(element: any) {
      return element.order == 0;
  }

}
