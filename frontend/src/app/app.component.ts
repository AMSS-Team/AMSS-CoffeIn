import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { connectAuthEmulator, getAuth, signInWithPopup, signOut, GoogleAuthProvider } from '@firebase/auth';
import { GoogleMap, MapInfoWindow, MapMarker } from "@angular/google-maps";
import { ToastrService } from 'ngx-toastr';
import { connectFirestoreEmulator, getFirestore } from '@firebase/firestore';
import { UsersService } from './services/users.service';
import {environment} from "../environments/environment.prod";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private displayMap: boolean = false;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | undefined;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow | undefined;
  public loading = false;
  public mapZoom = 12;
  public googlePoint: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };
  public mapCenter: google.maps.LatLng = new google.maps.LatLng(this.googlePoint);
  public mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 20,
    minZoom: 4,
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
  public markerInfoContent = '';
  public markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  constructor(private toastr: ToastrService, private service: UsersService) {}

  ngOnInit(): void {
    initializeApp(environment.firebaseConfig);
    connectAuthEmulator(getAuth(), 'http://localhost:9099');
    connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
    this.getCurrentLocation();
  }

  public openInfoWindow(marker: MapMarker) {
    if(this.infoWindow){
      this.infoWindow.open(marker);
    }
  }

  public getCurrentLocation() {
    this.loading = true;
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.loading = false;

        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.mapCenter = new google.maps.LatLng(point);
        this.map?.panTo(point);

        this.markerInfoContent = "Here!";

        this.markerOptions = {
          draggable: false,
          animation: google.maps.Animation.BOUNCE,
        };
      },
      (error) => {
        this.loading = false;

        if (error.PERMISSION_DENIED) {
          this.toastr.error("Couldn't get your location", 'Permission denied');
        } else if (error.POSITION_UNAVAILABLE) {
          this.toastr.error(
            "Couldn't get your location",
            'Position unavailable'
          );
        } else if (error.TIMEOUT) {
          this.toastr.error("Couldn't get your location", 'Timed out');
        } else {
          this.toastr.error(error.message, `Error: ${error.code}`);
        }
      },
      { enableHighAccuracy: true }
    );
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

  public setDisplayMap(): void {
    console.log(this.displayMap);
    this.displayMap = !this.displayMap;
  }

  public get isDisplayMap(): boolean {
    return this.displayMap;
  }
}
