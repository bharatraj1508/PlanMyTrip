export interface Schedule {
  geoCoordinates: string;
  placeDetails: string;
  placeImageUrl: string;
  placeName: string;
  ticketPricing: string;
  time: string;
  timeTravel: string;
}

export interface itinerary {
  day: number;
  schedule: Schedule[];
}
