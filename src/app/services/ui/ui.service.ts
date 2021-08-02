import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private toastCtrl: ToastController) { }

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
}
