import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {getAuth, signOut} from "@firebase/auth";
import {CheckInModel} from 'app/models/checkIn';
import {LocationModel} from 'app/models/LocationModel';
import {UsersService} from 'app/services/users.service';
// import listchekinsdto
import {ListCheckinsDto} from "app/models/listCheckinsDto";
import {Router} from '@angular/router';
import {Subscription} from "rxjs";
import {MapService} from "../../services/map.service";
import {InviteModel} from "../../models/InviteModdel";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrls: ['./home-tab.component.scss']
})
export class HomeTabComponent implements OnInit, OnDestroy {

  isCheckedIn: boolean = false;

  checkInDets: CheckInModel = {
    uid: "",
    location: {
      uid: "",
      latitude: 0,
      longitude: 0
    },
    timestamp: 0,
    title: "",
    description: ""
  };
  private _subscription: Subscription;

  constructor(private userService: UsersService,
              private mapService: MapService,
              private cdr: ChangeDetectorRef,
              private toastService: ToastrService,) {
    this._subscription = this.mapService.joinedCheckin.subscribe(() => {
      this.getCheckInDetails();
    });
  }

  @Output() checkInStatusChange = new EventEmitter<boolean>();

  public get isSignedIn(): boolean {
    return getAuth().currentUser !== null;
  }

  public get getDisplayName(): string {
    if (this.isSignedIn) {
      const user = getAuth().currentUser;
      let displayName: string | null | undefined = "";
      displayName = user?.displayName;
      if (displayName == null) {
        displayName = "";
      }
      return displayName;
    }
    return "";
  }

  public get profilePictureUrl(): string | null {
    const user = getAuth().currentUser!;
    return user.photoURL;
  }

  public get getEmail(): string {
    if (this.isSignedIn) {
      const user = getAuth().currentUser;
      let email: string | null | undefined = "";
      email = user?.email;
      if (email == null) {
        email = "";
      }
      return email;
    }
    return "";
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
    } else {
      return "/";
    }
  }

  public onCheckInStatusChange(isCheckedIn: boolean): void {
    this.checkInStatusChange.emit(isCheckedIn);
  }

  public getInvites() {
    this.userService.getInvites().subscribe((invites) => {
      const invitesList = invites.data
      invitesList.forEach((invite: InviteModel) => {
          this.toastService.info(`You have been invited to a check-in at ${invite.title}`, `Invite from ${invite.userName}`, {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
          })
        }
      )
    })
  }

  public getCheckInDetails() {
    const user = getAuth().currentUser;

    if (user != null) {
      let listFriendsCheckIns: ListCheckinsDto = {
        userIds: [],
      }

      this.userService.getCheckIns({userIds: [user!.uid]}).subscribe((checkIns) => {
        console.log(checkIns);
        Object.values(checkIns.data).forEach((checkIn: CheckInModel | null) => {
            if (checkIn != null) {
              this.isCheckedIn = true;
              this.onCheckInStatusChange(this.isCheckedIn);
              //console.log(checkIn.location.latitude);
              this.checkInDets.location.latitude = checkIn.location.latitude;
              //console.log(checkIn.location.longitude);
              this.checkInDets.location.longitude = checkIn.location.longitude;
              //console.log(checkIn.title);
              this.checkInDets.title = checkIn.title;
              //console.log(checkIn.description);
              this.checkInDets.description = checkIn.description;
            }
          }
        );
      });
    }
  }


  ngOnInit(): void {
    this.getCheckInDetails();
    this.getInvites();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
