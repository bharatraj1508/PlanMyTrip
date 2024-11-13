import { Itinerary } from "@/interfaces/Itinerary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import tripImg from "../../assets/trip.jpg";
import { Link } from "react-router-dom";
import ScheduleCard from "./ScheduleCard";

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
                      <div key={key}>
                        <ScheduleCard place={place} />
                      </div>
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
