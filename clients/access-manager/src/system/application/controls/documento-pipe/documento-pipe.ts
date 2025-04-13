import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'documento'
})
export class DocumentoPipe implements PipeTransform {
  transform(value: any): any {
    if (value) {
      value = value.toString();

      if (value.length === 11) {
        return value
          .substring(0, 3)
          .concat(".")
          .concat(value.substring(3, 6))
          .concat(".")
          .concat(value.substring(6, 9))
          .concat("-")
          .concat(value.substring(9, 11))
      }
      else if (value.length === 14) {
        return value //  xx.xxx.xxx/xxxx-xx
          .substring(0, 2)
          .concat(".")
          .concat(value.substring(2, 5))
          .concat(".")
          .concat(value.substring(5, 8))
          .concat("/")
          .concat(value.substring(8, 12))
          .concat("-")
          .concat(value.substring(12, 14))
      }

    }
    return value;

  }
}