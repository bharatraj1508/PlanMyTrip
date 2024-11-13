import { Hotel } from "@/interfaces/Hotel";
import { useEffect } from "react";
import tripImg from "../../assets/trip.jpg";
import { Link } from "react-router-dom";

type HotelProps = {
  hotels?: Hotel[];
};

function Hotels({ hotels }: HotelProps) {
  useEffect(() => {
    console.log(hotels);
  }, []);
  return (
    <div>
      <h2 className="text-3xl font-bold">Hotels Recommendation 🏨</h2>
      <div className="mt-3 px-1 text-base text-gray-500 italic">
        <p>
          Discover tailored hotel recommendations powered by Google Gemini,
          designed to match your unique preferences and travel style. The
          advanced AI technology analyzes top-rated accommodations, locations,
          and amenities to bring you the perfect stay options. Effortlessly find
          your ideal hotel with recommendations that feel handpicked just for
          you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-5 mt-7">
        {hotels?.map((hotel, index) => (
          <Link
            key={index}
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              hotel.hotelName +
              hotel.hotelAddress
            }
            target="_blank"
            className="flex flex-row gap-2"
          >
            <div className="h-full flex flex-col gap-3 hover:scale-105 transition-all duration-300 p-3 hover:shadow-xl rounded-3xl">
              <img
                src={tripImg}
                alt="hotel-img"
                className="w-full md:h-[250px] object-cover rounded-2xl border border-black"
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
        ))}
      </div>
    </div>
  );
}

export default Hotels;
