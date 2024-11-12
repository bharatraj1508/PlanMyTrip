import { TripData } from "./TripData";
import { TripSelection } from "./TripSelection";

export interface Trip {
  email: string;
  tripData: TripData;
  tripSelection: TripSelection;
}
