import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { CONNECTION } from '../global';
import { CreateAlert } from '../../interfaces/alert';
import { map } from 'rxjs/operators';
import { RestUserService } from '../restUser/rest-user.service';

@Injectable({
  providedIn: 'root',
})
export class RestAlertService {
  public uri;

  public token = null;

  public httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  private extractData(res: Response) {
    let body = res;
    return body || [] || {} || '';
  }

  async getToken() {
    let token = await this.storage.get('token');
    this.token = token != undefined || token != null ? token : null;

    return token;
  }

  constructor(private http: HttpClient, private storage: Storage, private userService: RestUserService) {
    this.uri = CONNECTION.uri;
    this.storage.create();
  }

  createAlert(alert: CreateAlert, departmentId: string) {
    let params = JSON.stringify(alert);

    let headers = new HttpHeaders({
      'content-type': 'application/json',
      "authorization": this.token
    });

    return new Promise(resolve => {

      this.http
      .post<any>(`${this.uri}/createAlert/${departmentId}`, params, { headers })
      .pipe(map(this.extractData))
      .subscribe((resp: any) => {
        console.log(resp);
        if(resp['ok']){
          resolve(true);
        }else{
          resolve(false);
        }
      });

    })

  }

  async getAlerts(){
    await this.getToken();
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      "authorization": this.token
    });

    console.log(this.token);

    return new Promise(resolve => {
      this.http.get<any>(`${this.uri}/getAlerts`, {headers})
      .pipe(map(this.extractData))
      .subscribe((resp:any) => {
        console.log(resp);
        if(resp.alerts){
          resolve({ok: true, resp});
        }else{
          resolve(false);
        }
      })
    })
  }

  getUserAlerts(){
    
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      "authorization": this.token
    });

    return this.http.get<any>(`${this.uri}/getUserAlerts`, {headers}).pipe(map(this.extractData));
  }

}
