import {LocationModel} from "./LocationModel";

export type CreateCheckInDto = {
  lat: number;
  lng: number;
  title: string;
  description: string;
};
