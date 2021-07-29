import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { ViewChild, ElementRef } from "@angular/core";
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationService } from '../../services/location/location.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

declare var google:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() gretting;

  map:any;
  infoWindow: any;
  currentMarker:any;
  plaftform: Platform;

  // @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  @ViewChild('map', {static: true}) mapRef: ElementRef;

  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, private geolocation: Geolocation,
    private locationService: LocationService, private permissions: AndroidPermissions) { }

  ngOnInit() {
    this.showMap();
  }

  async showMap(){
    const myLatLng = { lat: 14.6262174, lng: -90.5275799 };
    const options = {
      center: myLatLng,
      zoom: 15,
      disableDefaultUI: true,
    };

    this.map = await new google.maps.Map(this.mapRef.nativeElement, options);
    this.infoWindow = await new google.maps.InfoWindow();

    this.currentMarker = await new google.maps.Marker({
      position: myLatLng,
      title: "Hello World!"
    });
    await this.currentMarker.setMap(this.map);
    this.getCurrentPosition();
  }

  async getCurrentPosition(){

      await this.geolocation.getCurrentPosition()
      .then((position: Geoposition) => {
        let {latitude: lat, longitude: lng} = position.coords ;
        let pos = {lat, lng};
        this.currentMarker.setPosition(pos);
        this.currentMarker.setMap(this.map);
        this.map.setCenter(pos);
        console.log(position);
      })
      .catch( err => {
        console.log(err);
        this.presentToastMessage("Error con la geolocalizacion", 5000, "danger", "bottom");
      });

  }

  handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: any,
    pos: any
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: Faló servicio de geolocalización."
        : "Error: Tu navegador no soporta Geolocalización."
    );
    infoWindow.open(this.map);
  }

  goBack(){
    this.modalCtrl.dismiss()
  }

  async presentToastMessage(message: string, duration: number, color: string, position){
    let toast = await this.toastCtrl.create({
      message,
      duration,
      color,
      position,
      animated: true
    });
    toast.present();
  }

}
