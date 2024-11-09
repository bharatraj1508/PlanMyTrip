import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: New York, NY, USA, for 2 days for 2 people with a Moderate budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo cordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo cordimates, ticket pricing, Time travel each of the location for 2 days with each day plan with best time to visit in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "travelPlan": {\n    "location": "New York, NY, USA",\n    "duration": 2,\n    "budget": "Moderate",\n    "people": 2,\n    "hotels": [\n      {\n        "hotelName": "The Jane Hotel",\n        "hotelAddress": "113 Jane St, New York, NY 10014",\n        "price": "$150 - $250 per night",\n        "hotelImageUrl": "https://www.thejanenyc.com/images/hero-images/the-jane-hotel-hero-image.jpg",\n        "geoCoordinates": "40.7372, -74.0089",\n        "rating": 4.0,\n        "description": "A unique and affordable hotel in the West Village, known for its historic charm and cozy atmosphere."\n      },\n      {\n        "hotelName": "The Pod 39",\n        "hotelAddress": "39 E 29th St, New York, NY 10016",\n        "price": "$120 - $200 per night",\n        "hotelImageUrl": "https://www.thepodhotel.com/images/pod39/pod39_exterior.jpg",\n        "geoCoordinates": "40.7443, -73.9829",\n        "rating": 4.5,\n        "description": "A modern and stylish hotel in Midtown, offering small but functional rooms and a great location."\n      },\n      {\n        "hotelName": "The Roosevelt Hotel",\n        "hotelAddress": "45 E 45th St, New York, NY 10017",\n        "price": "$200 - $350 per night",\n        "hotelImageUrl": "https://www.theroosevelthotel.com/content/dam/theroosevelthotel/images/rooms/hero-roosevelt-room.jpg",\n        "geoCoordinates": "40.7523, -73.9788",\n        "rating": 4.0,\n        "description": "A historic and grand hotel in Midtown, known for its elegance and proximity to major attractions."\n      }\n    ],\n    "itinerary": [\n      {\n        "day": 1,\n        "schedule": [\n          {\n            "time": "9:00 AM",\n            "placeName": "Central Park",\n            "placeDetails": "Take a stroll through the iconic Central Park, enjoy the scenery, and visit attractions like Strawberry Fields and Bethesda Terrace.",\n            "placeImageUrl": "https://www.nycgo.com/images/articles/central-park-fall-foliage.jpg",\n            "geoCoordinates": "40.7829, -73.9654",\n            "ticketPricing": "Free",\n            "timeTravel": "2-3 hours"\n          },\n          {\n            "time": "12:00 PM",\n            "placeName": "The Plaza Hotel",\n            "placeDetails": "Enjoy a luxurious lunch at The Palm Court in The Plaza Hotel, known for its elegant atmosphere and afternoon tea.",\n            "placeImageUrl": "https://www.theplazany.com/content/dam/plaza/images/hotel-dining/the-palm-court.jpg",\n            "geoCoordinates": "40.7660, -73.9767",\n            "ticketPricing": "Price varies",\n            "timeTravel": "1-2 hours"\n          },\n          {\n            "time": "2:00 PM",\n            "placeName": "Times Square",\n            "placeDetails": "Experience the energy and vibrancy of Times Square, see the famous billboards, and explore the nearby theaters.",\n            "placeImageUrl": "https://www.nycgo.com/images/articles/times-square-night-view.jpg",\n            "geoCoordinates": "40.7580, -73.9855",\n            "ticketPricing": "Free",\n            "timeTravel": "2-3 hours"\n          },\n          {\n            "time": "7:00 PM",\n            "placeName": "Top of the Rock",\n            "placeDetails": "Enjoy breathtaking views of the city from the observation deck at Top of the Rock.",\n            "placeImageUrl": "https://www.topoftherocknyc.com/content/dam/top-of-the-rock/images/attractions/top-of-the-rock-observation-deck.jpg",\n            "geoCoordinates": "40.7589, -73.9802",\n            "ticketPricing": "Around $38 per person",\n            "timeTravel": "1-2 hours"\n          }\n        ]\n      },\n      {\n        "day": 2,\n        "schedule": [\n          {\n            "time": "10:00 AM",\n            "placeName": "The Metropolitan Museum of Art",\n            "placeDetails": "Explore the vast collection of art and artifacts at The Met, one of the world\'s most renowned museums.",\n            "placeImageUrl": "https://www.metmuseum.org/sites/default/files/styles/met_image_gallery_teaser/public/images/galleries/2016/11/22/20161122_11_72650_the-met.jpg?itok=a9bV228P",\n            "geoCoordinates": "40.7794, -73.9632",\n            "ticketPricing": "Suggested donation of $25 per person",\n            "timeTravel": "3-4 hours"\n          },\n          {\n            "time": "1:00 PM",\n            "placeName": "Little Italy",\n            "placeDetails": "Enjoy a delicious Italian lunch in Little Italy, a vibrant neighborhood with authentic restaurants and shops.",\n            "placeImageUrl": "https://www.nycgo.com/images/articles/little-italy-nyc-food-walking-tour.jpg",\n            "geoCoordinates": "40.7201, -73.9987",\n            "ticketPricing": "Price varies",\n            "timeTravel": "1-2 hours"\n          },\n          {\n            "time": "3:00 PM",\n            "placeName": "The High Line",\n            "placeDetails": "Take a walk along The High Line, a unique elevated park built on a former railway line.",\n            "placeImageUrl": "https://www.thehighline.org/sites/default/files/styles/hero_image/public/images/2019-09/HIGH_LINE_09-25-19_25.jpg?itok=f58n73qO",\n            "geoCoordinates": "40.7487, -74.0030",\n            "ticketPricing": "Free",\n            "timeTravel": "1-2 hours"\n          },\n          {\n            "time": "6:00 PM",\n            "placeName": "Brooklyn Bridge Park",\n            "placeDetails": "Enjoy stunning views of the Manhattan skyline and the Brooklyn Bridge from Brooklyn Bridge Park.",\n            "placeImageUrl": "https://www.brooklynbridgepark.org/sites/default/files/styles/hero_image/public/images/2018-06/IMG_0080_0.jpg?itok=gV6pO5J9",\n            "geoCoordinates": "40.7027, -73.9926",\n            "ticketPricing": "Free",\n            "timeTravel": "1-2 hours"\n          }\n        ]\n      }\n    ]\n  }\n}\n```\n\n**Notes:**\n\n* This itinerary is just a suggestion, you can customize it based on your interests and preferences.\n* The price range for hotels and meals is approximate and can vary depending on the time of year and availability.\n* The ticket prices for attractions are also approximate and can change.\n* It\'s a good idea to check the websites of the attractions in advance to purchase tickets and avoid lines.\n* Allow extra time for travel between attractions, especially during peak hours.\n* Don\'t forget to bring comfortable shoes, as you\'ll be doing a lot of walking.\n* Have a great time exploring New York City!',
        },
      ],
    },
  ],
});
