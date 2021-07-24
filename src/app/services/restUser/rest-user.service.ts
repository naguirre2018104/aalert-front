import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from 'src/app/interfaces/user';
import { UserLogged } from '../../interfaces/user';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';
import { UserLogin } from '../../interfaces/user';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class RestUserService {
  public uri;

  public token: string = null;

  public httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    }),
  };

  private extractData(res: Response) {
    let body = res;
    return body || [] || {};
  }

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.uri = CONNECTION.uri;
    this.storage.create();
  }

  async getToken() {
    this.token = (await this.storage.get('token')) || null;
  }

  async login(userLogin: UserLogin) {
    let params = JSON.stringify(userLogin);

    return new Promise((resolve) => {
      this.http
        .post<any>(`${this.uri}/login`, params, this.httpOptions)
        .pipe(map(this.extractData))
        .subscribe((resp: any) => {
          if (resp['ok'] && resp['token']) {
            this.saveToken(resp['token']);
            this.saveUserLogged(resp['userFinded']);
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

  async modifyUser(userLogged: UserLogged, userId: string){
    let params = JSON.stringify(userLogged);

    
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      "authorization": this.token
    });

    return new Promise((resolve) => {
      this.http
        .put<any>(`${this.uri}/modifyUser/${userId}`, params, { headers })
        .pipe(map(this.extractData))
        .subscribe((resp: any) => {
          if (resp['userUpdated']) {
            this.saveUserLogged(resp['userUpdated']);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  async saveUserLogged(user){
    await this.storage.set('userLogged', user);
  }

  async saveToken(token) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async getUser() {
    await this.getToken();
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      authorization: this.token,
    });

    return new Promise((resolve) => {
      this.http
        .get<any>(`${this.uri}/getUserById`, { headers })
        .pipe(map(this.extractData))
        .subscribe((resp: any) => {
          if (resp['user']) {
            resolve({ ok: true, user: resp['user'] });
          } else {
            resolve(false);
          }
        });
    });
  }

  async validateToken(): Promise<boolean> {
    await this.getToken();
    
    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {
      let headers = new HttpHeaders({
        authorization: this.token,
      });
      this.http
        .get(`${this.uri}/getUserByToken`, { headers })
        .pipe(map(this.extractData))
        .subscribe((resp: any) => {
          console.log(resp);
          if (resp['ok']) {
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        }, (err) => console.log(err));
    });
  }
}
