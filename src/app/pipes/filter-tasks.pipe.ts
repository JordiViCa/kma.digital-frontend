import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {

  transform(value: any, filterString: any): any {
    if (filterString == "date") {
      value.sort((a:any,b:any) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
    }
    if (filterString == "dated") {
      value.sort((a:any,b:any) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
    }
    if (filterString == "difficulty") {
      value.sort((a:any,b:any) => (a.difficulty > b.difficulty) ? 1 : ((b.difficulty > a.difficulty) ? -1 : 0))
    }
    if (filterString == "difficultyd") {
      value.sort((a:any,b:any) => (a.difficulty < b.difficulty) ? 1 : ((b.difficulty < a.difficulty) ? -1 : 0))
    }
    return value;
  }
}
