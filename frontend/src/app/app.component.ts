import {Component, OnInit, ViewChild} from '@angular/core';
import {initializeApp} from '@firebase/app';
import {connectAuthEmulator, getAuth, signInWithPopup, signOut, GoogleAuthProvider} from '@firebase/auth';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  private profileDisplayed: boolean = false;
  private displayMap: boolean = false;

  loading = false;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | undefined;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow | undefined;

  mapZoom = 12;
  googlePoint: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };
  mapCenter: google.maps.LatLng = new google.maps.LatLng(this.googlePoint);
  mapOptions: google.maps.MapOptions = {
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

  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  openInfoWindow(marker: MapMarker) {
    if(this.infoWindow){
      this.infoWindow.open(marker);
    }
  }

  getCurrentLocation() {
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

  private firebaseConfig = {
    apiKey: 'AIzaSyAfran-zw_FBEPVZ0SksAYjl5Frm--k4IU',
    authDomain: 'coffee-in-b7cda.firebaseapp.com',
    projectId: 'coffee-in-b7cda',
    storageBucket: 'coffee-in-b7cda.appspot.com',
    messagingSenderId: '556504257342',
    appId: '1:556504257342:web:ea6e2f7fd0743a8ae9d26f'
  };

  ngOnInit(): void {
    initializeApp(this.firebaseConfig);
    connectAuthEmulator(getAuth(), 'http://localhost:9099');
    this.getCurrentLocation();
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

  public get getInitials(): string {
    if (this.isSignedIn) {
      const user = getAuth().currentUser;
      const displayName = user?.displayName;
      let initials: string = "/";
      if (displayName != null) {
        initials = displayName.replace(/[^A-Z]+/g, "");
      }
      return initials;
    }
    else {
      return "/";
    }
  }

  public get getDisplayName() : string {
    if (this.isSignedIn) {
      const user = getAuth().currentUser;
      let displayName: string | null | undefined = "";
      displayName = user?.displayName;
      if (displayName == null){
        displayName = "";
      }
      return displayName;
    }
    return "";
  }

  public get getEmail() : string {
    if (this.isSignedIn) {
      const user = getAuth().currentUser;
      let email: string | null | undefined = "";
      email = user?.email;
      if (email == null){
        email = "";
      }
      return email;
    }
    return "";
  }

  public get isProfileDisplayed(): boolean {
    return this.profileDisplayed;
  }

  public setProfileDisplayed(): void {
    this.profileDisplayed = !this.profileDisplayed;
  }

  public setDisplayMap(): void {
    console.log(this.displayMap);
    this.displayMap = !this.displayMap;
  }

  public get isDisplayMap(): boolean {
    return this.displayMap;
  }

}
