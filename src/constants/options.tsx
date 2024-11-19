export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of cost",
    icon: "🪙",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💵",
  },
];

export const SelectTravelerOptions = [
  {
    id: 1,
    title: "Only me",
    desc: "A sole traveler in exploration",
    icon: "🧍‍♂️",
    people: "1 person",
  },
  {
    id: 2,
    title: "Couples",
    desc: "Two travelers in tandem",
    icon: "👫",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adventure",
    icon: "🏠",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill seekers",
    icon: "🏄🏻‍♂️",
    people: "5 to 10 people",
  },
];

export const AI_PROMPT = (
  location: string,
  days: number,
  budget: string,
  traveler: string
) => {
  const prompt = `Generate Travel Plan for Location: ${location}, for ${days} days for ${traveler} with a ${budget} budget, give me 3 to 5 Hotels options list with HotelName, Hotel address, Price, hotel image url, geo cordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo cordimates, ticket pricing (in local currency of ${location}), Time travel each of the location for ${days} days with each day plan with best time to visit in JSON format`;
  return prompt;
};
