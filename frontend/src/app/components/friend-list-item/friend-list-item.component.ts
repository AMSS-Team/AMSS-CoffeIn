import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CheckInModel } from 'app/models/checkIn';
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";
import {MapService} from "../../services/map.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-friend-list-item',
  templateUrl: './friend-list-item.component.html',
  styleUrls: ['./friend-list-item.component.scss']
})
export class FriendListItemComponent implements OnInit {
  @Input() user!: User;
  @Input() followed: boolean = false;
  @Input() canInvite: boolean = false;
  @Output() followEvent = new EventEmitter<User>();
  @Output() unfollowEvent = new EventEmitter<User>();




  constructor(private usersService: UsersService, private mapService: MapService, private toastService: ToastrService) { }


  onInvite(): void {
    this.usersService.inviteUser(this.user.uid).subscribe({
      next: (data) => {
        this.toastService.success("Invitation sent!", undefined, {
          timeOut: 1500,
          positionClass: "toast-bottom-center"
        });
      },
      error: (err) => {
        alert(err.error);
        console.error(err);
      }
    })
  }

  handleFollowUnfollow(): void {
    if (this.followed) {
      this.unfollow();
    } else {
      this.follow();
    }
  }

  isCheckedIn: boolean = false;

  checkInDets : CheckInModel = {
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

  private follow(): void {
    this.usersService.followUser(this.user.uid).subscribe({
      next: (_) => {
        this.followEvent.emit(this.user);
        this.mapService.deleteAllMarkers();
        this.mapService.pinCheckIn();
      },
      error: (e) => {
        console.error(e);
        alert("Failed to follow user. Please try again later!")
      }
    });
  }


  private unfollow(): void {
    this.usersService.unfollowUser(this.user.uid).subscribe({
      next: (_) => {
        this.unfollowEvent.emit(this.user);
      },
      error: (e) => {
        console.error(e);
        alert("Failed to unfollow user. Please try again later!")
      }
    });
  }

  private showStatusDetails(): void{
    this.usersService.getCheckIns({userIds: [this.user!.uid]}).subscribe((checkIns) => {
      console.log(checkIns);
      Object.values(checkIns.data).forEach((checkIn: CheckInModel | null) => {
          if (checkIn != null)
          {
            this.isCheckedIn = true;
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

  ngOnInit(): void {
    this.showStatusDetails();
  }


}
