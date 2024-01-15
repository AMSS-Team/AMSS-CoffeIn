import {InviteModel} from "./InviteModdel";

export type User = {
  uid: string;
  email: string;
  displayName?: string;
  following: string[];
  fcmToken?: string;
  invites: InviteModel[];
};
