import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root',
})
export class ColaboradorService {
  public url = GLOBAL.url;

  constructor(private _http: HttpClient) {
    console.log(this.url);
  }

  login_admin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login_admin', data, {
      headers: headers,
    });
  }

  registro_colaborador_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : token});
    return this._http.post(this.url + 'registro_colaborador_admin', data, {
      headers: headers,
    });
  }

  listar_colaboradores_admin(token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : token});
    return this._http.get(this.url + 'listar_colaboradores_admin', { headers: headers });
  }

  cambiar_estado_colaborador_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : token});
    return this._http.put(this.url + 'cambiar_estado_colaborador_admin/' +id ,data, { headers: headers });
  }
}
