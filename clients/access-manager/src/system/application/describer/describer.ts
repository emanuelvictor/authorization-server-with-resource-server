import {HttpParams} from "@angular/common/http";
import {URLSearchParams} from "@angular/http";

export class Describer {

  /**
   * Pega o objeto e retorna o mesmo serializado em uma string
   * @param {HttpParams} params
   * @param object
   * @returns {HttpParams}
   */
  static getHttpParamsFromPageable(params: HttpParams, object: any): HttpParams {
    if (object) {

      Object.keys(object).map(function (key) {

        if (object[key]) {
          // if (pageable[key].constructor === Array) {
          //
          //   for (var i = 0; i < pageable[key].length; i++) {
          //     if (typeof pageable[key][i] === 'object') {
          //       params = Describer.getParamsFromPageable(params, pageable[key][i])
          //     } else {
          //       params = params.set(key, pageable[key][i] ? pageable[key][i] : '');
          //     }
          //   }
          // } else
          if (typeof object[key] === 'object') {
            /**
             * Caso o objeto seja um 'sort', serializa o mesmo no formato spring
             */
            if (key === 'sort') {
              params = params.set(key, object[key]['properties'] + ',' + object[key]['direction']);
            } else
              params = Describer.getHttpParamsFromPageable(params, object[key])
          } else {
            params = params.set(key, object[key] ? object[key] : '');
          }
        }
      });
    }
    return params;
  }

  /**
   * Não é recursivo
   * Pega o objeto e retorna o mesmo serializado em uma string
   * URLSearchParams is deprecated
   * @deprecated
   * @param {URLSearchParams} params
   * @param object
   */
  static getURLSearchParamsFromPageable(params: URLSearchParams, pageable: any): void {
    Object.keys(pageable).map(function (key) {
      params.set(key, pageable[key]);
    });
  }
}
