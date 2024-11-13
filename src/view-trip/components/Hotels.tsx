import { Hotel } from "@/interfaces/Hotel";
import HotelCard from "./HotelCard";

type HotelProps = {
  hotels?: Hotel[];
};

function Hotels({ hotels }: HotelProps) {
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
          <div key={index}>
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
