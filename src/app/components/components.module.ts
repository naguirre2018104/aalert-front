import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { MapComponent } from "./map/map.component";
import { AlertComponent } from './alert/alert.component';
import { MyAlertsComponent } from './my-alerts/my-alerts.component';
import { PhotoMissingPersonComponent } from './photo-missing-person/photo-missing-person.component';

@NgModule({
  declarations: [
    MapComponent,
    AlertComponent,
    MyAlertsComponent,
    PhotoMissingPersonComponent
  ],
  exports:[
    MapComponent,
    AlertComponent,
    MyAlertsComponent,
    PhotoMissingPersonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
