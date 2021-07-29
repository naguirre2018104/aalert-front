import { Injectable } from '@angular/core';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ToastController } from '@ionic/angular';
import { Capacitor } from "@capacitor/core";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  constructor(private location: LocationAccuracy, private toastCtrl: ToastController, private androidPermission: AndroidPermissions) { }

  async checkGPSPermission() {
    return await new Promise<boolean>((resolve, reject) => {
      if(Capacitor.isNativePlatform){
        this.androidPermission.checkPermission(this.androidPermission.PERMISSION.ACCESS_COARSE_LOCATION)
        .then( result => {
          if(result.hasPermission){
            resolve(true);
          }else {
            resolve(false);
          }
        }, err => resolve(false));
      }else {
        resolve(false);
      }
    });
  }

  async askToTurnOnGPS(): Promise<boolean> {
    return await new Promise((resolve, reject) => {
        this.location.canRequest().then((canRequest: boolean) => {
            if (canRequest) {
                // the accuracy option will be ignored by iOS
                this.location.request(this.location.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                    () => {
                        resolve(true);
                    },
                    error => { resolve(false); }
                );
            }
            else { resolve(false); }
        });
    })
}

  async requestGPSPermission(){
    return await new Promise<boolean>((resolve, reject) => {
      this.location.canRequest()
      .then((canRequest: boolean) => {
        if(canRequest){
          resolve(true);
        }else {
          // Show 'GPS Permission Request' dialogue
          this.androidPermission.checkPermission(this.androidPermission.PERMISSION.ACCESS_COARSE_LOCATION)
          .then( result => {
            console.log(JSON.stringify(result));
            if(!result.hasPermission){
              // call method to turn on GPS
              this.androidPermission.requestPermission(this.androidPermission.PERMISSION.ACCESS_COARSE_LOCATION);
              resolve(true);
            }
          }, err => {
            // Show alert if user click on 'No Thanks'
            this.androidPermission.requestPermission(this.androidPermission.PERMISSION.ACCESS_COARSE_LOCATION);
            resolve(false);
          })
          .catch( err => {
            resolve(false);
          })
        }
      })
    });
  }

}
