import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { MapComponent } from "./map/map.component";
import { AlertComponent } from './alert/alert.component';
import { MyAlertsComponent } from './my-alerts/my-alerts.component';

@NgModule({
  declarations: [
    MapComponent,
    AlertComponent,
    MyAlertsComponent
  ],
  exports:[
    MapComponent,
    AlertComponent,
    MyAlertsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
