import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage-angular';

import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { CallNumber } from "@ionic-native/call-number/ngx";
import { Contact } from "@ionic-native/contacts/ngx";
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, CommonModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(), AngularFireStorageModule,AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ImagePicker, AndroidPermissions , Geolocation, LocationAccuracy, OneSignal, Contact, CallNumber, {provide: BUCKET, useValue: "aalert-bf380.appspot.com"}, AngularFireStorageModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
