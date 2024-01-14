import {LocationModel} from "./LocationModel";

export type CheckInModel = {
    uid: string;
    location: LocationModel;
    timestamp: number;
    title: string;
    description: string;
    refersUserUid?: string;
};
