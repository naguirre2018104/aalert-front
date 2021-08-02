import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestAlertService } from 'src/app/services/rest-alert/rest-alert.service';
import { Alert } from '../../interfaces/alert';
@Component({
  selector: 'app-my-alerts',
  templateUrl: './my-alerts.component.html',
  styleUrls: ['./my-alerts.component.scss'],
})
export class MyAlertsComponent implements OnInit {

  @Input() alerts: Array<Alert>;


  constructor(private modalCtrl: ModalController, private restAlert: RestAlertService) {
    this.alerts = []
  }

  ngOnInit() {
    console.log(this.alerts);
  }

  goBack(){
    this.modalCtrl.dismiss()
  }

}
