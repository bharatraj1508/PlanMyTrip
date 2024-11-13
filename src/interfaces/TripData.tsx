import { Hotel } from "./Hotel";
import { Itinerary } from "./Itinerary";

export interface TripData {
  travelPlan: {
    budget: string;
    duration: number;
    hotels: Hotel[];
    itinerary: Itinerary[];
    location: string;
    people: string;
  };
}
