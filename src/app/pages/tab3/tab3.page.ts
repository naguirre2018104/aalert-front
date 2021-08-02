import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { UserLogged } from '../../interfaces/user';
import { ToastController, NavController, ModalController } from '@ionic/angular';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { MyAlertsComponent } from '../../components/my-alerts/my-alerts.component';
import { RestAlertService } from '../../services/rest-alert/rest-alert.service';
import { AboutComponent } from '../../components/about/about.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public isReadOnly: boolean = true;
  public isButtonVisible: boolean = false;
  userLogged: UserLogged;

  constructor(private router: Router, private storage: Storage,
              private restUser: RestUserService,  private toastController: ToastController,
              private modalCtrl: ModalController, private restAlert: RestAlertService) {
    this.userLogged = {
      _id: '',
      name: '',
      lastname: '',
      username: '',
      password: '',
      phone: null,
    }
  }

  async ngOnInit() {
    this.isReadOnly = true;
    let user = await this.storage.get('userLogged');
    delete user.role;
    this.userLogged = user;
  }


  async logOut(){
    await this.storage.clear();
    this.router.navigateByUrl("login");
  }

  changeButton(){
    return this.isReadOnly = !this.isReadOnly;
  }

  async update(){
    delete this.userLogged.password;
    console.log(this.userLogged);

    let value = await this.restUser.modifyUser(this.userLogged, this.userLogged._id);

    if(value){
      this.presentToast("Datos actualizados correctamente", "success")
      .then(() => {
        return this.isReadOnly = !this.isReadOnly;
      })
    }else{
      this.presentToast("Ocurrio un error.", "danger");
    }
  }

  showMyAlerts(){
    console.log('object');
    this.loadMyAlertsComponent();
  }

  async loadMyAlertsComponent(){
    let areThereAlerts:any = await this.restAlert.getUserAlerts();

    if(areThereAlerts.ok){
      const modal = await this.modalCtrl.create({
        component: MyAlertsComponent,
        componentProps: {
          alerts: areThereAlerts.alerts
        }
      });
  
      await modal.present();
    }
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 2000,
      color,
    });
    toast.present();
  }

  async AboutModal() {

    const modal = await this.modalCtrl.create({
      component: AboutComponent
    });
    return await modal.present();

  }


}
