import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform, ToastController, AlertController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { UiService } from 'src/app/services/ui/ui.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() gretting;

  map: any;
  infoWindow: any;
  currentMarker: any;
  plaftform: Platform;
  placePersonMissed = null;
  placeName = null;

  @Input() coords;
  @Input() editable;

  @ViewChild('map', { static: true }) mapRef: ElementRef;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    private uiService: UiService
  ) {}

  async ngOnInit() {
    await this.showMap();
    await this.currentMarker.addListener('dragend', () => {
      let lng = this.currentMarker.getPosition().lng();
      let lat = this.currentMarker.getPosition().lat();
      this.placePersonMissed = { lng, lat };
    });
  }

  async showMap() {
    let center = (this.placePersonMissed != null) ? this.placePersonMissed : this.coords;
    this.placePersonMissed = center;

    console.log(this.coords);

    const options = {
      center,
      zoom: 15,
      disableDefaultUI: true,
    };

    this.map = await new google.maps.Map(this.mapRef.nativeElement, options);
    this.infoWindow = await new google.maps.InfoWindow();

    this.currentMarker = await new google.maps.Marker({
      position: center,
      title: 'Lugar de desaparición',
    });
    await this.currentMarker.setMap(this.map);
    if (this.editable) {
      this.getUserPosition();
      this.currentMarker.setDraggable(true);
    }
  }

  async getUserPosition() {
    await this.geolocation
      .getCurrentPosition()
      .then((position: Geoposition) => {
        let { latitude: lat, longitude: lng } = position.coords;
        let pos = { lat, lng };
        this.currentMarker.setPosition(pos);
        this.placePersonMissed = pos;
        this.currentMarker.setMap(this.map);
        this.map.setCenter(pos);
      })
      .catch((err) => {
        this.uiService.presetToast(
          'Error con la geolocalizacion',
          5000,
          'danger',
          'bottom'
        );
      });

    this.uiService.presetToast('Arrastra el marcador', 5000, 'warning', 'bottom');
  }


  goBack() {
    this.modalCtrl.dismiss({
      location: this.placePersonMissed,
      formatted_address: this.placeName
    });
  }

  setPlace() {
    const geocoder = new google.maps.Geocoder();
    let location = this.placePersonMissed;

    geocoder.geocode({location})
    .then( (response) => {
      console.log(response);
      if(response.results[0]){
        let address = response.results[0].formatted_address;
        this.confirmAddress('CONFIRMAR', '¿Estás seguro de está dirección?', address, address );
      }else {
        this.uiService.presetToast('warning', 'bottom', 'No se encontró un dirección', 5000);
      }
    });

    
  }

  async confirmAddress(header, subHeader, message, dataResult){
    let alert = await this.alertCtrl.create({
      header,
      subHeader,
      message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger'
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          cssClass: 'success',
          handler: () => {
            this.placeName = dataResult || "Sin dirreción";
            this.modalCtrl.dismiss({
              location: this.placePersonMissed,
              formatted_address: this.placeName
            });
            return true;
          }
        }
      ]
    });

    await alert.present();
  }
}
