import { Component } from '@angular/core';
import { PushNotificationsService } from './services/pushNotifications/push-notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private pushService: PushNotificationsService) {
    this.initializeApp();
  }

  initializeApp(){
    this.pushService.configuracionInicial();
  }
}
