import {LocationModel} from "./LocationModel";

export type CheckInModel = {
  location: LocationModel;
  title: string;
  description: string;
  timestamp: number;
}
