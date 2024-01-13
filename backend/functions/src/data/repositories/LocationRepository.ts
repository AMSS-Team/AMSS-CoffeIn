import {getFirestore} from "firebase-admin/firestore";
import {CheckInModel} from "../models/CheckInModel";

export default class LocationRepository {
    private db: FirebaseFirestore.Firestore;
    private readonly LOCATION_COLLECTION = "locations";
    private static instance: LocationRepository;

    private constructor() {
        this.db = getFirestore();
    }

    async checkInLocation(userId: string, checkIn: CheckInModel) {
        await this.db
            .collection(this.LOCATION_COLLECTION)
            .doc(userId)
            .set({...checkIn, uid: userId});

        return {...checkIn, uid: userId} as CheckInModel;
    }

    async getCheckIn(userId: string): Promise<CheckInModel | null> {
        const checkinDocumentData = await this.db
            .collection(this.LOCATION_COLLECTION)
            .where("uid", "==", userId)
            .get();

        if (checkinDocumentData.docs.length > 1) {
            throw new Error("Multiple users found with the same id");
        } else if (checkinDocumentData.docs.length === 0) {
            throw new Error("User not found");
        }

        return (
            checkinDocumentData.docs.map((doc) => ({
                ...(doc.data() as CheckInModel),
                uid: doc.id,
            }))[0] ?? null
        );
    }

    async getCheckInsForUsers(
        userIds: string[],
    ): Promise<Record<string, CheckInModel | null>> {
        const checkinDocumentData = await this.db
            .collection(this.LOCATION_COLLECTION)
            .where("uid", "in", userIds)
            .get();

        const result: Record<string, CheckInModel | null> = {};

        const checkinDocuments = checkinDocumentData.docs.map((doc) => ({
            ...(doc.data() as CheckInModel),
            uid: doc.id,
        }));

        for (const userId of userIds) {
            const checkIn = checkinDocuments.find((doc) => doc.uid === userId);
            result[userId] = checkIn ?? null;
        }
        return result;
    }

    async clearCheckIn(userId: string) {
        await this.db.collection(this.LOCATION_COLLECTION).doc(userId).delete();
    }

    async joinCheckIn(userId: string, targetUserId: string) {
        const checkIn = await this.getCheckIn(targetUserId);
        if (!checkIn) {
            throw new Error("Target user not checked in");
        }
        await this.checkInLocation(userId, {
            ...checkIn,
            refersUserUid: checkIn.refersUserUid ?? targetUserId,
        });
    }

    static getInstance(): LocationRepository {
        if (!LocationRepository.instance) {
            LocationRepository.instance = new LocationRepository();
        }
        return LocationRepository.instance;
    }
}
