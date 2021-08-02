import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { MapComponent } from "./map/map.component";
import { AlertComponent } from './alert/alert.component';
import { MyAlertsComponent } from './my-alerts/my-alerts.component';
import { PhotoMissingPersonComponent } from './photo-missing-person/photo-missing-person.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    MapComponent,
    AlertComponent,
    MyAlertsComponent,
    PhotoMissingPersonComponent,
    AboutComponent,
  ],
  exports:[
    MapComponent,
    AlertComponent,
    MyAlertsComponent,
    PhotoMissingPersonComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
