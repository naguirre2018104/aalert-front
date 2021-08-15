import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController) { }

  async presetToast(color, position, message, duration){
    let toast = await this.toastCtrl.create({
      color,
      position,
      message,
      duration,
      animated: true
    });
    
    toast.present();
  }

  async confirmAlert(header, subHeader, message){
    let alert = await this.alertCtrl.create({
      header,
      subHeader,
      message,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary'
      }, 
      {
        text: 'Confirmar',
        role: 'confirm',
        cssClass: 'primary'
      }]
    });

    await alert.present();
    let { role } = await alert.onDidDismiss();
  }
}
