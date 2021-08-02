import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  mensajes: OSNotificationPayload[] = [];

  constructor(private oneSignal: OneSignal, private storage: Storage, private http: HttpClient) {
    this.storage.create(); 
    this.cargarMensajes();
  }

  pushListener = new EventEmitter<OSNotificationPayload>();

  configuracionInicial(){
    this.oneSignal.startInit('132f34b9-159e-4aff-b574-8b4fefbefa46', '1063467774185');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      console.log("Noficación recibida", noti);
      this.notificacionRecibida(noti);
    });

    this.oneSignal.handleNotificationOpened().subscribe(async(noti) => {
      console.log("Notificación abierta", noti);
      await this.notificacionRecibida(noti.notification);
    });

    this.oneSignal.endInit();
  }

  private extractData(res: Response) {
    let body = res;
    return body || [] || {} || '';
  }

  async notificacionRecibida(noti: OSNotification){
    await this.cargarMensajes();
    const payload = noti.payload;
    const extistePush = this.mensajes.find(mensaje => mensaje.notificationID === payload.notificationID);

    if(extistePush){
      return;
    }

    this.mensajes.unshift( payload );
    this.pushListener.emit(payload);

    await this.guardarMensajes();
  }

  guardarMensajes(){
    this.storage.set("mensajes", this.mensajes);
  }

  async cargarMensajes(){
    this.mensajes = await this.storage.get("mensajes") || [];
    return this.mensajes;
  }

  async getMensajes(){
    await this.cargarMensajes();
    return [...this.mensajes];
  }

  sendNotification(notification){
    console.log(notification);
    let params = JSON.stringify(notification);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Basic YzY1MDAxOTgtNWU5YS00OWFmLWFlODItNzc4MGMzZjhhZGI1"
    });
    console.log(params);
    
    return this.http.post<any>("https://onesignal.com/api/v1/notifications",params,{headers}).pipe(map(this.extractData));
  }
}
