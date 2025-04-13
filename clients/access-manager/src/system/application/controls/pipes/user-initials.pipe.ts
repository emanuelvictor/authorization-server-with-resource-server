import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'userInitials'})
export class UserInitialsPipe implements PipeTransform {

  /**
   *
   * @param value
   */
  transform(value: any): any {
    if (!value)
      return;

    if (value.indexOf(' ') > 1 && value.length > 20) {
      const splittedName = value.split(' ');
      const firstLetter = splittedName[0].charAt(0);

      let lastLetter = '';

      if (splittedName.length > 1) {
        lastLetter = splittedName[splittedName.length - 1].charAt(0);
      }

      const initials = `${firstLetter}${lastLetter}`;

      return initials.toUpperCase();
    } else return value
  }
}
