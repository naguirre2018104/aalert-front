import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewChild, ElementRef } from "@angular/core";

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

  constructor(private modalCtrl: ModalController) { }

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

  getCurrentPosition(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        let {latitude: lat, longitude: lng} = position.coords ;

          console.log(lat, lng);

        let pos = {lat, lng};

        this.currentMarker.setPosition(pos);
        this.currentMarker.setMap(this.map);
        console.log(this.currentMarker.position);
        this.map.setCenter(pos);

      }, () => {
        this.handleLocationError(true, this.infoWindow, this.map.getCenter()!);
      })
    }else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, this.infoWindow, this.map.getCenter()!);
    }
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

}
