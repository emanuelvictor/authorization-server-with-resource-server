import {Injectable} from '@angular/core';
import {Describer} from '../../application/describer/describer';
import {HttpClient, HttpParams} from '@angular/common/http';


//const url = `${BASE_URL}/users`;

@Injectable()
export class WildcardService {

    /**
     * 
     * @param http 
     */
    constructor(private http: HttpClient) {}

    public call(url,obj):Promise<any>{
        let params = new HttpParams();
        const keys = Object.keys(obj);
        console.log(keys);
        for (let key of keys){
            if ( key=="page" || key=="pageable" ){
                params = Describer.getHttpParamsFromPageable(params, obj[key]);
            } else {
            params = params.set(key, obj[key]);
            }
        }

        return this.http.get<any>(url, { params }).toPromise()
        .then(response => response.json());
    }

    public callPost(url,obj):Promise<any>{
        let params = new HttpParams();
        /*const keys = Object.keys(obj);
        for (let key of keys){
            if ( key=="page" || key=="pageable" ){
                params = Describer.getHttpParamsFromPageable(params, obj[key]);
            } else {
            params = params.set(key, obj[key]);
            }
        }*/

        return this.http.post<any>(url, obj).toPromise()
        .then(response => response.json());
    }



/*
    public findById(id: number): Promise<User> {
        return this.http.get<any>(`${url}/${id}`)
            .toPromise()
            .then(response => response.json());
    }

    public listByFilters(filter: string = '', pageable: any): Promise<any> {
        let params = new HttpParams();
        params = params.set('filter', filter);
        params = Describer.getHttpParamsFromPageable(params, pageable);

        return this.http.get<User[]>(url, { params }).toPromise();
    }

    public save(user: User): Promise<User> {
        return this.http.post<any>(url, user)
            .toPromise()
            .then(response => response.json());
    }


    public updateUser(user: User): Promise<User> {
        return this.http.put<any>(`${url}/${user.id}`, user)
            .toPromise()
            .then(response => response.json());
    }


    public deleteUser(id: number): Promise<void> {
        return this.http.delete<any>(`${url}/${id}`).toPromise();
    }
*/
    // public changePassword(userId: number, novaSenha: string): Promise<any> {
    //     let params = new HttpParams();
    //     params = params.set('userId', userId ? userId.toString() : '');
    //     params = params.set('novaSenha', novaSenha ? novaSenha : '');

    //     return this.httpClient
    //         .get(this.baseUrl + 'users/' + userId + '/alterar-senha/', {
    //             params: params
    //         })
    //         .toPromise()
    //         .then(result => result);
    // }

    // public changeMyPassword(
    //     userId: number,
    //     senhaAtual: string,
    //     novaSenha: string
    // ): Promise<any> {
    //     let params = new HttpParams();
    //     params = params.set('userId', userId ? userId.toString() : '');
    //     params = params.set('senhaAtual', senhaAtual ? senhaAtual : '');
    //     params = params.set('novaSenha', novaSenha ? novaSenha : '');

    //     return this.httpClient
    //         .get(
    //             this.baseUrl +
    //                 'users/' +
    //                 userId +
    //                 '/alterar-minha-senha/',
    //             {
    //                 params: params
    //             }
    //         )
    //         .toPromise();
    // }
}
