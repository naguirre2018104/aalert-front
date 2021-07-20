import { Component, OnInit } from '@angular/core';
import { CreateAlert } from '../../interfaces/alert';
import { NgForm } from '@angular/forms';
import { RestAlertService } from '../../services/rest-alert/rest-alert.service';
import { ModalController, ToastController } from '@ionic/angular';
import { MapComponent } from "./../../components/map/map.component";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  createAlert: CreateAlert = {};

  constructor(private restAlert: RestAlertService, private toastController: ToastController, private modalCtrl: ModalController) {
  this.createAlert = {
    _id: '',
    date: null,
    status: true,
    name: '',
    lastname: '',
    age: null,
    place: '',
    lastdate: null,
    sex: '',
    image: '',
    user: '',
    department: '',
    description: {
      tez: '',
      complexion: '',
      hair: '',
      special_signs: '',
    },
  };
  //this.createAlert = {
    //   _id: '',
    //   date: null,
    //   status: true,
    //   name: 'Marcos',
    //   lastname: 'Bonifasi',
    //   age: 18,
    //   place: 'zona 18',
    //   lastdate: new Date('2021-06-27T19:23:35.039-06:00'),
    //   sex: 'M',
    //   image: '',
    //   user: '',
    //   department: '60d919dd73a281695bc8569d',
    //   description: {
    //     tez: 'moreno',
    //     complexion: 'gordito',
    //     hair: 'negro',
    //     special_signs: 'ninguno',
    //   },
    // };
  }

  ngOnInit() {}

  async onSubmit(createAlertForm: NgForm) {
    console.log(this.createAlert);
    let resp = await this.restAlert.createAlert(this.createAlert, this.createAlert.department);

    if(resp){
      this.presentToast("Alerta creada correctamente", "success");
      this.restAlert.getAlerts().subscribe((resp:any)=>{
        if(resp.alerts){
          localStorage.setItem('alerts',JSON.stringify(resp.alerts));
        }else{
          this.presentToast("Error al refrescar los datos", "danger");
        }
      })
    }else {
      this.presentToast("Error.", "danger")
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

  async loadMap(){
    const modal = await this.modalCtrl.create({
      component: MapComponent,
      componentProps: {
        gretting: "Hello"
      }
    });

    modal.present();
  }
}
