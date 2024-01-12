
import {Component, OnInit, ViewChild} from '@angular/core';
import {initializeApp} from '@firebase/app';
import {connectAuthEmulator, getAuth, signInWithPopup, signOut, GoogleAuthProvider} from '@firebase/auth';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import { ToastrService } from 'ngx-toastr';

import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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
  private createCheckin: boolean = false;
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
=======
  public loading = false;

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
    connectAuthEmulator(getAuth(), 'http://localhost:9099');
    connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
    this.mapService.createMap('map', options);
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.pinCheckIn();
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

  public pinCheckIn() {
    const user = getAuth().currentUser;


    // let friends = this.service.getFriendsCheckIns();

    this.service.getFriends().subscribe((friends) => {
      let listFriendsCheckIns: ListCheckinsDto = {
        userIds: [],
      }
      if (friends.data.length > 0) {
        friends.data.forEach((friend) => {
          listFriendsCheckIns.userIds.push(friend.uid);
        });
        this.service.getCheckIns(listFriendsCheckIns).subscribe((checkIns) => {
          Object.values(checkIns.data).forEach((checkIn: CheckInModel | null) => {
              if (checkIn != null) {
                if (checkIn.timestamp > (new Date().getTime() - 1000 * 60 * 60 * 2)) {
                  this.mapService.addMarker(checkIn.location.latitude, checkIn.location.longitude, checkIn.title, false);
                }
              }
            }
          );
        });
      }
    });


    this.service.getCheckIns({userIds: [user!.uid]}).subscribe((checkIns) => {
      console.log(checkIns);
      Object.values(checkIns.data).forEach((checkIn: CheckInModel | null) => {
          if (checkIn != null) {
            console.log(checkIn.location.latitude);
            console.log(checkIn.location.longitude);
            console.log(checkIn.title);

            if (checkIn.timestamp > (new Date().getTime() - 1000 * 60 * 60 * 2)) {
              this.mapService.addMarker(checkIn.location.latitude, checkIn.location.longitude, checkIn.title, true);
            }
          }
        }
      );
    });
  }
}

