import {Component, isDevMode, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {initializeApp} from '@firebase/app';
import {connectAuthEmulator, getAuth, signInWithPopup, signOut, GoogleAuthProvider} from '@firebase/auth';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {ToastrService} from 'ngx-toastr';
import {connectFirestoreEmulator, getFirestore} from '@firebase/firestore';
import {UsersService} from './services/users.service';
import {environment} from "../environments/environment.prod";
import {MapService} from './services/map.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ListCheckinsDto} from "./models/listCheckinsDto";
import {CheckInModel} from "./models/checkIn";
import {ResultListCheckinsDto} from "./models/resultListCheckinsDto";
import {map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private displayMap: boolean = false;
  private createCheckin: boolean = false;

  public loading = false;

  canInviteFriends: boolean = false;

  constructor(private toastr: ToastrService, private service: UsersService, public mapService: MapService) {
  }

  ngOnInit(): void {
    const options: google.maps.MapOptions = {
      center: {lat: 37.7749, lng: -122.4194},
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      maxZoom: 20,
      minZoom: 10,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      },
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b9d3c2"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
            }
          ]
        }
      ]
    };

    initializeApp(environment.firebaseConfig);
    if(isDevMode()) {
      connectAuthEmulator(getAuth(), 'http://localhost:9099');
      connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
    }
    this.mapService.createMap('map', options);
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.mapService.pinCheckIn();
      } else {
        this.mapService.deleteAllMarkers();
      }
    });
  }


  public get isSignedIn(): boolean {
    return getAuth().currentUser !== null;
  }

  public async signIn(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    await signInWithPopup(auth, provider);
  }

  public async signOut(): Promise<void> {
    const auth = getAuth();
    await signOut(auth);
  }


  public onCheckInStatusChange(isCheckedIn: boolean): void {
    this.canInviteFriends = isCheckedIn;
  }
}

