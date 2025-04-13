import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  /**
   *
   * @param object
   * @param filter
   * @returns {boolean}
   */
  static applyFilter(object: any, filter: any): boolean {
    for (const field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (!object[field])
            return false;
          if (FilterPipe.normalizeString(object[field]).toLowerCase().indexOf(FilterPipe.normalizeString(filter[field]).toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (object[field] !== filter[field]) {
            return false;
          }
        } else if (typeof filter[field] === 'object')
          return FilterPipe.applyFilter(object[field], filter[field])
      }
    }
    return true;
  }

  /**
   * Normaliza a string, recebe uma string com acentos e devolve sem acentos. Normalizada.
   * @param {string} string
   * @returns {string}
   */
  static normalizeString(string: string): string {
    return string.replace(/á/g, 'a')
      .replace(/â/g, 'a')
      .replace(/é/g, 'e')
      .replace(/è/g, 'e')
      .replace(/ê/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ï/g, 'i')
      .replace(/ì/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ô/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/ü/g, 'u')
      .replace(/ç/g, 'c')
      .replace(/ß/g, 's')
      .replace(/[!#$%&'()*+,-./:;?@[\\\]_`{|}~]/g, '');
  }

  /**
   *
   * @param items
   * @param filter
   */
  transform(items: any[], filter: any): any[] {
    if (!items || !filter)
      return items;

    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: any) => FilterPipe.applyFilter(item, filter))
  }

}
