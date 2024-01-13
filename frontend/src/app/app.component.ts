
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private displayMap: boolean = false;
  private createCheckin: boolean = false;
