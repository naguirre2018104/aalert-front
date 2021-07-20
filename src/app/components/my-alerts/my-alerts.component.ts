import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Alert } from 'src/app/interfaces/alert';
import { RestAlertService } from 'src/app/services/rest-alert/rest-alert.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-my-alerts',
  templateUrl: './my-alerts.component.html',
  styleUrls: ['./my-alerts.component.scss'],
})
export class MyAlertsComponent implements OnInit {
  
  alert: Alert;
  alerts: [] = [];

  constructor(private modalCtrl: ModalController, private restAlert: RestAlertService) { 
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

  ngOnInit() {
    this.restAlert.getUserAlerts().subscribe((resp:any)=>{
      this.alerts = resp.alerts;
    })
  }

  goBack(){
    this.modalCtrl.dismiss()
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

}
