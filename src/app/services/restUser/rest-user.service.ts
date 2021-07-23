import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from 'src/app/interfaces/user';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';
import { UserLogin } from '../../interfaces/user';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class RestUserService {
  public uri;

  public token:string = null;

  public httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  private extractData(res: Response) {
    let body = res;
    return body || [] || {};
  }

  constructor(private http: HttpClient, private storage: Storage) {
    this.uri = CONNECTION.uri;
    this.storage.create();
  }

  getToken(){
    this.storage.get('itoken').then((value)=>{
      this.token = value;
    })
    return this.token;
  }

  login(userLogin: UserLogin) {
    let params = JSON.stringify(userLogin);

    return new Promise((resolve) => {
      this.http
        .post<any>(`${this.uri}/login`, params, this.httpOptions)
        .pipe(map(this.extractData))
        .subscribe((resp: any) => {
          if (resp['ok'] && resp['token']) {
            this.saveToken(resp['token']);
            resolve(true);
          } else {
            this.token = null;
            resolve(false);
          }
        });
    });
  }

  register(userRegister: UserRegister) {
    let params = JSON.stringify(userRegister);

    return new Promise((resolve) => {
      this.http
        .post<any>(`${this.uri}/register`, params, this.httpOptions)
        .pipe(map(this.extractData))
        .subscribe((resp: any) => {

          if (resp['ok'] && resp['userSaved']) {
            resolve(true);
          } else {
            this.token = null;
            resolve(false);
          }
        });
    });
  }

  async saveToken(token) {
    this.token = token;
    await this.storage.set('itoken',token);
  }

  getUser(){
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      "authorization": this.getToken()
    });

    return this.http.get<any>(`${this.uri}/getUserById`, {headers}).pipe(map(this.extractData));
  }
}
