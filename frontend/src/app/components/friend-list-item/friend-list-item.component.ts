import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-friend-list-item',
  templateUrl: './friend-list-item.component.html',
  styleUrls: ['./friend-list-item.component.scss']
})
export class FriendListItemComponent {
  @Input() user!: User;
  @Input() followed: boolean = false;
  @Output() followEvent = new EventEmitter<User>();
  @Output() unfollowEvent = new EventEmitter<User>();

  constructor(private usersService: UsersService) {
  }

  handleFollowUnfollow(): void {
    if (this.followed) {
      this.unfollow();
    } else {
      this.follow();
    }
  }

  private follow(): void {
    this.usersService.followUser(this.user.uid).subscribe({
      next: (_) => {
        this.followEvent.emit(this.user);
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
}
