import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { MyAlertsComponent } from 'src/app/components/my-alerts/my-alerts.component';
import { Alert } from 'src/app/interfaces/alert';
import { RestAlertService } from '../../services/rest-alert/rest-alert.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  alerts: Array<Alert> = [];
  alert: Alert;

  constructor(private restAlert: RestAlertService, private modalCtrl: ModalController, private storage: Storage) {
    this.alert = {
      _id : "",
      date : null,
      status : null,
      name : "",
      lastname : "",
      age : null,
      place : "",
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
      }
    }
  }

  ngOnInit(){
    this.restAlert.getAlerts().subscribe((resp:any) => {
      this.alerts = resp.alerts;
      this.storage.set('alerts',JSON.stringify(this.alerts));
    });
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

    modal.present();
  }

}
