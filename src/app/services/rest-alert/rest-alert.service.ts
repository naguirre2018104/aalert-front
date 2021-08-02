import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { CONNECTION } from '../global';
import { Alert, CreateAlert } from '../../interfaces/alert';
import { map } from 'rxjs/operators';
import { RestUserService } from '../restUser/rest-user.service';
import { UiService } from '../ui/ui.service';

@Injectable({
  providedIn: 'root',
})
export class RestAlertService {
  public uri;

  public token = null;

  newAlert = new EventEmitter<Alert>();

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
    this.token = (await this.storage.get('token')) || null;
  }

  constructor(private http: HttpClient, private storage: Storage, private uiService: UiService) {
    this.uri = CONNECTION.uri;
    this.storage.create();
  }

  async createAlert(alert: CreateAlert) {
    await this.getToken();
    let params = JSON.stringify(alert);

    let headers = new HttpHeaders({
      'content-type': 'application/json',
      "authorization": this.token
    });

    return new Promise(resolve => {

      this.http
      .post<any>(`${this.uri}/createAlert`, params, { headers })
      .pipe(map(this.extractData))
      .subscribe((resp: any) => {
        console.log(resp);
        if(resp['ok']){
          this.newAlert.emit(resp['alertSaved']);
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

    return new Promise(resolve => {
      this.http.get<any>(`${this.uri}/getAlerts`, {headers})
      .pipe(map(this.extractData))
      .subscribe((resp:any) => {
        console.log(resp);
        if(resp.alerts){
          resolve({ok: true, alerts: resp.alerts});
        }else{
          resolve(false);
        }
      })
    })
  }

  async getUserAlerts(){
    await this.getToken();
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      "authorization": this.token
    });

    return await new Promise((resolve, reject) => {
      this.http.get<any>(`${this.uri}/getUserAlerts`, {headers})
      .pipe(map(this.extractData))
      .subscribe( (resp:any) => {
        if(resp.alerts){
          resolve({ok: true, alerts: resp.alerts});
        }else {
          resolve({ok: false});
        }
      })
    })

    
  }

  async deleteAlert(id: string): Promise<boolean>{
    await this.getToken();
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      "authorization": this.token
    });

    return await new Promise<boolean>( resolve => {
      this.http.delete(`${this.uri}/deleteAlert/${id}`, {headers})
      .pipe(map(this.extractData))
      .subscribe((resp: any) => {
        if(resp.alertRemoved){
          resolve(true);
        }else {
          resolve(false);
        }
      }, err => {
        this.uiService.presetToast("danger", "top", err.error.message, 3000);
      })
    });
  }

  async updateCanShowAlert(alert: Alert, id: string): Promise<boolean>{
    let params = JSON.stringify(alert)

    await this.getToken();
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      "authorization": this.token
    });

    return await new Promise<boolean>( resolve => {
      this.http.put(`${this.uri}/updateCanShowAlert/${id}`, params, {headers})
      .pipe(map(this.extractData))
      .subscribe( (resp: any) => {
        console.log(resp);
        if(resp.ok && resp.updated){
          resolve(true);
        }else{
          resolve(false);
        }
      }, err => {
        this.uiService.presetToast("danger", "top", err.error.message, 3000);
      })
    })
  }
}
