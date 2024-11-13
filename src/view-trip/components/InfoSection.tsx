import { FaDollarSign } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { TripSelection } from "@/interfaces/TripSelection";
import { GetPhotoUrl } from "@/service/PhotosAPI";
import { useEffect, useState } from "react";

type TripDataProps = {
  tripSelection?: TripSelection;
};

function InfoSection({ tripSelection }: TripDataProps) {
  useEffect(() => {
    if (tripSelection) {
      const data = {
        textQuery: tripSelection?.location.label,
      };

      GetPhotoUrl(data).then((url) => {
        setPhotoUrl(url);
      });
    }
  }, [tripSelection]);

  const [photoUrl, setPhotoUrl] = useState<string>();

  return (
    <div>
      <div className="flex flex-col gap-4">
        <img
          className="w-full h-[250px] md:h-[450px] rounded-2xl shadow-xl"
          src={photoUrl}
          alt="trip-img"
        />
        <h2 className="text-2xl font-bold">{tripSelection?.location.label}</h2>
        <div className="flex flex-col items-start gap-3 md:flex-row md:gap-6 md:items-center">
          <div className="px-4 py-2 flex flex-row items-center gap-1 text-sm border border-gray-400 rounded-full shadow-md bg-neutral-200">
            <FaDollarSign />
            {tripSelection?.budget} budget
          </div>
          <div className="px-4 py-2 flex flex-row items-center gap-1 text-sm border border-gray-400 rounded-full shadow-md bg-neutral-200">
            <IoMdTime />
            {tripSelection?.days} days
          </div>
          <div className="px-4 py-2 flex flex-row items-center gap-1 text-sm border border-gray-400 rounded-full shadow-md bg-neutral-200">
            <FaUserFriends />
            {tripSelection?.traveler}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
