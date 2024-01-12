import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GoogleMap, GoogleMapsModule} from "@angular/google-maps";
import {ToastrModule} from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import angularfire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { environment } from "../environments/environment.prod";
import { FriendsTabComponent } from './components/friends-tab/friends-tab.component';
import { HomeTabComponent } from './components/home-tab/home-tab.component';
import {HttpClientModule} from "@angular/common/http";
import { CheckInComponent } from './components/check-in/check-in.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import { FriendListItemComponent } from './components/friend-list-item/friend-list-item.component';




@NgModule({
  declarations: [
    AppComponent,
    FriendsTabComponent,
    HomeTabComponent,
    CheckInComponent,
    FriendListItemComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        GoogleMapsModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right'
        }),
        BrowserModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        MatProgressSpinnerModule,
        MatButtonModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
