import { Itinerary } from "@/interfaces/Itinerary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import tripImg from "../../assets/trip.jpg";
import { Link } from "react-router-dom";

type ItineraryProps = {
  itineraryData?: Itinerary[];
};

function Places({ itineraryData }: ItineraryProps) {
  return (
    <>
      <div>
        <h2 className="text-3xl font-semibold">Travel Plan</h2>
        <div className="mt-3 px-1 text-base text-gray-500 italic mb-4">
          <p>
            Get excited for your upcoming adventure! Google Gemini has curated a
            personalized travel plan, thoughtfully tailored to your interests
            and choices. From must-see attractions to hidden gems, your journey
            is crafted to match your unique style. Enjoy seamless, stress-free
            travel planning as you explore destinations handpicked just for you.
            Let Gemini guide you to unforgettable experiences!
          </p>
        </div>
        {itineraryData?.map((item, index) => (
          <div key={index}>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div>
                    <h2 className="text-lg">Day {item.day}</h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mb-4">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-5 ">
                    {item.schedule.map((place, key) => (
                      <Link
                        key={key}
                        to={
                          "https://www.google.com/maps/search/?api=1&query=" +
                          place.placeName
                        }
                        target="_blank"
                      >
                        <div className="flex flex-col gap-2 hover:scale-105 transition-all duration-300 p-3 hover:shadow-xl rounded-3xl border border-gray-200">
                          <h2 className="text-base text-red-500 font-bold">
                            {place.time}
                          </h2>
                          <img
                            src={tripImg}
                            alt="place-image"
                            className="w-full md:h-[200px] object-cover rounded-2xl border border-black"
                          />
                          <div className="px-2 flex flex-col gap-1">
                            <h2 className="text-lg font-semibold">
                              {place.placeName}
                            </h2>
                            <h2 className="text-xs text-gray-500">
                              {place.placeDetails}
                            </h2>

                            <h2 className="text-sm">⏱️ {place.timeTravel}</h2>
                            <h2 className="text-sm">
                              💲 {place.ticketPricing}
                            </h2>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </>
  );
}

export default Places;
