import { useEffect, useState } from "react";
import { AllTripsData } from "./MyTrip";
import tripImg from "../assets/trip.jpg";
import { Link } from "react-router-dom";
import { GetPhotoUrl } from "@/service/PhotosAPI";
import { formatDate } from "@/utils/function";
import { MdDelete } from "react-icons/md";

type TripCardProp = {
  tripData?: AllTripsData;
  deleteTrip: (id: string) => void;
};

function TripCard({ tripData, deleteTrip }: TripCardProp) {
  useEffect(() => {
    if (tripData) {
      const data = {
        textQuery: tripData.trips.tripSelection.location.label,
      };

      GetPhotoUrl(data).then((url) => {
        setPhotoUrl(url);
      });
    }
  }, [tripData]);

  const [photoUrl, setPhotoUrl] = useState<string>();

  return (
    <div className="flex flex-col rounded-2xl hover:scale-110 hover:shadow-2xl transition-all duration-300 px-2 pb-4 border border-gray-300 border-t-0 border-l-0 shadow-lg">
      <Link to={"/view-trip/" + tripData?.id}>
        <img
          src={photoUrl ? photoUrl : tripImg}
          className="rounded-3xl md:h-[225px] h-[200px] w-full"
          alt="trip-img"
        />
        <div className="mx-2 mt-1">
          <h2 className="text-lg font-semibold line-clamp-1">
            {tripData?.trips.tripSelection.location.label}
          </h2>

          <div>
            <p className="text-gray-500 text-xs">{formatDate(tripData?.id!)}</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="px-2 py-1 bg-gray-200 w-fit rounded-full shadow-md border border-gray-300">
                <p className="text-xs italic font-medium ">
                  {tripData?.trips.tripSelection.budget} budget
                </p>
              </div>
              <div className="px-2 py-1 bg-gray-200 w-fit rounded-full shadow-md border border-gray-300">
                <p className="text-xs italic font-medium ">
                  {tripData?.trips.tripSelection.days} days
                </p>
              </div>
              <div className="px-2 py-1 bg-gray-200 w-fit rounded-full shadow-md border border-gray-300">
                <p className="text-xs italic font-medium ">
                  {tripData?.trips.tripSelection.traveler}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <hr className="my-3" />
      <div className="flex flex-row justify-end mr-4">
        <MdDelete
          className="w-5 h-5 text-red-500 hover:scale-125 hover:text-red-500 transition-all duration-300 cursor-pointer"
          onClick={() => {
            deleteTrip(tripData?.id!);
          }}
        />
      </div>
    </div>
  );
}

export default TripCard;
