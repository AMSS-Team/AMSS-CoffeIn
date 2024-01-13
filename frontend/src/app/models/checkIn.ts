import {LocationModel} from "./LocationModel";

export type CheckInModel = {
  uid: string;
  location: LocationModel;
  title: string;
  description: string;
  timestamp: number;
}
