import { Component } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {getAuth} from "@firebase/auth";

@Component({
  selector: 'app-friends-tab',
  templateUrl: './friends-tab.component.html',
  styleUrls: ['./friends-tab.component.scss']
})
export class FriendsTabComponent {
  public isFriendDisplayed: boolean = false;
  public friendName: string = "cc";
  public friendEmail: string = "";
  public friendId: string= "";

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
    });
  }

  public followUser() {
    const user = getAuth().currentUser;
    if (user == null) {
      alert("You are not logged in!");
      return;
    }

    this.usersService.followUser(this.friendId).subscribe(() => {
      alert("User followed!");
    });
  }
}
