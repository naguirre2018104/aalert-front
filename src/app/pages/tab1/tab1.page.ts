import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ModalController } from '@ionic/angular';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { MyAlertsComponent } from 'src/app/components/my-alerts/my-alerts.component';
import { Alert } from 'src/app/interfaces/alert';
import { RestAlertService } from '../../services/rest-alert/rest-alert.service';
import { Storage } from '@ionic/storage';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { User } from 'src/app/interfaces/user';
import { UiService } from '../../services/ui/ui.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  alerts: Array<Alert> = [];
  alert: Alert;
  user: User = {};

  @ViewChild(IonList) ionList: IonList;

  constructor(private restAlert: RestAlertService, private modalCtrl: ModalController, private storage: Storage, 
    private restUser: RestUserService, private uiService: UiService) {
    this.alert = {
      _id : "",
      date : null,
      status : null,
      name : "",
      lastname : "",
      age : null,
      place : {},
      lastdate : null,
      sex : "",
      image : "",
      user : "",
      department : "",
      description : {
        tez : "",
        complexion : "",
        hair : "",
        special_signs : ""
      },
      showAlert: true,
    }
  }

  async ngOnInit(){
    let alerts = await <any>this.restAlert.getAlerts();
    this.user = await this.restUser.getUserStorage();

    if(alerts.ok){
      this.alerts =  alerts.alerts;
    }

    this.restAlert.newAlert
    .subscribe( (resp: any) => {
      this.alerts.push(resp);
    })
  }

  doRefresh(event){
    setTimeout(()=>{
      this.ngOnInit();
      event.target.complete();
    },1500)
  }

  setAlertInfo(alert){
    this.alert = alert;
    this.loadAlertComponent();
  }

  async loadAlertComponent(){
    const modal = await this.modalCtrl.create({
      component: AlertComponent,
      componentProps: {
        alert: this.alert
      }
    });

    modal.present();
  }

  showMyAlerts(){
    this.loadMyAlertsComponent();
  }

  async loadMyAlertsComponent(){
    const modal = await this.modalCtrl.create({
      component: MyAlertsComponent,
      componentProps: {
      }
    });

    await modal.present();
  }

  async deleteAlert(alert, i){
    let alertDeleted = await this.restAlert.deleteAlert(alert._id);

    if(alertDeleted){
      this.ionList.closeSlidingItems();
      document.getElementById(`iitem-${i}`).remove();
      this.uiService.presetToast("success", "top", "Alerta eliminada", 3000);
    }else {
      this.uiService.presetToast("warning", "top", "Alerta No eliminada", 3000);
    }
  }

  async hideAlert(alert, i){

    this.alerts[i].showAlert = (this.alerts[i].showAlert)? false: true;

    let canShow = await this.restAlert.updateCanShowAlert(this.alerts[i], alert._id);

    console.log(canShow);

    if(canShow){
      if(this.alerts[i].showAlert){
        document.getElementById(`iitem-${i}`).classList.remove("hideAlerts");
      }else{
        document.getElementById(`iitem-${i}`).classList.add("hideAlerts");
      }
    }

    this.ionList.closeSlidingItems();
  }

}
