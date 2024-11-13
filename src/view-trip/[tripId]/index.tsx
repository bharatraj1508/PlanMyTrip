import { toast } from "@/hooks/use-toast";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import { Trip } from "@/interfaces/Trip";
import Hotels from "../components/Hotels";
import Places from "../components/Places";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip>();

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, "PlanMyTrip", tripId!);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data() as Trip);
      console.log(docSnap.data());
    } else {
      toast({
        title: "OOPS!",
        description: "No trip data found. Generate a new trip first.",
      });
    }
  };

  return (
    <>
      <div className="px-5 md:px-44 lg:px-56 mt-10 mb-10 flex flex-col gap-14">
        <InfoSection tripSelection={trip?.tripSelection} />

        <Hotels hotels={trip?.tripData.travelPlan.hotels} />

        <Places itineraryData={trip?.tripData.travelPlan.itinerary} />
      </div>
    </>
  );
}

export default ViewTrip;
