import { Hotel } from "./Hotel";
import { itinerary } from "./Itinerary";

export interface TripData {
  travelPlan: {
    budget: string;
    duration: number;
    hotels: Hotel[];
    itinerary: itinerary[];
    location: string;
    people: string;
  };
}
