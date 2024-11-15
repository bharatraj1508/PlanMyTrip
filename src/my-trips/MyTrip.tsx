import { Trip } from "@/interfaces/Trip";
import { db } from "@/service/firebaseConfig";
import { UserContext } from "@/service/UserProvider";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import TripCard from "./TripCard";
import TripTable from "./TripTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import tripImg from "../assets/trip.jpg";

export type AllTripsData = {
  id: string;
  trips: Trip;
};

function MyTrip() {
  const userContext = useContext(UserContext);

  const [trips, setTrips] = useState<AllTripsData[] | null>([]);

  const [viewType, setViewType] = useState<string>("grid");

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { user } = userContext;

  const getAllTrips = async () => {
    let tripArray: AllTripsData[] = [];
    const q = query(
      collection(db, "PlanMyTrip"),
      where("email", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const singleTrip = {
        id: doc.id,
        trips: doc.data() as Trip,
      };

      tripArray.push(singleTrip);
    });
    setTrips(tripArray);
  };

  useEffect(() => {
    user && getAllTrips();
    var view = localStorage.getItem("trip-view-type");
    if (!view) {
      localStorage.setItem("trip-view-type", "grid");
      view = "grid";
    }
    setViewType(view);
  }, [user]);

  const handleChange = (e: any) => {
    localStorage.setItem("trip-view-type", e);
    setViewType(e);
  };

  const deleteTrip = async (id: string) => {
    await deleteDoc(doc(db, "PlanMyTrip", id));
    setTrips((prevTrips) => prevTrips!.filter((trip) => trip.id !== id));
  };

  return (
    <>
      <div className="mx-10 md:mx-20 md:my-8">
        <h2 className="text-3xl font-bold my-14">My Trips</h2>

        {trips?.length !== 0 ? (
          <div>
            <div className="my-8">
              <Select
                value={viewType}
                onValueChange={(e) => {
                  handleChange(e);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="table">List</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {viewType == "table" ? (
              <div>
                <TripTable tripData={trips!} deleteTrip={deleteTrip} />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-y-8 md:grid-cols-4 md:gap-y-9 md:gap-x-5">
                {trips?.map((item, index) => (
                  <div key={index}>
                    <TripCard tripData={item} deleteTrip={deleteTrip} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <Card className="max-w-md bg-gray-50 shadow-lg border border-gray-300 rounded-xl">
              <CardHeader>
                <CardTitle>NO TRIPS</CardTitle>
                <CardDescription>You have created no trips yet</CardDescription>
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
                  <IoMdAdd /> Create Your First Trip
                </Link>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

export default MyTrip;
