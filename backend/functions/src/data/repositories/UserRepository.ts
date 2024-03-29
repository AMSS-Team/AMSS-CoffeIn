import {getFirestore, FieldValue} from "firebase-admin/firestore";
import {UserModel} from "../models/UserModel";
import {getAuth, UserRecord} from "firebase-admin/auth";
import {FcmTokenModel} from "../models/FcmTokenModel";
import {InviteModel} from "../models/InviteModdel";
import LocationRepository from "./LocationRepository";

export default class UserRepository {
    private db: FirebaseFirestore.Firestore;
    private readonly USERS_COLLECTION = "users";
    private static instance: UserRepository;

    private readonly locationRepository = LocationRepository.getInstance();

    private constructor() {
        this.db = getFirestore();
    }

    async getUser(userId: string): Promise<UserRecord> {
        return getAuth().getUser(userId);
    }

    async getUsers(userIds: string[]): Promise<UserRecord[]> {
        return Promise.all(userIds.map((id) => this.getUser(id)));
    }

    async getFollowings(userId: string): Promise<UserRecord[]> {
        const userDocumentData = await this.db
            .collection(this.USERS_COLLECTION)
            .where("uid", "==", userId)
            .get();

        if (userDocumentData.docs.length > 1) {
            throw new Error("Multiple users found with the same id");
        } else if (userDocumentData.docs.length === 0) {
            throw new Error("User not found");
        }

        const followingUids = userDocumentData.docs.map(
            (doc) => (doc.data() as UserModel).following,
        )[0];
        return Promise.all(followingUids.map((uid) => getAuth().getUser(uid)));
    }

    async getFollowers(userId: string): Promise<UserRecord[]> {
        const userDocumentData = await this.db
            .collection(this.USERS_COLLECTION)
            .where("following", "array-contains", userId)
            .get();

        const userIds = userDocumentData.docs
            .map((doc) => doc.data() as UserModel)
            .map((user) => user.uid);
        return this.getUsers(userIds);
    }

    followUser(userId: string, userToFollowId: string) {
        return this.db
            .collection(this.USERS_COLLECTION)
            .doc(userId)
            .update({
                following: FieldValue.arrayUnion(userToFollowId),
            });
    }

    unfollowUser(userId: string, userToUnfollow: string) {
        return this.db
            .collection(this.USERS_COLLECTION)
            .doc(userId)
            .update({
                following: FieldValue.arrayRemove(userToUnfollow),
            });
    }

    async findUserByEmail(email: string): Promise<UserRecord> {
        return await getAuth().getUserByEmail(email);
    }

    async saveFcmToken(userId: string, fcmToken: string) {
        await this.db.collection(this.USERS_COLLECTION).doc(userId).update({
            fcmToken,
        });
    }

    async invalidateFcmToken(userId: string) {
        await this.db.collection(this.USERS_COLLECTION).doc(userId).update({
            fcmToken: undefined,
        });
    }

    async getFcmToken(userId: string): Promise<string | undefined> {
        const userDocumentData = await this.db
            .collection(this.USERS_COLLECTION)
            .where("uid", "==", userId)
            .get();

        if (userDocumentData.docs.length > 1) {
            throw new Error("Multiple users found with the same id");
        } else if (userDocumentData.docs.length === 0) {
            throw new Error("User not found");
        }

        return userDocumentData.docs.map(
            (doc) => (doc.data() as UserModel).fcmToken,
        )[0];
    }

    async getFcmTokens(userIds: string[]): Promise<FcmTokenModel[]> {
        const userDocumentData = await this.db
            .collection(this.USERS_COLLECTION)
            .where("uid", "in", userIds)
            .get();

        return userDocumentData.docs
            .map((doc) => doc.data() as UserModel)
            .map((user) => ({
                userId: user.uid,
                token: user.fcmToken,
                displayName: user.displayName,
            }));
    }

    async createUserInDb(user: UserRecord) {
        if (user.email != undefined) {
            const userModel: UserModel = {
                displayName: user.displayName,
                uid: user.uid,
                email: user.email,
                following: [],
                invites: []
            };
            await this.db
                .collection(this.USERS_COLLECTION)
                .doc(user.uid)
                .set(userModel);

            return;
        }

        throw new Error("User email is undefined");
    }

    async inviteUser(targetUserId: string, currentUser: UserRecord) {
        const checkIn = await this.locationRepository.getCheckIn(currentUser.uid);

        if (checkIn == null) {
            throw new Error("Current User is not checked in");
        }

        const inviteModel: InviteModel = {
            userName: currentUser.displayName ?? "",
            title: checkIn.title,
        }

        console.log("Inviting user: " + targetUserId + " with invite: " + JSON.stringify(inviteModel));

        await this.db
            .collection(this.USERS_COLLECTION)
            .doc(targetUserId)
            .update({
                invites: FieldValue.arrayUnion(inviteModel),
            });
    }

    async clearInvites(targetUserId: string) {
        await this.db
            .collection(this.USERS_COLLECTION)
            .doc(targetUserId)
            .update({
                invites: [],
            });
    }

    static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    async getInvites(userId: string) {
        const userDocumentData = await this.db
            .collection(this.USERS_COLLECTION)
            .where("uid", "==", userId)
            .get();

        if (userDocumentData.docs.length > 1) {
            throw new Error("Multiple users found with the same id");
        } else if (userDocumentData.docs.length === 0) {
            throw new Error("User not found");
        }

        console.log(userDocumentData.docs.map(
            (doc) => (doc.data().invites)))

        return userDocumentData.docs.map(
            (doc) => (doc.data() as UserModel).invites,
        ).flat();
    }
}
