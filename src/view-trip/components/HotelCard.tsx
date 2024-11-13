import { Hotel } from "@/interfaces/Hotel";
import { GetPhotoUrl } from "@/service/PhotosAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type HotelCardProp = {
  hotel: Hotel;
};

function HotelCard({ hotel }: HotelCardProp) {
  useEffect(() => {
    if (hotel) {
      const data = {
        textQuery: hotel?.hotelName,
      };

      GetPhotoUrl(data).then((url) => {
        setPhotoUrl(url);
      });
    }
  }, [hotel]);

  const [photoUrl, setPhotoUrl] = useState<string>();

  return (
    <div>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          hotel.hotelName +
          hotel.hotelAddress
        }
        target="_blank"
        className="flex flex-row gap-2 h-full"
      >
        <div className="h-full flex flex-col gap-3 hover:scale-105 transition-all duration-300 p-3 hover:shadow-xl rounded-3xl">
          <img
            src={photoUrl}
            alt="hotel-img"
            className="w-[300px] h-[350px] md:w-[300px] md:h-[250px] object-cover rounded-2xl border border-black"
          />
          <div className="px-1.5 flex flex-col gap-1">
            <h2 className="font-semibold text-base">{hotel.hotelName}</h2>
            <div className="text-sm text-gray-500">
              <h2 className="line-clamp-1 hover:underline">
                📍 {hotel.hotelAddress}
              </h2>

              <h2>💰 {hotel.price}</h2>
              <h2>⭐️ {hotel.rating}</h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCard;
