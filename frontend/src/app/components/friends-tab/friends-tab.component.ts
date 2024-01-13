import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {getAuth} from "@firebase/auth";
import {User} from "../../models/user";

@Component({
  selector: 'app-friends-tab',
  templateUrl: './friends-tab.component.html',
  styleUrls: ['./friends-tab.component.scss']
})
<<<<<<< HEAD
export class FriendsTabComponent implements OnInit {
  public searchedUser?: User
  public friends: User[] = [];

  constructor(private usersService: UsersService) {}

  public ngOnInit() {
    this.usersService.getFriends().subscribe(({data: friends}) => {
      this.friends = friends;
=======
export class FriendsTabComponent {
  public isFriendDisplayed: boolean = false;

  public friendName: string = "cc";
  public friendEmail: string = "";
  public friendId: string= "";
  public friendName: string = "";
  public friendEmail: string = "";

  constructor(private usersService: UsersService) {}

  public searchUser(email: string) {
    email = email.trim().toLowerCase();
    this.isFriendDisplayed = false;
    this.usersService.findByEmail(email).subscribe(user => {
      if (user == null) {
        alert("No user with this name!");
        return;
      }


      console.log(user);

      this.friendName = user.data.displayName!;
      this.friendEmail = user.data.email;
      this.isFriendDisplayed = true;
      this.friendId = user.data.uid;
>>>>>>> 93a74482499b2e73294d7e07fd959c2691850a29
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

<<<<<<< HEAD
        this.searchedUser = user;
      },
      error: () => {
        alert("Failed to find any user with that email.");
      }
=======
    this.usersService.followUser(this.friendId).subscribe(() => {
      alert("User followed!");
      this.friendName = user.email!;
      this.friendEmail = user.email;
      this.isFriendDisplayed = true;
>>>>>>> 93a74482499b2e73294d7e07fd959c2691850a29
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
