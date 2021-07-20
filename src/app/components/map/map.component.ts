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
  
  // @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  @ViewChild('map', {static: true}) mapRef: ElementRef;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.gretting);

    this.showMap();
  }

  showMap(){
    const location = new google.maps.LatLng(-17, 31);
    const options = {
      center: location,
      zoom: 15,
      disableDefailtUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

  goBack(){
    this.modalCtrl.dismiss()
  }

}
