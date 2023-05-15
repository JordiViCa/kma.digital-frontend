import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chats'
})
export class ChatsPipe implements PipeTransform {

  transform(value: any, filter: any): any {
    if (!filter) {
      return value;
    }
    if (value != undefined && value[0].titol) {
      let result = JSON.parse(JSON.stringify(value)).filter(
        (chat: any) => {
          if (chat.titol.includes(filter)) {
            return chat;
          }
        }
      )
      return result;
    }
    let result = JSON.parse(JSON.stringify(value)).filter(
      (el: any) => {
        el.chats = el.chats.filter(
          (chat: any) => {
            if (chat.titol.includes(filter)) {
              return chat;
            }
          }
        )
        return el;
      }
    )
    return result;
  }

}
