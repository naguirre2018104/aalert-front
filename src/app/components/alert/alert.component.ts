import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
/* import { CallNumber } from '@ionic-native/call-number/ngx'; */

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  @Input() alert;
  telefono = '';

  constructor(private modalCtrl: ModalController, private restUser: RestUserService, private toastController: ToastController,
    /* private callNumber: CallNumber */) { }

  ngOnInit() {
  }

  goBack(){
    this.modalCtrl.dismiss();
  }

  // report(){
  //   this.restUser.getUser().subscribe((resp:any)=>{
  //     if(resp.user){
  //       this.telefono = resp.user.phone;
  //       this.presentToast("Puede reportar su vista al número en pantalla", "success");
  //     }else{
  //       this.presentToast("Error al redirigir a la llamada", "danger");
  //     }
  //   })
  // }
  async report(){
    let valueAlert = await <any>this.restUser.getUser();

    if(valueAlert.ok){
      this.telefono = valueAlert.user.phone;
      this.presentToast("Puede reportar su vista el numero en pantalla", "success");
    }else {
      this.presentToast("Error al redirigir a la llamada", "danger");
    }
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }

}
