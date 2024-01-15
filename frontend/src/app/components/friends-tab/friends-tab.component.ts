import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {getAuth} from "@firebase/auth";
import {User} from "../../models/user";

@Component({
  selector: 'app-friends-tab',
  templateUrl: './friends-tab.component.html',
  styleUrls: ['./friends-tab.component.scss']
})
export class FriendsTabComponent implements OnInit {
  public searchedUser?: User
  public friends: User[] = [];

  @Input() canInviteFriends: boolean = false;
  constructor(private usersService: UsersService) {}

  public ngOnInit() {
    this.usersService.getFriends().subscribe(({data: friends}) => {
      this.friends = friends;
    });
  }

  public searchUser(email: string): void {
    email = email.trim().toLowerCase();
    this.usersService.findByEmail(email).subscribe({
      next: ({data: user}) => {
        if (user == null) {
          alert("No user with this name!");
          return;
        }

        this.searchedUser = user;
      },
      error: () => {
        alert("Failed to find any user with that email.");
      }
    });
  }

  public populateFriends(): void {
    this.usersService.getFriends().subscribe(({data: friends}) => {
      this.friends = friends;
    });
  }

  public isUserFollowed(user: User): boolean {
    return this.friends.map(x => x.uid).includes(user.uid);
  }
}
