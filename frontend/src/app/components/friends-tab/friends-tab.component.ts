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

      this.friendName = user.email!;
      this.friendEmail = user.email;
      this.isFriendDisplayed = true;
    });
  }
}
