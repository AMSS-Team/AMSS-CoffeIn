import { Component } from '@angular/core';
import {getAuth, signOut} from "@firebase/auth";

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrls: ['./home-tab.component.scss']
})
export class HomeTabComponent {
  public get isSignedIn(): boolean {
    return getAuth().currentUser !== null;
  }

  public get getDisplayName() : string {
    if (this.isSignedIn) {
      const user = getAuth().currentUser;
      let displayName: string | null | undefined = "";
      displayName = user?.displayName;
      if (displayName == null){
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
  public get getEmail() : string {
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
    if (this.isSignedIn)
    {
      const user = getAuth().currentUser;
      const displayName = user?.displayName;
      let initials: string = "/";
      if (displayName != null) {
        initials = displayName.replace(/[^A-Z]+/g, "");
      }
      return initials;
    }
    else {
      return "/";
    }
  }
}
