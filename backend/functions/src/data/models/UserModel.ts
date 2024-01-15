import {InviteModel} from "./InviteModdel";

export type UserModel = {
    uid: string;
    email: string;
    displayName?: string;
    following: string[];
    fcmToken?: string;
    invites: InviteModel[];
};
