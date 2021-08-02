import { Component, OnInit } from '@angular/core';
import { CreateAlert, Notification } from '../../interfaces/alert';
import { NgForm } from '@angular/forms';
import { RestAlertService } from '../../services/rest-alert/rest-alert.service';
import { ModalController, ToastController, NavController } from '@ionic/angular';
import { MapComponent } from "./../../components/map/map.component";
import { Storage } from '@ionic/storage';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { PushNotificationsService } from 'src/app/services/pushNotifications/push-notifications.service';
import { FireStorageService } from 'src/app/services/fireStorage/fire-storage.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var window;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  createAlert: CreateAlert = {};
  notification: Notification;

  imagaAlert = '';

  constructor(private restAlert: RestAlertService, private toastController: ToastController, private modalCtrl: ModalController,  private picker: ImagePicker, 
    private notificationPush: PushNotificationsService, private navCtrl: NavController, private fireStorageService: FireStorageService,
    private domSinitizer: DomSanitizer) {
    this.createAlert = {
      _id: '',
      date: null,
      status: true,
      name: '',
      lastname: '',
      age: null,
      place: null,
      lastdate: null,
      sex: '',
      image: '',
      user: '',
      description: {
        tez: '',
        complexion: '',
        hair: '',
        special_signs: '',
      },
      showAlert: true,
    };
    this.notification = {
      app_id: "132f34b9-159e-4aff-b574-8b4fefbefa46",
      included_segments: ["Active Users", "Inactive Users"],
      contents: {
        en: "",
        es: ""
      },
      headings: {
        en: "Have you seen this person?",
        es: "¿Has visto a esta persona?"
      }
    }
  }

  async ngOnInit() {
    // await this.picker.hasReadPermission().then((val) => {
    //   if(!val){
    //     this.picker.requestReadPermission();
    //   }
    // }, (err) => {
    //   console.log(JSON.stringify(err));
    //   this.picker.requestReadPermission();
    // });
  }

  async onSubmit(createAlertForm: NgForm) {
    console.log(this.createAlert);
    let resp: any = await this.restAlert.createAlert(this.createAlert);
    console.log(resp);
    if(resp){
      let name = this.createAlert.name + ' ' + this.createAlert.lastname;
      this.notification.contents.en = name;
      this.notification.contents.es = name;
      this.notificationPush.sendNotification(this.notification).subscribe((resp)=>{
        console.log(resp);
      });

      console.log(this.notification);

      createAlertForm.reset();
      await this.presentToast("Alerta creada correctamente", "success");
      this.navCtrl.navigateRoot('/main/tabs/tab1');
    }

  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
      buttons: [
        {
          icon: 'checkmark',
          side: 'end',
          handler: () => {
            toast.dismiss();
          }
        }
      ]
    });
    toast.present();
  }

  async loadMap(){
    let defaultCoords = { lat: 14.6262174, lng: -90.5275799 };
    console.log(this.createAlert.place);
    let coords = (this.createAlert.place !== null)? this.createAlert.place : defaultCoords;
    const modal = await this.modalCtrl.create({
      component: MapComponent,
      componentProps: {
        coords,
        editable: true
      }
    });

    modal.present();

    let data = (await modal.onDidDismiss()).data;
    this.createAlert.place = data;
  }

  files(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.imagaAlert = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async uploadPhoto(photo: any){
    const path = "Alertas";
    const name = this.createAlert.name + this.createAlert.lastname +  this.createAlert.sex;

    const file = photo.target.files[0];
    const res = await this.fireStorageService.uploadImage(file, path, name);
    this.createAlert.image = res;
  }
}
