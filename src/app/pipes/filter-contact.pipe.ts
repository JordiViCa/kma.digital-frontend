import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterContact'
})
export class FilterContactPipe implements PipeTransform {

  transform(value: any, filterString: any): any {
    console.log(filterString)
    if (filterString == "date") {
      value.sort((a:any,b:any) => (a.created > b.created) ? 1 : ((b.created > a.created) ? -1 : 0))
    }
    if (filterString == "dated") {
      value.sort((a:any,b:any) => (a.created < b.created) ? 1 : ((b.created < a.created) ? -1 : 0))
    }
    if (filterString == "seen") {
      value.sort((a:any,b:any) => (a.seen === b.seen) ? 0 : (a.seen ? -1 : 1))
    } 
    if (filterString == "seend") {
      value.sort((a:any,b:any) => (a.seen === b.seen) ? 0 : (a.seen ? 1 : -1))
    } 
    console.log(value)
    return value;
  }

}
