import { Schedule } from "@/interfaces/Itinerary";
import { GetPhotoUrl } from "@/service/PhotosAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import genImg from "../../assets/trip.jpg";

type PlaceProp = {
  place: Schedule;
};

function ScheduleCard({ place }: PlaceProp) {
  useEffect(() => {
    if (place) {
      const data = {
        textQuery: place?.placeName,
      };

      GetPhotoUrl(data).then((url) => {
        setPhotoUrl(url);
      });
    }
  }, [place]);

  const [photoUrl, setPhotoUrl] = useState<string>();
  return (
    <>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" + place.placeName
        }
        target="_blank"
      >
        <div className="flex flex-col gap-2 hover:scale-105 transition-all duration-300 p-3 hover:shadow-xl rounded-3xl border border-gray-200">
          <h2 className="text-base text-red-500 font-bold">{place.time}</h2>
          <img
            src={photoUrl ? photoUrl : genImg}
            alt="place-image"
            className="w-[400px] h-[200px] md:w-full md:h-[200px] object-cover rounded-2xl border border-black"
          />
          <div className="px-2 flex flex-col gap-1">
            <h2 className="text-lg font-semibold line-clamp-1">
              {place.placeName}
            </h2>
            <h2 className="text-xs text-gray-500 line-clamp-3">
              {place.placeDetails}
            </h2>

            <h2 className="text-sm">⏱️ {place.timeTravel}</h2>
            <h2 className="text-sm">💲 {place.ticketPricing}</h2>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ScheduleCard;
