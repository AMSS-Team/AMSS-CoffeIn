import {getAuth, UserRecord} from "firebase-admin/auth";
import {getBearerToken} from "../api/utils/Utils";
import {Request} from "express";
import UserRepository from "../data/repositories/UserRepository";

export async function getCurrentUser(req: Request): Promise<UserRecord> {
    const token = getBearerToken(req);

    if (!token) {
        throw new Error("Unauthorized");
    }

    const decodedToken = await getAuth().verifyIdToken(token);
    const uuid = decodedToken.uid;
    return getAuth().getUser(uuid);
}

export async function createUserInDb(user: UserRecord) {
    await UserRepository.getInstance().createUserInDb(user);
}
