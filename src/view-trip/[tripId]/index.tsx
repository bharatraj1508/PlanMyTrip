import { toast } from "@/hooks/use-toast";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import { Trip } from "@/interfaces/Trip";
import Hotels from "../components/Hotels";
import Places from "../components/Places";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoMdAdd } from "react-icons/io";
import tripImg from "../../assets/trip.jpg";
import Loading from "@/components/custom/Loading";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const fetchTripData = async () => {
      await getTripData();
      setLoading(false);
    };

    tripId ? fetchTripData() : setLoading(false);
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, "PlanMyTrip", tripId!);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data() as Trip);
    } else {
      toast({
        title: "OOPS!",
        description: "No trip data found. Generate a new trip first.",
      });
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      ) : (
        <div>
          {trip ? (
            <div className="px-5 md:px-44 lg:px-56 mt-10 mb-10 flex flex-col gap-14">
              <InfoSection tripSelection={trip?.tripSelection} />

              <Hotels hotels={trip?.tripData.travelPlan.hotels} />

              <Places itineraryData={trip?.tripData.travelPlan.itinerary} />
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <Card className="max-w-md bg-gray-50 shadow-lg border border-gray-300 rounded-xl">
                <CardHeader>
                  <CardTitle>NO TRIP FOUND ☹️</CardTitle>
                  <CardDescription>
                    This trip does not exist or might be deleted. Create another
                    trip
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <img
                      src={tripImg}
                      alt="trip-img"
                      className="rounded-3xl h-[250px]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    to={"/create-trip"}
                    className="py-1.5 px-3 flex w-fit flex-row gap-1 items-center border border-gray-300 rounded-3xl shadow-sm hover:scale-110 hover:shadow-xl transition-all duration-300"
                  >
                    <IoMdAdd /> Create Trip
                  </Link>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ViewTrip;
