import {CheckInModel} from "../models/CheckInModel";
import {Timestamp} from "firebase-admin/firestore";

export type CheckInDto = {
    lat: number;
    lng: number;
    title: string;
    description: string;
};

export function toCheckInModel(dto: CheckInDto) {
    return {
        location: {
            latitude: dto.lat,
            longitude: dto.lng,
        },
        timestamp: Timestamp.now().toMillis(),
        title: dto.title,
        description: dto.description,
    } as CheckInModel;
}
