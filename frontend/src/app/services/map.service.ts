import {Injectable, ViewChild} from "@angular/core";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";

import {ToastrService} from "ngx-toastr";
import {UsersService} from "./users.service";
import {initializeApp} from "@firebase/app";
import {environment} from "../../environments/environment.prod";
import {connectAuthEmulator, getAuth} from "@firebase/auth";
import {connectFirestoreEmulator, getFirestore} from "@firebase/firestore";
import {ListCheckinsDto} from "../models/listCheckinsDto";
import {user} from "@angular/fire/auth";
import * as Console from "console";
import {CheckInModel} from "../models/checkIn";
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



  addMarker(lat: number | null, lng: number| null, title: string| null, isCurrentUser: boolean, usernames: string[],  userIds: string[], authorId: string) {
    let infoContent = document.createElement('div');

    let button = document.createElement("button");
    button.innerHTML = "Join";
    button.className = "bg-emerald-500 hover:bg-emerald-700 text-black dark:text-white font-bold py-2 px-4 rounded-full"
    button.addEventListener("click", () => {
      this.joinCheckin(authorId);
      this.deleteAllMarkers();
      this.pinCheckIn();
    });

    let h1 = document.createElement("h1");
    h1.className = "text-indigo-500 font-semibold underline decoration-sky-500";
    h1.innerHTML = title!;
    infoContent.appendChild(h1);

    console.log(usernames);
    usernames.forEach((username) => {
      let p = document.createElement("p");
      p.className = "text-indigo-500 font-semibold";
      p.innerHTML = username!;
      infoContent.appendChild(p);
    });

    if (!isCurrentUser) {
      navigator.geolocation.getCurrentPosition(resp => {
        let latitude = resp.coords.latitude;
        let longitude = resp.coords.longitude;
        var toRad = function (deg: number) {
          return deg * Math.PI / 180;
        }

        var getDistance = function (latitude: any, longitude: any, lat: number, lng: number) {
          var R = 6371; // km
          var dLat = toRad(lat - latitude);
          var dLon = toRad(lng - longitude);
          var lat1 = toRad(latitude);
          var lat2 = toRad(lat);

          var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c;
          return d * 1000; // convert to meters
        }
        var distance = getDistance(latitude, longitude, lat!, lng!);
        if (distance < 100) {
          infoContent.appendChild(button);
        }

      });
    }
      if (lat != null && lng != null && title != null) {
        const infoWindow = new google.maps.InfoWindow({
          content: infoContent

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
        if (isCurrentUser) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          marker.setIcon({
            url: "http://maps.google.com/mapfiles/kml/pushpin/pink-pushpin.png",
            scaledSize: new google.maps.Size(50, 50)
          })
        } else {
          marker.setIcon({
            url: "http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png",
            scaledSize: new google.maps.Size(50, 50)
          })
        }
        this._markers.push(marker);
      }
  }

  constructor(private toastr: ToastrService, private usersService: UsersService) {}

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

  public joinCheckin(targerUid: string) {
    this.usersService.joinCheckIn(targerUid).subscribe({
      next: (data) => {
        this.toastr.success("Joined checkin successfully!");
        alert("Joined checkin successfully!");
      },
      error: (err) => {
        this.toastr.error(err.error);
        alert(err.error);
        console.error(err);
      }
      }
    )
  }

  public pinCheckIn() {
    const user = getAuth().currentUser;
    console.log("user", user!.uid);
    // let friends = this.service.getFriendsCheckIns();

    this.usersService.getFriends().subscribe((friends) => {
      let listFriendsCheckIns: ListCheckinsDto = {
        userIds: [user!.uid],
      }
      let listUsernames = new Map<string, string>();
      if (friends.data.length > 0) {
        friends.data.forEach((friend) => {
          listFriendsCheckIns.userIds.push(friend.uid);
          listUsernames.set(friend.uid, friend.displayName!);
        });
        listUsernames.set(user!.uid, user!.displayName!);
        let mapCheckIns = new Map<CheckInModel, string[]>();
        this.usersService.getCheckIns(listFriendsCheckIns).subscribe((checkIns) => {
          if (Object.values(checkIns.data).length > 0)
          {
            console.log("checkIns", checkIns.data);
            (Object.values(checkIns.data)!).forEach((checkIn) => {
              if(checkIn !== null){
                let userId = checkIn!.uid;
                if (mapCheckIns.size > 0) {
                  let found = false;
                  mapCheckIns.forEach((value, key) => {
                    if (key.location.latitude === checkIn!.location.latitude && key.location.longitude === checkIn!.location.longitude && key.title === checkIn!.title && key.description === checkIn!.description && key.timestamp === checkIn!.timestamp) {
                      value.push(userId);
                      found = true;
                    }
                  })
                  if (!found) {
                    mapCheckIns.set(checkIn!, [userId]);
                  }
                } else {
                  mapCheckIns.set(checkIn!, [userId]);
                }
              }
            });
            mapCheckIns.forEach((ids, model) => {
              let authorId = ids[0];
              console.log("authorId", authorId);
              let usernames: string[] = [];
              let ok = false;
              ids.forEach((id) => {
                usernames.push(listUsernames.get(id)!);
                if(id == user!.uid) {
                  ok = true;
                }
              });
              if (model.timestamp > (new Date().getTime() - 1000 * 60 * 60 * 2)) {
                this.addMarker(model.location.latitude, model.location.longitude, model.title, ok, usernames, ids, authorId);
              }
            });
          }
        });
      }
    });
  }
}
