export type UserModel = {
    uid: string;
    email: string;
    displayName?: string;
    following: string[];
    fcmToken?: string;
};
