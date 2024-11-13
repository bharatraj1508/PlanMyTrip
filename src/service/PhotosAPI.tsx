import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};

const GetPlaceDetails = async (data: any) => {
  return await axios.post(BASE_URL, data, config);
};

export const GetPhotoUrl = async (data: any): Promise<string> => {
  let url = "";

  try {
    const res = await GetPlaceDetails(data);
    console.log(res);
    url = `https://places.googleapis.com/v1/${
      res.data.places[0].photos[5].name
    }/media?maxHeightPx=1000&maxWidthPx=1000&key=${
      import.meta.env.VITE_GOOGLE_PLACE_API_KEY
    }`;
  } catch (error) {
    console.error("Error fetching photo URL:", error);
  }

  return url;
};