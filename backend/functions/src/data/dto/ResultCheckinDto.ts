import {CheckInModel} from "../models/CheckInModel";

export type ResultCheckInDto = {
    uid: string;
    lat: number;
    lng: number;
    title: string;
    description: string;
};

export function fromCheckInModel(model: CheckInModel) {
    if (model.uid === undefined) {
        throw new Error("Uid of checkin model is undefined");
    }
    return {
        uid: model.uid,
        lat: model.location.latitude,
        lng: model.location.longitude,
        title: model.title,
        description: model.description,
    } as ResultCheckInDto;
}
