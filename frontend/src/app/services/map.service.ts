import {Injectable, ViewChild} from "@angular/core";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";

import {ToastrService} from "ngx-toastr";
import {UsersService} from "./users.service";
import {initializeApp} from "@firebase/app";
import {environment} from "../../environments/environment.prod";
import {connectAuthEmulator, getAuth} from "@firebase/auth";
import {connectFirestoreEmulator, getFirestore} from "@firebase/firestore";
import {ListCheckinsDto} from "../models/listCheckinsDto";
@Injectable({
  providedIn: 'root'
})

export class MapService{
  private _map!: google.maps.Map;
  private _markers: google.maps.Marker[] = [];
  @ViewChild(MapInfoWindow, { static: false }) private _infoWindow: MapInfoWindow | undefined;

  createMap(elementId: string, options: google.maps.MapOptions) {
    this._map = new google.maps.Map(document.getElementById(elementId)!, options);
    navigator.geolocation.getCurrentPosition(resp => {
      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      const point = new google.maps.LatLng(latitude, longitude);
      this._map.setCenter(point);
    });
  }

  addMarker(lat: number | null, lng: number| null, title: string| null, isCurrentUser: boolean) {
    if(lat != null && lng != null && title != null) {
      const infoWindow = new google.maps.InfoWindow({
        content: title
      });
      const position = new google.maps.LatLng(lat, lng);
      let marker = new google.maps.Marker({
        position,
        map: this._map,
        title
      });
      marker.addListener('click', () => {
        infoWindow.open(this._map, marker);
      });
      if(isCurrentUser){
        marker.setAnimation(google.maps.Animation.BOUNCE);
        marker.setIcon({
          url: "http://maps.google.com/mapfiles/kml/pushpin/pink-pushpin.png",
          scaledSize: new google.maps.Size(50, 50)
        })
      }
      else {
        marker.setIcon({
          url: "http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png",
          scaledSize: new google.maps.Size(50, 50)
        })
      }
      this._markers.push(marker);
    }
  }

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  public openInfoWindow(marker: MapMarker) {
    if(this._infoWindow){
      this._infoWindow.open(marker);
    }
  }

  public deleteMarker() {
    const markerIndex = this._markers.findIndex(m => m.getAnimation() === google.maps.Animation.BOUNCE);
    if(markerIndex != -1) {
      this._markers[markerIndex].setMap(null);
      this._markers.splice(markerIndex, 1);
    }
  }

  public deleteAllMarkers() {
    this._markers.forEach(m => m.setMap(null));
    this._markers = [];
  }

}
