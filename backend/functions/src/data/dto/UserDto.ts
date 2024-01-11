import {UserRecord} from "firebase-admin/auth";

export type UserDto = {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
};

export function toUserDto(user: UserRecord): UserDto {
    if (user.email != undefined && user.displayName != undefined) {
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        };
    } else {
        throw new Error("User record is missing required fields");
    }
}
