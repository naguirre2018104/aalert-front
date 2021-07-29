import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ViewChild, ElementRef } from "@angular/core";
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

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

  // @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  @ViewChild('map', {static: true}) mapRef: ElementRef;

  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, private geolocation: Geolocation) { }

  ngOnInit() {
    this.showMap();
  }

  showMap(){
    const myLatLng = { lat: 14.6262174, lng: -90.5275799 };
    const options = {
      center: myLatLng,
      zoom: 15,
      disableDefaultUI: true,
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.infoWindow = new google.maps.InfoWindow();

    this.currentMarker = new google.maps.Marker({
      position: myLatLng,
      title: "Hello World!"
    });
    this.currentMarker.setMap(this.map)

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
      this.presentToastMessage("Error con la geolocalizacion", 5000, "danger");
    })
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

  async presentToastMessage(message: string, duration: number, color: string){
    let toast = await this.toastCtrl.create({
      message,
      duration,
      color,
      animated: true,
      position: "top"
    });
    toast.present();
  }

}
